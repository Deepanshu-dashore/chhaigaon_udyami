import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { resolvePrismaUserId } from "@/services/user-profile.service";
import prisma from "@/lib/prisma";

/**
 * GET /api/modules/[id]/quiz
 * Get the module-level quiz for a module, plus whether the user has passed it.
 * The quiz is locked until all lessons in the module are complete.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    const { id: moduleId } = await params;

    const quiz = await prisma.quiz.findFirst({
      where: { moduleId },
      include: {
        _count: { select: { questions: true } },
      },
    });

    if (!quiz) {
      return NextResponse.json({ quiz: null });
    }

    let isLocked = true;
    let userBestAttempt = null;

    if (currentUser) {
      const prismaUserId = await resolvePrismaUserId(currentUser.id);
      if (prismaUserId) {
        // Check if module is complete (all lessons done)
        const moduleProgress = await prisma.courseModuleProgress.findUnique({
          where: { userId_moduleId: { userId: prismaUserId, moduleId } },
        });
        isLocked = !moduleProgress?.isCompleted;

        // Get the user's best passing attempt (or latest attempt)
        const bestAttempt = await prisma.quizAttempt.findFirst({
          where: { quizId: quiz.id, userId: prismaUserId, isPassed: true },
          orderBy: { completedAt: "desc" },
        });

        const latestAttempt = await prisma.quizAttempt.findFirst({
          where: { quizId: quiz.id, userId: prismaUserId },
          orderBy: { startedAt: "desc" },
        });

        userBestAttempt = bestAttempt ?? latestAttempt;
      }
    }

    return NextResponse.json({
      quiz: {
        ...quiz,
        isLocked,
        userBestAttempt: userBestAttempt
          ? {
              id: userBestAttempt.id,
              score: userBestAttempt.score,
              isPassed: userBestAttempt.isPassed,
              completedAt: userBestAttempt.completedAt,
            }
          : null,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
