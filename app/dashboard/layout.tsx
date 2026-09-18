import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DashboardProfileDropdown } from "@/components/dashboard/dashboard-profile-dropdown";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Home } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login?redirectedFrom=/dashboard");
  }

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
    console.error("Failed to load user profile in layout:", err);
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
    "उद्यमी";

  const userRole = dbUser?.role || authUser.user_metadata?.role || "STUDENT";

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar
        user={{
          name: displayName,
          email: authUser.email,
          role: userRole,
          avatarUrl,
        }}
      />
      <SidebarInset className="min-h-screen bg-slate-50/60 flex flex-col font-sans">
        {/* Top Navbar Header with Profile Section */}
        <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 sm:px-6 transition-[width,height] ease-linear shadow-2xs">
          <div className="flex items-center gap-3">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink asChild>
                    <Link href="/" className="flex items-center gap-1 text-slate-500 hover:text-slate-900">
                      <Home className="h-3.5 w-3.5" />
                      <span>होम</span>
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-bold text-slate-900">
                    डैशबोर्ड
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Header Right: Live Status & Profile Dropdown */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              सत्र सक्रिय
            </span>

            {/* Profile Section in Header */}
            <DashboardProfileDropdown
              user={{
                name: displayName,
                email: authUser.email,
                role: userRole,
                avatarUrl,
              }}
            />
          </div>
        </header>

        {/* Dashboard Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
