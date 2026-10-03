import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/courses/[id] - Fetch single course with modules & lessons
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: { id: true, name: true, email: true },
        },
        modules: {
          orderBy: { order: "asc" },
          include: {
            lessons: {
              orderBy: { order: "asc" },
              include: {
                video: true,
              },
            },
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, course });
  } catch (error: any) {
    console.error("Error fetching course detail:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch course details" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/courses/[id] - Update course details or status
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.slug !== undefined && {
          slug: body.slug.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        }),
        ...(body.status !== undefined && { status: body.status }),
        ...(body.price !== undefined && {
          price: parseFloat(body.price) || 0,
          isPaid: parseFloat(body.price) > 0,
        }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.thumbnail !== undefined && { thumbnail: body.thumbnail }),
        ...(body.level !== undefined && { level: body.level }),
        ...(body.duration !== undefined && { duration: parseInt(body.duration) || 0 }),
      },
    });

    return NextResponse.json({ success: true, course: updatedCourse });
  } catch (error: any) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update course" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/courses/[id] - Delete course
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.course.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Course deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete course" },
      { status: 500 }
    );
  }
}
