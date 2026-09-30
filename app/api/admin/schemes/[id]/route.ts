import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/schemes/[id] - Update scheme
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updatedScheme = await prisma.governmentScheme.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.department !== undefined && { department: body.department }),
        ...(body.description !== undefined && { description: body.description }),
        ...(body.benefits !== undefined && { benefits: body.benefits }),
        ...(body.eligibility !== undefined && { eligibility: body.eligibility }),
        ...(body.officialUrl !== undefined && { officialUrl: body.officialUrl }),
        ...(body.status !== undefined && { status: body.status }),
      },
    });

    return NextResponse.json({ success: true, scheme: updatedScheme });
  } catch (error: any) {
    console.error("Error updating scheme:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update scheme" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/schemes/[id] - Delete scheme
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.governmentScheme.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Scheme deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting scheme:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete scheme" },
      { status: 500 }
    );
  }
}
