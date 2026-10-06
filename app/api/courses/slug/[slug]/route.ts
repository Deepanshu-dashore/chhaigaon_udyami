import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { resolvePrismaUserId } from "@/services/user-profile.service";
import { getCourseBySlug } from "@/services/course.service";
import prisma from "@/lib/prisma";

/**
 * GET /api/courses/slug/[slug]
 * Fetch complete course details by its slug, including modules, lessons, quizzes,
 * and current user enrollment status.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Course slug is required" },
        { status: 400 }
      );
    }

    // Resolve authenticated user if present
    const currentUser = await getCurrentUser();
    let prismaUserId: string | null = null;
    if (currentUser?.id) {
      prismaUserId = await resolvePrismaUserId(currentUser.id);
    }

    // 1. Fetch from Database
    const course = await getCourseBySlug(slug, prismaUserId || undefined);

    let isEnrolled = false;
    if (course && prismaUserId) {
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: prismaUserId,
            courseId: course.id,
          },
        },
        select: { status: true },
      });
      isEnrolled = enrollment?.status === "ACTIVE" || enrollment?.status === "COMPLETED";
    }

    if (!course) {
      return NextResponse.json(
        { success: false, error: `Course with slug '${slug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      course,
      isEnrolled,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error(`[API /api/courses/slug] Error:`, error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
