"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SchemeData, SchemeFilterOptions } from "@/lib/data/default-schemes";
import { useSchemesApi } from "@/components/schemes/use-schemes-api";
import { SchemeSearchBar } from "@/components/schemes/scheme-search-bar";
import { SchemeSearchModal } from "@/components/schemes/scheme-search-modal";
import { SchemeFilterDropdowns } from "@/components/schemes/scheme-filter-dropdowns";
import { SchemeCard } from "@/components/schemes/scheme-card";
import { SchemeDetailModal } from "@/components/schemes/scheme-detail-modal";
import { SchemeGridSkeleton } from "@/components/schemes/scheme-skeleton";
import { SectionBadge } from "@/components/ui/section-badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { Search, RotateCcw, AlertCircle, ShieldCheck } from "lucide-react";
import { SchemeBannerSlider } from "./scheme-banner-slider";

export type { SchemeData };

interface SchemeExplorerProps {
  initialSchemes: SchemeData[];
  initialFilterOptions?: SchemeFilterOptions;
  initialTotal?: number;
  initialTotalPages?: number;
}

export function SchemeExplorer({
  initialSchemes,
  initialFilterOptions,
  initialTotal,
  initialTotalPages,
}: SchemeExplorerProps) {
  const {
    schemes,
    filterOptions,
    total,
    page,
    setPage,
    limit,
    totalPages,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedDepartment,
    setSelectedDepartment,
    sortBy,
    setSortBy,
    resetFilters,
    refetch,
  } = useSchemesApi({
    initialSchemes,
    initialFilterOptions,
    initialTotal,
    initialTotalPages,
  });

  const [activeModalScheme, setActiveModalScheme] = useState<SchemeData | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);

  // Global Ctrl+K / Cmd+K listener to open search modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* ── 1. Full-Width Wide Announcement Banner Slider on Top ── */}
      <SchemeBannerSlider
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      {/* ── 2. Branded Civic Header Section with /about Background Pattern ── */}
      <section
        className="py-8 sm:py-12 relative overflow-hidden border-b border-blue-900 text-white"
        style={{
          background:
            "url('/images/ourstd-bckgrnd.webp') no-repeat center center / cover",
        }}
      >
        {/* Blue Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-blue-900 via-[#0056d2]/90 to-blue-900 pointer-events-none" />

        {/* Overlapping Concentric Circles SVG Background Pattern Overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: "url('/images/bg-concentric-circles-white.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "140px 140px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-2 text-xs text-blue-200 mb-3 font-medium"
            aria-label="breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              होम
            </Link>
            <span className="text-blue-300">/</span>
            <span className="text-white font-bold">सरकारी योजनाएं एवं सब्सिडी</span>
          </nav>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight font-headline"
                style={{
                  fontFamily:
                    "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif",
                }}
              >
                शासकीय स्वरोजगार एवं सब्सिडी योजनाएं 2026
              </h1>
              <p
                className="text-xs sm:text-sm text-blue-100/90 mt-1.5 max-w-2xl font-body leading-relaxed"
                style={{
                  fontFamily:
                    "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif",
                }}
              >
                मध्य प्रदेश शासन एवं केंद्र सरकार की प्रमुख स्वरोजगार, 35% तक सब्सिडी और शून्य गारंटी बैंक ऋण योजनाएं
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
              <SectionBadge icon={ShieldCheck} variant="outline">
                सत्यापित शासकीय पोर्टल
              </SectionBadge>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Centered Content Container: Search, Filter Tabs & Schemes Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Search Bar with Ctrl+K shortcut trigger */}
        <SchemeSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
          onOpenSearchModal={() => setIsSearchModalOpen(true)}
          totalResults={total}
        />

        {/* Clean Filter Tabs & Dropdowns (No duplicate category dropdown) */}
        <SchemeFilterDropdowns
          categories={filterOptions.categories}
          departments={filterOptions.departments}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedDepartment={selectedDepartment}
          onSelectDepartment={setSelectedDepartment}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery("")}
          onResetFilters={resetFilters}
          totalResults={total}
        />

        {/* Error Notification (if API error occurs) */}
        {error && (
          <div className="p-4 mb-6 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-between text-rose-800 text-sm">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => refetch()}
              className="text-xs font-bold underline hover:text-rose-950 cursor-pointer"
            >
              पुनः प्रयास करें
            </button>
          </div>
        )}

        {/* Schemes Grid / Loading Skeletons / Empty State */}
        {isLoading ? (
          <SchemeGridSkeleton count={limit} />
        ) : schemes.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center my-4 shadow-2xs">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-400">
              <Search className="w-6 h-6" />
            </div>
            <h3
              className="text-base font-bold text-slate-800 mb-1"
              style={{
                fontFamily:
                  "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif",
              }}
            >
              कोई योजना नहीं मिली
            </h3>
            <p
              className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-5"
              style={{
                fontFamily:
                  "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif",
              }}
            >
              आपके द्वारा चुने गए फ़िल्टर या खोज शब्द के अनुसार कोई परिणाम नहीं मिला। कृपया फ़िल्टर बदलें।
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0056d2] hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-sm transition-transform active:scale-95 cursor-pointer"
              style={{
                fontFamily:
                  "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif",
              }}
            >
              <RotateCcw className="w-4 h-4" />
              <span>सभी योजनाएं देखें</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {schemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onSelect={setActiveModalScheme}
              />
            ))}
          </div>
        )}

        {/* Shadcn Pagination (6 cards per page, backend connected) */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-slate-200">
            <div
              className="text-xs text-slate-500 font-medium"
              style={{
                fontFamily:
                  "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif",
              }}
            >
              पृष्ठ <strong className="text-slate-800">{page}</strong> / <strong>{totalPages}</strong> (कुल <strong>{total}</strong> योजनाएं, प्रति पृष्ठ <strong>{limit}</strong>)
            </div>

            <Pagination className="mx-0 w-auto justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => page > 1 && setPage(page - 1)}
                    className={page === 1 ? "pointer-events-none opacity-40" : "cursor-pointer"}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === page}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => page < totalPages && setPage(page + 1)}
                    className={page === totalPages ? "pointer-events-none opacity-40" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      {/* Clean Minimalist Search Modal Dialog */}
      <SchemeSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        schemes={initialSchemes}
        onSelectScheme={(scheme) => setActiveModalScheme(scheme)}
      />

      {/* Full Scheme Details Modal */}
      {activeModalScheme && (
        <SchemeDetailModal
          scheme={activeModalScheme}
          onClose={() => setActiveModalScheme(null)}
        />
      )}
    </div>
  );
}
