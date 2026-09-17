import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { UpdateUserSchema } from "@/lib/schemas/user.schema";

export const dynamic = "force-dynamic";

// GET /api/admin/users/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
        enrollments: {
          include: {
            course: { select: { title: true } },
          },
        },
        certificates: true,
        activityLogs: {
          take: 10,
          orderBy: { timestamp: "desc" },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "उपयोगकर्ता नहीं मिला" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/users/[id] - Update user details, role, status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const validated = UpdateUserSchema.parse(body);

    const updated = await prisma.user.update({
      where: { id },
      data: {
        ...(validated.name && { name: validated.name }),
        ...(validated.email !== undefined && { email: validated.email }),
        ...(validated.mobile !== undefined && { mobile: validated.mobile }),
        ...(validated.role && { role: validated.role }),
        ...(validated.status && { status: validated.status }),
        ...(validated.isVerified !== undefined && { isVerified: validated.isVerified }),
      },
      include: {
        profile: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "उपयोगकर्ता विवरण सफलतापूर्वक अपडेट किया गया!",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "अपडेट विफल रहा" },
      { status: 400 }
    );
  }
}

// DELETE /api/admin/users/[id] - Remove user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Delete related records safely (or CASCADE via schema)
    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "उपयोगकर्ता सफलतापूर्वक हटा दिया गया!",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "हटाने में विफल" },
      { status: 400 }
    );
  }
}
