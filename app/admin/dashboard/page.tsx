import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
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
  Users,
  BookOpen,
  CreditCard,
  Award,
  TrendingUp,
  FileText,
  Activity,
  Plus,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Fetch real counts from PostgreSQL via Prisma
  let userCount = 0;
  let courseCount = 0;
  let recentUsers: any[] = [];
  let recentLogs: any[] = [];

  try {
    const [uCount, cCount, rUsers, rLogs] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          isOnline: true,
          createdAt: true,
        },
      }),
      prisma.userActivityLog.findMany({
        take: 5,
        orderBy: { timestamp: "desc" },
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
      }),
    ]);

    userCount = uCount;
    courseCount = cCount;
    recentUsers = rUsers;
    recentLogs = rLogs;
  } catch (err) {
    console.error("Failed to load admin stats from DB:", err);
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-500 hover:bg-purple-600 text-white font-bold text-xs uppercase tracking-wider">
              Console
            </Badge>
            <span className="text-purple-200 text-xs font-semibold">
              सिस्टम प्रबंधन एवं नियंत्रण
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-headline">
            Chhaigaon Udyami Administrative Hub
          </h1>
          <p className="text-purple-200/80 text-xs sm:text-sm max-w-2xl font-body">
            उपयोगकर्ता डेटा, कोर्सेस, वीडियो लेक्चर्स, योजनाएं और सुरक्षा ऑडिट को वास्तविक समय में नियंत्रित करें।
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            asChild
            className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold shadow-xs cursor-pointer gap-1.5"
          >
            <Link href="/admin/courses">
              <Plus className="size-4" />
              <span>नया कोर्स जोड़ें</span>
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-xl bg-white/10 hover:bg-white/20 border-white/30 text-white font-medium cursor-pointer gap-1.5"
          >
            <Link href="/admin/users">
              <Users className="size-4" />
              <span>उपयोगकर्ता सूची</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">कुल पंजीकृत उपयोगकर्ता</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 font-numeric">
                {userCount}
              </p>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <TrendingUp className="h-3 w-3" /> सक्रिय डेटाबेस
              </span>
            </div>
            <div className="size-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">सक्रिय कोर्सेस</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 font-numeric">
                {courseCount}
              </p>
              <span className="text-[11px] text-blue-600 font-semibold flex items-center gap-1 mt-0.5">
                <BookOpen className="h-3 w-3" /> VdoCipher HD
              </span>
            </div>
            <div className="size-10 rounded-xl bg-blue-50 text-[#0056d2] flex items-center justify-center">
              <BookOpen className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">योजनाएं एवं सब्सिडी</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 font-numeric">
                12
              </p>
              <span className="text-[11px] text-amber-600 font-semibold flex items-center gap-1 mt-0.5">
                <FileText className="h-3 w-3" /> PMEGP/Mudra
              </span>
            </div>
            <div className="size-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FileText className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">सिस्टम सुरक्षा स्थिति</p>
              <p className="text-base font-bold text-emerald-600 mt-1 flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                सुरक्षित (Encrypted)
              </p>
              <span className="text-[11px] text-slate-500 font-semibold">
                OAuth 2.1 + PKCE
              </span>
            </div>
            <div className="size-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldAlert className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Registered Users */}
        <Card className="bg-white border-slate-200 shadow-xs">
          <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold font-headline text-slate-900">
                नवीनतम पंजीकृत सदस्य (Recent Users)
              </CardTitle>
              <CardDescription className="text-xs mt-0.5">
                हाल ही में शामिल हुए उद्यमी व प्रशिक्षक
              </CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm" className="text-xs font-semibold text-purple-600">
              <Link href="/admin/users">सभी देखें</Link>
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            {recentUsers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-slate-100 bg-slate-50/50">
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Name</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Role</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((u) => (
                    <TableRow key={u.id} className="hover:bg-slate-50/80">
                      <TableCell className="text-xs font-semibold text-slate-900">
                        <div>
                          <p>{u.name || "N/A"}</p>
                          <p className="text-[10px] text-slate-400 font-normal">{u.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs">
                        <Badge variant="secondary" className="bg-purple-50 text-purple-700 text-[10px] font-bold">
                          {u.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-xs">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                          <CheckCircle2 className="size-3" />
                          {u.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-xs text-slate-500 py-6 text-center">कोई हालिया उपयोगकर्ता नहीं मिला।</p>
            )}
          </CardContent>
        </Card>

        {/* Live System Activity Logs */}
        <Card className="bg-white border-slate-200 shadow-xs">
          <CardHeader className="pb-3 border-b border-slate-100 flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold font-headline text-slate-900">
                रीयल-टाइम सुरक्षा लॉग्स (Audit Trail)
              </CardTitle>
              <CardDescription className="text-xs mt-0.5">
                सिस्टम में लॉगिन, लॉगआउट और प्रमाणीकरण गतिविधियाँ
              </CardDescription>
            </div>
            <Badge variant="outline" className="text-slate-500 text-[11px]">
              Live
            </Badge>
          </CardHeader>
          <CardContent className="p-0">
            {recentLogs.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-slate-100 bg-slate-50/50">
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Action</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">User / Device</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase text-right">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentLogs.map((log) => {
                    const isLogin = log.action === "LOGIN" || log.action === "SIGNUP";
                    return (
                      <TableRow key={log.id} className="hover:bg-slate-50/80">
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`text-[10px] font-bold ${
                              isLogin
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                            }`}
                          >
                            {log.action}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs text-slate-700">
                          <p className="font-semibold text-slate-900">{log.user?.name || log.user?.email || "Unknown"}</p>
                          <p className="text-[10px] text-slate-400">{log.deviceInfo || "Browser"}</p>
                        </TableCell>
                        <TableCell className="text-right text-xs text-slate-500 font-numeric whitespace-nowrap">
                          {new Date(log.timestamp).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <p className="text-xs text-slate-500 py-6 text-center">कोई नया सुरक्षा लॉग उपलब्ध नहीं है।</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
