import prisma from "@/lib/prisma";
import { resolvePrismaUserId } from "./user-profile.service";
import { checkAndCompleteEnrollment } from "./enrollment.service";
import { UpdateLessonProgressDTO } from "@/lib/dto";

/**
 * Get progress of a specific lesson for a user
 */
export async function getLessonProgress(
  userIdOrSupabaseId: string,
  lessonId: string
) {
  const prismaUserId = await resolvePrismaUserId(userIdOrSupabaseId);
  if (!prismaUserId) return null;

  return prisma.lessonProgress.findUnique({
    where: {
      userId_lessonId: {
        userId: prismaUserId,
        lessonId,
      },
    },
  });
}

/**
 * Update lesson progress (percentage, watched seconds, timestamp position, completion)
 */
export async function updateLessonProgress(data: UpdateLessonProgressDTO) {
  const prismaUserId = await resolvePrismaUserId(data.userId);
  if (!prismaUserId) {
    throw new Error("User not found");
  }

  const lesson = await prisma.lesson.findUnique({
    where: { id: data.lessonId },
    include: { module: { select: { courseId: true } } },
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  // Calculate completion status (auto mark true if progressPercent >= 90)
  const isCompleted = data.isCompleted || data.progressPercent >= 90;
  const completedAt = isCompleted
    ? data.completedAt || new Date()
    : null;

  const progress = await prisma.lessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId: prismaUserId,
        lessonId: data.lessonId,
      },
    },
    create: {
      userId: prismaUserId,
      lessonId: data.lessonId,
      progressPercent: Math.min(100, Math.max(0, data.progressPercent)),
      watchedSeconds: data.watchedSeconds || 0,
      lastPosition: data.lastPosition || 0,
      isCompleted,
      completedAt,
    },
    update: {
      progressPercent: Math.min(100, Math.max(0, data.progressPercent)),
      watchedSeconds: data.watchedSeconds || 0,
      lastPosition: data.lastPosition || 0,
      isCompleted,
      ...(completedAt && { completedAt }),
    },
  });

  // Check if updating this lesson completed the entire course
  if (isCompleted && lesson.module.courseId) {
    await checkAndCompleteEnrollment(prismaUserId, lesson.module.courseId);
  }

  return progress;
}

/**
 * Calculate overall progress % of a course for a user
 */
export async function getCourseOverallProgress(
  userIdOrSupabaseId: string,
  courseId: string
) {
  const prismaUserId = await resolvePrismaUserId(userIdOrSupabaseId);
  if (!prismaUserId) return { completedLessons: 0, totalLessons: 0, progressPercent: 0 };

  const totalLessons = await prisma.lesson.count({
    where: {
      module: { courseId },
      isPublished: true,
    },
  });

  if (totalLessons === 0) {
    return { completedLessons: 0, totalLessons: 0, progressPercent: 0 };
  }

  const completedLessons = await prisma.lessonProgress.count({
    where: {
      userId: prismaUserId,
      isCompleted: true,
      lesson: { module: { courseId } },
    },
  });

  const progressPercent = Math.round((completedLessons / totalLessons) * 100);

  return {
    completedLessons,
    totalLessons,
    progressPercent,
  };
}
