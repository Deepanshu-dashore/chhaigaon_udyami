import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { recordAuthActivity, extractClientMetadata } from "@/lib/auth-tracker";
import { getURL } from "@/lib/get-url";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "") ||
    (forwardedHost ? `${forwardedProto}://${forwardedHost}` : getURL().replace(/\/+$/, ""));

  const code = searchParams.get("code");

  // If "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/dashboard";
  if (!next.startsWith("/")) {
    next = "/dashboard";
  }

  if (!code) {
    return NextResponse.redirect(`${baseUrl}/login?error=oauth_missing_code`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data?.user) {
    console.error("Supabase Auth callback exchange error:", error);
    return NextResponse.redirect(`${baseUrl}/auth/auth-code-error`);
  }

  const authUser = data.user;
  const userEmail = authUser.email;
  const supabaseUserId = authUser.id;

  if (userEmail) {
    const avatarUrl =
      authUser.user_metadata?.avatar_url ||
      authUser.user_metadata?.picture ||
      null;
    const fullName =
      authUser.user_metadata?.full_name ||
      authUser.user_metadata?.name ||
      userEmail.split("@")[0] ||
      "Student";

    try {
      // 1. Check if user already exists by supabaseUserId or email
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ supabaseUserId }, { email: userEmail }],
        },
        include: { profile: true },
      });

      let targetUserId = existingUser?.id;

      if (existingUser) {
        // Link supabaseUserId if not linked yet, update profile photo if provided
        const updated = await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            supabaseUserId,
            name: existingUser.name || fullName,
            isVerified: true,
            isOnline: true,
            lastLoginAt: new Date(),
            ...(avatarUrl && !existingUser.profile?.profilePhoto
              ? {
                  profile: {
                    upsert: {
                      create: { profilePhoto: avatarUrl },
                      update: { profilePhoto: avatarUrl },
                    },
                  },
                }
              : {}),
          },
        });
        targetUserId = updated.id;
      } else {
        // 2. Application-user provisioning: Assign role from metadata or default to STUDENT
        const allowedRoles = [
          "STUDENT",
          "TRAINER",
          "MARKET_PARTNER",
          "MENTOR",
          "CONTENT_MANAGER",
          "ADMIN",
          "SUPER_ADMIN",
        ];
        const rawRole = (
          authUser.user_metadata?.role ||
          searchParams.get("role") ||
          "STUDENT"
        ).toUpperCase();
        const roleToAssign = allowedRoles.includes(rawRole)
          ? (rawRole as "STUDENT" | "TRAINER" | "MARKET_PARTNER" | "MENTOR" | "CONTENT_MANAGER" | "ADMIN" | "SUPER_ADMIN")
          : "STUDENT";

        const newUser = await prisma.user.create({
          data: {
            supabaseUserId,
            email: userEmail,
            name: fullName,
            mobile: authUser.user_metadata?.mobile || null,
            role: roleToAssign,
            status: "ACTIVE",
            isVerified: true,
            isOnline: true,
            lastLoginAt: new Date(),
            ...(avatarUrl
              ? {
                  profile: {
                    create: { profilePhoto: avatarUrl },
                  },
                }
              : {}),
          },
        });
        targetUserId = newUser.id;
      }

      // Record Activity Log
      if (targetUserId) {
        const { ipAddress, userAgent, deviceInfo } = extractClientMetadata(request);
        await recordAuthActivity({
          userId: targetUserId,
          action: existingUser ? "LOGIN" : "SIGNUP",
          ipAddress,
          userAgent,
          deviceInfo,
          provider: authUser.app_metadata?.provider || "email",
          metadata: { authProvider: authUser.app_metadata?.provider || "email" },
        });
      }

      // If this is an email confirmation verification, redirect to login with verified flag
      const authProvider = authUser.app_metadata?.provider || "email";
      const isEmailSignup = authProvider === "email" || searchParams.get("type") === "signup";
      if (isEmailSignup) {
        return NextResponse.redirect(
          `${baseUrl}/login?verified=true&email=${encodeURIComponent(userEmail)}`
        );
      }

      // Determine redirect path based on user role if next is default /dashboard
      const finalRole = existingUser?.role || (authUser.user_metadata?.role as string);
      if (next === "/dashboard" && (finalRole === "ADMIN" || finalRole === "SUPER_ADMIN")) {
        next = "/admin/dashboard";
      }
    } catch (dbErr) {
      console.error("Failed to sync/provision OAuth user to PostgreSQL:", dbErr);
    }
  }

  return NextResponse.redirect(`${baseUrl}${next}`);
}
