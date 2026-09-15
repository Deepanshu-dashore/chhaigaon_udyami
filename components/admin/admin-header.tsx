"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

const adminTabs = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Users", href: "/admin/users" },
  { label: "Courses", href: "/admin/courses" },
  { label: "Lessons", href: "/admin/lessons" },
  { label: "Videos", href: "/admin/videos" },
  { label: "Payments", href: "/admin/payments" },
  { label: "Certificates", href: "/admin/certificates" },
  { label: "Schemes", href: "/admin/schemes" },
  { label: "Startup Guidance", href: "/admin/startup-guidance" },
  { label: "Market Linkages", href: "/admin/market-linkages" },
];

export function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded font-bold uppercase tracking-wider">
              Admin
            </span>
            <Link href="/admin/dashboard" className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
              Chhaigaon Udyami Console
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-emerald-600 transition-colors"
            >
              <span>Learner View</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        <nav className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none">
          {adminTabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
