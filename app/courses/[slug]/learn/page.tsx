import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { resolvePrismaUserId } from "@/services/user-profile.service";
import {
  DedicatedLearningPlayer,
  PlayerModule,
} from "@/components/course/dedicated-learning-player";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lessonId?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = await prisma.course.findUnique({
    where: { slug },
    select: { title: true },
  });

  return {
    title: course ? `${course.title} - अध्ययन मंच | छैगांव माखन उद्यमी` : "अध्ययन मंच",
    description: "समर्पित वीडियो व्याख्यान, अध्याय प्रश्नोत्तरी एवं अभ्यास सामग्री",
  };
}

export default async function DedicatedLearnPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { lessonId } = await searchParams;

  // 1. Check Authentication
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect(`/login?redirect=/courses/${slug}/learn`);
  }

  const prismaUserId = await resolvePrismaUserId(currentUser.id);
  if (!prismaUserId) {
    redirect(`/login?redirect=/courses/${slug}/learn`);
  }

  // 2. Query Course with Modules, Lessons, Videos, and Quizzes
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            include: {
              video: {
                select: {
                  thumbnailUrl: true,
                  duration: true,
                },
              },
              quiz: {
                include: {
                  questions: {
                    orderBy: { order: "asc" },
                    include: {
                      options: {
                        orderBy: { order: "asc" },
                      },
                    },
                  },
                },
              },
            },
          },
          quizzes: {
            include: {
              questions: {
                orderBy: { order: "asc" },
                include: {
                  options: {
                    orderBy: { order: "asc" },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  // 3. Verify Active Enrollment
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: prismaUserId,
        courseId: course.id,
      },
    },
  });

  if (!enrollment) {
    redirect(`/courses/${slug}?enroll=true`);
  }

  // 4. Fetch Completed Lessons for User
  const allLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id));
  const completedProgress = await prisma.lessonProgress.findMany({
    where: {
      userId: prismaUserId,
      lessonId: { in: allLessonIds },
      isCompleted: true,
    },
    select: { lessonId: true },
  });
  const completedLessonIds = completedProgress.map((p) => p.lessonId);

  // 5. Transform Modules & Lessons into Player Format
  const formattedModules: PlayerModule[] = course.modules.map((m) => {
    const lessons = m.lessons.map((l) => {
      // Map quiz if attached to lesson
      const lessonQuiz = l.quiz
        ? {
            id: l.quiz.id,
            title: l.quiz.title,
            passingPercentage: l.quiz.passingPercentage,
            questions: l.quiz.questions.map((q) => ({
              id: q.id,
              question: q.question,
              marks: q.marks,
              order: q.order,
              options: q.options.map((opt) => ({
                id: opt.id,
                optionText: opt.optionText,
                isCorrect: opt.isCorrect,
              })),
            })),
          }
        : null;

      return {
        id: l.id,
        moduleId: m.id,
        title: l.title,
        description: l.description,
        type: l.type,
        duration: l.duration ?? l.video?.duration ?? 300,
        order: l.order,
        videoThumbnail: l.video?.thumbnailUrl ?? course.thumbnail,
        quiz: lessonQuiz,
      };
    });

    // If module has a standalone module quiz (e.g. end-of-module assessment) but not in lessons, add as a lesson
    if (m.quizzes && m.quizzes.length > 0) {
      m.quizzes.forEach((mq) => {
        const quizAsLessonId = `quiz-${mq.id}`;
        lessons.push({
          id: quizAsLessonId,
          moduleId: m.id,
          title: `मूल्यांकन: ${mq.title}`,
          description: `इस मॉड्यूल के सभी महत्वपूर्ण विषयों पर आधारित स्व-मूल्यांकन।`,
          type: "QUIZ",
          duration: 600,
          order: 999,
          videoThumbnail: null,
          quiz: {
            id: mq.id,
            title: mq.title,
            passingPercentage: mq.passingPercentage,
            questions: mq.questions.map((q) => ({
              id: q.id,
              question: q.question,
              marks: q.marks,
              order: q.order,
              options: q.options.map((opt) => ({
                id: opt.id,
                optionText: opt.optionText,
                isCorrect: opt.isCorrect,
              })),
            })),
          },
        });
      });
    }

    return {
      id: m.id,
      order: m.order,
      title: m.title,
      description: m.description,
      lessons,
    };
  });

  return (
    <DedicatedLearningPlayer
      courseId={course.id}
      courseTitle={course.title}
      courseSlug={course.slug}
      courseCategory={course.level ? `${course.level} • उद्यमिता एवं आजीविका` : "उद्यमिता एवं आजीविका"}
      modules={formattedModules}
      initialLessonId={lessonId}
      enrollmentId={enrollment.id}
      completedLessonIds={completedLessonIds}
    />
  );
}
