import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import type { User, UserProfile, UserRole } from "@prisma/client";

export type SessionLmsUser = User & {
  profile?: UserProfile | null;
};

/**
 * Get the currently authenticated user from Supabase SSR and join with Prisma LMS User
 */
export async function getCurrentUser(): Promise<SessionLmsUser | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.getUser();

    if (error || !authUser) {
      return null;
    }

    // Lookup Prisma User via supabaseUserId, falling back to email
    let dbUser = await prisma.user.findFirst({
      where: {
        OR: [
          { supabaseUserId: authUser.id },
          ...(authUser.email ? [{ email: authUser.email }] : []),
        ],
      },
      include: {
        profile: true,
      },
    });

    // Auto-link supabaseUserId if missing on existing email account
    if (dbUser && !dbUser.supabaseUserId) {
      dbUser = await prisma.user.update({
        where: { id: dbUser.id },
        data: { supabaseUserId: authUser.id },
        include: { profile: true },
      });
    }

    // Auto-provision if user authenticated via Supabase but not yet in Prisma
    if (!dbUser && authUser.email) {
      const avatarUrl =
        authUser.user_metadata?.avatar_url ||
        authUser.user_metadata?.picture ||
        null;
      const fullName =
        authUser.user_metadata?.full_name ||
        authUser.user_metadata?.name ||
        authUser.email.split("@")[0] ||
        "Student";

      dbUser = await prisma.user.create({
        data: {
          supabaseUserId: authUser.id,
          email: authUser.email,
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
        include: {
          profile: true,
        },
      });
    }

    return dbUser;
  } catch (err) {
    console.error("getCurrentUser error:", err);
    return null;
  }
}

/**
 * Ensures user is authenticated; throws Error if not
 */
export async function requireAuth(): Promise<SessionLmsUser> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Authentication required");
  }
  return user;
}

/**
 * Ensures user has one of the allowed LMS roles
 */
export async function requireRole(allowedRoles: UserRole[]): Promise<SessionLmsUser> {
  const user = await requireAuth();
  if (!allowedRoles.includes(user.role)) {
    throw new Error("Forbidden: Insufficient role permissions");
  }
  return user;
}
