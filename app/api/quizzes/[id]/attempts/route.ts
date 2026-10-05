import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { SubmitQuizAttemptSchema } from "@/lib/schemas/quiz.schema";
import prisma from "@/lib/prisma";
import { resolvePrismaUserId } from "@/services/user-profile.service";
import { autoIssueCertificate } from "@/services/certificate.service";

/**
 * GET /api/quizzes/[id]/attempts
 * Get the authenticated user's quiz attempt history
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await requireAuth();
    const { id: quizId } = await params;
    const prismaUserId = await resolvePrismaUserId(currentUser.id);
    if (!prismaUserId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const attempts = await prisma.quizAttempt.findMany({
      where: { quizId, userId: prismaUserId },
      include: {
        answers: {
          include: {
            question: { select: { question: true, marks: true } },
          },
        },
      },
      orderBy: { startedAt: "desc" },
    });

    return NextResponse.json({ attempts });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const status = message.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

/**
 * POST /api/quizzes/[id]/attempts
 * Submit a quiz attempt for the authenticated user.
 * Scores answers, saves attempt with enrollmentId, and triggers certificate check.
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await requireAuth();
    const { id: quizId } = await params;
    const body = await req.json();

    const prismaUserId = await resolvePrismaUserId(currentUser.id);
    if (!prismaUserId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const payload = {
      ...body,
      quizId,
      userId: body.userId || prismaUserId,
    };

    const validation = SubmitQuizAttemptSchema.safeParse(payload);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation Failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const { answers, enrollmentId } = validation.data;

    // Load quiz with questions and correct options
    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: {
          include: { options: true },
        },
      },
    });

    if (!quiz) {
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // Check attempt limit
    if (quiz.attemptLimit !== null) {
      const existingAttempts = await prisma.quizAttempt.count({
        where: { quizId, userId: prismaUserId },
      });
      if (existingAttempts >= quiz.attemptLimit) {
        return NextResponse.json(
          { error: `Attempt limit of ${quiz.attemptLimit} reached` },
          { status: 429 }
        );
      }
    }

    // Check module is complete before allowing quiz (if module-level quiz)
    if (quiz.moduleId) {
      const moduleProgress = await prisma.courseModuleProgress.findUnique({
        where: { userId_moduleId: { userId: prismaUserId, moduleId: quiz.moduleId } },
      });
      if (!moduleProgress?.isCompleted) {
        return NextResponse.json(
          { error: "Complete all lessons in this module before attempting the quiz" },
          { status: 403 }
        );
      }
    }

    // Score the attempt
    let earnedMarks = 0;
    let totalMarks = 0;

    const questionMap = new Map(quiz.questions.map((q) => [q.id, q]));

    const scoredAnswers = answers.map((answer) => {
      const question = questionMap.get(answer.questionId);
      if (!question) return { ...answer, isCorrect: false };

      totalMarks += question.marks;

      const correctOption = question.options.find((o) => o.isCorrect);
      const isCorrect =
        answer.selectedOptionId !== null &&
        answer.selectedOptionId === correctOption?.id;

      if (isCorrect) earnedMarks += question.marks;

      return { ...answer, isCorrect };
    });

    const percentage = totalMarks > 0 ? (earnedMarks / totalMarks) * 100 : 0;
    const isPassed = percentage >= quiz.passingPercentage;

    // Save attempt with all answers in a transaction
    const attempt = await prisma.$transaction(async (tx) => {
      const newAttempt = await tx.quizAttempt.create({
        data: {
          quizId,
          userId: prismaUserId,
          enrollmentId: enrollmentId ?? null,
          score: percentage,
          isPassed,
          completedAt: new Date(),
          answers: {
            create: scoredAnswers.map((a) => ({
              questionId: a.questionId,
              selectedOptionId: a.selectedOptionId ?? null,
              isCorrect: a.isCorrect,
            })),
          },
        },
      });
      return newAttempt;
    });

    // If passed and this is a module quiz with enrollmentId → check for certificate
    let certificateResult = null;
    if (isPassed && enrollmentId && quiz.moduleId) {
      // Get the course for the module
      const module = await prisma.courseModule.findUnique({
        where: { id: quiz.moduleId },
        select: { courseId: true },
      });
      if (module) {
        certificateResult = await autoIssueCertificate(
          prismaUserId,
          module.courseId,
          enrollmentId
        );
      }
    }

    return NextResponse.json(
      {
        attempt: {
          id: attempt.id,
          quizId,
          score: percentage,
          totalMarks,
          earnedMarks,
          isPassed,
          completedAt: attempt.completedAt,
        },
        certificateGenerated: !!certificateResult,
        certificateId: certificateResult
          ? (certificateResult.certificate as { id?: string }).id
          : undefined,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const status = message.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
