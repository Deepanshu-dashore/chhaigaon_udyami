"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AdminProfileAvatar } from "@/components/admin/admin-profile-avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Video,
  CreditCard,
  Award,
  FileText,
  Lightbulb,
  Store,
  Search,
  Bell,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
} from "lucide-react";

const adminTabs = [
  { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Courses", href: "/admin/courses", icon: BookOpen },
  { label: "Videos", href: "/admin/videos", icon: Video },
  { label: "Payments", href: "/admin/payments", icon: CreditCard },
  { label: "Certificates", href: "/admin/certificates", icon: Award },
  { label: "Schemes", href: "/admin/schemes", icon: FileText },
  { label: "Guidance", href: "/admin/startup-guidance", icon: Lightbulb },
  { label: "Linkages", href: "/admin/market-linkages", icon: Store },
];

interface AdminHeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
    avatarUrl?: string | null;
  };
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const [logoError, setLogoError] = useState(false);

  const notifications = [
    {
      id: "1",
      title: "नया उपयोगकर्ता पंजीकृत",
      time: "5 मिनट पहले",
      unread: true,
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      id: "2",
      title: "कोर्स सर्टिफिकेट अनुरोध",
      time: "25 मिनट पहले",
      unread: true,
      icon: Award,
      color: "text-blue-600 bg-blue-50",
    },
    {
      id: "3",
      title: "नया सब्सिडी आवेदन",
      time: "1 घंटा पहले",
      unread: false,
      icon: FileText,
      color: "text-amber-600 bg-amber-50",
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs font-sans">
      {/* Topmost Admin Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/admin/dashboard" className="flex items-center gap-2.5">
              <div className="relative size-9 rounded-xl bg-white border border-slate-200 overflow-hidden shadow-2xs flex items-center justify-center shrink-0">
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
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-slate-900 font-headline leading-tight">
                    Chhaigaon Udyami
                  </span>
                  <Badge className="bg-purple-600 hover:bg-purple-700 text-white text-[10px] font-bold px-1.5 py-0 h-4 uppercase tracking-wider">
                    Admin
                  </Badge>
                </div>
                <span className="text-[10px] text-slate-500 font-medium hidden sm:block">
                  प्रशासनिक नियंत्रण केंद्र (Console)
                </span>
              </div>
            </Link>
          </div>

          {/* Search Bar with Shortcut */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="text"
                placeholder="खोजें: उपयोगकर्ता, कोर्सेस, योजनाएं या भुगतान..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 pl-9 pr-12 rounded-xl bg-slate-50/80 border-slate-200 text-xs focus-visible:bg-white focus-visible:border-purple-600 focus-visible:ring-purple-600/20"
              />
              <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-400">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right Action Controls: Status, Switch to Learner, Notifications, Profile Avatar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live DB Status Pill */}
            <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>PostgreSQL सिंक</span>
            </div>

            {/* Switch to Learner View Button */}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-9 rounded-xl border-slate-200 hover:bg-blue-50 hover:text-[#0056d2] hover:border-blue-200 text-xs font-semibold gap-1.5 hidden sm:flex cursor-pointer"
            >
              <Link href="/dashboard">
                <TrendingUp className="h-3.5 w-3.5 text-[#0056d2]" />
                <span>Learner View</span>
              </Link>
            </Button>

            {/* Notifications Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative size-9 rounded-xl hover:bg-slate-100 text-slate-600 cursor-pointer"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 rounded-2xl border-slate-200 shadow-xl bg-white" align="end">
                <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">
                    सूचनाएं (Notifications)
                  </span>
                  <Badge variant="secondary" className="text-[10px] bg-purple-50 text-purple-700">
                    2 नई
                  </Badge>
                </div>
                <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  {notifications.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "p-3 flex items-start gap-3 hover:bg-slate-50 transition cursor-pointer text-xs",
                          item.unread && "bg-purple-50/30"
                        )}
                      >
                        <div className={cn("size-8 rounded-xl flex items-center justify-center shrink-0", item.color)}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <p className="font-semibold text-slate-900">{item.title}</p>
                          <p className="text-[10px] text-slate-400">{item.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>

            {/* Profile Avatar with Dropdown */}
            <AdminProfileAvatar user={user} />
          </div>
        </div>

        {/* Tab Navigation Navigation Bar */}
        <nav className="flex space-x-1 overflow-x-auto py-2 border-t border-slate-100 scrollbar-none">
          {adminTabs.map((tab) => {
            const isActive = pathname === tab.href;
            const Icon = tab.icon;
            return (
              <Button
                key={tab.href}
                asChild
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "h-8 px-3 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer gap-1.5",
                  isActive
                    ? "bg-purple-600 hover:bg-purple-700 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                )}
              >
                <Link href={tab.href}>
                  <Icon className={cn("size-3.5", isActive ? "text-white" : "text-slate-400")} />
                  <span>{tab.label}</span>
                </Link>
              </Button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
