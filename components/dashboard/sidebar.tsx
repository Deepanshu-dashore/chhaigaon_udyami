"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: "📊" },
  { label: "My Courses", href: "/dashboard/courses", icon: "📖" },
  { label: "Learning Center", href: "/dashboard/learning", icon: "🎓" },
  { label: "Certificates", href: "/dashboard/certificates", icon: "📜" },
  { label: "My Profile", href: "/dashboard/profile", icon: "👤" },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 min-h-screen p-4 flex flex-col justify-between">
      <div className="space-y-6">
        <div className="px-3 py-2">
          <Link href="/" className="text-xl font-black tracking-tight text-emerald-600">
            Chhaigaon Udyami
          </Link>
          <p className="text-xs text-zinc-500 mt-0.5">Learner Dashboard</p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-semibold"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100"
                )}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 text-xs text-zinc-500 hover:text-emerald-600 transition-colors"
        >
          ← Back to Homepage
        </Link>
      </div>
    </aside>
  );
}
