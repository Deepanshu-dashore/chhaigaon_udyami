"use client";

import React from "react";
import Image from "next/image";
import { Award, CheckCircle2, ShieldCheck, Sparkles, Star } from "lucide-react";
import { QRCodeSVG } from "./qr-code";

export interface CertificateData {
  id: string;
  certificateNumber: string;
  verificationCode: string;
  issueDate: string | Date;
  studentName: string;
  studentEmail?: string | null;
  studentDistrict?: string | null;
  studentState?: string | null;
  courseTitle: string;
  courseCategory?: string | null;
  courseDurationHours?: number | null;
  gradeScore?: number | null;
  status?: string;
  verificationUrl?: string;
}

interface CertificateViewProps {
  certificate: CertificateData;
  className?: string;
  id?: string;
}

export function CertificateView({
  certificate,
  className = "",
  id = "official-certificate",
}: CertificateViewProps) {
  const formattedHindiDate = new Date(certificate.issueDate).toLocaleDateString("hi-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const verifyUrl =
    certificate.verificationUrl ||
    `https://chhaigaonudyami.in/certificates/${certificate.verificationCode}`;

  return (
    <div
      id={id}
      className={`certificate-print-sheet relative mx-auto w-full max-w-4xl bg-[#fffdfa] text-slate-900 shadow-2xl rounded-2xl sm:rounded-3xl border-6 sm:border-[10px] border-[#091e3a] select-none font-sans overflow-hidden transition-all ${className}`}
    >
      {/* Clean Classical Gold Inset Borders */}
      <div className="absolute inset-1.5 sm:inset-2.5 border-2 border-[#c89933] rounded-xl pointer-events-none z-10" />
      <div className="absolute inset-3 sm:inset-4.5 border border-dashed border-[#b8860b]/40 rounded-lg pointer-events-none z-10" />

      {/* Elegant Corner Filigree Brackets (No awkward dots) */}
      <div className="absolute top-3 left-3 sm:top-5 sm:left-5 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-l-2 border-[#c89933] rounded-tl-lg pointer-events-none z-10" />
      <div className="absolute top-3 right-3 sm:top-5 right-5 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 border-[#c89933] rounded-tr-lg pointer-events-none z-10" />
      <div className="absolute bottom-3 left-3 sm:bottom-5 left-5 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 border-[#c89933] rounded-bl-lg pointer-events-none z-10" />
      <div className="absolute bottom-3 right-3 sm:bottom-5 right-5 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-r-2 border-[#c89933] rounded-br-lg pointer-events-none z-10" />

      {/* Ultra-Soft Background Texture */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#0056d2 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Certificate Inner Container with Generous, Balanced Padding */}
      <div className="relative z-20 flex flex-col justify-between p-6 sm:p-9 md:p-10 text-center space-y-6 sm:space-y-8">
        
        {/* ================= HEADER ================= */}
        <div className="space-y-2">
          {/* Institution Header Bar */}
          <div className="flex items-center justify-between border-b border-[#c89933]/30 pb-3">
            {/* Left: Emblem & Institution Info */}
            <div className="flex items-center gap-2.5 sm:gap-3 text-left">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-white p-1 border border-[#c89933]/50 shadow-2xs flex items-center justify-center">
                <Image
                  src="/assets/logo.png"
                  alt="छैगांव उद्यमी"
                  width={44}
                  height={44}
                  className="object-contain w-full h-full"
                />
              </div>
              <div>
                <span className="block text-xs sm:text-sm font-extrabold text-[#091e3a] tracking-wide uppercase font-headline">
                  छैगांव उद्यमी ग्रामीण कौशल संस्थान
                </span>
                <span className="block text-[9px] sm:text-[11px] text-slate-600 font-medium">
                  Chhaigaon Udyami Rural Entrepreneurship Council (M.P.)
                </span>
                <span className="block text-[8px] sm:text-[9px] text-amber-800 font-semibold">
                  ISO 9001:2015 Certified • Skill India & MSME Aligned
                </span>
              </div>
            </div>

            {/* Right: Verified Stamp & IDs */}
            <div className="text-right space-y-0.5">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-[9px] sm:text-[11px] font-bold shadow-2xs">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                <span>सत्यापित प्रमाण पत्र</span>
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-700 font-mono font-bold">
                {certificate.certificateNumber}
              </div>
              <div className="text-[8px] sm:text-[9px] text-slate-500 font-mono">
                Code: {certificate.verificationCode}
              </div>
            </div>
          </div>

          {/* Titles */}
          <div className="pt-2 space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-[#b8860b] font-bold text-[10px] sm:text-xs tracking-widest uppercase">
              <Star className="w-3 h-3 fill-[#b8860b]" />
              <span>उपलब्धि एवं कौशल प्रमाण पत्र</span>
              <Star className="w-3 h-3 fill-[#b8860b]" />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#091e3a] tracking-tight font-serif uppercase">
              Certificate of Excellence
            </h1>

            <p className="text-[10px] sm:text-xs text-slate-500 tracking-wider uppercase font-medium">
              This is to proudly certify that / प्रमाणित किया जाता है कि
            </p>
          </div>
        </div>

        {/* ================= RECIPIENT & COURSE BODY ================= */}
        <div className="space-y-2 sm:space-y-3 my-auto">
          {/* Student Name */}
          <div className="inline-block relative max-w-full">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#0056d2] tracking-wide font-serif border-b-2 border-[#c89933] px-4 sm:px-8 pb-1 leading-tight">
              {certificate.studentName}
            </h2>
            {certificate.studentDistrict && (
              <p className="text-[10px] sm:text-xs text-slate-600 font-medium mt-1">
                पता: {certificate.studentDistrict}
                {certificate.studentState ? `, ${certificate.studentState}` : ", मध्य प्रदेश"}
              </p>
            )}
          </div>

          {/* Narrative & Course Name */}
          <div className="max-w-2xl mx-auto text-slate-700 leading-relaxed space-y-1 sm:space-y-1.5">
            <p className="text-xs sm:text-sm font-normal">
              has successfully undergone rigorous practical training and demonstrated outstanding entrepreneurial proficiency in
            </p>

            <div className="py-0.5">
              <p className="text-sm sm:text-lg md:text-xl font-black text-[#091e3a] font-serif tracking-tight leading-snug">
                “{certificate.courseTitle}”
              </p>
            </div>

            <p className="text-[10px] sm:text-xs text-slate-600 font-normal">
              including Project DPR Preparation, Quality Standards & Government Subsidy Compliance.
              {certificate.gradeScore && (
                <span className="font-bold text-emerald-800 ml-1.5 px-2 py-0.5 bg-emerald-50 rounded-md border border-emerald-200 inline-block">
                  मूल्यांकन स्कोर: {certificate.gradeScore}% (Honors Distinction)
                </span>
              )}
            </p>
          </div>
        </div>

        {/* ================= FOOTER: SIGNATURES, SEAL & QR ================= */}
        <div className="pt-3 sm:pt-5 border-t border-[#c89933]/30">
          <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end">
            
            {/* Left: Mission Director Signature */}
            <div className="text-center space-y-1">
              <div className="h-7 sm:h-9 flex items-end justify-center">
                <span className="font-serif italic font-extrabold text-base sm:text-xl text-[#091e3a] tracking-widest scale-y-110">
                  Mandip S. Pawar
                </span>
              </div>
              <div className="w-24 sm:w-36 mx-auto border-t border-slate-700" />
              <p className="text-[10px] sm:text-xs font-bold text-slate-900 uppercase leading-none">
                मंदीप सिंह पंवार
              </p>
              <p className="text-[8px] sm:text-[10px] text-slate-500 font-medium leading-tight">
                मिशन निदेशक (Chhaigaon Udyami)
              </p>
            </div>

            {/* Center: High-Resolution 3D Metallic Gold Seal Badge */}
            <div className="flex flex-col items-center justify-center space-y-1">
              <div className="relative w-14 h-14 sm:w-18 sm:h-18 drop-shadow-md">
                <Image
                  src="/images/official-gold-seal.jpg"
                  alt="Official Seal of Excellence"
                  width={72}
                  height={72}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="text-[8px] sm:text-[10px] text-slate-700 font-semibold">
                जारी दिनांक: <span className="font-bold text-slate-950">{formattedHindiDate}</span>
              </div>
            </div>

            {/* Right: Controller Signature & Verification QR */}
            <div className="flex flex-col items-center sm:items-end text-center sm:text-right space-y-1">
              <div className="flex items-center gap-1.5">
                <div className="hidden sm:block text-right">
                  <span className="block text-[8px] sm:text-[9px] font-bold text-slate-800">
                    स्कैन कर सत्यापन करें
                  </span>
                  <span className="block text-[7px] sm:text-[8px] text-slate-500 font-mono">
                    24/7 Verified
                  </span>
                </div>
                <QRCodeSVG
                  value={verifyUrl}
                  size={42}
                  className="shrink-0 border-slate-300 p-0.5 shadow-2xs"
                />
              </div>

              <div className="w-24 sm:w-36 border-t border-slate-700 mt-0.5" />
              <p className="text-[10px] sm:text-xs font-bold text-slate-900 uppercase leading-none">
                अकादमिक नियंत्रक
              </p>
              <p className="text-[8px] sm:text-[10px] text-slate-500 font-medium leading-tight">
                Academic & Accreditation Board
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
