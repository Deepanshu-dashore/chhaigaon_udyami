import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const status = searchParams.get("status") || "ALL";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10", 10));
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (status !== "ALL") {
      whereClause.status = status;
    }

    if (search) {
      whereClause.OR = [
        { user: { name: { contains: search, mode: "insensitive" } } },
        { user: { email: { contains: search, mode: "insensitive" } } },
        { course: { title: { contains: search, mode: "insensitive" } } },
      ];
    }

    const [enrollments, total] = await Promise.all([
      prisma.enrollment.findMany({
        where: whereClause,
        skip,
        take: limit,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              mobile: true,
              role: true,
            },
          },
          course: {
            select: {
              id: true,
              title: true,
              slug: true,
              price: true,
            },
          },
        },
        orderBy: { enrolledAt: "desc" },
      }),
      prisma.enrollment.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      success: true,
      data: enrollments,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("GET /api/admin/enrollments error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch enrollments" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { userId, courseId, status = "ACTIVE" } = body;

    if (!userId || !courseId) {
      return NextResponse.json(
        { error: "User ID and Course ID are required" },
        { status: 400 }
      );
    }

    // Check if enrollment already exists
    const existing = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "User is already enrolled in this course" },
        { status: 400 }
      );
    }

    const enrollment = await prisma.enrollment.create({
      data: {
        userId,
        courseId,
        status,
        enrolledAt: new Date(),
        startedAt: new Date(),
      },
      include: {
        user: { select: { name: true, email: true } },
        course: { select: { title: true } },
      },
    });

    return NextResponse.json({ success: true, data: enrollment });
  } catch (error: any) {
    console.error("POST /api/admin/enrollments error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create enrollment" },
      { status: 500 }
    );
  }
}
