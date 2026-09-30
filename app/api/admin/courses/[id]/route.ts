import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
