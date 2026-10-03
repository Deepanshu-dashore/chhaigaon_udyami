import React from "react";
import { prisma } from "@/lib/prisma";
import { Activity, ShieldCheck, Key, LogIn, LogOut, UserPlus, Globe, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "सुरक्षा व ऑडिट लॉग्स | Security & Audit Logs - Admin Console",
};

export default async function AdminAuditLogsPage() {
  let logs: any[] = [];
  let totalLogs = 0;
  let totalLogins = 0;

  try {
    logs = await prisma.userActivityLog.findMany({
      take: 50,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            mobile: true,
            role: true,
          },
        },
      },
      orderBy: { timestamp: "desc" },
    });

    totalLogs = await prisma.userActivityLog.count();
    totalLogins = await prisma.userActivityLog.count({
      where: { action: "LOGIN" },
    });
  } catch (error) {
    console.error("Failed to fetch activity logs:", error);
  }

  const getActionBadge = (action: string) => {
    switch (action) {
      case "LOGIN":
        return <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">LOGIN</Badge>;
      case "LOGOUT":
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200">LOGOUT</Badge>;
      case "SIGNUP":
        return <Badge className="bg-purple-50 text-purple-700 border-purple-200">SIGNUP</Badge>;
      case "PASSWORD_RESET":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200">RESET</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-500/10 text-[#0056d2] border-blue-500/20 font-bold text-xs">
              System Audit & Security
            </Badge>
          </div>
          <h1 className="text-2xl font-bold font-headline text-slate-900 mt-1">
            सुरक्षा व एक्टिविटी लॉग्स (Security Audit Logs)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            उपयोगकर्ता ऑथेंटिकेशन, लॉगिन सत्र, आईपी एड्रेस और सुरक्षा घटनाओं का रीयल-टाइम ऑडिट।
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">कुल एक्टिविटी (Total Events)</p>
            <h3 className="text-2xl font-extrabold text-slate-900 font-headline mt-1">{totalLogs}</h3>
          </div>
          <div className="p-3 rounded-lg bg-blue-50 text-[#0056d2]">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">लॉगिन सत्र (Successful Logins)</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 font-headline mt-1">{totalLogins}</h3>
          </div>
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
            <LogIn className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">सुरक्षा स्थिति (Security Engine)</p>
            <h3 className="text-2xl font-extrabold text-purple-600 font-headline mt-1">ACTIVE</h3>
          </div>
          <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-lg border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-sm font-headline">नवीनतम ऑडिट लॉग्स (Recent Audit Logs)</h2>
          <span className="text-xs text-slate-400">अंतिम 50 रिकॉर्ड</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-3.5">उपयोगकर्ता</th>
                <th className="p-3.5">एक्शन</th>
                <th className="p-3.5">प्रदाता</th>
                <th className="p-3.5">आईपी एड्रेस</th>
                <th className="p-3.5">उपकरण / यूज़र एजेंट</th>
                <th className="p-3.5">समय (Timestamp)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{log.user?.name || "अज्ञात"}</div>
                      <div className="text-[11px] text-slate-400">{log.user?.email || log.user?.mobile || log.userId}</div>
                    </td>
                    <td className="p-3.5">
                      {getActionBadge(log.action)}
                    </td>
                    <td className="p-3.5 text-slate-700 font-medium">
                      {log.provider || "email/password"}
                    </td>
                    <td className="p-3.5 font-mono text-slate-600 text-[11px]">
                      {log.ipAddress || "127.0.0.1"}
                    </td>
                    <td className="p-3.5 text-slate-500 text-[11px] truncate max-w-xs">
                      {log.userAgent || log.deviceInfo || "Web Browser"}
                    </td>
                    <td className="p-3.5 text-slate-500 text-[11px] whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString("hi-IN")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 text-xs">
                    कोई ऑडिट लॉग अभी तक दर्ज नहीं हुआ है।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
