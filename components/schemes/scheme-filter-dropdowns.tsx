"use client";

import React from "react";
import {
  ChevronDown,
  Building,
  ArrowUpDown,
  RotateCcw,
  X,
  Check,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { FilterOption, CATEGORY_LABELS } from "@/lib/data/default-schemes";

interface SchemeFilterDropdownsProps {
  categories: FilterOption[];
  departments: FilterOption[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedDepartment: string;
  onSelectDepartment: (dept: string) => void;
  sortBy: string;
  onSelectSort: (sort: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  onResetFilters: () => void;
  totalResults: number;
}

export function SchemeFilterDropdowns({
  categories,
  departments,
  selectedCategory,
  onSelectCategory,
  selectedDepartment,
  onSelectDepartment,
  sortBy,
  onSelectSort,
  searchQuery,
  onClearSearch,
  onResetFilters,
  totalResults,
}: SchemeFilterDropdownsProps) {
  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    (selectedCategory !== "all" && Boolean(selectedCategory)) ||
    (selectedDepartment !== "all" && Boolean(selectedDepartment)) ||
    sortBy !== "default";

  const activeDepartmentLabel =
    selectedDepartment === "all" ? "सभी विभाग" : selectedDepartment;

  const sortLabels: Record<string, string> = {
    default: "मानक क्रम",
    title_asc: "नाम: A → Z",
    updated_desc: "हाल ही में अपडेट",
  };

  return (
    <div className="w-full space-y-3.5 mb-6">
      {/* ── Category Pill Tabs Bar (Primary 1-click Filter, No Duplicate Dropdown) ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar flex-1">
          <button
            onClick={() => onSelectCategory("all")}
            className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#0056d2] text-white shadow-xs"
                : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
            }`}
            style={{
              fontFamily:
                "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif",
            }}
          >
            सभी योजनाएं
          </button>

          {categories.map((cat) => {
            const isActive = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => onSelectCategory(isActive ? "all" : cat.value)}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-[#0056d2] text-white shadow-xs"
                    : "bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
                }`}
                style={{
                  fontFamily:
                    "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif",
                }}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive
                      ? "bg-white/25 text-white"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right side controls: Department Dropdown + Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Department Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors focus:outline-hidden cursor-pointer shadow-2xs">
              <Building className="w-3.5 h-3.5 text-slate-500" />
              <span className="truncate max-w-[120px] sm:max-w-[160px]">
                {activeDepartmentLabel}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-68 max-h-72 overflow-y-auto">
              <DropdownMenuLabel className="text-xs text-slate-500">
                शासकीय विभाग चुनें
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onSelectDepartment("all")}
                className="flex items-center justify-between cursor-pointer text-xs"
              >
                <span>सभी विभाग</span>
                {selectedDepartment === "all" && <Check className="w-3.5 h-3.5 text-blue-600" />}
              </DropdownMenuItem>
              {departments.map((dept) => (
                <DropdownMenuItem
                  key={dept.value}
                  onClick={() => onSelectDepartment(dept.value)}
                  className="flex items-center justify-between cursor-pointer py-1.5 text-xs"
                >
                  <span className="truncate max-w-[180px]">{dept.label}</span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-1 py-0.2 rounded font-bold">
                      {dept.count}
                    </span>
                    {selectedDepartment === dept.value && (
                      <Check className="w-3.5 h-3.5 text-blue-600" />
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer shadow-2xs">
              <ArrowUpDown className="w-3 h-3 text-slate-400" />
              <span>{sortLabels[sortBy] || "क्रमबद्ध"}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44">
              <DropdownMenuLabel className="text-xs text-slate-500">
                क्रमबद्ध प्रकार
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onSelectSort("default")}
                className="cursor-pointer text-xs"
              >
                {sortLabels.default}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onSelectSort("title_asc")}
                className="cursor-pointer text-xs"
              >
                {sortLabels.title_asc}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onSelectSort("updated_desc")}
                className="cursor-pointer text-xs"
              >
                {sortLabels.updated_desc}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Reset Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-1.5 rounded-md hover:bg-rose-50 transition-colors cursor-pointer"
              title="फ़िल्टर साफ़ करें"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">साफ़ करें</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Active Filter Badges Bar (Minimal & Clean) ── */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 text-xs pt-0.5">
          <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
            फ़िल्टर:
          </span>

          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-medium">
              <span>खोज: &quot;{searchQuery}&quot;</span>
              <button
                onClick={onClearSearch}
                className="hover:text-blue-900 cursor-pointer"
                aria-label="खोज हटाएं"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedDepartment !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-medium max-w-[240px]">
              <span className="truncate">विभाग: {activeDepartmentLabel}</span>
              <button
                onClick={() => onSelectDepartment("all")}
                className="hover:text-emerald-950 cursor-pointer shrink-0"
                aria-label="विभाग हटाएं"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <span className="text-[11px] text-slate-400 ml-auto font-medium">
            कुल {totalResults} योजनाएं मिलीं
          </span>
        </div>
      )}
    </div>
  );
}
