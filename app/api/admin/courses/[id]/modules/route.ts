import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/admin/courses/[id]/modules - Create new module in a course
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: courseId } = await params;
    const body = await req.json();
    const { title, description } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Module title is required" },
        { status: 400 }
      );
    }

    // Get current module count to determine order
    const existingCount = await prisma.courseModule.count({
      where: { courseId },
    });

    const moduleItem = await prisma.courseModule.create({
      data: {
        courseId,
        title,
        description: description || null,
        order: existingCount + 1,
      },
      include: {
        lessons: true,
      },
    });

    return NextResponse.json({ success: true, module: moduleItem }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating course module:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create module" },
      { status: 500 }
    );
  }
}
