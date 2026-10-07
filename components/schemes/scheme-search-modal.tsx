"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Search, X, ArrowRight, Tag, Sparkles } from "lucide-react";
import { SchemeData, CATEGORY_LABELS } from "@/lib/data/default-schemes";

interface SchemeSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  schemes: SchemeData[];
  onSelectScheme: (scheme: SchemeData) => void;
}

const SUGGESTIONS = ["PMEGP", "डेयरी अनुदान", "35% सब्सिडी", "MMUKY", "मुद्रा लोन"];

export function SchemeSearchModal({
  isOpen,
  onClose,
  schemes,
  onSelectScheme,
}: SchemeSearchModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      setSearchTerm("");
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const matchingSchemes = useMemo(() => {
    if (!searchTerm.trim()) {
      return schemes.slice(0, 5);
    }
    const q = searchTerm.toLowerCase().trim();
    return schemes.filter((s) => {
      return (
        s.title.toLowerCase().includes(q) ||
        (s.description || "").toLowerCase().includes(q) ||
        (s.department || "").toLowerCase().includes(q) ||
        (s.benefits || "").toLowerCase().includes(q) ||
        (s.eligibility || "").toLowerCase().includes(q)
      );
    });
  }, [schemes, searchTerm]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 bg-slate-900/40 backdrop-blur-xs animate-in fade-in-0 duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="योजना त्वरित खोज"
    >
      <div className="bg-white rounded-xl shadow-xl border border-slate-200/90 w-full max-w-xl overflow-hidden flex flex-col max-h-[75vh]">
        {/* Clean, minimalist search bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="योजना खोजें… (उदा. PMEGP, ₹50 लाख, डेयरी)"
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
            style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="p-1 rounded text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="खोज साफ़ करें"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="text-[10px] font-mono font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
            ESC
          </kbd>
        </div>

        {/* Minimal suggestion row */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50/60 border-b border-slate-100 text-xs overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-slate-400 shrink-0 font-medium">सुझाव:</span>
          {SUGGESTIONS.map((sug) => (
            <button
              key={sug}
              onClick={() => setSearchTerm(sug)}
              className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600 hover:text-[#0056d2] hover:border-blue-200 text-[11px] font-medium transition-colors shrink-0"
              style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Clean results list */}
        <div className="flex-1 overflow-y-auto p-2 divide-y divide-slate-100">
          {matchingSchemes.length === 0 ? (
            <div className="text-center py-10 px-4">
              <p
                className="text-xs text-slate-500 font-medium"
                style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
              >
                कोई योजना नहीं मिली। कृपया अन्य नाम से खोजें।
              </p>
            </div>
          ) : (
            matchingSchemes.map((scheme) => (
              <div
                key={scheme.id}
                onClick={() => {
                  onSelectScheme(scheme);
                  onClose();
                }}
                className="group px-3 py-2.5 rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                      {CATEGORY_LABELS[scheme.category || "other"] || scheme.category}
                    </span>
                    {scheme.department && (
                      <span className="text-[11px] text-slate-400 truncate max-w-[200px]">
                        {scheme.department}
                      </span>
                    )}
                  </div>
                  <h4
                    className="text-xs font-bold text-slate-800 group-hover:text-[#0056d2] transition-colors truncate"
                    style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
                  >
                    {scheme.title}
                  </h4>
                  {scheme.benefits && (
                    <p
                      className="text-[11px] text-emerald-700 truncate font-medium mt-0.5"
                      style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
                    >
                      {scheme.benefits}
                    </p>
                  )}
                </div>

                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </div>
            ))
          )}
        </div>

        {/* Minimal Footer */}
        <div className="px-4 py-2 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>क्लिक करके विवरण देखें</span>
          <span>Chhaigaon Udyami</span>
        </div>
      </div>
    </div>
  );
}
