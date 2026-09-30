import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/courses - Fetch all courses for management dashboard
export async function GET(req: NextRequest) {
  try {
    const courses = await prisma.course.findMany({
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
    });

    return NextResponse.json({ success: true, courses });
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
