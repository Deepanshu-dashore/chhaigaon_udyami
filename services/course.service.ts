import prisma from "@/lib/prisma";
import {
  CreateCourseDTO,
  UpdateCourseDTO,
  CourseFilterQueryDTO,
  CreateCourseModuleDTO,
  UpdateCourseModuleDTO,
  ReorderModulesDTO,
} from "@/lib/dto";
import { CourseStatus } from "@prisma/client";

/**
 * Get list of published courses (unpaginated array for server components)
 */
export async function getPublishedCourses() {
  return prisma.course.findMany({
    where: { status: "PUBLISHED" },
    include: {
      createdBy: {
        select: { id: true, name: true, email: true },
      },
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            select: {
              id: true,
              title: true,
              duration: true,
              isPreview: true,
              order: true,
              type: true,
              isPublished: true,
            },
            orderBy: { order: "asc" },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

/**
 * Get list of published/filtered courses with pagination (for API routes)
 */
export async function getFilteredCourses(filters?: CourseFilterQueryDTO) {
  const page = filters?.page || 1;
  const limit = filters?.limit || 10;
  const skip = (page - 1) * limit;

  const whereCondition: Record<string, unknown> = {
    status: (filters?.status as CourseStatus) || "PUBLISHED",
  };

  if (filters?.search) {
    whereCondition.OR = [
      { title: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  if (filters?.isPaid !== undefined) {
    whereCondition.isPaid = filters.isPaid;
  }

  if (filters?.level) {
    whereCondition.level = filters.level;
  }

  if (filters?.language) {
    whereCondition.language = filters.language;
  }

  const [total, courses] = await Promise.all([
    prisma.course.count({ where: whereCondition }),
    prisma.course.findMany({
      where: whereCondition,
      include: {
        createdBy: {
          select: { id: true, name: true, email: true },
        },
        modules: {
          orderBy: { order: "asc" },
          include: {
            lessons: {
              select: {
                id: true,
                title: true,
                duration: true,
                isPreview: true,
                order: true,
                type: true,
                isPublished: true,
              },
              orderBy: { order: "asc" },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
  ]);

  return {
    courses,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Get Course details by Slug
 */
export async function getCourseBySlug(slug: string, userId?: string) {
  return prisma.course.findUnique({
    where: { slug },
    include: {
      createdBy: {
        select: { id: true, name: true, email: true },
      },
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            include: {
              video: true,
              material: true,
              quiz: {
                select: {
                  id: true,
                  title: true,
                  passingPercentage: true,
                  timeLimit: true,
                },
              },
              ...(userId
                ? {
                    progress: {
                      where: { userId },
                    },
                  }
                : {}),
            },
          },
        },
      },
      _count: {
        select: { enrollments: true },
      },
    },
  });
}

/**
 * Get Course details by ID
 */
export async function getCourseById(id: string) {
  return prisma.course.findUnique({
    where: { id },
    include: {
      createdBy: { select: { id: true, name: true, email: true } },
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            include: {
              video: true,
              material: true,
              quiz: true,
            },
          },
        },
      },
    },
  });
}

/**
 * Create a new Course
 */
export async function createCourse(data: CreateCourseDTO) {
  const generatedSlug =
    data.slug ||
    data.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  // Ensure unique slug
  let slug = generatedSlug;
  let counter = 1;
  while (await prisma.course.findUnique({ where: { slug } })) {
    slug = `${generatedSlug}-${counter}`;
    counter++;
  }

  return prisma.course.create({
    data: {
      title: data.title,
      slug,
      description: data.description ?? null,
      thumbnail: data.thumbnail ?? null,
      language: data.language || "hi",
      price: data.price ? Number(data.price) : 0,
      isPaid: data.isPaid ?? false,
      level: data.level || "BEGINNER",
      duration: data.duration ?? null,
      status: (data.status as CourseStatus) || "DRAFT",
      createdById: data.createdById,
      publishedAt: data.status === "PUBLISHED" ? new Date() : data.publishedAt ?? null,
    },
  });
}

/**
 * Update an existing Course
 */
export async function updateCourse(id: string, data: UpdateCourseDTO) {
  const existing = await prisma.course.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Course not found");
  }

  const updateData: Record<string, unknown> = {};

  if (data.title !== undefined) updateData.title = data.title;
  if (data.slug !== undefined) updateData.slug = data.slug;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.thumbnail !== undefined) updateData.thumbnail = data.thumbnail;
  if (data.language !== undefined) updateData.language = data.language;
  if (data.price !== undefined) updateData.price = Number(data.price);
  if (data.isPaid !== undefined) updateData.isPaid = data.isPaid;
  if (data.level !== undefined) updateData.level = data.level;
  if (data.duration !== undefined) updateData.duration = data.duration;
  if (data.status !== undefined) {
    updateData.status = data.status as CourseStatus;
    if (data.status === "PUBLISHED" && !existing.publishedAt) {
      updateData.publishedAt = new Date();
    }
  }

  return prisma.course.update({
    where: { id },
    data: updateData,
  });
}

/**
 * Delete a Course
 */
export async function deleteCourse(id: string) {
  const existing = await prisma.course.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Course not found");
  }

  return prisma.course.delete({
    where: { id },
  });
}

/**
 * Create a Module in a Course
 */
export async function createModule(data: CreateCourseModuleDTO) {
  const { courseId, title, description, order } = data;

  let moduleOrder = order;
  if (moduleOrder === 0) {
    const lastModule = await prisma.courseModule.findFirst({
      where: { courseId },
      orderBy: { order: "desc" },
    });
    moduleOrder = (lastModule?.order ?? -1) + 1;
  }

  return prisma.courseModule.create({
    data: {
      courseId,
      title,
      description: description ?? null,
      order: moduleOrder,
    },
  });
}

/**
 * Update a Course Module
 */
export async function updateModule(id: string, data: UpdateCourseModuleDTO) {
  return prisma.courseModule.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.order !== undefined && { order: data.order }),
    },
  });
}

/**
 * Reorder Course Modules
 */
export async function reorderModules(dto: ReorderModulesDTO) {
  const transactions = dto.moduleOrders.map(({ id, order }) =>
    prisma.courseModule.update({
      where: { id },
      data: { order },
    })
  );
  return prisma.$transaction(transactions);
}
