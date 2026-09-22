"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldCheck, AlertCircle, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CertificateVerifierProps {
  initialCode?: string;
  className?: string;
  compact?: boolean;
}

export function CertificateVerifier({
  initialCode = "",
  className = "",
  compact = false,
}: CertificateVerifierProps) {
  const [code, setCode] = useState(initialCode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = code.trim();

    if (!cleanCode) {
      setError("कृपया प्रमाण पत्र संख्या या सत्यापन कोड दर्ज करें (Enter Certificate Code)");
      return;
    }

    setError(null);
    setLoading(true);

    // If a full URL was pasted, extract the code
    let targetCode = cleanCode;
    if (cleanCode.includes("/certificates/")) {
      targetCode = cleanCode.split("/certificates/").pop() || cleanCode;
    } else if (cleanCode.includes("/certificate/")) {
      targetCode = cleanCode.split("/certificate/").pop() || cleanCode;
    }

    router.push(`/certificates/${encodeURIComponent(targetCode)}`);
  };

  const handleSampleClick = (sampleCode: string) => {
    setCode(sampleCode);
    router.push(`/certificates/${sampleCode}`);
  };

  if (compact) {
    return (
      <form onSubmit={handleVerify} className={`relative flex items-center gap-2 ${className}`}>
        <div className="relative flex-1">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="प्रमाण पत्र कोड दर्ज करें (उदा. CHU-SAMPLE-2026)"
            className="w-full h-10 pl-9 pr-4 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white text-slate-900"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        </div>
        <Button
          type="submit"
          size="sm"
          className="bg-[#0056d2] hover:bg-blue-700 text-white font-bold text-xs h-10 px-4 rounded-lg cursor-pointer shadow-2xs"
        >
          जांचें
        </Button>
      </form>
    );
  }

  return (
    <div className={`bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm ${className}`}>
      <div className="max-w-2xl mx-auto text-center space-y-2.5 mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/80">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>आधिकारिक डिजिटल सत्यापन पोर्टल</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-headline">
          सत्यापित डिजिटल प्रमाण पत्र जांचें
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
          छैगांव उद्यमी मंच द्वारा जारी किसी भी प्रशिक्षण या उद्योग प्रमाण पत्र की प्रामाणिकता जांचने के लिए उसका 16-अंकीय प्रमाण पत्र क्रमांक अथवा सत्यापन कोड दर्ज करें।
        </p>
      </div>

      <form onSubmit={handleVerify} className="max-w-xl mx-auto space-y-4">
        <div className="relative">
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              if (error) setError(null);
            }}
            placeholder="प्रमाण पत्र नंबर या QR कोड आईडी (उदा. CHU-SAMPLE-2026 / VRF-DEMO)"
            className="w-full h-12 sm:h-13 pl-11 pr-32 text-xs sm:text-sm font-mono bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-[#0056d2] focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
          />
          <Search className="w-4.5 h-4.5 text-slate-400 absolute left-3.5 top-4" />
          
          <Button
            type="submit"
            disabled={loading}
            className="absolute right-1.5 top-1.5 h-9 sm:h-10 px-4 bg-[#0056d2] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-md cursor-pointer shadow-2xs transition-all"
          >
            {loading ? (
              <span>जांच हो रही है...</span>
            ) : (
              <span className="flex items-center gap-1.5">
                <span>सत्यापित करें</span>
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Quick Sample Preview Chips */}
        <div className="pt-1 text-center">
          <span className="text-xs text-slate-500 font-medium mr-2">नमूना जांच (Try Sample):</span>
          <div className="inline-flex flex-wrap gap-1.5 mt-2 sm:mt-0">
            <button
              type="button"
              onClick={() => handleSampleClick("CHU-FSSAI-2026")}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 transition-colors cursor-pointer"
            >
              FSSAI खाद्य सुरक्षा
            </button>
            <button
              type="button"
              onClick={() => handleSampleClick("CHU-PMEGP-2026")}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 transition-colors cursor-pointer"
            >
              PMEGP लोन व DPR
            </button>
            <button
              type="button"
              onClick={() => handleSampleClick("CHU-DAIRY-2026")}
              className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 transition-colors cursor-pointer"
            >
              नाबार्ड डेयरी उद्यम
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
