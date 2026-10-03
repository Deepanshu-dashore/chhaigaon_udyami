"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Landmark,
  Award,
  GraduationCap,
  Globe,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  TrendingUp,
  FileText,
  CreditCard,
  Lightbulb,
  UserCheck,
  HelpCircle,
  Activity,
  Bell,
  Settings,
  Building2,
  Video,
  Database,
  Crown,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  isExternal?: boolean;
  superAdminOnly?: boolean;
}

export interface NavGroup {
  groupLabel: string;
  isSuperAdminGroup?: boolean;
  items: NavItem[];
}

export const adminNavGroups: NavGroup[] = [
  {
    groupLabel: "Main Console",
    items: [
      {
        title: "Overview",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    groupLabel: "Academic & Users",
    items: [
      {
        title: "User Directory",
        href: "/admin/users",
        icon: Users,
      },
      {
        title: "Courses & Content",
        href: "/admin/courses",
        icon: BookOpen,
      },
      {
        title: "Video Library (VdoCipher)",
        href: "/admin/videos",
        icon: Video,
      },
      {
        title: "Quizzes & Assessments",
        href: "/admin/quizzes",
        icon: HelpCircle,
      },
      {
        title: "Student Enrollments",
        href: "/admin/enrollments",
        icon: UserCheck,
      },
      {
        title: "Certificates Issuance",
        href: "/admin/certificates",
        icon: Award,
      },
    ],
  },
  {
    groupLabel: "Schemes & B2B Services",
    items: [
      {
        title: "Government Schemes",
        href: "/admin/schemes",
        icon: Landmark,
      },
      {
        title: "Leads & Applications",
        href: "/admin/leads",
        icon: FileText,
      },
      {
        title: "B2B Market Partners",
        href: "/admin/partners",
        icon: Building2,
      },
      {
        title: "Startup Resources",
        href: "/admin/resources",
        icon: Lightbulb,
      },
    ],
  },
  {
    groupLabel: "Finance & Accounting",
    items: [
      {
        title: "Payments & Orders",
        href: "/admin/payments",
        icon: CreditCard,
      },
    ],
  },
  {
    groupLabel: "Super Admin Controls",
    isSuperAdminGroup: true,
    items: [
      {
        title: "Security & Audit Logs",
        href: "/admin/audit-logs",
        icon: Activity,
        superAdminOnly: true,
      },
      {
        title: "Database & Infrastructure",
        href: "/admin/database",
        icon: Database,
        superAdminOnly: true,
      },
      {
        title: "Platform Notifications",
        href: "/admin/notifications",
        icon: Bell,
        superAdminOnly: true,
      },
      {
        title: "Settings & Access Control",
        href: "/admin/settings",
        icon: Settings,
        superAdminOnly: true,
      },
    ],
  },
  {
    groupLabel: "Quick Portals",
    items: [
      {
        title: "Learner Portal",
        href: "/dashboard",
        icon: GraduationCap,
      },
      {
        title: "Public Website",
        href: "/",
        icon: Globe,
        isExternal: true,
      },
    ],
  },
];

interface AdminSidebarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
    avatarUrl?: string | null;
  };
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export function AdminSidebar({
  user,
  isCollapsed = false,
  onToggleCollapse,
  className,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const [logoError, setLogoError] = useState(false);

  const isSuperAdmin =
    user?.role === "SUPER_ADMIN" ||
    user?.email === "dipanshu.dashore.dev@gmail.com" ||
    user?.email === "admin@chhaigaonudyami.in";

  return (
    <TooltipProvider delayDuration={150}>
      <aside
        className={cn(
          "relative flex flex-col bg-white border-r border-slate-200/80 shadow-xs transition-all duration-300 select-none z-30",
          isCollapsed ? "w-16" : "w-64",
          className
        )}
      >
        {/* Top Header / Logo Section */}
        <div className="h-16 flex items-center justify-between px-3.5 border-b border-slate-100">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2.5 overflow-hidden"
          >
            <div className="relative size-9 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-center shrink-0">
              {!logoError ? (
                <Image
                  src="/assets/chhaigaon-udyami-logo.png"
                  alt="Chhaigaon Udyami Logo"
                  width={36}
                  height={36}
                  className="object-contain p-0.5"
                  onError={() => setLogoError(true)}
                  priority
                />
              ) : (
                <div className="size-full bg-[#0056d2] text-white flex items-center justify-center font-bold text-xs rounded-lg">
                  CU
                </div>
              )}
            </div>

            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm text-slate-900 font-headline truncate">
                    Chhaigaon Udyami
                  </span>
                </div>
                <span className="text-[10px] text-[#0056d2] font-semibold tracking-wide uppercase flex items-center gap-1">
                  {/* {isSuperAdmin && <Crown className="size-2.5 text-amber-500 inline" />} */}
                  <span>{isSuperAdmin ? "Super Admin Console" : "Admin Console"}</span>
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle Button */}
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="hidden md:flex size-7 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="size-4" />
              ) : (
                <ChevronLeft className="size-4" />
              )}
            </Button>
          )}
        </div>

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-4 scrollbar-thin scrollbar-thumb-slate-200">
          {adminNavGroups
            .filter((group) => !group.isSuperAdminGroup || isSuperAdmin)
            .map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1">
                {!isCollapsed ? (
                  <div className="px-2 pb-1 flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      {group.groupLabel}
                    </span>
                  </div>
                ) : (
                  <div className="h-px bg-slate-100 my-2" />
                )}

                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/admin/dashboard" &&
                        item.href.startsWith("/admin/") &&
                        pathname.startsWith(item.href));

                    const Icon = item.icon;

                    const linkContent = (
                      <Link
                        href={item.href}
                        target={item.isExternal ? "_blank" : undefined}
                        rel={item.isExternal ? "noopener noreferrer" : undefined}
                        className={cn(
                          "group relative flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-150 cursor-pointer",
                          isActive
                            ? "bg-[#0056d2] text-white shadow-2xs font-semibold"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-4 shrink-0 transition-transform duration-150 group-hover:scale-105",
                            isActive
                              ? "text-white"
                              : "text-slate-400 group-hover:text-[#0056d2]"
                          )}
                        />

                        {!isCollapsed && (
                          <div className="flex-1 flex items-center justify-between min-w-0">
                            <span className="truncate">{item.title}</span>
                            {item.isExternal && (
                              <ExternalLink
                                className={cn(
                                  "size-3 shrink-0 ml-1 opacity-60",
                                  isActive ? "text-white" : "text-slate-400"
                                )}
                              />
                            )}
                          </div>
                        )}
                      </Link>
                    );

                    if (isCollapsed) {
                      return (
                        <Tooltip key={item.href}>
                          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                          <TooltipContent
                            side="right"
                            className="font-semibold text-xs bg-slate-900 text-white border-0 shadow-md px-2.5 py-1.5"
                          >
                            <p>{item.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    }

                    return <React.Fragment key={item.href}>{linkContent}</React.Fragment>;
                  })}
                </div>
              </div>
            ))}
        </div>

        {/* Footer / User Profile Card */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50">
          {!isCollapsed ? (
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="relative size-8 rounded-full bg-blue-50 text-[#0056d2] flex items-center justify-center font-bold text-xs border border-blue-200 shrink-0">
                  {user?.name?.[0]?.toUpperCase() || "A"}
                  {isSuperAdmin && (
                    <Crown className="absolute -top-1 -right-1 size-3 text-amber-500 fill-amber-400 drop-shadow-2xs" />
                  )}
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-slate-900 truncate">
                      {user?.name || "Admin User"}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 truncate">
                    {user?.email || "admin@chhaigaon.in"}
                  </span>
                </div>
              </div>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="size-7 rounded-md text-slate-400 hover:text-[#0056d2] hover:bg-blue-50 cursor-pointer"
                title="Switch to Learner Portal"
              >
                <Link href="/dashboard">
                  <TrendingUp className="size-3.5" />
                </Link>
              </Button>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative size-8 mx-auto rounded-full bg-blue-50 text-[#0056d2] flex items-center justify-center font-bold text-xs border border-blue-200 cursor-pointer">
                  {user?.name?.[0]?.toUpperCase() || "A"}
                  {isSuperAdmin && (
                    <Crown className="absolute -top-1 -right-1 size-3 text-amber-500 fill-amber-400" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-900 text-white text-xs">
                {user?.name || "Admin"} ({isSuperAdmin ? "SUPER_ADMIN" : user?.role || "ADMIN"})
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}

