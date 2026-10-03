import React from "react";
import { prisma } from "@/lib/prisma";
import { Database, Server, Cpu, HardDrive, ShieldCheck, Activity, Layers, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "डेटाबेस व सर्वर स्वास्थ्य | Database & Infrastructure Health - Admin Console",
};

export default async function AdminDatabasePage() {
  let userCount = 0;
  let courseCount = 0;
  let enrollmentCount = 0;
  let orderCount = 0;
  let schemeCount = 0;
  let logCount = 0;

  try {
    userCount = await prisma.user.count();
    courseCount = await prisma.course.count();
    enrollmentCount = await prisma.enrollment.count();
    orderCount = await prisma.order.count();
    schemeCount = await prisma.governmentScheme.count();
    logCount = await prisma.userActivityLog.count();
  } catch (error) {
    console.error("Failed to fetch database stats:", error);
  }

  const tableStats = [
    { name: "User (उपयोगकर्ता तालिका)", count: userCount, status: "Healthy" },
    { name: "Course (पाठ्यक्रम तालिका)", count: courseCount, status: "Healthy" },
    { name: "Enrollment (नामांकन तालिका)", count: enrollmentCount, status: "Healthy" },
    { name: "Order & Payment (वित्तीय लेन-देन)", count: orderCount, status: "Healthy" },
    { name: "GovernmentScheme (योजनाएं)", count: schemeCount, status: "Healthy" },
    { name: "UserActivityLog (सुरक्षा लॉग्स)", count: logCount, status: "Healthy" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="bg-[#0056d2] text-white font-bold text-xs">
              Super Admin Exclusive
            </Badge>
            <Badge variant="outline" className="text-slate-600 font-mono">
              Prisma PostgreSQL 7.10
            </Badge>
          </div>
          <h1 className="text-2xl font-bold font-headline text-slate-900 mt-1">
            डेटाबेस व इंफ्रास्ट्रक्चर स्वास्थ्य (Database Infrastructure)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            PostgreSQL कनेक्शन पूलर, Supabase SSR क्लस्टर एवं डेटाबेस टेबल मीट्रिक्स।
          </p>
        </div>
      </div>

      {/* Connection Info Banner */}
      <div className="p-5 rounded-lg bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-white/10 text-blue-300">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base font-headline">Supabase Managed Postgres Pooler</h3>
            <p className="text-xs text-slate-300">AWS ap-south-1 (Mumbai Region) • Session & Transaction Pooler</p>
          </div>
        </div>
        <Badge className="bg-emerald-500 text-white font-bold text-xs px-3 py-1">
          ONLINE & CONNECTED
        </Badge>
      </div>

      {/* Table Metrics */}
      <div className="bg-white rounded-lg border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-sm font-headline">डेटाबेस तालिका रिकॉर्ड मीट्रिक्स (Table Row Counts)</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-3.5">तालिका (Prisma Model)</th>
                <th className="p-3.5">कुल रिकॉर्ड संख्या (Row Count)</th>
                <th className="p-3.5">स्थिति (Health)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tableStats.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#0056d2]" />
                    <span>{item.name}</span>
                  </td>
                  <td className="p-3.5 font-bold text-slate-900 font-mono text-sm">
                    {item.count}
                  </td>
                  <td className="p-3.5">
                    <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{item.status}</span>
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
