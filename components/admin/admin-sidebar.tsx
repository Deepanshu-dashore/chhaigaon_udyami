"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
  ShieldCheck,
  Sparkles,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
  isExternal?: boolean;
  superAdminOnly?: boolean;
  badge?: string;
}

export interface NavGroup {
  groupLabel: string;
  isSuperAdminGroup?: boolean;
  items: NavItem[];
}

export const adminNavGroups: NavGroup[] = [
  {
    groupLabel: "Main Menu",
    items: [
      {
        title: "डैशबोर्ड (Overview)",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    groupLabel: "Academic & Users",
    items: [
      {
        title: "उपयोगकर्ता (User Directory)",
        href: "/admin/users",
        icon: Users,
      },
      {
        title: "कोर्स प्रबंधन (Courses)",
        href: "/admin/courses",
        icon: BookOpen,
      },
      {
        title: "वीडियो लाइब्रेरी (Videos)",
        href: "/admin/videos",
        icon: Video,
      },
      {
        title: "क्विज़ एवं टेस्ट (Quizzes)",
        href: "/admin/quizzes",
        icon: HelpCircle,
      },
      {
        title: "नामांकन (Enrollments)",
        href: "/admin/enrollments",
        icon: UserCheck,
      },
      {
        title: "प्रमाण पत्र (Certificates)",
        href: "/admin/certificates",
        icon: Award,
      },
    ],
  },
  {
    groupLabel: "Schemes & B2B",
    items: [
      {
        title: "सरकारी योजनाएं (Schemes)",
        href: "/admin/schemes",
        icon: Landmark,
      },
      {
        title: "लीड्स एवं आवेदन (Leads)",
        href: "/admin/leads",
        icon: FileText,
      },
      {
        title: "मार्केट पार्टनर्स (Partners)",
        href: "/admin/partners",
        icon: Building2,
      },
      {
        title: "स्टार्टअप रिसोर्सेज (Resources)",
        href: "/admin/resources",
        icon: Lightbulb,
      },
    ],
  },
  {
    groupLabel: "Finance",
    items: [
      {
        title: "भुगतान एवं ऑर्डर्स (Payments)",
        href: "/admin/payments",
        icon: CreditCard,
      },
    ],
  },
  {
    groupLabel: "Super Admin",
    isSuperAdminGroup: true,
    items: [
      {
        title: "ऑडिट एवं सुरक्षा (Security)",
        href: "/admin/audit-logs",
        icon: Activity,
        superAdminOnly: true,
      },
      {
        title: "डेटाबेस (Database)",
        href: "/admin/database",
        icon: Database,
        superAdminOnly: true,
      },
      {
        title: "नोटिफिकेशंस (Notifications)",
        href: "/admin/notifications",
        icon: Bell,
        superAdminOnly: true,
      },
      {
        title: "कंसोल सेटिंग्स (Settings)",
        href: "/admin/settings",
        icon: Settings,
        superAdminOnly: true,
      },
    ],
  },
  {
    groupLabel: "Quick Links",
    items: [
      {
        title: "मुख्य वेबसाइट (Website)",
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
  const { user: authUser, signOut } = useAuth();
  const [logoError, setLogoError] = useState(false);

  const displayName =
    user?.name ||
    authUser?.user_metadata?.full_name ||
    authUser?.user_metadata?.name ||
    authUser?.email?.split("@")[0] ||
    "एडमिन";

  const displayEmail = user?.email || authUser?.email || "admin@chhaigaonudyami.in";
  const displayRole = user?.role || authUser?.user_metadata?.role || "ADMIN";
  const avatarUrl =
    user?.avatarUrl ||
    authUser?.user_metadata?.avatar_url ||
    authUser?.user_metadata?.picture ||
    null;

  const isSuperAdmin =
    displayRole === "SUPER_ADMIN" ||
    displayEmail === "dipanshu.dashore.dev@gmail.com" ||
    displayEmail === "admin@chhaigaonudyami.in";

  return (
    <TooltipProvider delayDuration={150}>
      <aside
        className={cn(
          "relative flex flex-col bg-white border-r border-slate-200 select-none z-30 transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          className
        )}
      >
        {/* Header Section matching Dashboard AppSidebar */}
        <div className="border-b border-slate-100 p-2.5 flex items-center justify-between min-h-16">
          <Link
            href="/admin/dashboard"
            className={cn(
              "flex items-center gap-3 overflow-hidden flex-1 group",
              isCollapsed && "justify-center"
            )}
            title="Chhaigaon Udyami - Admin Console"
          >
            <div className="relative flex aspect-square size-10 items-center justify-center rounded-xl bg-white border border-slate-200 overflow-hidden shadow-2xs shrink-0 transition-transform group-hover:scale-105">
              {!logoError ? (
                <Image
                  src="/assets/chhaigaon-udyami-logo.png"
                  alt="Chhaigaon Udyami Logo"
                  width={40}
                  height={40}
                  className={`object-contain p-0.5 ${isCollapsed ? "hidden" : ""}`}
                  onError={() => setLogoError(true)}
                  priority
                />
              ) : (
                <div className="size-full bg-[#0056d2] text-white flex items-center justify-center font-bold text-sm">
                  CU
                </div>
              )}
            </div>

            {!isCollapsed && (
              <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                <span className="truncate font-bold text-slate-900 font-headline">
                  Chhaigaon Udyami
                </span>
                <span className="truncate text-[11px] text-slate-500 font-medium flex items-center gap-1">
                  <ShieldCheck className="size-3 text-[#0056d2] shrink-0" />
                  <span>{isSuperAdmin ? "सुपर एडमिन कंसोल" : "एडमिन कंसोल"}</span>
                </span>
              </div>
            )}
          </Link>

          {/* Collapse Toggle Button */}
          {onToggleCollapse && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="hidden md:flex size-8 rounded-sm text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer shrink-0 transition-colors"
              title="साइडबार संक्षिप्त करें"
            >
              <ChevronLeft className={`size-4 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} />
            </Button>
          )}
        </div>

        {/* Content Navigation Area */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-3.5 scrollbar-thin scrollbar-thumb-slate-200">
          {/* Switch to Learner Portal Pill matching Dashboard AppSidebar Admin Banner */}
          <div className="p-0.5">
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-center w-full bg-blue-50 text-[#0056d2] hover:bg-blue-100/80 border border-blue-200 h-9.5 rounded-xl font-bold transition-colors shadow-2xs"
                  >
                    <GraduationCap className="size-4.5 text-[#0056d2] shrink-0" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="font-semibold text-xs bg-slate-900 text-white border-0 shadow-md px-2.5 py-1.5 rounded-lg"
                >
                  विद्यार्थी पोर्टल (Learner Dashboard)
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 w-full bg-blue-50 text-[#0056d2] hover:bg-blue-100/80 border border-blue-200 h-9.5 rounded-sm font-bold transition-colors shadow-2xs px-2.5"
              >
                <GraduationCap className="size-4.5 text-[#0056d2] shrink-0" />
                <span className="text-xs truncate">विद्यार्थी पोर्टल (Learner Dashboard)</span>
              </Link>
            )}
          </div>

          {/* Navigation Groups */}
          {adminNavGroups
            .filter((group) => !group.isSuperAdminGroup || isSuperAdmin)
            .map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1">
                {!isCollapsed ? (
                  <div className="px-2 pb-1">
                    <span className="text-slate-400 font-semibold uppercase text-[11px] tracking-wide">
                      {group.groupLabel}
                    </span>
                  </div>
                ) : (
                  <div className="h-px bg-slate-100 my-1.5" />
                )}

                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/admin/dashboard" &&
                        item.href !== "/" &&
                        pathname.startsWith(item.href));

                    const Icon = item.icon;

                    const itemContent = (
                      <Link
                        href={item.href}
                        target={item.isExternal ? "_blank" : undefined}
                        rel={item.isExternal ? "noopener noreferrer" : undefined}
                        className={cn(
                          "flex items-center gap-3 h-9.5 rounded-sm font-medium transition-colors cursor-pointer",
                          isCollapsed ? "justify-center px-0 w-full" : "px-2.5 w-full",
                          isActive
                            ? "bg-blue-50 text-[#0056d2] font-bold shadow-2xs"
                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-4.5 shrink-0 transition-transform duration-150",
                            isActive ? "text-[#0056d2]" : "text-slate-500",
                            !isActive && "group-hover:scale-105"
                          )}
                        />

                        {!isCollapsed && (
                          <div className="flex-1 flex items-center justify-between min-w-0">
                            <span className="truncate text-xs sm:text-sm">{item.title}</span>
                            {item.isExternal ? (
                              <ExternalLink
                                className={cn(
                                  "size-3.5 shrink-0 ml-1.5 opacity-60",
                                  isActive ? "text-[#0056d2]" : "text-slate-400"
                                )}
                              />
                            ) : item.badge ? (
                              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-1.5">
                                {item.badge}
                              </span>
                            ) : null}
                          </div>
                        )}
                      </Link>
                    );

                    if (isCollapsed) {
                      return (
                        <Tooltip key={item.href}>
                          <TooltipTrigger asChild>{itemContent}</TooltipTrigger>
                          <TooltipContent
                            side="right"
                            className="font-semibold text-xs bg-slate-900 text-white border-0 shadow-md px-2.5 py-1.5 rounded-lg"
                          >
                            <p>{item.title}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    }

                    return <React.Fragment key={item.href}>{itemContent}</React.Fragment>;
                  })}
                </div>
              </div>
            ))}
        </div>

        {/* Collapsed Expand Trigger at Bottom if collapsed */}
        {onToggleCollapse && isCollapsed && (
          <div className="p-2 border-t border-slate-100 flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="size-8 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer transition-colors"
              title="साइडबार विस्तृत करें"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        )}

        {/* Footer / User Profile Card matching Dashboard Aesthetics */}
        <div className="p-2.5 border-t border-slate-100 bg-white">
          {!isCollapsed ? (
            <div className="flex items-center justify-between gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="relative size-9 rounded-xl bg-blue-50 text-[#0056d2] flex items-center justify-center font-bold text-xs border border-blue-200 shrink-0 overflow-hidden shadow-2xs">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={displayName}
                      width={36}
                      height={36}
                      className="size-full object-cover"
                    />
                  ) : (
                    <span>{displayName[0]?.toUpperCase() || "A"}</span>
                  )}
                  {isSuperAdmin && (
                    <Crown className="absolute -top-1 -right-1 size-3 text-amber-500 fill-amber-400 drop-shadow-2xs" />
                  )}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-bold text-slate-900 truncate font-headline leading-tight">
                    {displayName}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-md bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                      {isSuperAdmin ? "Super Admin" : "Admin"}
                    </span>
                    <span className="text-[10px] text-slate-400 truncate">
                      {displayEmail}
                    </span>
                  </div>
                </div>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => signOut()}
                    className="size-7 rounded-sm text-slate-400 hover:text-rose-600 hover:bg-rose-50 cursor-pointer shrink-0 transition-colors"
                  >
                    <LogOut className="size-3.5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="font-semibold text-xs bg-slate-900 text-white border-0 shadow-md px-2 py-1 rounded-md"
                >
                  लॉग आउट
                </TooltipContent>
              </Tooltip>
            </div>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative size-9 mx-auto rounded-xl bg-blue-50 text-[#0056d2] flex items-center justify-center font-bold text-xs border border-blue-200 cursor-pointer shadow-2xs overflow-hidden">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={displayName}
                      width={36}
                      height={36}
                      className="size-full object-cover"
                    />
                  ) : (
                    <span>{displayName[0]?.toUpperCase() || "A"}</span>
                  )}
                  {isSuperAdmin && (
                    <Crown className="absolute -top-1 -right-1 size-3 text-amber-500 fill-amber-400 drop-shadow-2xs" />
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-900 text-white text-xs p-2 rounded-lg space-y-0.5">
                <p className="font-bold">{displayName}</p>
                <p className="text-[10px] text-slate-300">{displayEmail}</p>
                <p className="text-[10px] text-purple-300 font-semibold">{isSuperAdmin ? "SUPER_ADMIN" : "ADMIN"}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
