import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandler, ApiResponse, ApiError } from "@/lib/api-response";

// PATCH /api/admin/courses/[id]/lessons/[lessonId] - Update lesson
export const PATCH = withErrorHandler(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string; lessonId: string }> }
  ) => {
    const { lessonId } = await params;
    const body = await req.json();

    const cleanVideoId = body.videoUrl ? String(body.videoUrl).trim() : "";

    // Check if video ID is already used by another lesson
    if (cleanVideoId) {
      const existingVideo = await prisma.video.findFirst({
        where: {
          vdoVideoId: cleanVideoId,
          lessonId: { not: lessonId },
        },
        include: { lesson: true },
      });

      if (existingVideo) {
        throw ApiError.conflict(
          `Video ID "${cleanVideoId}" पहले से पाठ "${existingVideo.lesson.title}" में उपयोग की जा चुकी है। कृपया एक अलग Video ID दर्ज करें।`,
          "DUPLICATE_VIDEO_ID",
          { existingLessonId: existingVideo.lessonId, videoId: cleanVideoId }
        );
      }
    }

    const lesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        ...(body.title !== undefined && { title: body.title.trim() }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.type !== undefined && { type: body.type }),
        ...(body.duration !== undefined && { duration: parseInt(body.duration) || 0 }),
        ...(body.isPreview !== undefined && { isPreview: Boolean(body.isPreview) }),
        ...(body.isPublished !== undefined && { isPublished: Boolean(body.isPublished) }),
        ...(body.order !== undefined && { order: parseInt(body.order) || 1 }),
      },
      include: {
        video: true,
      },
    });

    if (cleanVideoId) {
      await prisma.video.upsert({
        where: { lessonId },
        create: {
          lessonId,
          title: lesson.title,
          vdoVideoId: cleanVideoId,
          status: "READY",
        },
        update: {
          vdoVideoId: cleanVideoId,
        },
      });
    }

    return ApiResponse.success({ lesson }, "Lesson updated successfully");
  }
);

// DELETE /api/admin/courses/[id]/lessons/[lessonId] - Delete lesson
export const DELETE = withErrorHandler(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string; lessonId: string }> }
  ) => {
    const { lessonId } = await params;

    await prisma.lesson.delete({
      where: { id: lessonId },
    });

    return ApiResponse.success({ lessonId }, "Lesson deleted successfully");
  }
);
