import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/admin/courses/[id]/lessons - Add lesson to a module
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await req.json();
    const { moduleId, title, description, type, duration, isPreview, isPublished, videoUrl } = body;

    if (!moduleId || !title) {
      return NextResponse.json(
        { error: "Module ID and Lesson title are required" },
        { status: 400 }
      );
    }

    const existingCount = await prisma.lesson.count({
      where: { moduleId },
    });

    const lesson = await prisma.lesson.create({
      data: {
        moduleId,
        title,
        description: description || null,
        type: type || "VIDEO",
        duration: duration ? parseInt(duration) : 300,
        isPreview: Boolean(isPreview),
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
        order: existingCount + 1,
        ...(videoUrl && {
          video: {
            create: {
              title,
              vdoVideoId: videoUrl,
              status: "READY",
            },
          },
        }),
      },
      include: {
        video: true,
      },
    });

    return NextResponse.json({ success: true, lesson }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating lesson:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create lesson" },
      { status: 500 }
    );
  }
}
