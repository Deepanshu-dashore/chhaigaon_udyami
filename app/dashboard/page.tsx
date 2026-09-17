import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import UserAvatar from "@/components/ui/user-avatar";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ShieldCheck,
  CheckCircle,
  Database,
  KeyRound,
  Mail,
  Home,
  BookOpen,
  FileText,
  History,
  LogIn,
  LogOut,
  Sparkles,
  GraduationCap,
  Award,
  TrendingUp,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login?redirectedFrom=/dashboard");
  }

  // Lookup Prisma database user with activity logs
  let dbUser = null;
  try {
    dbUser = await prisma.user.findFirst({
      where: {
        OR: [
          { supabaseUserId: authUser.id },
          ...(authUser.email ? [{ email: authUser.email }] : []),
        ],
      },
      include: {
        profile: true,
        activityLogs: {
          orderBy: { timestamp: "desc" },
          take: 6,
        },
      },
    });
  } catch (err) {
    console.error("Failed to load user from database in dashboard:", err);
  }

  const avatarUrl =
    dbUser?.profile?.profilePhoto ||
    authUser.user_metadata?.avatar_url ||
    authUser.user_metadata?.picture ||
    null;

  const displayName =
    dbUser?.name ||
    authUser.user_metadata?.full_name ||
    authUser.user_metadata?.name ||
    authUser.email?.split("@")[0] ||
    "उद्यमी";

  const userRole = dbUser?.role || authUser.user_metadata?.role || "STUDENT";
  const authProvider = authUser.app_metadata?.provider || "email";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Banner */}
      <div className="bg-linear-to-r from-[#0056d2] via-blue-700 to-indigo-800 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <UserAvatar
              src={avatarUrl}
              name={displayName}
              size="xl"
              alt={displayName}
              className="border-2 border-white/40 shadow-sm ring-2 ring-white/10"
            />

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-headline">
                  नमस्ते, {displayName}! 👋
                </h1>
                <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-transparent backdrop-blur-xs font-bold">
                  {userRole}
                </Badge>
                <Badge className="bg-emerald-400 hover:bg-emerald-500 text-slate-950 font-semibold border-transparent gap-1">
                  <CheckCircle className="h-3 w-3" />
                  सत्यापित उद्यमी
                </Badge>
              </div>
              <p className="text-blue-100 text-xs sm:text-sm max-w-xl font-body">
                छैगांव उद्यमी डिजिटल लर्निंग एवं सब्सिडी मंच पर आपका स्वागत है। आपका Supabase सत्र सक्रिय है।
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              asChild
              className="rounded-lg bg-white text-[#0056d2] hover:bg-blue-50 font-bold border-0 shadow-xs cursor-pointer h-9 px-4 text-xs"
            >
              <Link href="/courses">
                <BookOpen className="h-4 w-4 mr-1.5" />
                <span>कोर्स शुरू करें</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              className="rounded-lg bg-white/15 hover:bg-white/25 text-white font-medium border-0 cursor-pointer h-9 px-4 text-xs"
            >
              <Link href="/schemes">
                <FileText className="h-4 w-4 mr-1.5" />
                <span>योजनाएं</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-100 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">नामांकित कोर्सेस</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 font-numeric">2</p>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <TrendingUp className="h-3 w-3" /> सक्रिय प्रगति
              </span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#0056d2] flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-100 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">सरकारी योजनाएं</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 font-numeric">5</p>
              <span className="text-[11px] text-blue-600 font-semibold flex items-center gap-1 mt-0.5">
                <Sparkles className="h-3 w-3" /> PMEGP / Mudra
              </span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-100 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">जारी प्रमाण पत्र</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 font-numeric">1</p>
              <span className="text-[11px] text-purple-600 font-semibold flex items-center gap-1 mt-0.5">
                <Award className="h-3 w-3" /> वेरिफाइड
              </span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <GraduationCap className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-100 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">सत्र स्थिति</p>
              <p className="text-base font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Online
              </p>
              <span className="text-[11px] text-slate-500 uppercase font-semibold">
                {authProvider}
              </span>
            </div>
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Verification & Metadata Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Supabase Auth Session Card */}
        <Card className="bg-white border-slate-100 shadow-xs">
          <CardHeader className="pb-3 border-b border-slate-50">
            <div className="flex items-center gap-2 text-[#0056d2]">
              <KeyRound className="h-5 w-5" />
              <CardTitle className="text-base font-bold font-headline">
                Supabase Auth सत्र विवरण
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              सक्रिय प्रमाणीकरण टोकन एवं प्रदाता विवरण
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
              <span className="text-slate-500">Provider</span>
              <Badge variant="secondary" className="uppercase font-bold text-[10px] bg-slate-100 border-0">
                {authProvider}
              </Badge>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
              <span className="text-slate-500">ईमेल (Email)</span>
              <span className="font-medium text-slate-900 flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                {authUser.email || "N/A"}
              </span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
              <span className="text-slate-500">Supabase User ID</span>
              <code className="text-[11px] font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-700 break-all">
                {authUser.id}
              </code>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="text-slate-500">अंतिम साइन इन</span>
              <span className="text-slate-700 font-medium text-xs">
                {authUser.last_sign_in_at
                  ? new Date(authUser.last_sign_in_at).toLocaleString("en-IN")
                  : "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* PostgreSQL & Prisma Database Sync Card */}
        <Card className="bg-white border-slate-100 shadow-xs">
          <CardHeader className="pb-3 border-b border-slate-50">
            <div className="flex items-center gap-2 text-emerald-600">
              <Database className="h-5 w-5" />
              <CardTitle className="text-base font-bold font-headline">
                PostgreSQL डेटाबेस रिकॉर्ड
              </CardTitle>
            </div>
            <CardDescription className="text-xs">
              Prisma ORM डेटाबेस सिंक्रोनाइज़ेशन स्थिति
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5 space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
              <span className="text-slate-500">डेटाबेस स्थिति</span>
              <Badge className="bg-emerald-50 text-emerald-700 border-0 hover:bg-emerald-100 flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" />
                {dbUser ? "सिंक हुआ (Synced)" : "प्रतीक्षारत (Pending Sync)"}
              </Badge>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
              <span className="text-slate-500">Prisma User ID</span>
              <code className="text-[11px] font-mono bg-slate-50 px-2 py-0.5 rounded text-slate-700 break-all">
                {dbUser?.id || "N/A"}
              </code>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-slate-50">
              <span className="text-slate-500">आवंटित भूमिका</span>
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-bold border-0">
                {dbUser?.role || userRole}
              </Badge>
            </div>

            <div className="flex justify-between items-center py-1.5">
              <span className="text-slate-500">खाता स्थिति</span>
              <span className="font-bold text-emerald-600 text-xs">
                {dbUser?.status || "ACTIVE"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Login & Logout Activity Tracker Card using Shadcn Table */}
      <Card className="bg-white border-slate-100 shadow-xs">
        <CardHeader className="pb-3 border-b border-slate-50 flex flex-row items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-900">
              <History className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-base font-bold font-headline">
                लॉगिन एवं सुरक्षा ऑडिट ट्रेल (Activity Logs)
              </CardTitle>
            </div>
            <CardDescription className="text-xs mt-1">
              IP पता, डिवाइस और टाइमस्टैम्प की रीयल-टाइम सुरक्षा ट्रैकिंग
            </CardDescription>
          </div>
          <Badge variant="secondary" className="text-slate-600 text-[11px] bg-slate-100 border-0">
            सुरक्षा लॉग्स
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          {dbUser?.activityLogs && dbUser.activityLogs.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="border-b border-slate-50 bg-slate-50/40">
                  <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Action</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Provider</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Device / IP</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-600 uppercase text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dbUser.activityLogs.map((log: any) => {
                  const isLogin = log.action === "LOGIN" || log.action === "SIGNUP";
                  return (
                    <TableRow key={log.id} className="hover:bg-slate-50/60 border-b border-slate-50">
                      <TableCell className="font-bold">
                        <Badge
                          variant="secondary"
                          className={`gap-1 font-bold border-0 text-[10px] ${
                            isLogin
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-rose-50 text-rose-700"
                          }`}
                        >
                          {isLogin ? (
                            <LogIn className="h-3 w-3" />
                          ) : (
                            <LogOut className="h-3 w-3" />
                          )}
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-700 font-medium uppercase text-xs">
                        {log.provider || "N/A"}
                      </TableCell>
                      <TableCell className="text-slate-600 text-xs">
                        <span className="font-medium text-slate-800">
                          {log.deviceInfo || "Browser"}
                        </span>
                        {log.ipAddress && (
                          <span className="text-slate-400 text-[10px] block font-mono">
                            IP: {log.ipAddress}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-slate-500 text-right whitespace-nowrap font-medium text-xs font-numeric">
                        {new Date(log.timestamp).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="text-xs text-slate-500 py-6 text-center">
              कोई पिछला एक्टिविटी लॉग नहीं मिला। अगली बार लॉग इन / लॉग आउट करने पर यहाँ रिकॉर्ड प्रदर्शित होगा।
            </p>
          )}
        </CardContent>
      </Card>

      {/* Quick Navigation Cards using Clean Subtle Buttons */}
      <Card className="bg-white border-slate-100 shadow-xs">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold font-headline text-slate-900">
            त्वरित नेविगेशन एवं क्रियाएं (Quick Actions)
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Button
              asChild
              variant="ghost"
              className="h-11 rounded-lg justify-start font-semibold text-slate-700 bg-slate-50/70 hover:bg-blue-50 hover:text-[#0056d2] border-0 transition-all cursor-pointer text-xs"
            >
              <Link href="/">
                <Home className="h-4 w-4 mr-2 text-[#0056d2]" />
                <span>मुख्य पृष्ठ (Home)</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="h-11 rounded-lg justify-start font-semibold text-slate-700 bg-slate-50/70 hover:bg-blue-50 hover:text-[#0056d2] border-0 transition-all cursor-pointer text-xs"
            >
              <Link href="/courses">
                <BookOpen className="h-4 w-4 mr-2 text-[#0056d2]" />
                <span>कोर्सेस (Courses)</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="h-11 rounded-lg justify-start font-semibold text-slate-700 bg-slate-50/70 hover:bg-blue-50 hover:text-[#0056d2] border-0 transition-all cursor-pointer text-xs"
            >
              <Link href="/schemes">
                <FileText className="h-4 w-4 mr-2 text-[#0056d2]" />
                <span>सरकारी योजनाएं</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="ghost"
              className="h-11 rounded-lg justify-start font-semibold text-rose-700 bg-rose-50/50 hover:bg-rose-50 hover:text-rose-800 border-0 transition-all cursor-pointer text-xs"
            >
              <Link href="/auth/logout">
                <LogOut className="h-4 w-4 mr-2 text-rose-600" />
                <span>लॉगआउट (Logout)</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
