import { NextRequest, NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";
import { CreateMaterialSchema } from "@/lib/schemas/media.schema";
import { attachMaterialToLesson } from "@/services/lesson.service";

/**
 * POST /api/lessons/[id]/material
 * Attach or update downloadable study material (PDF, doc link) for a lesson
 */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN", "CONTENT_MANAGER", "TRAINER"]);
    const { id } = await params;
    const body = await req.json();

    const payload = {
      ...body,
      lessonId: id,
    };

    const validation = CreateMaterialSchema.safeParse(payload);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation Failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const material = await attachMaterialToLesson(id, validation.data);
    return NextResponse.json({ material }, { status: 201 });
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
