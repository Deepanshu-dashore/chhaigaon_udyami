import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, requireRole } from "@/lib/auth";
import { CreateCourseSchema, CourseFilterQuerySchema } from "@/lib/schemas/course.schema";
import { getFilteredCourses, createCourse } from "@/services/course.service";

/**
 * GET /api/courses
 * List published/filtered courses with pagination
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    const validation = CourseFilterQuerySchema.safeParse(queryParams);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid Query Parameters", details: validation.error.format() },
        { status: 400 }
      );
    }

    const result = await getFilteredCourses(validation.data);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * POST /api/courses
 * Create a new course (Requires ADMIN, SUPER_ADMIN, CONTENT_MANAGER, or TRAINER role)
 */
export async function POST(req: NextRequest) {
  try {
    const currentUser = await requireRole([
      "ADMIN",
      "SUPER_ADMIN",
      "CONTENT_MANAGER",
      "TRAINER",
    ]);

    const body = await req.json();
    const payload = {
      ...body,
      createdById: body.createdById || currentUser.id,
    };

    const validation = CreateCourseSchema.safeParse(payload);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation Failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const course = await createCourse(validation.data);
    return NextResponse.json({ course }, { status: 201 });
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
