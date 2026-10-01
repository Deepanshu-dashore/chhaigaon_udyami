"use client";

import React, { useState } from "react";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

interface AdminLayoutWrapperProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
    avatarUrl?: string | null;
  };
  children: React.ReactNode;
}

export function AdminLayoutWrapper({ user, children }: AdminLayoutWrapperProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50/80 flex font-sans text-slate-900">
      {/* Desktop Fixed Left Sidebar */}
      <div className="hidden lg:flex shrink-0">
        <AdminSidebar
          user={user}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
          className="sticky top-0 h-screen"
        />
      </div>

      {/* Mobile Drawer Sidebar */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0 w-64 border-r border-slate-200 bg-white">
          <SheetTitle className="sr-only">Admin Navigation Drawer</SheetTitle>
          <AdminSidebar
            user={user}
            isCollapsed={false}
            className="h-full border-r-0"
          />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader
          user={user}
          onOpenMobileNav={() => setMobileOpen(true)}
        />
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
