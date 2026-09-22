import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, requireAuth } from "@/lib/auth";
import { UpdateLessonProgressSchema } from "@/lib/schemas/enrollment.schema";
import {
  getLessonProgress,
  updateLessonProgress,
  getCourseOverallProgress,
} from "@/services/lesson-progress.service";

/**
 * GET /api/progress
 * Get lesson progress or course overall progress for the authenticated user
 */
export async function GET(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const lessonId = searchParams.get("lessonId");
    const courseId = searchParams.get("courseId");

    if (lessonId) {
      const progress = await getLessonProgress(currentUser.id, lessonId);
      return NextResponse.json({ progress });
    }

    if (courseId) {
      const courseProgress = await getCourseOverallProgress(currentUser.id, courseId);
      return NextResponse.json({ courseProgress });
    }

    return NextResponse.json(
      { error: "Either lessonId or courseId is required" },
      { status: 400 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * POST /api/progress
 * Record/Update lesson progress position, watched time, and completion
 */
export async function POST(req: NextRequest) {
  try {
    const currentUser = await requireAuth();
    const body = await req.json();

    const payload = {
      ...body,
      userId: body.userId || currentUser.id,
    };

    const validation = UpdateLessonProgressSchema.safeParse(payload);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation Failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const progress = await updateLessonProgress(validation.data);
    return NextResponse.json({ progress });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const status = message.includes("Unauthorized") ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
