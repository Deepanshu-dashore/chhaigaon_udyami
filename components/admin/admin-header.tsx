"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AdminProfileAvatar } from "@/components/admin/admin-profile-avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Award,
  FileText,
  Bell,
  CheckCircle2,
  PanelLeft,
  Crown,
  ShieldUser,
} from "lucide-react";

interface AdminHeaderProps {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
    avatarUrl?: string | null;
  };
  onOpenMobileNav?: () => void;
}

export function AdminHeader({ user, onOpenMobileNav }: AdminHeaderProps) {
  const [logoError, setLogoError] = useState(false);

  const isSuperAdmin =
    user?.role === "SUPER_ADMIN" ||
    user?.email === "dipanshu.dashore.dev@gmail.com" ||
    user?.email === "admin@chhaigaonudyami.in";

  const notifications = [
    {
      id: "1",
      title: "New User Registered",
      time: "5 mins ago",
      unread: true,
      icon: CheckCircle2,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      id: "2",
      title: "Certificate Claim Request",
      time: "25 mins ago",
      unread: true,
      icon: Award,
      color: "text-blue-600 bg-blue-50",
    },
    {
      id: "3",
      title: "New Scheme Application",
      time: "1 hour ago",
      unread: false,
      icon: FileText,
      color: "text-amber-600 bg-amber-50",
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {onOpenMobileNav && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenMobileNav}
                className="lg:hidden size-9 rounded-sm text-slate-600 hover:bg-slate-100 cursor-pointer shrink-0"
              >
                <PanelLeft className="size-5 text-slate-700" />
                <span className="sr-only">Toggle Sidebar</span>
              </Button>
            )}
            <Link href="/admin/dashboard" className="flex items-center gap-2.5">
              <div className="relative size-9 rounded-lg bg-white border border-slate-200 overflow-hidden shadow-2xs flex items-center justify-center shrink-0">
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
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-slate-900 font-headline leading-tight">
                    Chhaigaon Udyami
                  </span>
                  <Badge variant="outline" className="bg-slate-100/80 text-slate-600 border-slate-200 text-[10px] font-semibold px-1.5 py-0 h-4.5 uppercase tracking-wider rounded-md shadow-none pointer-events-none select-none">
                    Console
                  </Badge>
                </div>
                <span className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
                  Skill Development & Entrepreneurship Management Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Right Action Controls: Notifications & Profile Avatar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isSuperAdmin && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50/80 border border-amber-200/80 text-amber-900 text-xs font-semibold">
                <ShieldUser className="size-5 text-white bg-amber-500 p-0.5 rounded-full shadow-sm" />
                <span>Super Admin Active</span>
              </div>
            )}
            {/* Notifications Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative size-9 rounded-sm hover:bg-slate-100 text-slate-600 cursor-pointer"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 rounded-xl border-slate-200 shadow-xl bg-white" align="end">
                <div className="p-3 border-b border-slate-100 flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">
                    Notifications
                  </span>
                  <Badge variant="secondary" className="text-[10px] bg-blue-50 text-[#0056d2]">
                    2 New
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
                          item.unread && "bg-blue-50/30"
                        )}
                      >
                        <div className={cn("size-8 rounded-lg flex items-center justify-center shrink-0", item.color)}>
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
      </div>
    </header>
  );
}
