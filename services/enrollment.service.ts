import prisma from "@/lib/prisma";
import { resolvePrismaUserId } from "./user-profile.service";
import { EnrollmentStatus } from "@prisma/client";
import { EnrollmentFilterQueryDTO } from "@/lib/dto";

/**
 * Enroll a user into a Course
 */
export async function enrollUserInCourse(
  userIdOrSupabaseId: string,
  courseId: string
) {
  const prismaUserId = await resolvePrismaUserId(userIdOrSupabaseId);
  if (!prismaUserId) {
    throw new Error("User not found");
  }

  const course = await prisma.course.findUnique({ where: { id: courseId } });
  if (!course) {
    throw new Error("Course not found");
  }

  if (course.status !== "PUBLISHED") {
    throw new Error("Cannot enroll in a non-published course");
  }

  // Check if enrollment already exists
  const existingEnrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: prismaUserId,
        courseId,
      },
    },
  });

  if (existingEnrollment) {
    if (existingEnrollment.status === "ACTIVE") {
      return existingEnrollment; // Already actively enrolled
    }
    // Re-activate existing enrollment if it was cancelled or pending
    return prisma.enrollment.update({
      where: { id: existingEnrollment.id },
      data: {
        status: "ACTIVE",
        startedAt: existingEnrollment.startedAt || new Date(),
      },
    });
  }

  return prisma.enrollment.create({
    data: {
      userId: prismaUserId,
      courseId,
      status: "ACTIVE",
      startedAt: new Date(),
    },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
          thumbnail: true,
        },
      },
    },
  });
}

/**
 * Get all enrollments for a user with course details
 */
export async function getUserEnrollments(
  userIdOrSupabaseId: string,
  filters?: EnrollmentFilterQueryDTO
) {
  const prismaUserId = await resolvePrismaUserId(userIdOrSupabaseId);
  if (!prismaUserId) {
    throw new Error("User not found");
  }

  const page = filters?.page || 1;
  const limit = filters?.limit || 10;
  const skip = (page - 1) * limit;

  const whereCondition: Record<string, unknown> = {
    userId: prismaUserId,
  };

  if (filters?.status) {
    whereCondition.status = filters.status as EnrollmentStatus;
  }

  const [total, enrollments] = await Promise.all([
    prisma.enrollment.count({ where: whereCondition }),
    prisma.enrollment.findMany({
      where: whereCondition,
      include: {
        course: {
          include: {
            modules: {
              select: {
                id: true,
                _count: { select: { lessons: true } },
              },
            },
          },
        },
      },
      orderBy: { enrolledAt: "desc" },
      skip,
      take: limit,
    }),
  ]);

  return {
    enrollments,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Check if user is enrolled in a course
 */
export async function getEnrollmentStatus(
  userIdOrSupabaseId: string,
  courseId: string
) {
  const prismaUserId = await resolvePrismaUserId(userIdOrSupabaseId);
  if (!prismaUserId) return null;

  return prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: prismaUserId,
        courseId,
      },
    },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          slug: true,
        },
      },
    },
  });
}

/**
 * Update Enrollment status
 */
export async function updateEnrollmentStatus(
  enrollmentId: string,
  status: EnrollmentStatus,
  completedAt?: Date | null
) {
  return prisma.enrollment.update({
    where: { id: enrollmentId },
    data: {
      status,
      ...(status === "COMPLETED"
        ? { completedAt: completedAt || new Date() }
        : {}),
    },
  });
}

/**
 * Check overall progress and automatically mark enrollment COMPLETED if all lessons are completed
 */
export async function checkAndCompleteEnrollment(
  userIdOrSupabaseId: string,
  courseId: string
) {
  const prismaUserId = await resolvePrismaUserId(userIdOrSupabaseId);
  if (!prismaUserId) return null;

  // Count total published lessons in course
  const totalLessons = await prisma.lesson.count({
    where: {
      module: { courseId },
      isPublished: true,
    },
  });

  if (totalLessons === 0) return null;

  // Count completed lessons for user in this course
  const completedLessons = await prisma.lessonProgress.count({
    where: {
      userId: prismaUserId,
      isCompleted: true,
      lesson: {
        module: { courseId },
      },
    },
  });

  if (completedLessons >= totalLessons) {
    const enrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: prismaUserId,
          courseId,
        },
      },
    });

    if (enrollment && enrollment.status !== "COMPLETED") {
      return prisma.enrollment.update({
        where: { id: enrollment.id },
        data: {
          status: "COMPLETED",
          completedAt: new Date(),
        },
      });
    }
  }

  return null;
}
