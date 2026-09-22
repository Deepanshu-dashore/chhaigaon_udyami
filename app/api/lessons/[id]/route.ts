import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, requireRole } from "@/lib/auth";
import { UpdateLessonSchema } from "@/lib/schemas/course.schema";
import { getLessonById, updateLesson, deleteLesson } from "@/services/lesson.service";

/**
 * GET /api/lessons/[id]
 * Fetch lesson details with video & material
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const lesson = await getLessonById(id);

    if (!lesson) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    return NextResponse.json({ lesson });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * PUT /api/lessons/[id]
 * Update lesson details
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN", "CONTENT_MANAGER", "TRAINER"]);
    const { id } = await params;
    const body = await req.json();

    const validation = UpdateLessonSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation Failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const updated = await updateLesson(id, validation.data);
    return NextResponse.json({ lesson: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const status = message.includes("Unauthorized")
      ? 401
      : message.includes("Forbidden")
      ? 403
      : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

/**
 * DELETE /api/lessons/[id]
 * Delete a lesson
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN", "CONTENT_MANAGER"]);
    const { id } = await params;

    await deleteLesson(id);
    return NextResponse.json({ message: "Lesson deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const status = message.includes("Unauthorized")
      ? 401
      : message.includes("Forbidden")
      ? 403
      : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
