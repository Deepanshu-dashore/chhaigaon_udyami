"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  PlayCircle,
  CheckCircle2,
  FileText,
  HelpCircle,
  Award,
  Clock,
  ArrowRight,
  Video,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface TimelineLesson {
  id: string;
  title: string;
  duration?: number | null;
  type?: string;
  description?: string | null;
  video?: {
    duration?: number | null;
  } | null;
}

export interface TimelineQuiz {
  id: string;
  title: string;
  passingPercentage: number;
}

export interface TimelineModule {
  id: string;
  order: number;
  title: string;
  description?: string | null;
  lessons: TimelineLesson[];
  quizzes?: TimelineQuiz[];
}

interface LearningPathModulesListProps {
  modules: TimelineModule[];
  completedLessonIds: string[];
  courseSlug: string;
  instructorName?: string;
}

export function LearningPathModulesList({
  modules,
  completedLessonIds,
  courseSlug,
  instructorName = "वरिष्ठ तकनीकी सलाहकार",
}: LearningPathModulesListProps) {
  const completedSet = React.useMemo(
    () => new Set(completedLessonIds),
    [completedLessonIds]
  );

  // By default, open the first module or the first in-progress module
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    if (!modules || modules.length === 0) return {};
    const firstUnfinished = modules.find((m) =>
      m.lessons.some((l) => !completedSet.has(l.id))
    );
    const targetModule = firstUnfinished || modules[0];
    return targetModule ? { [targetModule.id]: true } : { [modules[0].id]: true };
  });

  const isAllExpanded = modules.every((m) => expandedModules[m.id]);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleAll = () => {
    if (isAllExpanded) {
      setExpandedModules({});
    } else {
      const all: Record<string, boolean> = {};
      modules.forEach((m) => {
        all[m.id] = true;
      });
      setExpandedModules(all);
    }
  };

  const formatSeconds = (secs?: number | null) => {
    if (!secs) return "5m";
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    if (mins >= 60) {
      return `${Math.floor(mins / 60)}h ${mins % 60}m`;
    }
    return rem > 0 ? `${mins}m ${rem}s` : `${mins}m`;
  };

  const getLessonIcon = (type?: string, isDone?: boolean) => {
    if (isDone) {
      return <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />;
    }
    switch (type) {
      case "QUIZ":
      case "ASSESSMENT":
        return <Award className="size-4 text-amber-500 shrink-0" />;
      case "READING":
        return <FileText className="size-4 text-blue-500 shrink-0" />;
      default:
        return <PlayCircle className="size-4 text-blue-600 shrink-0 fill-blue-50" />;
    }
  };

  const getLessonTypeLabel = (type?: string) => {
    switch (type) {
      case "QUIZ":
      case "ASSESSMENT":
        return "प्रश्नोत्तरी";
      case "READING":
        return "पठन सामग्री";
      default:
        return "वीडियो व्याख्यान";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar with Expand/Collapse All toggle */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          मॉड्यूल एवं व्याख्यान सूची ({modules.length} मॉड्यूल)
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleAll}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 h-8 px-2.5"
        >
          {isAllExpanded ? "सभी संक्षिप्त करें (Collapse All)" : "सभी व्याख्यान देखें (Expand All)"}
        </Button>
      </div>

      {/* Vertical Connected Stepper Timeline (Image 2 Reference) */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E5E7EB]">
        {modules.map((mod, modIdx) => {
          const modLessons = mod.lessons;
          const modCompletedCount = modLessons.filter((l) => completedSet.has(l.id)).length;
          const modPercent =
            modLessons.length > 0
              ? Math.round((modCompletedCount / modLessons.length) * 100)
              : 0;
          const isModCompleted = modPercent === 100 && modLessons.length > 0;
          const modMinutes = modLessons.reduce(
            (acc, l) => acc + (l.duration ? Math.round(l.duration / 60) : 15),
            0
          );
          const isExpanded = !!expandedModules[mod.id];

          return (
            <div key={mod.id} className="relative">
              {/* Connected Stepper Node Circle (Image 2) */}
              <div
                className={`absolute -left-6 sm:-left-8 top-3 size-4 rounded-full border-2 bg-white transition-colors flex items-center justify-center ${
                  isModCompleted
                    ? "border-emerald-600 bg-emerald-600 ring-2 ring-emerald-100"
                    : modPercent > 0
                    ? "border-[#1261D6] bg-[#1261D6] ring-2 ring-blue-100"
                    : "border-slate-300"
                }`}
              >
                {isModCompleted && <div className="size-1.5 rounded-full bg-white" />}
              </div>

              {/* Module Item Card Container */}
              <div
                className={`bg-[#F8FAFC] border rounded-xl transition-all overflow-hidden ${
                  isExpanded
                    ? "border-blue-200/90 shadow-xs ring-1 ring-blue-100/60 bg-white"
                    : "border-[#E5E7EB] hover:border-slate-300"
                }`}
              >
                {/* Module Header (Clickable Dropdown Trigger) */}
                <div
                  onClick={() => toggleModule(mod.id)}
                  className="p-4 sm:p-5 cursor-pointer select-none space-y-3 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider flex items-center gap-1.5">
                      <span>Module {modIdx + 1}</span>
                      <span>•</span>
                      <span>{modLessons.length} व्याख्यान</span>
                    </span>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="text-xs font-mono font-medium text-[#475467] bg-white border-slate-200"
                      >
                        {Math.floor(modMinutes / 60)}h {modMinutes % 60}m
                      </Badge>
                      <button
                        type="button"
                        className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="size-4 text-blue-600" />
                        ) : (
                          <ChevronDown className="size-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Title & Instructor */}
                  <div>
                    <h3 className="font-bold text-base text-[#111827] flex items-center justify-between gap-2">
                      <span className="hover:text-[#1261D6] transition-colors">{mod.title}</span>
                      <span className="text-xs font-medium text-blue-600 shrink-0 inline-flex items-center gap-1">
                        {isExpanded ? "व्याख्यान छुपाएं" : "व्याख्यान देखें"}
                        {isExpanded ? (
                          <ChevronUp className="size-3.5" />
                        ) : (
                          <ChevronDown className="size-3.5" />
                        )}
                      </span>
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-[#667085] mt-1">
                      <span className="font-medium text-[#111827]">छैगांव अकादमी</span>
                      <span>•</span>
                      <span>By: {instructorName}</span>
                    </div>
                  </div>

                  {mod.description && (
                    <p className="text-xs text-[#475467] leading-relaxed line-clamp-2">
                      {mod.description}
                    </p>
                  )}

                  {/* Module Mini Progress Bar */}
                  <div className="pt-2 flex items-center justify-between gap-4 border-t border-[#E5E7EB]">
                    <div className="flex-1 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${modPercent}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-[#667085] shrink-0 font-mono">
                      {isModCompleted
                        ? "पूर्ण (100%)"
                        : `${modCompletedCount}/${modLessons.length} पाठ पूर्ण`}
                    </span>
                  </div>
                </div>

                {/* ========================================================= */}
                {/* DROPDOWN: VIDEOS & LECTURES LIST                          */}
                {/* ========================================================= */}
                {isExpanded && (
                  <div className="border-t border-slate-200/80 bg-slate-50/50 p-3 sm:p-4 space-y-2 animate-in fade-in duration-200">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-2 pb-1 flex items-center justify-between">
                      <span>पाठ्यक्रम सामग्री ({modLessons.length} पाठ)</span>
                      <span>क्लिक कर सीधे देखें</span>
                    </div>

                    <div className="space-y-1.5">
                      {modLessons.map((lesson, lessonIdx) => {
                        const isDone = completedSet.has(lesson.id);
                        const durationText = formatSeconds(
                          lesson.duration ?? lesson.video?.duration
                        );

                        return (
                          <Link
                            key={lesson.id}
                            href={`/courses/${courseSlug}/learn?lessonId=${lesson.id}`}
                            className={`group flex items-center justify-between p-3 rounded-lg border transition-all ${
                              isDone
                                ? "bg-white border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50/30"
                                : "bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 shadow-2xs"
                            }`}
                          >
                            <div className="flex items-start gap-3 min-w-0 pr-3">
                              <div className="mt-0.5 shrink-0">
                                {getLessonIcon(lesson.type, isDone)}
                              </div>

                              <div className="min-w-0">
                                <p
                                  className={`text-xs sm:text-sm font-semibold truncate ${
                                    isDone
                                      ? "text-slate-800"
                                      : "text-slate-900 group-hover:text-blue-700"
                                  }`}
                                >
                                  {modIdx + 1}.{lessonIdx + 1} {lesson.title}
                                </p>
                                <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                                  <span>{getLessonTypeLabel(lesson.type)}</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1 font-mono">
                                    <Clock className="size-3 text-slate-400" />
                                    {durationText}
                                  </span>
                                  {isDone && (
                                    <>
                                      <span>•</span>
                                      <span className="text-emerald-700 font-medium">पूर्ण</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-blue-600 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                              <span className="hidden sm:inline">
                                {isDone ? "पुनः देखें" : "देखें"}
                              </span>
                              <ArrowRight className="size-3.5" />
                            </div>
                          </Link>
                        );
                      })}

                      {/* If module has assessment quizzes */}
                      {mod.quizzes &&
                        mod.quizzes.map((quiz) => (
                          <Link
                            key={quiz.id}
                            href={`/courses/${courseSlug}/learn?lessonId=quiz-${quiz.id}`}
                            className="group flex items-center justify-between p-3 rounded-lg border border-amber-200 bg-amber-50/40 hover:bg-amber-50 hover:border-amber-300 transition-all shadow-2xs"
                          >
                            <div className="flex items-start gap-3 min-w-0 pr-3">
                              <Award className="size-4 text-amber-600 shrink-0 mt-0.5" />
                              <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-amber-800 truncate">
                                  अध्याय मूल्यांकन: {quiz.title}
                                </p>
                                <p className="text-[11px] text-amber-700 font-medium mt-0.5">
                                  उत्तीर्ण प्रतिशत: {quiz.passingPercentage}% • अध्याय प्रश्नोत्तरी
                                </p>
                              </div>
                            </div>

                            <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold text-amber-700 group-hover:translate-x-0.5 transition-all">
                              <span>क्विज शुरू करें</span>
                              <ArrowRight className="size-3.5" />
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
