"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Pencil,
  Gem,
  ClipboardCheck,
  ArrowRight,
  MoreHorizontal,
  Share2,
  PlayCircle,
  CheckCircle2,
  BookOpen,
  Sparkles,
  Bookmark,
  Layers,
  History,
  Star,
  ExternalLink,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface CourseContentItem {
  id: string;
  title: string;
  slug: string;
  type: "Course" | "Learning Path";
  thumbnail: string;
  duration: string;
  provider: string;
  providerLogoText: string;
  updatedDate: string;
  percent: number;
  remainingTime: string;
  completedLessons: number;
  totalLessons: number;
  status: "IN_PROGRESS" | "COMPLETED" | "NOT_STARTED";
  isSaved?: boolean;
  isRolePlay?: boolean;
  category?: string;
}

interface MyContentViewProps {
  initialCourses: CourseContentItem[];
  userStats: {
    weeklyMinutesGoal: number;
    weeklyMinutesDone: number;
    followedSkillsCount: number;
    evaluationsCount: number;
  };
}

export function MyContentView({ initialCourses, userStats }: MyContentViewProps) {
  const [activeTab, setActiveTab] = useState<
    "in_progress" | "role_plays" | "saved" | "collections" | "history"
  >("in_progress");

  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [courses, setCourses] = useState<CourseContentItem[]>(initialCourses);
  const [weeklyGoal, setWeeklyGoal] = useState<number>(userStats.weeklyMinutesGoal);
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false);
  const [goalInput, setGoalInput] = useState<string>(userStats.weeklyMinutesGoal.toString());

  // Compute date range for current week (e.g. Oct 12 to Oct 18)
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (6 - dayOfWeek));

  const formatShortDate = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const weekRangeStr = `${formatShortDate(startOfWeek)} to ${formatShortDate(endOfWeek)}`;

  // Filter items based on active tab
  const inProgressList = courses.filter((c) => c.percent > 0 && c.percent < 100);
  const completedList = courses.filter((c) => c.percent === 100);
  const savedList = courses.filter((c) => c.isSaved);
  const rolePlayList = courses.filter((c) => c.isRolePlay);

  const displayedList =
    activeTab === "in_progress"
      ? inProgressList.length > 0
        ? inProgressList
        : courses
      : activeTab === "history"
      ? completedList
      : activeTab === "saved"
      ? savedList
      : activeTab === "role_plays"
      ? rolePlayList
      : courses;

  const handleShare = (course: CourseContentItem) => {
    const url = `${window.location.origin}/courses/${course.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedId(course.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleToggleSave = (id: string) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isSaved: !c.isSaved } : c))
    );
  };

  const handleSaveGoal = () => {
    const val = parseInt(goalInput, 10);
    if (!isNaN(val) && val > 0) {
      setWeeklyGoal(val);
    }
    setIsEditingGoal(false);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-sans text-slate-900 pb-12">
      {/* 1. Header Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
          My Content
        </h1>
      </div>

      {/* 2. Top Summary Widgets Row (Weekly goal, Skills, Skill Evaluations) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {/* Widget 1: Weekly goal */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="size-10 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 text-slate-800">
              <Trophy className="size-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-800 block truncate">
                Weekly goal <span className="font-normal text-slate-500">({weekRangeStr})</span>
              </span>
              {isEditingGoal ? (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <input
                    type="number"
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    className="w-16 h-6 px-1.5 text-xs border border-slate-300 rounded font-semibold text-slate-900 focus:outline-blue-600"
                    min="5"
                    max="600"
                  />
                  <span className="text-xs text-slate-500">mins</span>
                  <button
                    onClick={handleSaveGoal}
                    className="text-[11px] bg-blue-600 text-white px-2 py-0.5 rounded font-bold hover:bg-blue-700"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <span className="text-xs text-slate-500 font-medium block">
                  {userStats.weeklyMinutesDone}/{weeklyGoal} mins
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsEditingGoal(!isEditingGoal)}
            className="size-8 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center shrink-0 transition-colors"
            title="Edit weekly goal"
            aria-label="Edit weekly goal"
          >
            <Pencil className="size-4" />
          </button>
        </div>

        {/* Widget 2: Skills */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="size-10 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 text-slate-800">
              <Gem className="size-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-800 block truncate">
                Skills
              </span>
              <span className="text-xs text-slate-500 font-medium block truncate">
                {userStats.followedSkillsCount} followed skills
              </span>
            </div>
          </div>
          <Link
            href="/courses"
            className="size-8 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center shrink-0 transition-colors"
            title="Explore skills"
            aria-label="Explore skills"
          >
            <Pencil className="size-4" />
          </Link>
        </div>

        {/* Widget 3: Skill Evaluations */}
        <Link
          href="/dashboard/certificates"
          className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between group cursor-pointer"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="size-10 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 text-slate-800 group-hover:text-blue-600 transition-colors">
              <ClipboardCheck className="size-5" />
            </div>
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-800 block truncate group-hover:text-blue-600 transition-colors">
                Skill Evaluations
              </span>
              <span className="text-xs text-slate-500 font-medium block truncate">
                {userStats.evaluationsCount} evaluations
              </span>
            </div>
          </div>
          <div className="size-8 rounded-lg text-slate-500 group-hover:text-blue-600 group-hover:translate-x-0.5 flex items-center justify-center shrink-0 transition-all">
            <ArrowRight className="size-4" />
          </div>
        </Link>
      </div>

      {/* 3. Main Content Section: Left Sidebar Tabs + Right Courses List Container */}
      <div className="flex flex-col md:flex-row gap-5 items-start">
        {/* Left Sidebar Navigation Menu */}
        <div className="w-full md:w-56 shrink-0 bg-white rounded-xl border border-slate-200/90 shadow-2xs py-2 overflow-hidden">
          <nav className="flex flex-col text-sm">
            {/* Tab 1: In progress */}
            <button
              onClick={() => setActiveTab("in_progress")}
              className={`text-left transition-colors cursor-pointer flex items-center justify-between ${
                activeTab === "in_progress"
                  ? "border-l-[3.5px] border-slate-950 font-bold text-slate-950 bg-slate-50/80 pl-3.5 pr-4 py-2.5"
                  : "pl-4 pr-4 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50/50 font-medium"
              }`}
            >
              <span>In progress ({inProgressList.length || courses.length})</span>
            </button>

            {/* Tab 2: My role plays */}
            <button
              onClick={() => setActiveTab("role_plays")}
              className={`text-left transition-colors cursor-pointer flex items-center justify-between ${
                activeTab === "role_plays"
                  ? "border-l-[3.5px] border-slate-950 font-bold text-slate-950 bg-slate-50/80 pl-3.5 pr-4 py-2.5"
                  : "pl-4 pr-4 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50/50 font-medium"
              }`}
            >
              <span>My role plays</span>
            </button>

            {/* Tab 3: Saved */}
            <button
              onClick={() => setActiveTab("saved")}
              className={`text-left transition-colors cursor-pointer flex items-center justify-between ${
                activeTab === "saved"
                  ? "border-l-[3.5px] border-slate-950 font-bold text-slate-950 bg-slate-50/80 pl-3.5 pr-4 py-2.5"
                  : "pl-4 pr-4 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50/50 font-medium"
              }`}
            >
              <span>Saved</span>
              {savedList.length > 0 && (
                <span className="text-[11px] text-slate-400 font-semibold">
                  ({savedList.length})
                </span>
              )}
            </button>

            {/* Tab 4: My collections */}
            <button
              onClick={() => setActiveTab("collections")}
              className={`text-left transition-colors cursor-pointer flex items-center justify-between ${
                activeTab === "collections"
                  ? "border-l-[3.5px] border-slate-950 font-bold text-slate-950 bg-slate-50/80 pl-3.5 pr-4 py-2.5"
                  : "pl-4 pr-4 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50/50 font-medium"
              }`}
            >
              <span>My collections</span>
            </button>

            {/* Tab 5: Learning history */}
            <button
              onClick={() => setActiveTab("history")}
              className={`text-left transition-colors cursor-pointer flex items-center justify-between ${
                activeTab === "history"
                  ? "border-l-[3.5px] border-slate-950 font-bold text-slate-950 bg-slate-50/80 pl-3.5 pr-4 py-2.5"
                  : "pl-4 pr-4 py-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50/50 font-medium"
              }`}
            >
              <span>Learning history</span>
              {completedList.length > 0 && (
                <span className="text-[11px] text-slate-400 font-semibold">
                  ({completedList.length})
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Right Main Courses Container (Matching the reference LinkedIn Learning list) */}
        <div className="flex-1 w-full bg-white rounded-xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100 overflow-hidden">
          {displayedList.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="size-12 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
                <BookOpen className="size-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                {activeTab === "saved"
                  ? "कोई कोर्स सहेजा नहीं गया है (No saved items)"
                  : activeTab === "history"
                  ? "कोई पूर्ण कोर्स नहीं है (No completed courses yet)"
                  : activeTab === "role_plays"
                  ? "कोई रोल-प्ले सत्र उपलब्ध नहीं है"
                  : "कोई सक्रिय कोर्स नहीं मिला"}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                व्यावसायिक ग्रामीण उद्यम प्रशिक्षण शुरू करने के लिए हमारे कोर्स कैटलॉग को एक्सप्लोर करें।
              </p>
              <Link href="/courses">
                <Button className="mt-2 bg-[#0056d2] hover:bg-blue-700 text-white font-bold text-xs h-9 px-4 rounded-full shadow-xs cursor-pointer">
                  कोर्स देखें (Browse Courses)
                </Button>
              </Link>
            </div>
          ) : (
            displayedList.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-stretch hover:bg-slate-50/60 transition-colors group relative"
              >
                {/* 1. Thumbnail Column (with bottom-right duration pill and gold star badge) */}
                <Link
                  href={`/courses/${item.slug}/learn`}
                  className="w-full sm:w-56 md:w-64 aspect-video sm:aspect-[16/10] rounded-lg overflow-hidden shrink-0 relative bg-slate-100 border border-slate-200/80 cursor-pointer block"
                >
                  <img
                    src={item.thumbnail || "/images/dairy-course.jpg"}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                  />

                  {/* Gold Star Badge on Bottom-Left (As shown in reference image) */}
                  <div className="absolute bottom-1.5 left-1.5 size-5 rounded-full bg-[#f59e0b] text-slate-950 flex items-center justify-center shadow-xs">
                    <Star className="size-3 fill-slate-950 text-slate-950" />
                  </div>

                  {/* Duration Pill Badge on Bottom-Right (As shown in reference image e.g. 12h, 2h 2m) */}
                  <div className="absolute bottom-1.5 right-1.5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs select-none">
                    {item.duration}
                  </div>

                  {/* Hover Play Button Overlay */}
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="size-10 rounded-full bg-white/95 text-[#0056d2] flex items-center justify-center shadow-md">
                      <PlayCircle className="size-6 ml-0.5" />
                    </div>
                  </div>
                </Link>

                {/* 2. Course Details & Actions Column */}
                <div className="flex flex-col justify-between flex-1 min-w-0 w-full py-0.5 space-y-2">
                  <div className="space-y-1.5">
                    {/* Top Content Type (Learning Path / Course) */}
                    <span className="text-[11px] font-medium text-slate-500 block">
                      {item.type}
                    </span>

                    {/* Title */}
                    <Link
                      href={`/courses/${item.slug}/learn`}
                      className="block group/title"
                    >
                      <h3
                        className="text-[15px] sm:text-[16px] font-bold text-slate-900 group-hover/title:text-[#0056d2] transition-colors line-clamp-2 leading-snug"
                        style={{
                          fontFamily:
                            "var(--font-noto-sans-devanagari), var(--font-mukta), sans-serif",
                        }}
                      >
                        {item.title}
                      </h3>
                    </Link>

                    {/* Provider / Instructor Row with Monogram Square Logo Avatar */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 flex-wrap">
                      <div className="size-4.5 rounded-[3px] bg-[#0056d2] text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-2xs select-none">
                        {item.providerLogoText}
                      </div>
                      <span className="line-clamp-1">
                        Provided by {item.provider}
                      </span>
                      <span className="text-slate-300 select-none">·</span>
                      <span className="text-slate-500 shrink-0">
                        Updated {item.updatedDate}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row: Progress Bar (Left) + Actions Buttons (Right) */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-auto">
                    {/* Progress Bar (LinkedIn Learning style green line + remaining time) */}
                    <div className="flex-1 max-w-xs">
                      {item.percent > 0 ? (
                        <div className="flex items-center gap-2.5">
                          <div className="w-32 sm:w-36 h-1 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#007a5a] rounded-full transition-all duration-300"
                              style={{ width: `${item.percent}%` }}
                            />
                          </div>
                          <span className="text-[11px] font-medium text-slate-500 shrink-0">
                            {item.remainingTime}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[11px] font-medium text-slate-400">
                          प्रारंभ नहीं हुआ (Not started)
                        </span>
                      )}
                    </div>

                    {/* Actions: ... Button + Outlined Share Pill Button + Continue Button */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                      {/* Bookmark / Save toggle */}
                      <button
                        onClick={() => handleToggleSave(item.id)}
                        className={`size-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                          item.isSaved
                            ? "text-blue-600 bg-blue-50"
                            : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                        }`}
                        title={item.isSaved ? "Saved" : "Save for later"}
                        aria-label="Save course"
                      >
                        <Bookmark
                          className={`size-4 ${item.isSaved ? "fill-blue-600" : ""}`}
                        />
                      </button>

                      {/* More (...) Button */}
                      <Link
                        href={`/dashboard/courses/${item.slug}`}
                        className="size-8 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                        title="Course overview"
                        aria-label="Course overview"
                      >
                        <MoreHorizontal className="size-4" />
                      </Link>

                      {/* Outlined Pill Share Button (As in reference image) */}
                      <button
                        onClick={() => handleShare(item)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#0056d2] text-[#0056d2] hover:bg-blue-50/70 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="size-3 text-emerald-600" />
                            <span className="text-emerald-700 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <span>Share</span>
                          </>
                        )}
                      </button>

                      {/* Direct Learn Action Button */}
                      <Link
                        href={`/courses/${item.slug}/learn`}
                        className="inline-flex items-center gap-1 bg-[#0056d2] hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-full shadow-2xs transition-colors cursor-pointer"
                      >
                        <span>{item.percent > 0 ? "जारी रखें" : "शुरू करें"}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
