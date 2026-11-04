"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award,
  PlayCircle,
  ShieldCheck,
  Check,
  Copy,
  ExternalLink,
  Download,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseCertificateCtaProps {
  courseSlug: string;
  certificateCode?: string | null;
  isCompleted: boolean;
  progressPercent: number;
}

export function CourseCertificateCta({
  courseSlug,
  certificateCode,
  isCompleted,
  progressPercent,
}: CourseCertificateCtaProps) {
  const [copied, setCopied] = useState(false);

  const certCode = certificateCode || "CHU-SAMPLE-2026";
  const certificateUrl = `/certificates/${certCode}`;

  const handleCopyVerifyLink = async () => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "https://chhaigaonudyami.in";
    const fullVerifyUrl = `${origin}/certificates/${certCode}`;

    try {
      await navigator.clipboard.writeText(fullVerifyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      prompt("सत्यापन लिंक कॉपी करें:", fullVerifyUrl);
    }
  };

  if (isCompleted || progressPercent === 100) {
    return (
      <div className="flex items-center gap-3 flex-wrap">
        {/* 1. Primary Action: Download / View Certificate */}
        <Link href={certificateUrl} target="_blank">
          <Button className="h-11 px-6 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-xs cursor-pointer inline-flex items-center gap-2">
            <Award className="size-5 fill-white text-emerald-600" />
            <span>प्रमाण पत्र डाउनलोड करें (Certificate)</span>
          </Button>
        </Link>

        {/* 2. Copy Verifying Link Button */}
        <Button
          type="button"
          onClick={handleCopyVerifyLink}
          variant="outline"
          className={`h-11 px-5 rounded-full border text-sm font-semibold cursor-pointer inline-flex items-center gap-2 transition-all ${
            copied
              ? "border-emerald-500 bg-emerald-50 text-emerald-800"
              : "border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          }`}
          title="आधिकारिक डिजिटल सत्यापन लिंक कॉपी करें"
        >
          {copied ? (
            <>
              <Check className="size-4 text-emerald-600" />
              <span className="font-bold">सत्यापन लिंक कॉपी हुआ!</span>
            </>
          ) : (
            <>
              <ShieldCheck className="size-4 text-blue-600" />
              <span>सत्यापन लिंक कॉपी करें</span>
            </>
          )}
        </Button>

        {/* 3. Revisit Course Lessons */}
        <Link href={`/courses/${courseSlug}/learn`}>
          <Button
            variant="ghost"
            className="h-11 px-4 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-sm font-semibold cursor-pointer inline-flex items-center gap-1.5"
            title="पाठ्यक्रम व्याख्यान पुनः देखें"
          >
            <RotateCcw className="size-4" />
            <span>अध्ययन दोहराएं (Review)</span>
          </Button>
        </Link>
      </div>
    );
  }

  // Not Completed: Standard Start / Resume CTA
  return (
    <Link href={`/courses/${courseSlug}/learn`}>
      <Button className="h-11 px-7 rounded-full bg-[#1261D6] hover:bg-blue-700 text-white text-sm font-bold shadow-xs cursor-pointer inline-flex items-center gap-2">
        <PlayCircle className="size-5 fill-white text-[#1261D6]" />
        <span>{progressPercent > 0 ? "Resume (अध्ययन जारी रखें)" : "Start (कोर्स शुरू करें)"}</span>
      </Button>
    </Link>
  );
}

