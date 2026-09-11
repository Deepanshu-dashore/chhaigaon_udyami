"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  GraduationCap,
  ChevronDown,
} from "lucide-react";

export function Navbar() {
  const { user, loading, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  const navLinks = [
    { label: "कोर्सेज (Courses)", href: "/courses" },
    { label: "उद्यमिता योजनाएं (Schemes)", href: "/#schemes" },
    { label: "मेंटरशिप (Mentorship)", href: "/#mentorship" },
    { label: "हमारे बारे में (About)", href: "/#about" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-10 w-10 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
              <Image
                src="/assets/logo.png"
                alt="छैगांव उद्यमी Logo"
                width={40}
                height={40}
                className="object-contain drop-shadow-sm"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 flex items-center gap-1.5 font-headline">
                छैगांव उद्यमी
                <span className="text-[10px] bg-primary-fixed text-on-primary-fixed font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wider font-label">
                  Rural Hub
                </span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium -mt-0.5 hidden sm:inline font-label">
                Chhaigaon Udyami Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          {!isAuthPage && (
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? "text-emerald-700 bg-emerald-50 font-semibold"
                        : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right Action / Auth Buttons */}
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="h-8 w-24 bg-slate-200 rounded-lg animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="h-8 w-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                    {user.email?.charAt(0) || "U"}
                  </div>
                  <div className="hidden sm:flex flex-col text-left text-xs">
                    <span className="font-semibold text-slate-900 max-w-[120px] truncate">
                      {user.user_metadata?.name || user.email?.split("@")[0]}
                    </span>
                    <span className="text-[10px] text-emerald-600 font-medium">
                      Active Learner
                    </span>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500">Signed in as</p>
                      <p className="text-xs font-semibold text-slate-900 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4 text-emerald-600" />
                      Dashboard (डैशबोर्ड)
                    </Link>

                    <Link
                      href="/courses"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <BookOpen className="h-4 w-4 text-teal-600" />
                      My Courses (मेरे कोर्सेज)
                    </Link>

                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="h-4 w-4" />
                        लॉग आउट (Sign Out)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="font-semibold text-xs sm:text-sm text-slate-700 hover:bg-slate-100">
                    लॉग इन (Log In)
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="sm"
                    className="font-semibold text-xs sm:text-sm bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-sm shadow-emerald-600/20"
                  >
                    शुरू करें (Sign Up)
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            {!isAuthPage && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && !isAuthPage && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-sm font-medium rounded-lg text-slate-700 hover:bg-slate-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {!user && (
            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full justify-center">
                  लॉग इन (Log In)
                </Button>
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center bg-emerald-600 hover:bg-emerald-700 text-white">
                  नया खाता बनाएं (Register Free)
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
