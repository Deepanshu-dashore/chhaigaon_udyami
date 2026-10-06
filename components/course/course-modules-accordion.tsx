"use client";

import React, { useState } from "react";
import {
  Video,
  FileText,
  HelpCircle,
  Download,
  ChevronDown,
  ChevronUp,
  PlayCircle,
  Lock,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface LessonItem {
  id: string;
  title: string;
  description?: string;
  duration?: string;
  type?: "video" | "reading" | "quiz" | "resource";
  isPreview?: boolean;
  resourceType?: string;
  resourceSize?: string;
  downloadUrl?: string;
  questionsCount?: number;
}

export interface ModuleQuizItem {
  id: string;
  title: string;
  passingPercentage: number;
  timeLimit?: number | null;
  _count?: { questions: number };
  isLocked?: boolean; // true if module lessons not yet complete
  userBestAttempt?: {
    id: string;
    score: number;
    isPassed: boolean;
    completedAt?: string | null;
  } | null;
}

export interface ModuleItem {
  id: string;
  order: number;
  title: string;
  description?: string;
  duration?: string;
  lessons: LessonItem[];
  moduleQuiz?: ModuleQuizItem | null; // End-of-module assessment
  moduleProgress?: { isCompleted: boolean; completedAt?: string | null }[] | null;
}

interface CourseModulesAccordionProps {
  modules: ModuleItem[];
}

export function CourseModulesAccordion({ modules }: CourseModulesAccordionProps) {
  // Store expanded module state
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    return modules[0] ? { [modules[0].id]: true } : {};
  });

  // Store expanded lesson details state
  const [expandedLessons, setExpandedLessons] = useState<Record<string, boolean>>({});

  // Quiz Modal State
  const [activeQuiz, setActiveQuiz] = useState<{
    title: string;
    questionsCount: number;
  } | null>(null);

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleLesson = (id: string) => {
    setExpandedLessons((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isAllExpanded = modules.every((m) => expandedModules[m.id]);

  const toggleAll = () => {
    if (isAllExpanded) {
      setExpandedModules({});
    } else {
      const allState: Record<string, boolean> = {};
      modules.forEach((m) => {
        allState[m.id] = true;
      });
      setExpandedModules(allState);
    }
  };

  // Calculate totals
  let totalLectures = 0;
  modules.forEach((m) => {
    totalLectures += m.lessons.length;
  });

  return (
    <div className="space-y-4 font-sans text-slate-900">
      
      {/* Course Content Header Summary (Udemy Style) */}
      <div className="flex items-center justify-between flex-wrap gap-2 text-xs sm:text-sm">
        <div className="text-slate-600 font-medium">
          <span>{modules.length} मॉड्यूल</span>
          <span className="mx-1 font-bold">•</span>
          <span>{totalLectures} व्याख्यान</span>
          <span className="mx-1 font-bold">•</span>
          <span>6.5 घंटे कुल अवधि</span>
        </div>

        <button
          onClick={toggleAll}
          className="text-xs font-bold text-[#0056d2] hover:text-blue-800 cursor-pointer"
        >
          {isAllExpanded ? "सभी मॉड्यूल समेटें (Collapse all)" : "सभी मॉड्यूल विस्तार करें (Expand all sections)"}
        </button>
      </div>

      {/* Modules Accordion List */}
      <div className="border border-slate-200 rounded-xl divide-y divide-slate-200 overflow-hidden bg-white shadow-2xs">
        {modules.map((mod, index) => {
          const isOpen = Boolean(expandedModules[mod.id]);

          return (
            <div key={mod.id} className="bg-white">
              
              {/* Module Accordion Header */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full text-left p-4 bg-slate-50/70 hover:bg-slate-100/70 flex items-center justify-between gap-4 transition-colors cursor-pointer select-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-slate-500 shrink-0">
                    {isOpen ? <ChevronUp className="size-4 text-slate-700" /> : <ChevronDown className="size-4 text-slate-700" />}
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 font-headline truncate">
                    मॉड्यूल {index + 1}: {mod.title}
                  </h4>
                </div>

                <div className="text-xs text-slate-500 font-medium shrink-0">
                  <span>{mod.lessons.length} पाठ</span>
                  <span className="mx-1 font-bold">•</span>
                  <span>{mod.duration || "1.5 घंटे"}</span>
                </div>
              </button>

              {/* Expanded Lessons List */}
              {isOpen && (
                <div className="divide-y divide-slate-100 bg-white">
                  {mod.lessons.map((lesson, idx) => {
                    const isQuiz = lesson.type === "quiz";
                    const isResource = lesson.type === "resource" || lesson.type === "reading";
                    const isLessonExpanded = Boolean(expandedLessons[lesson.id]);

                    return (
                      <div key={lesson.id || idx} className="p-3 sm:px-5 hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                          
                          {/* Left: Icon & Title */}
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            {isQuiz ? (
                              <HelpCircle className="size-4 text-[#0056d2] shrink-0" />
                            ) : isResource ? (
                              <FileText className="size-4 text-amber-600 shrink-0" />
                            ) : (
                              <Video className="size-4 text-slate-500 shrink-0" />
                            )}

                            <button
                              onClick={() => lesson.description && toggleLesson(lesson.id)}
                              className={`text-left font-medium text-slate-800 hover:text-[#0056d2] transition-colors truncate ${
                                lesson.description ? "cursor-pointer" : "cursor-default"
                              }`}
                            >
                              <span>{lesson.title}</span>
                              {lesson.description && (
                                <span className="ml-1 text-slate-400 text-xs">
                                  {isLessonExpanded ? "▲" : "▼"}
                                </span>
                              )}
                            </button>
                          </div>

                          {/* Right: Preview Pill, Resource Download, Duration */}
                          <div className="flex items-center gap-3 shrink-0">
                            {lesson.isPreview && (
                              <button
                                onClick={() => alert(`मुफ्त पूर्वावलोकन वीडियो: ${lesson.title}`)}
                                className="text-xs font-bold text-[#0056d2] hover:underline flex items-center gap-1 cursor-pointer"
                              >
                                <PlayCircle className="size-3.5 fill-[#0056d2] text-white" />
                                <span>पूर्वावलोकन (Preview)</span>
                              </button>
                            )}

                            {isQuiz && (
                              <Button
                                size="sm"
                                onClick={() =>
                                  setActiveQuiz({
                                    title: lesson.title,
                                    questionsCount: lesson.questionsCount || 10,
                                  })
                                }
                                className="h-6 px-2 text-[11px] font-bold bg-[#0056d2] hover:bg-blue-700 text-white cursor-pointer rounded-sm"
                              >
                                क्विज़ दें
                              </Button>
                            )}

                            {isResource && (
                              <Button
                                size="sm"
                                variant="outline"
                                asChild
                                className="h-6 px-2 text-[11px] font-bold border-amber-300 text-amber-800 hover:bg-amber-50 cursor-pointer rounded-sm"
                              >
                                <a href={lesson.downloadUrl || "#resources"} download>
                                  <Download className="size-3 mr-1" />
                                  <span>DPR / PDF</span>
                                </a>
                              </Button>
                            )}

                            {lesson.duration && (
                              <span className="text-xs text-slate-500 font-mono">
                                {lesson.duration}
                              </span>
                            )}
                          </div>

                        </div>

                        {/* Optional Lesson Description */}
                        {isLessonExpanded && lesson.description && (
                          <div className="mt-2 pl-7 pr-2 py-2 text-xs text-slate-600 bg-slate-50 rounded-sm border border-slate-200/60 leading-relaxed">
                            {lesson.description}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Module-level Quiz Row (end-of-module assessment) */}
                  {mod.moduleQuiz && (() => {
                    const quiz = mod.moduleQuiz!;
                    const isModuleComplete = mod.moduleProgress?.[0]?.isCompleted ?? false;
                    const isLocked = quiz.isLocked !== undefined ? quiz.isLocked : !isModuleComplete;
                    const hasPassed = quiz.userBestAttempt?.isPassed;

                    return (
                      <div className={`p-3 sm:px-5 border-t-2 border-dashed ${
                        isLocked ? "border-slate-200 bg-slate-50/40" : hasPassed ? "border-emerald-200 bg-emerald-50/30" : "border-teal-200 bg-teal-50/30"
                      }`}>
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0 flex-1">
                            {isLocked ? (
                              <Lock className="size-4 text-slate-400 shrink-0" />
                            ) : hasPassed ? (
                              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                            ) : (
                              <ClipboardList className="size-4 text-teal-600 shrink-0" />
                            )}
                            <div className="min-w-0">
                              <p className={`text-xs font-bold truncate ${
                                isLocked ? "text-slate-400" : hasPassed ? "text-emerald-700" : "text-teal-800"
                              }`}>
                                मॉड्यूल क्विज़: {quiz.title}
                              </p>
                              <p className="text-[10px] text-slate-500 mt-0.5">
                                {quiz._count?.questions ?? 0} प्रश्न • {quiz.passingPercentage}% उत्तीर्ण अंक
                                {quiz.timeLimit ? ` • ${quiz.timeLimit} मिनट` : ""}
                              </p>
                            </div>
                          </div>

                          <div className="shrink-0">
                            {isLocked ? (
                              <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                                <Lock className="size-3" /> सभी पाठ पूरे करें
                              </span>
                            ) : hasPassed ? (
                              <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[10px] rounded-sm">
                                ✓ उत्तीर्ण ({Math.round(quiz.userBestAttempt!.score)}%)
                              </Badge>
                            ) : (
                              <Button
                                size="sm"
                                className="h-6 px-2 text-[11px] font-bold bg-teal-600 hover:bg-teal-700 text-white cursor-pointer rounded-sm"
                                onClick={() => setActiveQuiz({ title: quiz.title, questionsCount: quiz._count?.questions ?? 0 })}
                              >
                                मॉड्यूल क्विज़ दें
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

            </div>
          );
        })}
      </div>

      {/* Interactive Quiz Modal */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-slate-900">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm font-headline">
                  {activeQuiz.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {activeQuiz.questionsCount} बहुविकल्पीय प्रश्न • 70% उत्तीर्ण अंक
                </p>
              </div>
              <button
                onClick={() => setActiveQuiz(null)}
                className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-sm border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800">
                प्रश्न 1: Dairy Farm में वैज्ञानिक पशु शेड का वेंटीलेशन लेआउट कैसा होना चाहिए?
              </div>
              <div className="space-y-2 text-xs">
                {["14 से 16 फीट ऊंचा (उत्तर व दक्षिण खुला)", "बंद कमरा", "8 फीट छत", "केवल टीन शेड"].map(
                  (opt, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2.5 p-2.5 rounded-sm border border-slate-200 hover:bg-slate-50 cursor-pointer font-medium text-slate-800"
                    >
                      <input type="radio" name="q1" className="text-[#0056d2]" />
                      <span>{opt}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveQuiz(null)}
                className="text-xs font-bold text-slate-600 rounded-sm cursor-pointer"
              >
                रद्द करें
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  alert("🎉 क्विज़ उत्तीर्ण! आपका स्कोर: 90%");
                  setActiveQuiz(null);
                }}
                className="bg-[#0056d2] hover:bg-blue-700 text-white text-xs font-bold rounded-sm cursor-pointer"
              >
                उत्तर सबमिट करें
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
