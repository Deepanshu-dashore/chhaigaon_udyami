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
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Search,
  Sparkles,
} from "lucide-react";

export function Navbar() {
  const { user, loading, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <div className="w-full">
      {/* Top Announcement Bar (Coursera Style) */}
      {showAnnouncement && (
        <div className="bg-slate-900 text-white text-xs py-2 px-4 flex items-center justify-between font-medium">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-center gap-2 text-center">
            <span className="inline-flex items-center gap-1.5 font-bold text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>विशेष अपडेट 2026:</span>
            </span>
            <span>
              म.प्र. शासन मुख्यमंत्री उद्यम क्रांति एवं PMEGP के तहत 35% सब्सिडी आवेदन शुरू।
            </span>
            <Link
              href="/#schemes"
              className="underline font-bold text-blue-300 hover:text-white ml-1.5"
            >
              योजनाएं देखें →
            </Link>
          </div>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="text-slate-400 hover:text-white p-1 ml-2 cursor-pointer"
            aria-label="Close announcement"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            
            {/* Left: Brand Logo */}
            <div className="flex items-center gap-4 shrink-0">
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="relative h-9 w-9 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <Image
                    src="/assets/logo.png"
                    alt="छैगांव उद्यमी Logo"
                    width={36}
                    height={36}
                    className="object-contain drop-shadow-sm"
                    priority
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-blue-700 flex items-center gap-1.5">
                    छैगांव उद्यमी
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded uppercase">
                      HUB
                    </span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium -mt-0.5 hidden sm:inline">
                    Rural Entrepreneurship Platform
                  </span>
                </div>
              </Link>

              {/* Explore Dropdown Trigger */}
              {!isAuthPage && (
                <div className="hidden lg:flex items-center">
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                    <span>एक्सप्लोर करें</span>
                    <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
                  </Link>
                </div>
              )}
            </div>

            {/* Middle: Coursera-Style Search Bar */}
            {!isAuthPage && (
              <div className="hidden md:flex flex-1 max-w-md mx-2">
                <form action="/courses" method="GET" className="w-full relative flex items-center">
                  <input
                    type="text"
                    name="q"
                    placeholder="आप कौन सा उद्योग या कौशल सीखना चाहते हैं?"
                    className="w-full h-10 pl-4 pr-11 text-xs bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"
                    aria-label="Search"
                  >
                    <Search className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            )}

            {/* Right: Navigation Links & Auth Buttons */}
            <div className="flex items-center gap-3">
              {!isAuthPage && (
                <nav className="hidden xl:flex items-center gap-1 text-xs font-semibold text-slate-700">
                  <Link href="/courses" className="px-2.5 py-1.5 hover:text-blue-600 rounded">
                    कोर्सेज
                  </Link>
                  <Link href="/#schemes" className="px-2.5 py-1.5 hover:text-blue-600 rounded">
                    सब्सिडी योजनाएं
                  </Link>
                  <Link href="/#credentials" className="px-2.5 py-1.5 hover:text-blue-600 rounded">
                    सर्टिफिकेट्स
                  </Link>
                </nav>
              )}

              {loading ? (
                <div className="h-8 w-20 bg-slate-200 rounded-lg animate-pulse" />
              ) : user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="h-7 w-7 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                      {user.email?.charAt(0) || "U"}
                    </div>
                    <span className="hidden sm:inline text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                      {user.user_metadata?.name || user.email?.split("@")[0]}
                    </span>
                    <ChevronDown className="h-3 w-3 text-slate-400" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-slate-200 shadow-xl py-1 z-50">
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        <LayoutDashboard className="h-3.5 w-3.5 text-blue-600" />
                        डैशबोर्ड
                      </Link>
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          signOut();
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left cursor-pointer"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        लॉग आउट
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs font-bold text-slate-700 hover:text-blue-600 h-9 px-3"
                    >
                      लॉग इन
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg h-9 px-4 shadow-xs"
                    >
                      मुफ्त जुड़ें
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 rounded-lg border border-slate-200 text-slate-700"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
            <form action="/courses" method="GET" className="relative">
              <input
                type="text"
                name="q"
                placeholder="उद्योग या कौशल खोजें..."
                className="w-full h-10 pl-3 pr-10 text-xs bg-slate-50 border border-slate-300 rounded-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 h-6 w-6 rounded bg-blue-600 text-white flex items-center justify-center"
              >
                <Search className="h-3 w-3" />
              </button>
            </form>
            <div className="flex flex-col gap-1 text-xs font-semibold text-slate-700 pt-2">
              <Link href="/courses" className="py-2 px-2 hover:bg-slate-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                कोर्सेज (Courses)
              </Link>
              <Link href="/#schemes" className="py-2 px-2 hover:bg-slate-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                सब्सिडी योजनाएं (Schemes)
              </Link>
              <Link href="/#credentials" className="py-2 px-2 hover:bg-slate-50 rounded" onClick={() => setMobileMenuOpen(false)}>
                सर्टिफिकेट्स (Certificates)
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
