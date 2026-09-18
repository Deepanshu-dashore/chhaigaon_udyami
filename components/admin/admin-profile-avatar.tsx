"use client";

import React from "react";
import Link from "next/link";
import UserAvatar from "@/components/ui/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  Settings,
  ShieldCheck,
  Activity,
  LogOut,
  ExternalLink,
  ChevronDown,
  Lock,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface AdminProfileAvatarProps {
  user?: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
    avatarUrl?: string | null;
  };
}

export function AdminProfileAvatar({ user }: AdminProfileAvatarProps) {
  const { user: authUser, signOut } = useAuth();

  const displayName =
    user?.name ||
    authUser?.user_metadata?.full_name ||
    authUser?.user_metadata?.name ||
    authUser?.email?.split("@")[0] ||
    "Admin User";

  const displayEmail = user?.email || authUser?.email || "admin@chhaigaonudyami.in";
  const displayRole = user?.role || authUser?.user_metadata?.role || "ADMIN";
  const avatarUrl =
    user?.avatarUrl ||
    authUser?.user_metadata?.avatar_url ||
    authUser?.user_metadata?.picture ||
    null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex items-center gap-2.5 h-10 px-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer focus-visible:ring-1 focus-visible:ring-blue-600"
        >
          <div className="relative">
            <UserAvatar
              src={avatarUrl}
              name={displayName}
              size="sm"
              className="size-8 ring-2 ring-blue-600/20"
            />
            <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div className="hidden lg:flex flex-col items-start text-left">
            <span className="text-xs font-bold text-slate-900 leading-tight">
              {displayName}
            </span>
            <span className="text-[10px] text-slate-500 font-semibold tracking-tight">
              {displayRole}
            </span>
          </div>

          <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden sm:block" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 p-1.5 rounded-2xl border-slate-200 shadow-xl bg-white"
        align="end"
        sideOffset={6}
      >
        <DropdownMenuLabel className="p-2.5 font-normal">
          <div className="flex items-center gap-3">
            <UserAvatar
              src={avatarUrl}
              name={displayName}
              size="md"
              className="size-10"
            />
            <div className="flex flex-col space-y-0.5 overflow-hidden">
              <p className="text-xs font-bold text-slate-900 truncate font-headline">
                {displayName}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {displayEmail}
              </p>
              <div className="pt-1">
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-[#0056d2] border-blue-200 text-[10px] font-bold px-2 py-0 h-4 flex items-center gap-1 w-fit"
                >
                  <ShieldCheck className="h-2.5 w-2.5" />
                  {displayRole}
                </Badge>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href="/admin/settings"
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium cursor-pointer"
            >
              <Settings className="h-4 w-4 text-slate-500" />
              <span>कंसोल सेटिंग्स</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/admin/activity-logs"
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium cursor-pointer"
            >
              <Activity className="h-4 w-4 text-slate-500" />
              <span>सिस्टम ऑडिट लॉग्स</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium cursor-pointer"
            >
              <User className="h-4 w-4 text-slate-500" />
              <span>विद्यार्थी डैशबोर्ड</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium cursor-pointer"
            >
              <ExternalLink className="h-4 w-4 text-slate-500" />
              <span>मुख्य वेबसाइट देखें</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-semibold text-rose-600 focus:bg-rose-50 focus:text-rose-700 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>लॉग आउट</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
