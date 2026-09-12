"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Building2,
  CheckCircle2,
  FileText,
  ExternalLink,
  ArrowRight,
  Filter,
  Sparkles,
  HelpCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";

export interface SchemeData {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  description: string | null;
  benefits: string | null;
  eligibility: string | null;
  requiredDocuments: string | null;
  applicationProcess: string | null;
  officialUrl: string | null;
  lastUpdated: string | null;
}

interface SchemeExplorerProps {
  initialSchemes: SchemeData[];
}

export function SchemeExplorer({ initialSchemes }: SchemeExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [selectedBenefitType, setSelectedBenefitType] = useState("ALL");
  const [activeModalScheme, setActiveModalScheme] = useState<SchemeData | null>(null);

  // Extract unique departments
  const departments = useMemo(() => {
    const set = new Set<string>();
    initialSchemes.forEach((s) => {
      if (s.department) set.add(s.department);
    });
    return Array.from(set);
  }, [initialSchemes]);

  // Filter schemes
  const filteredSchemes = useMemo(() => {
    return initialSchemes.filter((scheme) => {
      // Department filter
      if (selectedDept !== "ALL" && scheme.department !== selectedDept) {
        return false;
      }

      // Benefit filter
      if (selectedBenefitType !== "ALL") {
        const text = `${scheme.benefits || ""} ${scheme.description || ""}`.toLowerCase();
        if (selectedBenefitType === "SUBSIDY" && !text.includes("अनुदान") && !text.includes("subsidy") && !text.includes("%")) {
          return false;
        }
        if (selectedBenefitType === "LOAN" && !text.includes("ऋण") && !text.includes("loan") && !text.includes("क्रेडिट")) {
          return false;
        }
      }

      // Keyword search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = scheme.title.toLowerCase().includes(q);
        const matchDesc = (scheme.description || "").toLowerCase().includes(q);
        const matchDept = (scheme.department || "").toLowerCase().includes(q);
        const matchBenefits = (scheme.benefits || "").toLowerCase().includes(q);
        const matchElig = (scheme.eligibility || "").toLowerCase().includes(q);
        return matchTitle || matchDesc || matchDept || matchBenefits || matchElig;
      }

      return true;
    });
  }, [initialSchemes, searchQuery, selectedDept, selectedBenefitType]);

  return (
    <div className="w-full">
      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="योजना का नाम, विभाग या कीवर्ड से खोजें (उदा. PMEGP, डेयरी, 50% अनुदान)..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 hover:bg-slate-100/70 focus:bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 text-sm md:text-base font-medium transition-all outline-none focus:ring-2 focus:ring-[#0056d2] focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-200/70 hover:bg-slate-300 px-2 py-1 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Benefit Quick Toggle */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedBenefitType("ALL")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedBenefitType === "ALL"
                  ? "bg-[#0056d2] text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              सभी योजनाएं
            </button>
            <button
              onClick={() => setSelectedBenefitType("SUBSIDY")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedBenefitType === "SUBSIDY"
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              💰 सब्सिडी व अनुदान
            </button>
            <button
              onClick={() => setSelectedBenefitType("LOAN")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedBenefitType === "LOAN"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-blue-50 text-blue-700 hover:bg-blue-100"
              }`}
            >
              🏦 बैंक ऋण व क्रेडिट
            </button>
          </div>
        </div>

        {/* Department Chips */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5 mr-1">
            <Filter className="w-3.5 h-3.5" /> विभाग:
          </span>
          <button
            onClick={() => setSelectedDept("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedDept === "ALL"
                ? "bg-slate-900 text-white font-semibold"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            सभी विभाग ({initialSchemes.length})
          </button>
          {departments.map((dept) => {
            const count = initialSchemes.filter((s) => s.department === dept).length;
            const isSelected = selectedDept === dept;
            return (
              <button
                key={dept}
                onClick={() => setSelectedDept(dept)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-[#0056d2] text-white font-semibold shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {dept} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="text-sm font-semibold text-slate-600">
          कुल <span className="text-[#0056d2] font-bold text-base">{filteredSchemes.length}</span> योजनाएं उपलब्ध हैं
        </div>
        {(searchQuery || selectedDept !== "ALL" || selectedBenefitType !== "ALL") && (
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedDept("ALL");
              setSelectedBenefitType("ALL");
            }}
            className="text-xs font-bold text-[#0056d2] hover:underline"
          >
            सभी फ़िल्टर हटाएं (Reset)
          </button>
        )}
      </div>

      {/* Schemes Card Grid */}
      {filteredSchemes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <HelpCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 mb-1">कोई योजना नहीं मिली</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-4">
            आपके दिए गए सर्च कीवर्ड या फ़िल्टर के अनुसार कोई सरकारी योजना उपलब्ध नहीं है। कृपया दूसरे कीवर्ड आजमाएं।
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedDept("ALL");
              setSelectedBenefitType("ALL");
            }}
            className="px-4 py-2 bg-[#0056d2] text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition"
          >
            सभी योजनाएं देखें
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => {
            return (
              <div
                key={scheme.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-[#0056d2]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group overflow-hidden"
              >
                <div className="p-6">
                  {/* Department & Verified Badge */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-[#0056d2] text-[11px] font-bold border border-blue-100">
                      <Building2 className="w-3 h-3" />
                      {scheme.department || "शासकीय योजना"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      सत्यापित
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0056d2] transition-colors leading-snug line-clamp-2 mb-2">
                    {scheme.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
                    {scheme.description || "ग्रामीण व लघु उद्यमियों के लिए वित्तीय सहायता व अनुदान योजना।"}
                  </p>

                  {/* Benefit Highlight Box */}
                  {scheme.benefits && (
                    <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3 mb-4">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900 mb-1">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        प्रमुख लाभ एवं अनुदान:
                      </div>
                      <p className="text-xs text-emerald-950 line-clamp-2 leading-relaxed">
                        {scheme.benefits}
                      </p>
                    </div>
                  )}

                  {/* Eligibility Preview */}
                  {scheme.eligibility && (
                    <div className="flex items-start gap-1.5 text-xs text-slate-600 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0056d2] shrink-0 mt-0.5" />
                      <span className="line-clamp-1">
                        <strong className="text-slate-800 font-semibold">पात्रता: </strong>
                        {scheme.eligibility}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalScheme(scheme)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0056d2] hover:text-blue-800 transition"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    विस्तृत विवरण देखें
                  </button>

                  {scheme.officialUrl ? (
                    <a
                      href={scheme.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#0056d2] text-white text-xs font-bold hover:bg-blue-700 shadow-sm transition"
                    >
                      आवेदन लिंक
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <button
                      onClick={() => setActiveModalScheme(scheme)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-bold hover:bg-slate-900 shadow-sm transition"
                    >
                      पात्रता जांचें
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Scheme Detail Modal */}
      {activeModalScheme && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 flex flex-col">
            {/* Modal Header */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-blue-900 to-[#0056d2] text-white relative">
              <button
                onClick={() => setActiveModalScheme(null)}
                className="absolute right-5 top-5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition"
              >
                ✕
              </button>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/20 text-white text-xs font-bold mb-3">
                <Building2 className="w-3.5 h-3.5" />
                {activeModalScheme.department || "शासकीय योजना"}
              </div>
              <h2 className="text-xl md:text-2xl font-black leading-snug">
                {activeModalScheme.title}
              </h2>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8 space-y-6">
              {/* Description */}
              {activeModalScheme.description && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                    योजना का उद्देश्य व विवरण
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {activeModalScheme.description}
                  </p>
                </div>
              )}

              {/* Benefits */}
              {activeModalScheme.benefits && (
                <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1.5 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    अनुदान एवं वित्तीय सहायता (Financial Benefits)
                  </h4>
                  <p className="text-sm text-emerald-950 leading-relaxed font-medium">
                    {activeModalScheme.benefits}
                  </p>
                </div>
              )}

              {/* Eligibility */}
              {activeModalScheme.eligibility && (
                <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0056d2] mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0056d2]" />
                    पात्रता शर्तें (Eligibility Criteria)
                  </h4>
                  <p className="text-sm text-slate-800 leading-relaxed">
                    {activeModalScheme.eligibility}
                  </p>
                </div>
              )}

              {/* Required Documents */}
              {activeModalScheme.requiredDocuments && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-slate-500" />
                    आवश्यक दस्तावेज (Required Documents)
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {activeModalScheme.requiredDocuments}
                  </p>
                </div>
              )}

              {/* Application Process */}
              {activeModalScheme.applicationProcess && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-slate-500" />
                    आवेदन की प्रक्रिया (Application Process)
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {activeModalScheme.applicationProcess}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4 mt-auto">
              <button
                onClick={() => setActiveModalScheme(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition"
              >
                बंद करें
              </button>
              {activeModalScheme.officialUrl ? (
                <a
                  href={activeModalScheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0056d2] text-white text-xs font-bold hover:bg-blue-700 shadow-md transition"
                >
                  आधिकारिक पोर्टल पर आवेदन करें
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : (
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0056d2] text-white text-xs font-bold hover:bg-blue-700 shadow-md transition"
                >
                  मार्गदर्शन हेतु रजिस्टर करें
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
