import React from "react";
import { Settings, Shield, Database, Lock, Server, CheckCircle2, Globe, Cpu } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "सिस्टम सेटिंग्स | System Settings & Governance - Admin Console",
};

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="bg-slate-900 text-white border-slate-800 font-bold text-xs">
              Super Admin Settings
            </Badge>
          </div>
          <h1 className="text-2xl font-bold font-headline text-slate-900 mt-1">
            सिस्टम सेटिंग्स व प्लेटफॉर्म प्रबंधन (System Settings)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            ग्लोबल प्लेटफॉर्म पैरामीटर्स, डेटाबेस स्थिति, सुरक्षा एन्क्रिप्शन एवं रोल सेटिंग्स।
          </p>
        </div>
      </div>

      {/* System Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Platform Info */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-[#0056d2]">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm font-headline">सर्वर व डेटाबेस स्थिति (Database Engine)</h3>
              <p className="text-xs text-slate-500">PostgreSQL (Prisma ORM) & Supabase SSR Auth</p>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-slate-700">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-medium">प्लेटफ़ॉर्म संस्करण (Version):</span>
              <Badge variant="outline" className="font-mono">v1.2.0-stable</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-medium">ऑथेंटिकेशन इंजन (Auth):</span>
              <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">Supabase Auth Connected</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-medium">वीडियो स्ट्रीमिंग पार्टनर:</span>
              <Badge className="bg-blue-50 text-[#0056d2] border-blue-200">VdoCipher Enterprise</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="font-medium">पेमेंट गेटवे интеграция:</span>
              <Badge className="bg-purple-50 text-purple-700 border-purple-200">Razorpay Production</Badge>
            </div>
          </div>
        </div>

        {/* Security & Access Control */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm font-headline">सुरक्षा व पहुंच नियंत्रण (Access Control)</h3>
              <p className="text-xs text-slate-500">रोल आधारित एक्सेस कंट्रोल (RBAC Policy)</p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-700">
            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>SUPER_ADMIN भूमिका सक्रिय है। आपके पास संपूर्ण सिस्टम नियंत्रण अधिकार हैं।</span>
            </div>

            <div className="space-y-1.5 pt-1">
              <p className="font-semibold text-slate-900 text-xs">अनुमत भूमिकाएं (Configured Roles):</p>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                <Badge className="bg-slate-900 text-white">SUPER_ADMIN</Badge>
                <Badge variant="outline">ADMIN</Badge>
                <Badge variant="outline">CONTENT_MANAGER</Badge>
                <Badge variant="outline">TRAINER</Badge>
                <Badge variant="outline">MENTOR</Badge>
                <Badge variant="outline">STUDENT</Badge>
                <Badge variant="outline">MARKET_PARTNER</Badge>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
