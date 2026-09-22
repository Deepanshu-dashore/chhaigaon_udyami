import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, requireRole } from "@/lib/auth";
import { UpdateCourseSchema } from "@/lib/schemas/course.schema";
import {
  getCourseById,
  getCourseBySlug,
  updateCourse,
  deleteCourse,
} from "@/services/course.service";

/**
 * GET /api/courses/[id]
 * Fetch course details by ID or Slug
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const currentUser = await getCurrentUser();

    // Try finding by ID first, then fallback to Slug
    let course = await getCourseById(id);
    if (!course) {
      course = await getCourseBySlug(id, currentUser?.id);
    }

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ course });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * PUT /api/courses/[id]
 * Update course details
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN", "CONTENT_MANAGER", "TRAINER"]);
    const { id } = await params;
    const body = await req.json();

    const validation = UpdateCourseSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation Failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const updated = await updateCourse(id, validation.data);
    return NextResponse.json({ course: updated });
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
 * DELETE /api/courses/[id]
 * Delete a course
 */
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireRole(["ADMIN", "SUPER_ADMIN"]);
    const { id } = await params;

    await deleteCourse(id);
    return NextResponse.json({ message: "Course deleted successfully" });
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
