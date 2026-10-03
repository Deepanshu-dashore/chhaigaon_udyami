import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/courses - Fetch courses with pagination & search
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() || "";
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "10", 10));
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [courses, total] = await Promise.all([
      prisma.course.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          createdBy: {
            select: { id: true, name: true, email: true },
          },
          _count: {
            select: {
              modules: true,
              enrollments: true,
              certificates: true,
            },
          },
        },
      }),
      prisma.course.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      courses,
      data: courses,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Error fetching admin courses:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

// POST /api/admin/courses - Create new course
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, slug, description, thumbnail, price, level, duration, status } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    // Get default admin creator
    let admin = await prisma.user.findFirst({
      where: { role: { in: ["SUPER_ADMIN", "ADMIN"] } },
    });

    if (!admin) {
      admin = await prisma.user.findFirst();
    }

    if (!admin) {
      return NextResponse.json(
        { error: "No admin user found to assign course creation" },
        { status: 400 }
      );
    }

    const course = await prisma.course.create({
      data: {
        title,
        slug: slug.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        description,
        thumbnail: thumbnail || "/images/placeholder-course.jpg",
        price: parseFloat(price) || 0,
        isPaid: parseFloat(price) > 0,
        level: level || "BEGINNER",
        duration: parseInt(duration) || 60,
        status: status || "DRAFT",
        createdById: admin.id,
      },
    });

    return NextResponse.json({ success: true, course }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create course" },
      { status: 500 }
    );
  }
}
