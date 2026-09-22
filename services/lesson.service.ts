import prisma from "@/lib/prisma";
import {
  CreateLessonDTO,
  UpdateLessonDTO,
  ReorderLessonsDTO,
  CreateVideoDTO,
  CreateMaterialDTO,
  UpdateVideoDTO,
  UpdateMaterialDTO,
} from "@/lib/dto";
import { LessonType, VideoStatus } from "@prisma/client";

/**
 * Get Lesson details by ID with Video, Material & Quiz
 */
export async function getLessonById(id: string) {
  return prisma.lesson.findUnique({
    where: { id },
    include: {
      module: {
        select: {
          id: true,
          title: true,
          courseId: true,
          course: { select: { id: true, title: true, slug: true } },
        },
      },
      video: true,
      material: true,
      quiz: true,
    },
  });
}

/**
 * Create a new Lesson
 */
export async function createLesson(data: CreateLessonDTO) {
  const { moduleId, title, description, type, order, duration, isPreview, isPublished } = data;

  let lessonOrder = order;
  if (lessonOrder === 0) {
    const lastLesson = await prisma.lesson.findFirst({
      where: { moduleId },
      orderBy: { order: "desc" },
    });
    lessonOrder = (lastLesson?.order ?? -1) + 1;
  }

  return prisma.lesson.create({
    data: {
      moduleId,
      title,
      description: description ?? null,
      type: (type as LessonType) || "VIDEO",
      order: lessonOrder,
      duration: duration ?? null,
      isPreview: isPreview ?? false,
      isPublished: isPublished ?? false,
    },
    include: {
      video: true,
      material: true,
    },
  });
}

/**
 * Update an existing Lesson
 */
export async function updateLesson(id: string, data: UpdateLessonDTO) {
  const existing = await prisma.lesson.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Lesson not found");
  }

  return prisma.lesson.update({
    where: { id },
    data: {
      ...(data.title !== undefined && { title: data.title }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.type !== undefined && { type: data.type as LessonType }),
      ...(data.order !== undefined && { order: data.order }),
      ...(data.duration !== undefined && { duration: data.duration }),
      ...(data.isPreview !== undefined && { isPreview: data.isPreview }),
      ...(data.isPublished !== undefined && { isPublished: data.isPublished }),
    },
    include: {
      video: true,
      material: true,
    },
  });
}

/**
 * Delete a Lesson
 */
export async function deleteLesson(id: string) {
  const existing = await prisma.lesson.findUnique({ where: { id } });
  if (!existing) {
    throw new Error("Lesson not found");
  }

  return prisma.lesson.delete({
    where: { id },
  });
}

/**
 * Reorder Lessons in a Module
 */
export async function reorderLessons(dto: ReorderLessonsDTO) {
  const transactions = dto.lessonOrders.map(({ id, order }) =>
    prisma.lesson.update({
      where: { id },
      data: { order },
    })
  );
  return prisma.$transaction(transactions);
}

/**
 * Attach or update Video media (VdoCipher) for a Lesson
 */
export async function attachVideoToLesson(
  lessonId: string,
  data: CreateVideoDTO | UpdateVideoDTO
) {
  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
  if (!lesson) {
    throw new Error("Lesson not found");
  }

  const videoRecord = await prisma.video.upsert({
    where: { lessonId },
    create: {
      lessonId,
      title: data.title || lesson.title,
      vdoVideoId: (data as CreateVideoDTO).vdoVideoId,
      duration: data.duration ?? null,
      thumbnailUrl: data.thumbnailUrl ?? null,
      status: (data.status as VideoStatus) || "PROCESSING",
      processingStatus: data.processingStatus ?? null,
    },
    update: {
      ...(data.title && { title: data.title }),
      ...(data.vdoVideoId && { vdoVideoId: data.vdoVideoId }),
      ...(data.duration !== undefined && { duration: data.duration }),
      ...(data.thumbnailUrl !== undefined && { thumbnailUrl: data.thumbnailUrl }),
      ...(data.status && { status: data.status as VideoStatus }),
      ...(data.processingStatus !== undefined && { processingStatus: data.processingStatus }),
    },
  });

  // Also sync duration on lesson if duration updated
  if (data.duration) {
    await prisma.lesson.update({
      where: { id: lessonId },
      data: { duration: data.duration },
    });
  }

  return videoRecord;
}

/**
 * Attach or update Material (PDF, documents) for a Lesson
 */
export async function attachMaterialToLesson(
  lessonId: string,
  data: CreateMaterialDTO | UpdateMaterialDTO
) {
  const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
  if (!lesson) {
    throw new Error("Lesson not found");
  }

  return prisma.material.upsert({
    where: { lessonId },
    create: {
      lessonId,
      title: data.title || lesson.title,
      fileUrl: (data as CreateMaterialDTO).fileUrl,
      fileType: (data as CreateMaterialDTO).fileType,
      fileSize: data.fileSize ?? null,
      isDownloadable: data.isDownloadable ?? true,
    },
    update: {
      ...(data.title && { title: data.title }),
      ...(data.fileUrl && { fileUrl: data.fileUrl }),
      ...(data.fileType && { fileType: data.fileType }),
      ...(data.fileSize !== undefined && { fileSize: data.fileSize }),
      ...(data.isDownloadable !== undefined && { isDownloadable: data.isDownloadable }),
    },
  });
}
