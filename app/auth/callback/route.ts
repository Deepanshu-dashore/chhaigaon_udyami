import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // If "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/dashboard";
  if (!next.startsWith("/")) {
    next = "/dashboard";
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=oauth_missing_code`);
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.exchangeCodeForSession(code);

  if (error || !data?.user) {
    console.error("Supabase Auth callback exchange error:", error);
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
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

      if (existingUser) {
        // Link supabaseUserId if not linked yet, update profile photo if provided
        await prisma.user.update({
          where: { id: existingUser.id },
          data: {
            supabaseUserId,
            name: existingUser.name || fullName,
            isVerified: true,
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
      } else {
        // 2. Application-user provisioning: New OAuth user always gets STUDENT role
        await prisma.user.create({
          data: {
            supabaseUserId,
            email: userEmail,
            name: fullName,
            role: "STUDENT",
            status: "ACTIVE",
            isVerified: true,
            ...(avatarUrl
              ? {
                  profile: {
                    create: { profilePhoto: avatarUrl },
                  },
                }
              : {}),
          },
        });
      }
    } catch (dbErr) {
      console.error("Failed to sync/provision OAuth user to PostgreSQL:", dbErr);
    }
  }

  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocalEnv = process.env.NODE_ENV === "development";

  if (isLocalEnv) {
    return NextResponse.redirect(`${origin}${next}`);
  } else if (forwardedHost) {
    return NextResponse.redirect(`https://${forwardedHost}${next}`);
  } else {
    return NextResponse.redirect(`${origin}${next}`);
  }
}
