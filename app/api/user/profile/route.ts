import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, requireAuth } from "@/lib/auth";
import { UpdateUserProfileSchema } from "@/lib/schemas/user.schema";
import { getUserProfile, upsertUserProfile } from "@/services/user-profile.service";

/**
 * GET /api/user/profile
 * Get authenticated user's profile
 */
export async function GET() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const profile = await getUserProfile(currentUser.id);
    return NextResponse.json({ profile });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * PUT /api/user/profile
 * Update/create profile for authenticated user
 */
export async function PUT(req: NextRequest) {
  try {
    const currentUser = await requireAuth();
    const body = await req.json();

    const validation = UpdateUserProfileSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation Failed", details: validation.error.format() },
        { status: 400 }
      );
    }

    const profile = await upsertUserProfile(currentUser.id, validation.data);
    return NextResponse.json({ profile });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    const status = message.includes("Unauthorized") ? 401 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
