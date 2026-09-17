import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { recordAuthActivity, extractClientMetadata } from "@/lib/auth-tracker";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (authUser) {
      // Find Prisma user
      const dbUser = await prisma.user.findFirst({
        where: {
          OR: [
            { supabaseUserId: authUser.id },
            ...(authUser.email ? [{ email: authUser.email }] : []),
          ],
        },
      });

      if (dbUser) {
        const { ipAddress, userAgent, deviceInfo } = extractClientMetadata(request);
        await recordAuthActivity({
          userId: dbUser.id,
          action: "LOGOUT",
          ipAddress,
          userAgent,
          deviceInfo,
          provider: authUser.app_metadata?.provider || "email",
        });
      }

      await supabase.auth.signOut();
    }

    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch (err: unknown) {
    console.error("Logout API error:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}
