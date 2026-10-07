"use client";

import React from "react";
import { ExternalLink, FileText, CalendarDays, CheckCircle2, ArrowRight } from "lucide-react";
import { SchemeData, CATEGORY_LABELS } from "@/lib/data/default-schemes";

interface SchemeCardProps {
  scheme: SchemeData;
  onSelect: (scheme: SchemeData) => void;
}

export function SchemeCard({ scheme, onSelect }: SchemeCardProps) {
  const categoryLabel = CATEGORY_LABELS[scheme.category || "other"] || scheme.category || "योजना";

  // Category visual styles (clean, formal, civic-tech)
  const categoryStyles: Record<string, { badge: string; borderAccent: string }> = {
    subsidy: {
      badge: "bg-blue-50 text-blue-700 border-blue-200",
      borderAccent: "border-t-blue-600",
    },
    loan: {
      badge: "bg-emerald-50 text-emerald-800 border-emerald-200",
      borderAccent: "border-t-emerald-600",
    },
    stipend: {
      badge: "bg-amber-50 text-amber-800 border-amber-200",
      borderAccent: "border-t-amber-500",
    },
    training: {
      badge: "bg-purple-50 text-purple-800 border-purple-200",
      borderAccent: "border-t-purple-600",
    },
    other: {
      badge: "bg-slate-100 text-slate-700 border-slate-200",
      borderAccent: "border-t-slate-400",
    },
  };

  const style = categoryStyles[scheme.category || "other"] || categoryStyles.other;

  return (
    <article
      className={`bg-white rounded-lg border border-slate-200 border-t-3 ${style.borderAccent} shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group overflow-hidden`}
    >
      <div className="p-4 sm:p-5">
        {/* Top bar: Category Badge + Department */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span
            className={`inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded border ${style.badge}`}
            style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
          >
            {categoryLabel}
          </span>

          {scheme.lastUpdated && (
            <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
              <CalendarDays className="w-3 h-3" />
              {scheme.lastUpdated}
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(scheme)}
          className="text-base font-bold text-slate-900 group-hover:text-[#0056d2] transition-colors leading-snug line-clamp-2 cursor-pointer mb-1.5"
          style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
          title={scheme.title}
        >
          {scheme.title}
        </h3>

        {/* Department */}
        {scheme.department && (
          <p
            className="text-xs text-slate-500 line-clamp-1 mb-3"
            style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
          >
            {scheme.department}
          </p>
        )}

        {/* Brief summary */}
        {scheme.description && (
          <p
            className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3.5"
            style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
          >
            {scheme.description}
          </p>
        )}

        {/* Highlight Benefit Box */}
        {scheme.benefits && (
          <div className="p-2.5 rounded-md bg-[#f0fdf4] border border-[#bbf7d0] text-xs mb-3">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block mb-0.5">
              मुख्य वित्तीय लाभ
            </span>
            <p
              className="text-xs text-emerald-900 font-semibold line-clamp-2 leading-snug"
              style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
            >
              {scheme.benefits}
            </p>
          </div>
        )}

        {/* Eligibility condition snippet */}
        {scheme.eligibility && (
          <div className="flex items-start gap-1.5 text-xs text-slate-600 line-clamp-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span
              className="truncate"
              style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
            >
              {scheme.eligibility}
            </span>
          </div>
        )}
      </div>

      {/* Card Action Footer */}
      <div className="px-4 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(scheme)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0056d2] hover:text-[#0041a3] hover:underline transition-colors cursor-pointer"
          style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>विवरण देखें</span>
        </button>

        {scheme.officialUrl ? (
          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 transition-colors shadow-2xs"
            style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
          >
            <span>पोर्टल</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        ) : (
          <button
            onClick={() => onSelect(scheme)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-700 cursor-pointer"
          >
            <span>अधिक जानकारी</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </article>
  );
}
