"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Award,
  Users,
  FolderDown,
  Settings,
  HelpCircle,
  Sparkles,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
    avatarUrl?: string | null;
  };
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const pathname = usePathname();
  const { user: authUser } = useAuth();
  const [logoError, setLogoError] = React.useState(false);

  const displayRole = user?.role || authUser?.user_metadata?.role || "STUDENT";
  const isAdmin = displayRole === "ADMIN" || displayRole === "SUPER_ADMIN";

  const mainNavItems = [
    {
      title: "डैशबोर्ड (Overview)",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "मेरे कोर्सेस (Courses)",
      url: "/courses",
      icon: BookOpen,
      badge: "नया",
    },
    {
      title: "सरकारी योजनाएं (Schemes)",
      url: "/schemes",
      icon: FileText,
    },
    {
      title: "प्रमाण पत्र (Certificates)",
      url: "/dashboard/certificates",
      icon: Award,
    },
    {
      title: "डीपीआर एवं टूल्स (Resources)",
      url: "/resources",
      icon: FolderDown,
    },
  ];

  const communityNavItems = [
    {
      title: "उद्यमी नेटवर्क (Community)",
      url: "/community",
      icon: Users,
    },
    {
      title: "सहायता केंद्र (Support)",
      url: "/support",
      icon: HelpCircle,
    },
    {
      title: "सेटिंग्स (Settings)",
      url: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200 bg-white select-none" {...props}>
      {/* Sidebar Header with Chhaigaon Udyami Logo */}
      <SidebarHeader className="border-b border-slate-100 p-2.5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="h-12 hover:bg-slate-50 group-data-[collapsible=icon]:p-0!">
              <Link href="/" className="flex items-center gap-3 w-full group-data-[collapsible=icon]:justify-center">
                <div className="relative flex aspect-square size-10 items-center justify-center rounded-xl bg-white border border-slate-200 overflow-hidden shadow-2xs shrink-0">
                  {!logoError ? (
                    <Image
                      src="/assets/chhaigaon-udyami-logo.png"
                      alt="Chhaigaon Udyami Logo"
                      width={40}
                      height={40}
                      className="object-contain p-0.5"
                      onError={() => setLogoError(true)}
                      priority
                    />
                  ) : (
                    <div className="size-full bg-[#0056d2] text-white flex items-center justify-center font-bold text-sm">
                      CU
                    </div>
                  )}
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-bold text-slate-900 font-headline">
                    Chhaigaon Udyami
                  </span>
                  <span className="truncate text-[11px] text-slate-500 font-medium flex items-center gap-1">
                    <Sparkles className="size-3 text-amber-500 shrink-0" />
                    ग्रामीण उद्यमिता मंच
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent className="px-2 py-2">
        {/* Admin Switch Banner (If Admin Role) */}
        {isAdmin && (
          <SidebarGroup className="p-1 pb-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  tooltip="एडमिन कंसोल"
                  className="bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200 h-9 rounded-xl font-bold group-data-[collapsible=icon]:justify-center"
                >
                  <Link href="/admin/dashboard" className="flex items-center gap-2 w-full group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0">
                    <ShieldAlert className="size-4.5 text-purple-700 shrink-0" />
                    <span className="text-xs group-data-[collapsible=icon]:hidden">एडमिन कंसोल (Admin)</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        )}

        {/* Main Navigation Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 font-bold uppercase text-[11px] tracking-wider px-2 group-data-[collapsible=icon]:hidden">
            मुख्य मेनू (Main Menu)
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {mainNavItems.map((item) => {
                const isActive = pathname === item.url;
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={`h-9.5 rounded-xl font-medium transition-colors group-data-[collapsible=icon]:justify-center ${
                        isActive
                          ? "bg-blue-50 text-[#0056d2] font-bold shadow-2xs"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center gap-3 w-full h-full px-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
                      >
                        <Icon className={`size-4.5 shrink-0 ${isActive ? "text-[#0056d2]" : "text-slate-500"}`} />
                        <span className="text-xs sm:text-sm group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full group-data-[collapsible=icon]:hidden">
                        {item.badge}
                      </SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-2 group-data-[collapsible=icon]:my-1" />

        {/* Community & Secondary Group */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-400 font-bold uppercase text-[11px] tracking-wider px-2 group-data-[collapsible=icon]:hidden">
            संसाधन एवं नेटवर्क
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              {communityNavItems.map((item) => {
                const isActive = pathname === item.url;
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.title}
                      className={`h-9.5 rounded-xl font-medium transition-colors group-data-[collapsible=icon]:justify-center ${
                        isActive
                          ? "bg-blue-50 text-[#0056d2] font-bold shadow-2xs"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      <Link
                        href={item.url}
                        className="flex items-center gap-3 w-full h-full px-2 group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0"
                      >
                        <Icon className={`size-4.5 shrink-0 ${isActive ? "text-[#0056d2]" : "text-slate-500"}`} />
                        <span className="text-xs sm:text-sm group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
