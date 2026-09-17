import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { recordAuthActivity, extractClientMetadata } from "@/lib/auth-tracker";

async function performLogout(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();

    if (authUser) {
      // Find matching DB user
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
  } catch (err) {
    console.error("Logout error in /auth/logout:", err);
  }
}

export async function GET(request: Request) {
  await performLogout(request);
  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/login?logged_out=true`);
}

export async function POST(request: Request) {
  await performLogout(request);
  const acceptHeader = request.headers.get("accept") || "";
  if (acceptHeader.includes("application/json")) {
    return NextResponse.json({ success: true, message: "Logged out successfully" });
  }
  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/login?logged_out=true`);
}
