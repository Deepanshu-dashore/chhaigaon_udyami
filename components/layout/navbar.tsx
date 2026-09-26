"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/ui/user-avatar";
import {
  BookOpen,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Search,
  Sparkles,
  ArrowRight,
  Award,
} from "lucide-react";

export function Navbar() {
  const { user, loading, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const pathname = usePathname();

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Top Announcement Bar (Coursera Style) */}
      {showAnnouncement && (
        <div className="bg-[#0056d2] text-white text-xs py-2 px-4 flex items-center justify-between font-medium shadow-xs">
          <div className="max-w-[90dvw] mx-auto w-full flex items-center justify-center gap-2 text-center">
            <span className="inline-flex items-center gap-1.5 font-bold text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>विशेष अपडेट 2026:</span>
            </span>
            <span>
              म.प्र. शासन मुख्यमंत्री उद्यम क्रांति एवं PMEGP के तहत 35% सब्सिडी आवेदन शुरू।
            </span>
            <Link
              href="/#schemes"
              className="inline-flex items-center underline font-bold text-amber-200 hover:text-white ml-1.5"
            >
              <span>योजनाएं देखें</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
          <button
            onClick={() => setShowAnnouncement(false)}
            className="text-blue-200 hover:text-white p-1 ml-2 cursor-pointer"
            aria-label="Close announcement"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Main Navigation Header */}
      <header className="w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all shadow-xs">
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
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-semibold text-lg sm:text-xl tracking-tight text-slate-900 font-headline leading-tight group-hover:text-blue-700 transition-colors">
                    छैगांव उद्यमी
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-slate-500 font-medium tracking-normal -mt-0.5">
                    ग्रामीण कौशल व उद्यम मंच
                  </span>
                </div>
              </Link>
            </div>

            {/* Middle: Search Bar */}
            {!isAuthPage && (
              <div className="hidden md:flex items-center w-32 sm:w-48 lg:w-48 mx-2">
                <form action="/courses" method="GET" className="w-full relative flex items-center">
                  <input
                    type="text"
                    name="q"
                    placeholder="कोर्स या कौशल खोजें..."
                    className="w-full h-8 min-h-8 pl-3.5 pr-10 text-xs bg-slate-50 border border-slate-300 rounded-full focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
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
                <nav className="hidden xl:flex items-center gap-1.5 text-xs">
                  {[
                    { href: "/", label: "होम" },
                    { href: "/courses", label: "पाठ्यक्रम" },
                    { href: "/about", label: "हमारे बारे में" },
                    { href: "/contact", label: "संपर्क करें" },
                    { href: "/apply", label: "प्रवेश आवेदन" },
                    { href: "/certificates", label: "सर्टिफिकेट्स" },
                  ].map((item) => {
                    const active =
                      item.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`px-3 py-1.5 rounded-md transition-all ${
                          active
                            ? "bg-blue-50 text-[#0056d2] font-bold border border-blue-200/80 shadow-2xs"
                            : "text-slate-600 hover:text-blue-700 hover:bg-slate-50 font-medium"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>
              )}

              {loading ? (
                <div className="h-9 w-24 bg-slate-200 rounded-lg animate-pulse" />
              ) : user ? (
                <div className="flex items-center gap-2.5">
                  {/* Prominent Dashboard Action Button */}
                  <Link
                    href="/dashboard"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                      pathname.startsWith("/dashboard")
                        ? "bg-blue-600 text-white border-blue-700 shadow-xs"
                        : "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 shadow-2xs"
                    }`}
                  >
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    <span>डैशबोर्ड</span>
                  </Link>

                  {/* User Profile Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                      className="flex items-center gap-2 p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <UserAvatar
                        src={user.user_metadata?.avatar_url || user.user_metadata?.picture}
                        name={user.user_metadata?.name || user.email}
                        size="sm"
                      />
                      <span className="hidden sm:inline text-xs font-semibold text-slate-800 max-w-25 truncate">
                        {user.user_metadata?.name || user.email?.split("@")[0]}
                      </span>
                      <ChevronDown className="h-3 w-3 text-slate-400" />
                    </button>

                    {userDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-52 rounded-lg bg-white border border-slate-200 shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="px-4 py-2 border-b border-slate-100">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {user.user_metadata?.name || "User"}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            {user.email}
                          </p>
                        </div>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <LayoutDashboard className="h-4 w-4 text-blue-600" />
                          <span>डैशबोर्ड देखें</span>
                        </Link>
                        <Link
                          href="/dashboard/certificates"
                          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <Award className="h-4 w-4 text-amber-600" />
                          <span>मेरे प्रमाण पत्र (Certificates)</span>
                        </Link>
                        <Link
                          href="/certificates"
                          className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition border-t border-slate-100"
                          onClick={() => setUserDropdownOpen(false)}
                        >
                          <span>प्रमाण पत्र सत्यापन पोर्टल</span>
                        </Link>
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            signOut();
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition text-left cursor-pointer border-t border-slate-100"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>लॉग आउट</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs font-bold text-slate-700 hover:text-blue-600 h-9 px-3 rounded-md"
                    >
                      लॉग इन
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-md h-9 px-4 shadow-xs"
                    >
                      रजिस्टर करें
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 rounded-md border border-slate-200 text-slate-700"
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
                className="w-full h-10 pl-3 pr-10 text-xs bg-slate-50 border border-slate-300 rounded-md"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 h-6 w-6 rounded bg-blue-600 text-white flex items-center justify-center"
              >
                <Search className="h-3 w-3" />
              </button>
            </form>
            <div className="flex flex-col gap-1 text-xs font-semibold text-slate-700 pt-2">
              {user && (
                <div className="p-3 mb-2 rounded-lg bg-blue-50/80 border border-blue-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <UserAvatar
                      src={user.user_metadata?.avatar_url || user.user_metadata?.picture}
                      name={user.user_metadata?.name || user.email}
                      size="sm"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900 truncate max-w-35">
                        {user.user_metadata?.name || "User"}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate max-w-35">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-2.5 py-1 text-[11px] font-bold bg-[#0056d2] text-white rounded-md shadow-xs"
                  >
                    डैशबोर्ड
                  </Link>
                </div>
              )}

              {[
                { href: "/", label: "होम" },
                { href: "/dashboard", label: "डैशबोर्ड", icon: LayoutDashboard },
                { href: "/courses", label: "पाठ्यक्रम" },
                { href: "/about", label: "हमारे बारे में" },
                { href: "/contact", label: "संपर्क करें" },
                { href: "/apply", label: "प्रवेश आवेदन" },
                { href: "/certificates", label: "सर्टिफिकेट्स", icon: Award },
              ].map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`py-2 px-3 rounded-md flex items-center gap-2 transition-all ${
                      active
                        ? "bg-blue-50 text-[#0056d2] font-bold border-l-4 border-[#0056d2]"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {Icon && <Icon className="h-4 w-4 text-blue-600" />}
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {user ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut();
                  }}
                  className="py-2 px-3 text-rose-600 hover:bg-rose-50 rounded-md flex items-center gap-2 text-left cursor-pointer border-t border-slate-100 mt-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>लॉग आउट</span>
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 text-center text-xs font-bold text-slate-700 border border-slate-200 rounded-md hover:bg-slate-50"
                  >
                    लॉग इन
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 text-center text-xs font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    रजिस्टर करें
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
