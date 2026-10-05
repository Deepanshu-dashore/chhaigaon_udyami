import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getModuleProgress } from "@/services/module-progress.service";
import { resolvePrismaUserId } from "@/services/user-profile.service";

/**
 * GET /api/modules/[id]/progress
 * Get the authenticated user's completion progress for a specific module.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: moduleId } = await params;
    const prismaUserId = await resolvePrismaUserId(currentUser.id);
    if (!prismaUserId) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const progress = await getModuleProgress(prismaUserId, moduleId);
    return NextResponse.json({ progress });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
