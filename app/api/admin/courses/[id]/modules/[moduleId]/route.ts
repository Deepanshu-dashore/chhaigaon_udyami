import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/courses/[id]/modules/[moduleId] - Update module
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; moduleId: string }> }
) {
  try {
    const { moduleId } = await params;
    const body = await req.json();

    const updated = await prisma.courseModule.update({
      where: { id: moduleId },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.order !== undefined && { order: parseInt(body.order) || 1 }),
      },
    });

    return NextResponse.json({ success: true, module: updated });
  } catch (error: any) {
    console.error("Error updating course module:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update module" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/courses/[id]/modules/[moduleId] - Delete module
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; moduleId: string }> }
) {
  try {
    const { moduleId } = await params;

    await prisma.courseModule.delete({
      where: { id: moduleId },
    });

    return NextResponse.json({ success: true, message: "Module deleted" });
  } catch (error: any) {
    console.error("Error deleting course module:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete module" },
      { status: 500 }
    );
  }
}
