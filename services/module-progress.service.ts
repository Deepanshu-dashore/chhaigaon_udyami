import prisma from "@/lib/prisma";
import { autoIssueCertificate } from "./certificate.service";

/**
 * Check if all lessons in a module are complete for a user.
 * If yes, upsert CourseModuleProgress.isCompleted = true.
 * Then check if all modules in the course are complete → trigger certificate check.
 */
export async function checkAndCompleteModule(
  userId: string,
  moduleId: string,
  enrollmentId: string
): Promise<{ moduleCompleted: boolean; courseCompleted: boolean }> {
  // Count total published lessons in this module
  const totalLessons = await prisma.lesson.count({
    where: { moduleId, isPublished: true },
  });

  if (totalLessons === 0) {
    return { moduleCompleted: false, courseCompleted: false };
  }

  // Count lessons the user has completed in this module
  const completedLessons = await prisma.lessonProgress.count({
    where: {
      userId,
      isCompleted: true,
      lesson: { moduleId },
    },
  });

  const moduleCompleted = completedLessons >= totalLessons;

  // Upsert the module progress record
  await prisma.courseModuleProgress.upsert({
    where: { userId_moduleId: { userId, moduleId } },
    create: {
      userId,
      moduleId,
      enrollmentId,
      isCompleted: moduleCompleted,
      completedAt: moduleCompleted ? new Date() : null,
    },
    update: {
      isCompleted: moduleCompleted,
      ...(moduleCompleted ? { completedAt: new Date() } : {}),
    },
  });

  if (!moduleCompleted) {
    return { moduleCompleted: false, courseCompleted: false };
  }

  // Check if ALL modules in the course are now complete
  const module = await prisma.courseModule.findUnique({
    where: { id: moduleId },
    select: { courseId: true },
  });

  if (!module) return { moduleCompleted: true, courseCompleted: false };

  const totalModules = await prisma.courseModule.count({
    where: { courseId: module.courseId },
  });

  const completedModules = await prisma.courseModuleProgress.count({
    where: {
      userId,
      isCompleted: true,
      module: { courseId: module.courseId },
    },
  });

  const courseCompleted = completedModules >= totalModules;

  if (courseCompleted) {
    // Mark enrollment as COMPLETED
    await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: { status: "COMPLETED", completedAt: new Date() },
    });

    // Auto-issue certificate (only if all module quizzes are passed)
    await autoIssueCertificate(userId, module.courseId, enrollmentId);
  }

  return { moduleCompleted: true, courseCompleted };
}

/**
 * Get CourseModuleProgress for a user on a specific module
 */
export async function getModuleProgress(userId: string, moduleId: string) {
  return prisma.courseModuleProgress.findUnique({
    where: { userId_moduleId: { userId, moduleId } },
  });
}

/**
 * Get progress across all modules of a course for a user
 */
export async function getCourseModulesProgress(userId: string, courseId: string) {
  const modules = await prisma.courseModule.findMany({
    where: { courseId },
    orderBy: { order: "asc" },
    select: { id: true, title: true, order: true },
  });

  const progressRecords = await prisma.courseModuleProgress.findMany({
    where: {
      userId,
      moduleId: { in: modules.map((m) => m.id) },
    },
  });

  const progressMap = new Map(progressRecords.map((p) => [p.moduleId, p]));

  return modules.map((m) => ({
    ...m,
    progress: progressMap.get(m.id) ?? null,
  }));
}
