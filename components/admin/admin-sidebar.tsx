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
  Store,
  Award,
  FolderKanban,
  GraduationCap,
  Globe,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  Sparkles,
  TrendingUp,
  FileText,
  CreditCard,
  Lightbulb,
  UserCheck,
} from "lucide-react";

export interface NavItem {
  title: string;
  hindiTitle?: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: string;
  isExternal?: boolean;
}

export interface NavGroup {
  groupLabel: string;
  hindiGroupLabel?: string;
  items: NavItem[];
}

export const adminNavGroups: NavGroup[] = [
  {
    groupLabel: "Main Console",
    hindiGroupLabel: "मुख्य नियंत्रण",
    items: [
      {
        title: "Overview",
        hindiTitle: "डैशबोर्ड ओवरव्यू",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
        badge: "Live",
        badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      },
    ],
  },
  {
    groupLabel: "Academic & Users",
    hindiGroupLabel: "प्रशिक्षण व उपयोगकर्ता",
    items: [
      {
        title: "User Directory",
        hindiTitle: "उपयोगकर्ता प्रबंधन",
        href: "/admin/users",
        icon: Users,
        badge: "Users",
        badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      },
      {
        title: "Courses & Content",
        hindiTitle: "कोर्सेस व लेक्चर्स",
        href: "/admin/courses",
        icon: BookOpen,
        badge: "VdoCipher",
        badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      },
      {
        title: "Student Enrollments",
        hindiTitle: "विद्यार्थी नामांकन",
        href: "/admin/enrollments",
        icon: UserCheck,
        badge: "Access",
        badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      },
      {
        title: "Certificates Issuance",
        hindiTitle: "प्रमाणपत्र जारीकरण",
        href: "/admin/certificates",
        icon: Award,
        badge: "QR Verify",
        badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
      },
    ],
  },
  {
    groupLabel: "Schemes & B2B Services",
    hindiGroupLabel: "योजनाएं व बाजार सेवाएं",
    items: [
      {
        title: "Government Schemes",
        hindiTitle: "योजनाएं व सब्सिडी",
        href: "/admin/schemes",
        icon: Landmark,
        badge: "PMEGP/Mudra",
        badgeColor: "bg-amber-500/10 text-amber-600 border-amber-500/20",
      },
      {
        title: "Leads & Applications",
        hindiTitle: "लीड्स व आवेदन",
        href: "/admin/leads",
        icon: Store,
        badge: "Leads",
        badgeColor: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
      },
      {
        title: "B2B Market Partners",
        hindiTitle: "मार्केट पार्टनर्स",
        href: "/admin/partners",
        icon: Store,
        badge: "Partners",
        badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
      },
      {
        title: "Startup Resources",
        hindiTitle: "स्टार्टअप गाइड व टूल्स",
        href: "/admin/resources",
        icon: Lightbulb,
        badge: "DPR Tools",
        badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/20",
      },
    ],
  },
  {
    groupLabel: "Finance & Accounting",
    hindiGroupLabel: "वित्तीय लेखा-जोखा",
    items: [
      {
        title: "Payments & Orders",
        hindiTitle: "भुगतान एवं लेन-देन",
        href: "/admin/payments",
        icon: CreditCard,
        badge: "Razorpay",
        badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
      },
    ],
  },
  {
    groupLabel: "Quick Portals",
    hindiGroupLabel: "पोर्टल लिंक",
    items: [
      {
        title: "Learner Portal",
        hindiTitle: "विद्यार्थी व्यू",
        href: "/dashboard",
        icon: GraduationCap,
      },
      {
        title: "Public Website",
        hindiTitle: "मुख्य वेबसाइट",
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
            <div className="relative size-9 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center shrink-0">
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
                <div className="size-full bg-[#0056d2] text-white flex items-center justify-center font-bold text-xs">
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
                <span className="text-[10px] text-purple-700 font-semibold tracking-wide uppercase">
                  Admin Console
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
              className="hidden md:flex size-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
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

        {/* System Status Banner inside Sidebar when expanded */}
        {!isCollapsed && (
          <div className="mx-3 mt-3 p-2.5 rounded-xl bg-purple-50/70 border border-purple-100/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold text-slate-800">
                DB & Auth Status
              </span>
            </div>
            <Badge className="bg-purple-600 text-white text-[9px] font-bold px-1.5 py-0 h-4">
              ACTIVE
            </Badge>
          </div>
        )}

        {/* Navigation Items List */}
        <div className="flex-1 overflow-y-auto py-3 px-2.5 space-y-5 scrollbar-thin scrollbar-thumb-slate-200">
          {adminNavGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-1">
              {!isCollapsed ? (
                <div className="px-2 pb-1 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {group.groupLabel}
                  </span>
                  {group.hindiGroupLabel && (
                    <span className="text-[9px] text-slate-400 font-medium">
                      {group.hindiGroupLabel}
                    </span>
                  )}
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
                        "group relative flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer",
                        isActive
                          ? "bg-purple-600 text-white shadow-xs font-bold"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-4 shrink-0 transition-transform duration-150 group-hover:scale-110",
                          isActive
                            ? "text-white"
                            : "text-slate-400 group-hover:text-purple-600"
                        )}
                      />

                      {!isCollapsed && (
                        <div className="flex-1 flex items-center justify-between min-w-0">
                          <span className="truncate">{item.title}</span>
                          {item.badge && (
                            <span
                              className={cn(
                                "text-[9px] font-bold px-1.5 py-0.5 rounded-full border shrink-0 ml-1.5",
                                isActive
                                  ? "bg-white/20 text-white border-white/30"
                                  : item.badgeColor ||
                                      "bg-slate-100 text-slate-600 border-slate-200"
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
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
                          className="font-bold text-xs bg-slate-900 text-white border-0 shadow-lg px-2.5 py-1.5"
                        >
                          <p>{item.title}</p>
                          {item.hindiTitle && (
                            <p className="text-[10px] text-slate-300 font-normal">
                              {item.hindiTitle}
                            </p>
                          )}
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
                <div className="size-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs border border-purple-200 shrink-0">
                  {user?.name?.[0]?.toUpperCase() || "A"}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {user?.name || "Admin User"}
                  </span>
                  <span className="text-[10px] text-slate-400 truncate">
                    {user?.email || "admin@chhaigaon.in"}
                  </span>
                </div>
              </div>
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="size-7 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 cursor-pointer"
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
                <div className="size-8 mx-auto rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs border border-purple-200 cursor-pointer">
                  {user?.name?.[0]?.toUpperCase() || "A"}
                </div>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-slate-900 text-white text-xs">
                {user?.name || "Admin"} ({user?.role || "ADMIN"})
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
