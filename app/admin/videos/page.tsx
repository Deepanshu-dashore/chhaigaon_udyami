import React from "react";
import { prisma } from "@/lib/prisma";
import { Video, Film, CheckCircle2, AlertTriangle, Clock, RefreshCw, Play, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "वीडियो लाइब्रेरी व मीडिया | Video & Media Management - Admin Console",
};

export default async function AdminVideosPage() {
  let videos: any[] = [];
  let totalCount = 0;
  let readyCount = 0;
  let processingCount = 0;

  try {
    videos = await prisma.video.findMany({
      take: 50,
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    totalCount = await prisma.video.count();
    readyCount = await prisma.video.count({
      where: { status: "READY" },
    });
    processingCount = await prisma.video.count({
      where: { status: "PROCESSING" },
    });
  } catch (error) {
    console.error("Failed to fetch videos:", error);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-500/10 text-[#0056d2] border-blue-500/20 font-bold text-xs">
              VdoCipher DRM Video Engine
            </Badge>
          </div>
          <h1 className="text-2xl font-bold font-headline text-slate-900 mt-1">
            वीडियो लाइब्रेरी व मीडिया प्रबंधन (Video Library)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            पाठ्यक्रम लेक्चर्स के लिए एन्क्रिप्टेड DRM वीडियो, प्रोसेसिंग स्थिति एवं स्ट्रीमिंग विनिर्देश।
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">कुल वीडियो फाइलें (Total Videos)</p>
            <h3 className="text-2xl font-extrabold text-slate-900 font-headline mt-1">{totalCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-blue-50 text-[#0056d2]">
            <Film className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">रेडी (Ready for Stream)</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 font-headline mt-1">{readyCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">प्रोसेसिंग (Encoding)</p>
            <h3 className="text-2xl font-extrabold text-amber-600 font-headline mt-1">{processingCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
            <RefreshCw className="w-6 h-6 animate-spin" />
          </div>
        </div>
      </div>

      {/* Video Table */}
      <div className="bg-white rounded-lg border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-sm font-headline">वीडियो लाइब्रेरी तालिका ({videos.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-3.5">वीडियो शीर्षक</th>
                <th className="p-3.5">VdoCipher ID</th>
                <th className="p-3.5">पाठ / कोर्स</th>
                <th className="p-3.5">अवधि (Duration)</th>
                <th className="p-3.5">स्थिति (Status)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {videos.length > 0 ? (
                videos.map((vid) => (
                  <tr key={vid.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        <Play className="w-4 h-4 text-[#0056d2] shrink-0" />
                        <span>{vid.title}</span>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-xs text-slate-700">
                      {vid.vdoVideoId}
                    </td>
                    <td className="p-3.5 text-slate-600">
                      <div>{vid.lesson?.title || "पाठबद्ध नहीं"}</div>
                      <div className="text-[10px] text-slate-400">{vid.lesson?.module?.course?.title}</div>
                    </td>
                    <td className="p-3.5 text-slate-700 font-medium">
                      {vid.duration ? `${Math.round(vid.duration / 60)} मि.` : "अज्ञात"}
                    </td>
                    <td className="p-3.5">
                      {vid.status === "READY" ? (
                        <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">READY</Badge>
                      ) : (
                        <Badge className="bg-amber-50 text-amber-700 border-amber-200">PROCESSING</Badge>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400 text-xs">
                    कोई वीडियो अभी तक अपलोड नहीं किया गया है।
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
