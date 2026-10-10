"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/ui/user-avatar";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
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
  Landmark,
  FileCheck2,
  FileText,
  Images,
  GraduationCap,
  Milk,
  UtensilsCrossed,
  SunMedium,
  Briefcase,
} from "lucide-react";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; href: string; icon?: React.ElementType }
>(({ className, title, children, href, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={href}
          className={cn(
            "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50/80 hover:text-[#0056d2] focus:bg-blue-50/80 focus:text-[#0056d2] group",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-4 w-4 text-[#0056d2] shrink-0" />}
            <span className="text-xs font-bold leading-tight text-slate-900 group-hover:text-[#0056d2]">
              {title}
            </span>
          </div>
          {children && (
            <p className="line-clamp-2 text-[11px] leading-snug text-slate-500 mt-1 font-normal">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export function Navbar() {
  const { user, loading, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* Top Announcement Bar (Coursera Style) - Hides when scrolled */}
      {showAnnouncement && !isScrolled && (
        <div className="bg-[#0056d2] text-white text-xs py-2 px-4 flex items-center justify-between font-medium shadow-xs transition-all">
          <div className="max-w-[90dvw] mx-auto w-full flex items-center justify-center gap-2 text-center">
            <span className="inline-flex items-center gap-1.5 font-bold text-amber-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span>विशेष अपडेट 2026:</span>
            </span>
            <span>
              म.प्र. शासन मुख्यमंत्री उद्यम क्रांति एवं PMEGP के तहत 35% सब्सिडी आवेदन शुरू।
            </span>
            <Link
              href="/schemes"
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
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-3 lg:gap-6">
            
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
                    style={{ width: "auto", height: "auto" }}
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

            {/* Middle: Shadcn Navigation Menu (Desktop) */}
            {!isAuthPage && (
              <div className="hidden lg:flex items-center flex-1 justify-center">
                <NavigationMenu viewport={false}>
                  <NavigationMenuList className="gap-0.5">
                    {/* Home */}
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/"
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "h-8 px-3 text-xs font-semibold rounded-md",
                            pathname === "/"
                              ? "bg-blue-50 text-[#0056d2] font-bold border border-blue-200/80 shadow-2xs"
                              : "text-slate-700 hover:text-[#0056d2]"
                          )}
                        >
                          होम
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    {/* Courses Dropdown */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={cn(
                          "h-8 px-3 text-xs font-semibold rounded-md",
                          pathname.startsWith("/courses")
                            ? "bg-blue-50 text-[#0056d2] font-bold border border-blue-200/80 shadow-2xs"
                            : "text-slate-700 hover:text-[#0056d2]"
                        )}
                      >
                        पाठ्यक्रम
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid gap-2 p-3 w-[540px] md:w-[620px] grid-cols-[1.15fr_1.35fr]">
                          <li className="row-span-4">
                            <NavigationMenuLink asChild>
                              <Link
                                className="relative flex h-full w-full select-none flex-col justify-between overflow-hidden rounded-lg p-4 text-white no-underline outline-none shadow-md group transition-all"
                                href="/courses"
                              >
                                {/* Background Image */}
                                <Image
                                  src="/assets/courses-nav-bg.jpg"
                                  alt="ग्रामीण कौशल व उद्यम प्रशिक्षण"
                                  fill
                                  sizes="(max-width: 768px) 100vw, 300px"
                                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                  priority
                                />
                                {/* Rich Gradient Overlay for High Contrast Text */}
                                <div className="absolute inset-0 bg-linear-to-t from-blue-950 via-blue-900/60 to-blue-900/40 group-hover:via-blue-900/80 transition-colors" />

                                <div className="relative z-10">
                                  <div className="h-8 w-8 rounded-md bg-white/20 backdrop-blur-xs flex items-center justify-center mb-3 shadow-xs">
                                    <BookOpen className="h-4 w-4 text-amber-300" />
                                  </div>
                                  <div className="text-sm font-bold text-white mb-1 drop-shadow-xs">
                                    सभी 10+ उद्यमी पाठ्यक्रम
                                  </div>
                                  <p className="text-[11px] leading-relaxed text-blue-100/95 font-medium">
                                    व्यावहारिक कौशल, चरणबद्ध वीडियो लेक्चर, शासकीय सब्सिडी और डिजिटल प्रमाण पत्र।
                                  </p>
                                </div>
                                <div className="relative z-10 pt-4 border-t border-t-white/30!">
                                  <span className="inline-flex items-center text-[11px] font-bold text-amber-300 group-hover:text-white transition-colors">
                                    पाठ्यक्रम सूची देखें <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                                  </span>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <ListItem
                            href="/courses?category=dairy"
                            title="डेयरी एवं पशुपालन उद्यम"
                            icon={Milk}
                          >
                            आधुनिक डेयरी प्रबंधन, दुग्ध प्रसंस्करण व नस्ल सुधार।
                          </ListItem>
                          <ListItem
                            href="/courses?category=food-processing"
                            title="खाद्य प्रसंस्करण व वैल्यू एडिशन"
                            icon={UtensilsCrossed}
                          >
                            मसाला उद्योग, आटा मिल, पापड़ व फूड पैकेजिंग इकाई।
                          </ListItem>
                          <ListItem
                            href="/courses?category=solar"
                            title="सौर ऊर्जा व ग्रामीण तकनीकी"
                            icon={SunMedium}
                          >
                            सोलर रूफटॉप, सोलर पंप व तकनीकी रखरखाव।
                          </ListItem>
                          <ListItem
                            href="/courses?category=enterprise"
                            title="सूक्ष्म उद्यम व व्यापार प्रबंधन"
                            icon={Briefcase}
                          >
                            बिजनेस अकाउंटिंग, प्रोजेक्ट रिपोर्ट व मार्केट लिंकेज।
                          </ListItem>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Schemes & Services Dropdown */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={cn(
                          "h-8 px-3 text-xs font-semibold rounded-md",
                          pathname.startsWith("/schemes") ||
                          pathname.startsWith("/certificates") ||
                          pathname.startsWith("/apply") ||
                          pathname.startsWith("/gallery")
                            ? "bg-blue-50 text-[#0056d2] font-bold border border-blue-200/80 shadow-2xs"
                            : "text-slate-700 hover:text-[#0056d2]"
                        )}
                      >
                        योजनाएं व सेवाएं
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[460px] gap-2 p-3 grid-cols-2">
                          <ListItem
                            href="/schemes"
                            title="शासकीय सब्सिडी योजनाएं"
                            icon={Landmark}
                          >
                            PMEGP, मुख्यमंत्री उद्यम क्रांति व मुद्रा योजना।
                          </ListItem>
                          <ListItem
                            href="/certificates"
                            title="प्रमाण पत्र सत्यापन"
                            icon={FileCheck2}
                          >
                            QR कोड व रोल नंबर से डिजिटल वेरिफिकेशन पोर्टल।
                          </ListItem>
                          <ListItem
                            href="/apply"
                            title="प्रवेश व प्रशिक्षण आवेदन"
                            icon={GraduationCap}
                          >
                            नवीन कौशल विकास बैचों के लिए सीधा ऑनलाइन फॉर्म।
                          </ListItem>
                          <ListItem
                            href="/gallery"
                            title="चित्र दीर्घा (Gallery)"
                            icon={Images}
                          >
                            प्रशिक्षण कार्यशालाओं व सफल उद्यमियों की झलकियां।
                          </ListItem>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* About */}
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/about"
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "h-8 px-3 text-xs font-semibold rounded-md",
                            pathname === "/about"
                              ? "bg-blue-50 text-[#0056d2] font-bold border border-blue-200/80 shadow-2xs"
                              : "text-slate-700 hover:text-[#0056d2]"
                          )}
                        >
                          हमारे बारे में
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    {/* Contact */}
                    <NavigationMenuItem>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/contact"
                          className={cn(
                            navigationMenuTriggerStyle(),
                            "h-8 px-3 text-xs font-semibold rounded-md",
                            pathname === "/contact"
                              ? "bg-blue-50 text-[#0056d2] font-bold border border-blue-200/80 shadow-2xs"
                              : "text-slate-700 hover:text-[#0056d2]"
                          )}
                        >
                          संपर्क करें
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            )}

            {/* Right: Search + Auth Actions */}
            <div className="flex items-center gap-2.5 shrink-0">
              {/* Search Bar */}
              {!isAuthPage && (
                <div className="hidden xl:flex items-center w-40 2xl:w-48">
                  <form action="/courses" method="GET" className="w-full relative flex items-center">
                    <input
                      type="text"
                      name="q"
                      placeholder="कोर्स खोजें..."
                      className="w-full h-8 min-h-8 pl-3 pr-8 text-xs bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400"
                    />
                    <button
                      type="submit"
                      className="absolute right-1 h-6 w-6 rounded-md bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors cursor-pointer"
                      aria-label="Search"
                    >
                      <Search className="h-3 w-3" />
                    </button>
                  </form>
                </div>
              )}

              {loading ? (
                <div className="h-8 w-20 bg-slate-200 rounded-md animate-pulse" />
              ) : user ? (
                <div className="flex items-center gap-2">
                  {/* Dashboard Action Button */}
                  <Button
                    asChild
                    size="sm"
                    className={cn(
                      "h-8 px-3 text-xs font-bold rounded-md border shadow-2xs",
                      pathname.startsWith("/dashboard")
                        ? "bg-[#0056d2] text-white border-blue-700 hover:bg-blue-700 shadow-xs"
                        : "bg-blue-50 text-[#0056d2] hover:bg-blue-100 border-blue-200"
                    )}
                  >
                    <Link href="/dashboard" className="inline-flex items-center gap-1.5">
                      <LayoutDashboard className="h-3.5 w-3.5" />
                      <span>डैशबोर्ड</span>
                    </Link>
                  </Button>

                  {/* User Profile Dropdown using Shadcn DropdownMenu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex items-center gap-2 p-1 rounded-md border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer outline-none">
                        <UserAvatar
                          src={user.user_metadata?.avatar_url || user.user_metadata?.picture}
                          name={user.user_metadata?.name || user.email}
                          size="sm"
                        />
                        <span className="hidden sm:inline text-xs font-semibold text-slate-800 max-w-24 truncate">
                          {user.user_metadata?.name || user.email?.split("@")[0]}
                        </span>
                        <ChevronDown className="h-3 w-3 text-slate-400" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 p-1 rounded-md border-slate-200 shadow-lg">
                      <div className="px-3 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {user.user_metadata?.name || "User"}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 cursor-pointer rounded-md"
                        >
                          <LayoutDashboard className="h-4 w-4 text-blue-600" />
                          <span>डैशबोर्ड देखें</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/dashboard/certificates"
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-800 cursor-pointer rounded-md"
                        >
                          <Award className="h-4 w-4 text-amber-600" />
                          <span>मेरे प्रमाण पत्र</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="/certificates"
                          className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer rounded-md"
                        >
                          <FileCheck2 className="h-4 w-4 text-blue-600" />
                          <span>सत्यापन पोर्टल</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1 bg-slate-100" />
                      <DropdownMenuItem
                        onClick={() => signOut()}
                        className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer rounded-md"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>लॉग आउट</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-8 px-3 text-xs font-bold text-slate-700 hover:text-[#0056d2] hover:bg-slate-50 rounded-md"
                  >
                    <Link href="/login">लॉग इन</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="h-8 px-3.5 bg-[#0056d2] hover:bg-blue-700 text-white text-xs font-bold rounded-md shadow-xs"
                  >
                    <Link href="/register">रजिस्टर करें</Link>
                  </Button>
                </div>
              )}

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <form action="/courses" method="GET" className="relative">
              <input
                type="text"
                name="q"
                placeholder="उद्योग या कौशल खोजें..."
                className="w-full h-9 pl-3 pr-10 text-xs bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:border-blue-600 focus:bg-white"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 h-6 w-6 rounded-md bg-[#0056d2] text-white flex items-center justify-center"
              >
                <Search className="h-3 w-3" />
              </button>
            </form>

            <div className="flex flex-col gap-1 text-xs font-semibold text-slate-700 pt-1">
              {user && (
                <div className="p-3 mb-2 rounded-md bg-blue-50/80 border border-blue-100 flex items-center justify-between">
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
                { href: "/courses", label: "पाठ्यक्रम (All Courses)", icon: BookOpen },
                { href: "/schemes", label: "शासकीय योजनाएं व सब्सिडी", icon: Landmark },
                { href: "/certificates", label: "प्रमाण पत्र सत्यापन", icon: FileCheck2 },
                { href: "/apply", label: "प्रवेश आवेदन", icon: GraduationCap },
                { href: "/gallery", label: "चित्र दीर्घा", icon: Images },
                { href: "/about", label: "हमारे बारे में" },
                { href: "/contact", label: "संपर्क करें" },
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
                    className={`py-2 px-3 rounded-md flex items-center gap-2.5 transition-all ${
                      active
                        ? "bg-blue-50 text-[#0056d2] font-bold border-l-4 border-[#0056d2]"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {Icon && <Icon className="h-4 w-4 text-[#0056d2]" />}
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
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full text-xs font-bold rounded-md"
                  >
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                      लॉग इन
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="w-full text-xs font-bold bg-[#0056d2] hover:bg-blue-700 text-white rounded-md"
                  >
                    <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                      रजिस्टर करें
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
