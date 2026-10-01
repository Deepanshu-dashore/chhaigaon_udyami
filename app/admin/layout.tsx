import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { AdminLayoutWrapper } from "@/components/admin/admin-layout-wrapper";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login?redirectedFrom=/admin/dashboard");
  }

  // Lookup Prisma database user for role & metadata
  let dbUser = null;
  try {
    dbUser = await prisma.user.findFirst({
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
  } catch (err) {
    console.error("Failed to load user in AdminLayout:", err);
  }

  const avatarUrl =
    dbUser?.profile?.profilePhoto ||
    authUser.user_metadata?.avatar_url ||
    authUser.user_metadata?.picture ||
    null;

  const displayName =
    dbUser?.name ||
    authUser.user_metadata?.full_name ||
    authUser.user_metadata?.name ||
    authUser.email?.split("@")[0] ||
    "Admin";

  const userRole = dbUser?.role || authUser.user_metadata?.role || "ADMIN";

  return (
    <AdminLayoutWrapper
      user={{
        name: displayName,
        email: authUser.email,
        role: userRole,
        avatarUrl,
      }}
    >
      {children}
    </AdminLayoutWrapper>
  );
}
