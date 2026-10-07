"use client";

import React from "react";
import { Search, X, Sparkles, Command } from "lucide-react";

interface SchemeSearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  onOpenSearchModal: () => void;
  totalResults: number;
}

export function SchemeSearchBar({
  value,
  onChange,
  onClear,
  onOpenSearchModal,
  totalResults,
}: SchemeSearchBarProps) {
  return (
    <div className="w-full mb-6">
      <div className="relative flex items-center bg-white border-2 border-slate-200 rounded-xl shadow-2xs hover:border-blue-400 focus-within:border-[#0056d2] focus-within:ring-2 focus-within:ring-blue-100 transition-all">
        <div className="pl-4 text-slate-400 shrink-0 pointer-events-none">
          <Search className="w-5 h-5 text-slate-400" />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="योजना का नाम, विभाग या लाभ से खोजें… (जैसे: PMEGP, ₹50 लाख, डेयरी)"
          className="w-full py-3.5 pl-3 pr-24 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-hidden"
          style={{ fontFamily: "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif" }}
          aria-label="सरकारी योजना खोजें"
        />

        <div className="absolute right-3 flex items-center gap-1.5">
          {value && (
            <button
              onClick={onClear}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="खोज साफ़ करें"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Quick Search Modal Trigger Button */}
          <button
            onClick={onOpenSearchModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md border border-slate-200 transition-colors cursor-pointer shadow-2xs"
            title="त्वरित खोज मॉडल खोलें"
          >
            <Command className="w-3 h-3 text-slate-400" />
            <span>Ctrl+K</span>
          </button>
        </div>
      </div>
    </div>
  );
}
