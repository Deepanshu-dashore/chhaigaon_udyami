"use client";

import React, { useState } from "react";
import {
  Printer,
  Share2,
  Copy,
  Check,
  Download,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

interface CertificateActionsProps {
  certificateNumber: string;
  verificationCode: string;
  studentName: string;
  courseTitle: string;
}

export function CertificateActions({
  certificateNumber,
  verificationCode,
  studentName,
  courseTitle,
}: CertificateActionsProps) {
  const [copied, setCopied] = useState(false);

  const getVerificationUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/certificates/${verificationCode}`;
    }
    return `https://chhaigaonudyami.in/certificates/${verificationCode}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = async () => {
    const url = getVerificationUrl();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      prompt("Copy certificate link:", url);
    }
  };

  const handleWhatsAppShare = () => {
    const url = getVerificationUrl();
    const text = encodeURIComponent(
      `मैंने छैगांव उद्यमी मंच से "${courseTitle}" का आधिकारिक डिजिटल प्रमाण पत्र प्राप्त किया है!\nप्रमाण पत्र सत्यापन लिंक: ${url}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(getVerificationUrl());
    const title = encodeURIComponent(
      `Certificate of Completion: ${courseTitle} - Chhaigaon Udyami`
    );
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`,
      "_blank"
    );
  };

  return (
    <div className="no-print bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>सत्यापित डिजिटल प्रमाण पत्र विकल्प (Actions)</span>
          </h3>
          <p className="text-xs text-slate-500">
            प्रमाण पत्र क्रमांक: <span className="font-mono font-semibold text-slate-700">{certificateNumber}</span>
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>सत्यापित व सक्रिय</span>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
        {/* Print / Save as PDF */}
        <Button
          onClick={handlePrint}
          className="bg-[#0056d2] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-4 py-2 rounded-lg shadow-xs inline-flex items-center gap-2 cursor-pointer transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>प्रिंट या PDF सेव करें (Print Certificate)</span>
        </Button>

        {/* Copy Verification Link */}
        <Button
          onClick={handleCopyLink}
          variant="outline"
          className="text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-lg border-slate-300 hover:bg-slate-50 inline-flex items-center gap-2 cursor-pointer transition-all"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span className="text-emerald-700 font-bold">लिंक कॉपी हो गया!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-600" />
              <span>सत्यापन लिंक कॉपी करें</span>
            </>
          )}
        </Button>

        {/* Share WhatsApp */}
        <Button
          onClick={handleWhatsAppShare}
          variant="outline"
          className="text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-lg border-emerald-300 text-emerald-700 hover:bg-emerald-50 inline-flex items-center gap-2 cursor-pointer transition-all"
        >
          <FaWhatsapp className="w-4 h-4 text-emerald-600" />
          <span>व्हाट्सएप शेयर</span>
        </Button>

        {/* Share LinkedIn */}
        <Button
          onClick={handleLinkedInShare}
          variant="outline"
          className="text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-lg border-blue-200 text-blue-700 hover:bg-blue-50 inline-flex items-center gap-2 cursor-pointer transition-all"
        >
          <FaLinkedin className="w-4 h-4 text-blue-600" />
          <span>LinkedIn शेयर</span>
        </Button>
      </div>
    </div>
  );
}
