import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { withErrorHandler, ApiResponse, ApiError } from "@/lib/api-response";

// POST /api/admin/courses/[id]/lessons - Add lesson to a module
export const POST = withErrorHandler(
  async (
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
  ) => {
    const body = await req.json();
    const { moduleId, title, description, type, duration, isPreview, isPublished, videoUrl } = body;

    if (!moduleId || !title?.trim()) {
      throw ApiError.badRequest("Module ID और पाठ (Lesson) का शीर्षक अनिवार्य है।");
    }

    const cleanVideoId = videoUrl ? String(videoUrl).trim() : "";

    // Proactively check if the video ID is already assigned to another lesson
    if (cleanVideoId) {
      const existingVideo = await prisma.video.findUnique({
        where: { vdoVideoId: cleanVideoId },
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

    const existingCount = await prisma.lesson.count({
      where: { moduleId },
    });

    const lesson = await prisma.lesson.create({
      data: {
        moduleId,
        title: title.trim(),
        description: description || null,
        type: type || "VIDEO",
        duration: duration ? parseInt(duration) : 300,
        isPreview: Boolean(isPreview),
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
        order: existingCount + 1,
        ...(cleanVideoId && {
          video: {
            create: {
              title: title.trim(),
              vdoVideoId: cleanVideoId,
              status: "READY",
            },
          },
        }),
      },
      include: {
        video: true,
      },
    });

    return ApiResponse.created({ lesson }, "Lesson added successfully");
  }
);
