import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/courses/[id]/lessons/[lessonId] - Update lesson
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; lessonId: string }> }
) {
  try {
    const { lessonId } = await params;
    const body = await req.json();

    const lesson = await prisma.lesson.update({
      where: { id: lessonId },
      data: {
        ...(body.title !== undefined && { title: body.title }),
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

    if (body.videoUrl) {
      await prisma.video.upsert({
        where: { lessonId },
        create: {
          lessonId,
          title: lesson.title,
          vdoVideoId: body.videoUrl,
          status: "READY",
        },
        update: {
          vdoVideoId: body.videoUrl,
        },
      });
    }

    return NextResponse.json({ success: true, lesson });
  } catch (error: any) {
    console.error("Error updating lesson:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update lesson" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/courses/[id]/lessons/[lessonId] - Delete lesson
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; lessonId: string }> }
) {
  try {
    const { lessonId } = await params;

    await prisma.lesson.delete({
      where: { id: lessonId },
    });

    return NextResponse.json({ success: true, message: "Lesson deleted" });
  } catch (error: any) {
    console.error("Error deleting lesson:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete lesson" },
      { status: 500 }
    );
  }
}
