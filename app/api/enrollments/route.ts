import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, requireAuth } from "@/lib/auth";
import { CreateEnrollmentSchema, EnrollmentFilterQuerySchema } from "@/lib/schemas/enrollment.schema";
import { enrollUserInCourse, getUserEnrollments } from "@/services/enrollment.service";

/**
 * GET /api/enrollments
 * Fetch enrollments for the authenticated user or specified user
 */
export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    const { searchParams } = new URL(req.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    const validation = EnrollmentFilterQuerySchema.safeParse(queryParams);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid Query Parameters", details: validation.error.format() },
        { status: 400 }
      );
    }

    const targetUserId = validation.data.userId || currentUser?.id;
    if (!targetUserId) {
      return NextResponse.json(
        { error: "Unauthorized or userId required" },
        { status: 401 }
      );
    }

    const result = await getUserEnrollments(targetUserId, validation.data);
    return NextResponse.json(result);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * POST /api/enrollments
 * Enroll current authenticated user in a course
 */
export async function POST(req: NextRequest) {
  try {
    const currentUser = await requireAuth();
    const body = await req.json();

    const payload = {
      ...body,
      userId: body.userId || currentUser.id,
    };

    const validation = CreateEnrollmentSchema.safeParse(payload);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation Failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const enrollment = await enrollUserInCourse(
      validation.data.userId,
      validation.data.courseId
    );
    return NextResponse.json({ enrollment }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const status = message.includes("Unauthorized") ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
