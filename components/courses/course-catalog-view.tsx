"use client";

import React, { useState, useMemo } from "react";
import { CourseItem, CourseCardGrid } from "./course-card-grid";
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  Sparkles,
  ChevronDown,
  RotateCcw,
  BookOpen,
  Check,
  Star,
} from "lucide-react";

interface CourseCatalogViewProps {
  initialCourses: CourseItem[];
}

// Categories corresponding to the tab bar in Image 3
const SKILL_TABS = [
  { id: "all", label: "सभी विषय (All Courses)" },
  { id: "dairy", label: "डेयरी एवं पशुपालन (Dairy)" },
  { id: "food-processing", label: "खाद्य प्रसंस्करण (Food Processing)" },
  { id: "organic-farming", label: "जैविक खेती (Organic Agri)" },
  { id: "schemes", label: "PMEGP व बैंक सब्सिडी (Subsidies)" },
  { id: "digital-marketing", label: "डिजिटल व्यवसाय व ONDC" },
  { id: "solar", label: "सौर ऊर्जा उद्यम (Solar Tech)" },
];

export function CourseCatalogView({ initialCourses }: CourseCatalogViewProps) {
  // State
  const [selectedTab, setSelectedTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "newest" | "price-asc" | "price-desc">("popular");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync tab with category filter
  const handleTabChange = (tabId: string) => {
    setSelectedTab(tabId);
    if (tabId === "all") {
      setSelectedCategories([]);
    } else {
      setSelectedCategories([tabId]);
    }
  };

  const toggleCategory = (catId: string) => {
    if (selectedCategories.includes(catId)) {
      const updated = selectedCategories.filter((c) => c !== catId);
      setSelectedCategories(updated);
      if (updated.length === 0) setSelectedTab("all");
    } else {
      const updated = [...selectedCategories, catId];
      setSelectedCategories(updated);
      if (updated.length === 1) setSelectedTab(updated[0]);
      else setSelectedTab("all");
    }
  };

  const clearAllFilters = () => {
    setSelectedTab("all");
    setSearchQuery("");
    setSelectedCategories([]);
    setPriceFilter("all");
    setSelectedLevel("all");
    setMinRating(0);
    setSortBy("popular");
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategories.length > 0 ||
    priceFilter !== "all" ||
    selectedLevel !== "all" ||
    minRating > 0;

  // Filter and Sort Logic
  const filteredCourses = useMemo(() => {
    return initialCourses
      .filter((course) => {
        // Search Query Filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = course.title.toLowerCase().includes(q);
          const matchesDesc = (course.shortDesc || "").toLowerCase().includes(q);
          const matchesInstructor = course.instructor.toLowerCase().includes(q);
          const matchesCategory = course.category.toLowerCase().includes(q);
          if (!matchesTitle && !matchesDesc && !matchesInstructor && !matchesCategory) {
            return false;
          }
        }

        // Category Filter
        if (selectedCategories.length > 0) {
          const categorySlugMap: Record<string, string[]> = {
            dairy: ["dairy", "डेयरी", "पशुपालन"],
            "food-processing": ["food-processing", "फूड", "प्रसंस्करण", "fssai"],
            "organic-farming": ["organic-farming", "जैविक", "कृषि", "farming"],
            schemes: ["schemes", "योजना", "pmegp", "सब्सिडी", "loan"],
            "digital-marketing": ["digital-marketing", "डिजिटल", "मार्केटिंग", "ondc"],
            solar: ["solar", "सौर", "ऊर्जा", "solar-energy"],
          };

          const matchesAnyCategory = selectedCategories.some((cat) => {
            const keywords = categorySlugMap[cat] || [cat];
            return keywords.some(
              (kw) =>
                course.category.toLowerCase().includes(kw) ||
                course.slug.toLowerCase().includes(kw)
            );
          });

          if (!matchesAnyCategory) return false;
        }

        // Price Filter
        if (priceFilter === "free" && course.isPaid && course.price > 0) return false;
        if (priceFilter === "paid" && (!course.isPaid || course.price === 0)) return false;

        // Level Filter
        if (selectedLevel !== "all") {
          const lvl = (course.level || "").toLowerCase();
          if (selectedLevel === "beginner" && !lvl.includes("begin") && !lvl.includes("शुरुआती")) return false;
          if (selectedLevel === "intermediate" && !lvl.includes("inter") && !lvl.includes("मध्यम")) return false;
          if (selectedLevel === "advanced" && !lvl.includes("adv") && !lvl.includes("उन्नत")) return false;
        }

        // Rating Filter
        if (minRating > 0 && course.rating < minRating) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price-asc") return (a.discountedPrice || a.price) - (b.discountedPrice || b.price);
        if (sortBy === "price-desc") return (b.discountedPrice || b.price) - (a.discountedPrice || a.price);
        if (sortBy === "newest") return b.id.localeCompare(a.id);
        // Default: Popularity (reviews count)
        return b.reviewsCount - a.reviewsCount;
      });
  }, [initialCourses, searchQuery, selectedCategories, priceFilter, selectedLevel, minRating, sortBy]);

  return (
    <div className="space-y-10">
      
      {/* ================= 1. SKILLS TO TRANSFORM YOUR CAREER AND LIFE SECTION (MATCHING IMAGE 3) ================= */}
      <div className="space-y-5">
        <div className="space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-headline">
            Skills to transform your career and life
          </h2>
          <p className="text-sm text-slate-600 font-body">
            From critical business foundations to specialized enterprise domains, Chhaigaon Udyami supports your professional development.
          </p>
        </div>

        {/* Tab Navigation Bar (Underline style matching Image 3) */}
        <div className="border-b border-slate-200 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-6 sm:gap-8 min-w-max pb-0.5">
            {SKILL_TABS.map((tab) => {
              const isActive = selectedTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`pb-3 text-sm font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "text-slate-950 font-extrabold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  <span>{tab.label}</span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-slate-950 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================= 2. MAIN CATALOG WITH SIDE FILTER ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* DESKTOP SIDEBAR FILTER (3 Cols) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-sm">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>फ़िल्टर (Filters)</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              कीवर्ड खोजें (Search)
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="उदा. डेयरी, FSSAI, लोन..."
                className="w-full h-9 pl-8 pr-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white text-slate-900 placeholder:text-slate-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 block">
              उद्योग श्रेणी (Categories)
            </label>
            <div className="space-y-1.5">
              {[
                { id: "dairy", label: "डेयरी एवं पशुपालन" },
                { id: "food-processing", label: "खाद्य प्रसंस्करण व FSSAI" },
                { id: "organic-farming", label: "जैविक खेती व एग्रोटेक" },
                { id: "schemes", label: "PMEGP व बैंक सब्सिडी" },
                { id: "digital-marketing", label: "डिजिटल व्यवसाय व ONDC" },
                { id: "solar", label: "सौर ऊर्जा एवं रिन्यूएबल" },
              ].map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-950 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat.id)}
                    onChange={() => toggleCategory(cat.id)}
                    className="rounded text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 border-slate-300"
                  />
                  <span>{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 block">
              मूल्य (Price)
            </label>
            <div className="space-y-1.5">
              {[
                { id: "all", label: "सभी (All)" },
                { id: "free", label: "निःशुल्क (Free Courses)" },
                { id: "paid", label: "प्रीमियम सर्टिफिकेशन (Paid)" },
              ].map((opt) => (
                <label
                  key={opt.id}
                  className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-950 cursor-pointer select-none"
                >
                  <input
                    type="radio"
                    name="priceFilter"
                    checked={priceFilter === opt.id}
                    onChange={() => setPriceFilter(opt.id as any)}
                    className="text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 border-slate-300"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 block">
              स्तर (Level)
            </label>
            <div className="space-y-1.5">
              {[
                { id: "all", label: "सभी स्तर (All Levels)" },
                { id: "beginner", label: "शुरुआती (Beginner)" },
                { id: "intermediate", label: "मध्यम (Intermediate)" },
                { id: "advanced", label: "उन्नत (Advanced Masterclass)" },
              ].map((lvl) => (
                <label
                  key={lvl.id}
                  className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-950 cursor-pointer select-none"
                >
                  <input
                    type="radio"
                    name="levelFilter"
                    checked={selectedLevel === lvl.id}
                    onChange={() => setSelectedLevel(lvl.id)}
                    className="text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 border-slate-300"
                  />
                  <span>{lvl.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="text-xs font-bold text-slate-800 block">
              रेटिंग (Ratings)
            </label>
            <div className="space-y-1.5">
              {[
                { value: 0, label: "सभी रेटिंग्स (All)" },
                { value: 4.5, label: "4.5★ और अधिक (Top Rated)" },
                { value: 4.0, label: "4.0★ और अधिक" },
              ].map((r) => (
                <label
                  key={r.value}
                  className="flex items-center gap-2 text-xs text-slate-700 hover:text-slate-950 cursor-pointer select-none"
                >
                  <input
                    type="radio"
                    name="ratingFilter"
                    checked={minRating === r.value}
                    onChange={() => setMinRating(r.value)}
                    className="text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 border-slate-300"
                  />
                  <span>{r.label}</span>
                </label>
              ))}
            </div>
          </div>

        </aside>

        {/* MAIN COURSES CATALOG (9 Cols) */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Top Control Bar: Total Count & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50/80 p-3.5 rounded-xl border border-slate-200">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-800 shadow-2xs"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
                <span>फ़िल्टर ({filteredCourses.length})</span>
              </button>

              <span className="text-xs font-bold text-slate-800">
                कुल उपलब्ध पाठ्यक्रम: <strong className="text-blue-700 font-extrabold">{filteredCourses.length}</strong>
              </span>
            </div>

            {/* Sort Selection */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <span className="text-xs text-slate-500 font-medium shrink-0">क्रमबद्ध करें:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="पाठ्यक्रम क्रमबद्ध करें"
                className="h-8 pl-2.5 pr-8 text-xs font-semibold bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:border-blue-600 cursor-pointer"
              >
                <option value="popular">सर्वाधिक लोकप्रिय (Most Popular)</option>
                <option value="rating">उच्चतम रेटिंग (Highest Rated)</option>
                <option value="newest">नया जोड़ा गया (Newest)</option>
                <option value="price-asc">मूल्य: कम से ज्यादा (Price: Low to High)</option>
                <option value="price-desc">मूल्य: ज्यादा से कम (Price: High to Low)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="text-slate-500 font-medium">सक्रिय फ़िल्टर:</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-medium">
                  खोज: &quot;{searchQuery}&quot;
                  <button onClick={() => setSearchQuery("")}><X className="w-3 h-3 hover:text-blue-950" /></button>
                </span>
              )}
              {selectedCategories.map((c) => (
                <span key={c} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-medium">
                  {c}
                  <button onClick={() => toggleCategory(c)}><X className="w-3 h-3 hover:text-blue-950" /></button>
                </span>
              ))}
              {priceFilter !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-medium">
                  {priceFilter === "free" ? "निःशुल्क" : "प्रीमियम"}
                  <button onClick={() => setPriceFilter("all")}><X className="w-3 h-3 hover:text-blue-950" /></button>
                </span>
              )}
              {selectedLevel !== "all" && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200 font-medium">
                  {selectedLevel}
                  <button onClick={() => setSelectedLevel("all")}><X className="w-3 h-3 hover:text-blue-950" /></button>
                </span>
              )}
              <button
                onClick={clearAllFilters}
                className="text-xs text-rose-600 hover:text-rose-800 font-bold underline ml-1 cursor-pointer"
              >
                सभी साफ़ करें
              </button>
            </div>
          )}

          {/* Courses Grid (Matching Image 3 layout) */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCourses.map((course) => (
                <CourseCardGrid key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-slate-50 rounded-2xl border border-slate-200">
              <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-800 mb-1">
                कोई पाठ्यक्रम नहीं मिला
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                आपके द्वारा चुने गए फ़िल्टर या खोज शब्दों के अनुसार कोई परिणाम उपलब्ध नहीं है।
              </p>
              <button
                onClick={clearAllFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
              >
                सभी फ़िल्टर रीसेट करें
              </button>
            </div>
          )}

        </div>

      </div>

      {/* MOBILE FILTER MODAL / DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs">
          <div className="bg-white w-full sm:max-w-md max-h-[85vh] rounded-t-3xl sm:rounded-2xl p-5 overflow-y-auto space-y-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-600" />
                <span>फ़िल्टर चुनें (Filter Options)</span>
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 block">उद्योग श्रेणी</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "dairy", label: "डेयरी एवं पशुपालन" },
                  { id: "food-processing", label: "खाद्य प्रसंस्करण" },
                  { id: "organic-farming", label: "जैविक खेती" },
                  { id: "schemes", label: "PMEGP व लोन" },
                  { id: "digital-marketing", label: "डिजिटल व्यवसाय" },
                  { id: "solar", label: "सौर ऊर्जा" },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => toggleCategory(cat.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold text-left border transition-all ${
                      selectedCategories.includes(cat.id)
                        ? "bg-blue-50 border-blue-500 text-blue-700 font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 block">मूल्य</label>
              <div className="flex gap-2">
                {[
                  { id: "all", label: "सभी" },
                  { id: "free", label: "निःशुल्क" },
                  { id: "paid", label: "प्रीमियम" },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPriceFilter(p.id as any)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      priceFilter === p.id
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-slate-50 border-slate-200 text-slate-700"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                रीसेट करें
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-xs"
              >
                परिणाम देखें ({filteredCourses.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
