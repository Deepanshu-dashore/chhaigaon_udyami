"use client";

import React, { useEffect, useRef } from "react";
import {
  X,
  ExternalLink,
  CalendarDays,
  CheckCircle,
  FileText,
  Building2,
  BadgePercent,
  ClipboardList,
  ShieldCheck,
  Send,
} from "lucide-react";
import { SchemeData, CATEGORY_LABELS } from "@/lib/data/default-schemes";

interface SchemeDetailModalProps {
  scheme: SchemeData;
  onClose: () => void;
}

export function SchemeDetailModal({ scheme, onClose }: SchemeDetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const categoryLabel = CATEGORY_LABELS[scheme.category || "other"] || scheme.category || "योजना";

  // Split documents string into array if separated by commas or bullets
  const docList = scheme.requiredDocuments
    ? scheme.requiredDocuments
        .split(/[,;|]/)
        .map((d) => d.trim())
        .filter(Boolean)
    : [];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-14 px-4 pb-6 bg-black/60 backdrop-blur-xs animate-in fade-in-0 duration-150"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={scheme.title}
    >
      <div className="bg-white rounded-xl border border-slate-200 w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden scale-100 transition-all">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-200 bg-slate-50/70">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className="inline-flex items-center text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200"
                style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
              >
                {categoryLabel}
              </span>
              {scheme.lastUpdated && (
                <span className="flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                  <CalendarDays className="w-3 h-3" />
                  सत्र: {scheme.lastUpdated}
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <ShieldCheck className="w-3 h-3" />
                शासकीय सत्यापित
              </span>
            </div>

            <h2
              className="text-lg sm:text-xl font-bold text-slate-900 leading-snug"
              style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
            >
              {scheme.title}
            </h2>

            {scheme.department && (
              <p
                className="text-xs text-slate-500 mt-1 flex items-center gap-1.5"
                style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
              >
                <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{scheme.department}</span>
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
            aria-label="बंद करें"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Objective / Overview */}
          {scheme.description && (
            <div className="space-y-1.5">
              <h3
                className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>योजना का मुख्य उद्देश्य एवं विवरण</span>
              </h3>
              <p
                className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-lg border border-slate-200/80"
                style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
              >
                {scheme.description}
              </p>
            </div>
          )}

          {/* Financial Subsidies & Benefits Highlight */}
          {scheme.benefits && (
            <div className="space-y-1.5">
              <h3
                className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5"
              >
                <BadgePercent className="w-4 h-4 text-emerald-600" />
                <span>वित्तीय अनुदान, सब्सिडी व लाभ विवरण</span>
              </h3>
              <div
                className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg p-4 text-sm text-emerald-950 leading-relaxed font-medium"
                style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
              >
                {scheme.benefits}
              </div>
            </div>
          )}

          {/* Eligibility Criteria */}
          {scheme.eligibility && (
            <div className="space-y-1.5">
              <h3
                className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5"
              >
                <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                <span>पात्रता मानदंड (Eligibility)</span>
              </h3>
              <div
                className="bg-slate-50 p-3.5 rounded-lg border border-slate-200/80 text-sm text-slate-800 leading-relaxed"
                style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
              >
                {scheme.eligibility}
              </div>
            </div>
          )}

          {/* Required Documents Checklist */}
          {docList.length > 0 && (
            <div className="space-y-2">
              <h3
                className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5"
              >
                <ClipboardList className="w-3.5 h-3.5 text-blue-600" />
                <span>आवश्यक दस्तावेज चेकलिस्ट</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {docList.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-md bg-slate-50/70 border border-slate-200 text-xs text-slate-700"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}>
                      {doc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Application Process Steps */}
          {scheme.applicationProcess && (
            <div className="space-y-1.5">
              <h3
                className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5 text-blue-600" />
                <span>आवेदन की प्रक्रिया (How to Apply)</span>
              </h3>
              <div
                className="bg-amber-50/60 border border-amber-200/80 p-3.5 rounded-lg text-sm text-amber-950 leading-relaxed font-medium"
                style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
              >
                {scheme.applicationProcess}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between gap-3 bg-slate-50">
          <button
            onClick={onClose}
            className="text-xs sm:text-sm text-slate-600 hover:text-slate-900 font-semibold px-4 py-2 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            बंद करें
          </button>

          <div className="flex items-center gap-2">
            {scheme.officialUrl && (
              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#0056d2] hover:bg-[#0041a3] text-white text-xs sm:text-sm font-bold shadow-sm transition-transform active:scale-95"
                style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
              >
                <span>आधिकारिक पोर्टल पर जाएं</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
