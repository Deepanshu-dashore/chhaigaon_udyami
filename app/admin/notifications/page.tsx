import React from "react";
import { prisma } from "@/lib/prisma";
import { Bell, Send, CheckCircle2, AlertCircle, Users, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "सिस्टम सूचनाएं | Notifications & Broadcasts - Admin Console",
};

export default async function AdminNotificationsPage() {
  let notifications: any[] = [];
  let totalCount = 0;
  let unreadCount = 0;

  try {
    notifications = await prisma.notification.findMany({
      take: 50,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            mobile: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    totalCount = await prisma.notification.count();
    unreadCount = await prisma.notification.count({
      where: { isRead: false },
    });
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-500/10 text-purple-700 border-purple-500/20 font-bold text-xs">
              System Broadcast & Alerts
            </Badge>
          </div>
          <h1 className="text-2xl font-bold font-headline text-slate-900 mt-1">
            सिस्टम सूचनाएं व ब्रॉडकास्ट (Notifications & Alerts)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            विद्यार्थियों एवं उपयोगकर्ताओं को प्लेटफॉर्म घोषणाएं, अपडेट एवं इन-एप संदेश भेजें।
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">कुल सूचनाएं (Total Sent)</p>
            <h3 className="text-2xl font-extrabold text-slate-900 font-headline mt-1">{totalCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
            <Bell className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">अपठित सूचनाएं (Unread Alerts)</p>
            <h3 className="text-2xl font-extrabold text-amber-600 font-headline mt-1">{unreadCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">ब्रॉडकास्ट इंजन (Status)</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 font-headline mt-1">READY</h3>
          </div>
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
            <Send className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Broadcast Form / List */}
      <div className="bg-white rounded-lg border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-sm font-headline">हाल में भेजी गई सूचनाएं (Recent Notifications)</h2>
          <span className="text-xs text-slate-400">कुल {totalCount} संदेश</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-3.5">प्राप्तकर्ता (User)</th>
                <th className="p-3.5">शीर्षक व विवरण</th>
                <th className="p-3.5">प्रकार</th>
                <th className="p-3.5">स्थिति</th>
                <th className="p-3.5">दिनांक (Date)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {notifications.length > 0 ? (
                notifications.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{item.user?.name || "उपयोगकर्ता"}</div>
                      <div className="text-[11px] text-slate-400">{item.user?.email || item.user?.mobile}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 text-xs">{item.title}</div>
                      <div className="text-slate-500 text-[11px] mt-0.5">{item.message}</div>
                    </td>
                    <td className="p-3.5">
                      <Badge className="bg-blue-50 text-[#0056d2] border-blue-200 text-[10px]">
                        {item.type || "INFO"}
                      </Badge>
                    </td>
                    <td className="p-3.5">
                      {item.isRead ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px]">पढ़ा गया</Badge>
                      ) : (
                        <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[10px]">अनपढ़ा</Badge>
                      )}
                    </td>
                    <td className="p-3.5 text-slate-500 text-[11px] whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleString("hi-IN")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400 text-xs">
                    कोई सूचना अभी तक नहीं भेजी गई है।
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
