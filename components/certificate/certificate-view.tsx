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
  const formattedDate = new Date(certificate.issueDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const verifyUrl =
    certificate.verificationUrl ||
    `https://chhaigaonudyami.in/certificates/${certificate.verificationCode}`;

  return (
    <div
      id={id}
      className={`certificate-print-sheet relative mx-auto w-full max-w-[95%] lg:max-w-[95%] bg-white text-slate-900 shadow-xl border border-slate-300 p-2.5 sm:p-4 lg:p-6 select-none font-sans overflow-hidden transition-all ${className}`}
    >
      {/* Outer Fine Double Line Border Box */}
      <div className="border border-slate-300 p-5 sm:p-8 relative bg-white min-h-[480px] flex flex-col justify-between">
        
        {/* Soft Background Watermark Motif */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04] z-0">
          <Image
            src="/assets/logo.png"
            alt="Watermark Emblem"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        {/* ================= TOP HEADER BAR ================= */}
        <div className="relative z-10 flex items-start justify-between border-b border-slate-200 pb-4">
          {/* Top Left: Organization / Brand Logo */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-10 h-10 sm:w-14 sm:h-14 shrink-0">
              <Image
                src="/assets/logo.png"
                alt="छैगांव उद्यमी Logo"
                width={56}
                height={56}
                className="object-contain w-full h-full"
              />
            </div>
            <div>
              <span className="block text-sm sm:text-lg font-black text-slate-950 font-headline tracking-tight uppercase">
                छैगांव उद्यमी
              </span>
              <span className="block text-[9px] sm:text-[11px] text-slate-600 font-semibold tracking-wide">
                Chhaigaon Udyami Rural Entrepreneurship Council
              </span>
              <span className="block text-[8px] sm:text-[9px] text-blue-700 font-mono font-medium">
                ISO 9001:2015 Certified • Skill India Aligned
              </span>
            </div>
          </div>

          {/* Top Right: High-Density Verification QR Code */}
          <div className="flex flex-col items-end">
            <div className="border border-slate-300 p-1 bg-white shadow-2xs rounded-xs">
              <QRCodeSVG
                value={verifyUrl}
                size={62}
                className="shrink-0"
              />
            </div>
            <span className="text-[7px] sm:text-[8px] font-mono text-slate-500 mt-0.5">
              Verify QR Code
            </span>
          </div>
        </div>

        {/* ================= CENTRAL BODY CONTENT ================= */}
        <div className="relative z-10 text-center py-4 sm:py-6 my-auto space-y-2.5 sm:space-y-3.5">
          {/* Certification Statement */}
          <p className="text-[11px] sm:text-xs font-serif text-slate-600 tracking-wide">
            This is to certify that / प्रमाणित किया जाता है कि
          </p>

          {/* Recipient Name */}
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
              {certificate.studentName}
            </h1>
            {certificate.studentDistrict && (
              <p className="text-[9px] sm:text-[11px] text-slate-500 font-sans mt-0.5">
                {certificate.studentDistrict}
                {certificate.studentState ? `, ${certificate.studentState}` : ", Madhya Pradesh"}
              </p>
            )}
          </div>

          {/* Narrative Line */}
          <p className="text-[11px] sm:text-xs text-slate-600 font-serif max-w-xl mx-auto leading-relaxed">
            successfully completed and received a passing grade in
          </p>

          {/* Course / Skill Title */}
          <div className="py-0.5">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-serif font-black text-slate-950 tracking-tight leading-snug">
              {certificate.courseTitle}
            </h2>
            <p className="text-[9px] sm:text-[11px] text-slate-500 font-mono mt-0.5">
              ({certificate.certificateNumber}, provided by Chhaigaon Udyami)
            </p>
          </div>

          {/* Provider Subtext */}
          <div className="text-[10px] sm:text-[11px] text-slate-600 font-serif space-y-0.5">
            <p>
              A course on <span className="font-semibold text-slate-800">chhaigaonudyami.in</span>
            </p>
            <p className="font-semibold text-slate-800">
              Powered by Chhaigaon Udyami Skill Network
            </p>
          </div>

          {/* Issuance & Signature Block */}
          <div className="pt-3 flex flex-col items-center justify-center text-center space-y-0.5">
            <span className="text-[10px] sm:text-[11px] text-slate-500 font-serif">Issued by</span>
            <span className="text-[11px] sm:text-xs font-bold text-slate-900 font-sans">
              Chhaigaon Udyami
            </span>

            {/* Signature Cursive Representation */}
            <div className="pt-1.5 pb-0.5">
              <span className="font-serif italic font-bold text-base sm:text-xl text-slate-800 tracking-widest scale-y-110">
                Mandip S. Pawar
              </span>
            </div>

            <p className="text-[9px] sm:text-[11px] font-semibold text-slate-800 font-sans">
              Mandip Singh Pawar
            </p>
            <p className="text-[7px] sm:text-[9px] text-slate-500 font-sans">
              Mission Director • Chhaigaon Udyami Rural Entrepreneurship Council
            </p>
          </div>
        </div>

        {/* ================= FOOTER DATE & VERIFICATION URL ================= */}
        <div className="relative z-10 border-t border-slate-200 pt-2.5 text-center space-y-0.5 font-sans">
          <p className="text-[11px] sm:text-xs font-bold text-slate-900">
            {formattedDate}
          </p>

          <p className="text-[8px] sm:text-[10px] text-slate-600">
            Authenticity of this certificate can be validated by going to:
          </p>
          
          <a
            href={verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[8px] sm:text-[10px] font-mono font-bold text-[#0056d2] hover:underline break-all block"
          >
            {verifyUrl}
          </a>
        </div>

      </div>
    </div>
  );
}
