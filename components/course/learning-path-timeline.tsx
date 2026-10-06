"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  PlayCircle,
  FileText,
  HelpCircle,
  Download,
  Award,
  ChevronLeft,
  ChevronRight,
  Video,
  Lock,
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
  videoUrl?: string;
  isCompleted?: boolean;
}

export interface QuizSummary {
  id: string;
  title: string;
  passingPercentage?: number;
  timeLimit?: number | null;
  attemptLimit?: number | null;
  _count?: { questions: number };
}

export interface ModuleItem {
  id: string;
  order: number;
  title: string;
  description?: string;
  duration?: string;
  lessons: LessonItem[];
  quizzes?: QuizSummary[];
  moduleProgress?: {
    isCompleted: boolean;
    completedAt?: Date | string | null;
  } | null;
}

interface LearningPathTimelineProps {
  modules: ModuleItem[];
  isEnrolled?: boolean;
}

export function LearningPathTimeline({
  modules,
  isEnrolled = false,
}: LearningPathTimelineProps) {
  const [openModuleId, setOpenModuleId] = useState<string>(
    modules[0]?.id || ""
  );

  // Active lesson state for enrolled member view
  const [activeModuleIndex, setActiveModuleIndex] = useState<number>(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);

  const [activeQuiz, setActiveQuiz] = useState<{
    title: string;
    questionsCount: number;
  } | null>(null);

  const currentModule = modules[activeModuleIndex] || modules[0];
  const currentLesson =
    currentModule?.lessons[activeLessonIndex] || currentModule?.lessons[0];

  const handleSelectLesson = (modIdx: number, lesIdx: number) => {
    setActiveModuleIndex(modIdx);
    setActiveLessonIndex(lesIdx);
    setOpenModuleId(modules[modIdx].id);
  };

  const handleNextLesson = () => {
    if (activeLessonIndex < currentModule.lessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
    } else if (activeModuleIndex < modules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
      setActiveLessonIndex(0);
      setOpenModuleId(modules[activeModuleIndex + 1].id);
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex(activeLessonIndex - 1);
    } else if (activeModuleIndex > 0) {
      const prevModIdx = activeModuleIndex - 1;
      setActiveModuleIndex(prevModIdx);
      setActiveLessonIndex(modules[prevModIdx].lessons.length - 1);
      setOpenModuleId(modules[prevModIdx].id);
    }
  };

  const isFirstLesson = activeModuleIndex === 0 && activeLessonIndex === 0;
  const isLastLesson =
    activeModuleIndex === modules.length - 1 &&
    activeLessonIndex === currentModule?.lessons.length - 1;

  const totalLessons = modules.reduce(
    (acc, m) => acc + m.lessons.length,
    0
  );

  return (
    <div className="space-y-6 font-sans text-[#111827]">
      
      {/* Curriculum Header */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
        <div>
          <h3 className="text-xl font-bold text-[#111827] tracking-tight">
            {isEnrolled ? "Curriculum & Interactive Player" : "Course Curriculum (पाठ्यक्रम विवरण)"}
          </h3>
          <p className="text-xs text-[#667085] mt-0.5">
            {modules.length} modules • {totalLessons} total lessons
          </p>
        </div>

        {!isEnrolled && (
          <Badge variant="outline" className="text-xs font-semibold text-amber-800 bg-amber-50 border-amber-200 inline-flex items-center gap-1.5">
            <Lock className="size-3.5 text-amber-700" />
            <span>Enrolled Members Access Only</span>
          </Badge>
        )}
      </div>

      {/* CASE 1: UNENROLLED MEMBER VIEW - Clean Curriculum Accordion Only */}
      {!isEnrolled ? (
        <div className="space-y-4">
          
          {/* Enrollment Prompt Banner */}
          <div className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="space-y-1">
              <span className="font-bold text-[#111827] block text-sm">
                4-मॉड्यूल संपूर्ण पाठ्यक्रम व वीडियो ट्यूटोरियल्स
              </span>
              <p className="text-[#667085]">
                नामांकन के पश्चात सभी वीडियो लेसन, क्विज़, सर्टिफिकेट एवं बैंक DPR टूलकिट का असीमित एक्सेस प्राप्त करें।
              </p>
            </div>
            <Button asChild size="sm" className="bg-[#1261D6] hover:bg-blue-700 text-white font-bold text-xs rounded-sm shrink-0 cursor-pointer">
              <Link href="/apply">
                <span>अभी प्रवेश लें (Enroll Now)</span>
              </Link>
            </Button>
          </div>

          {/* Module Breakdown List */}
          <div className="space-y-3">
            {modules.map((mod, modIdx) => {
              const isOpen = openModuleId === mod.id;

              return (
                <div
                  key={mod.id}
                  className="rounded-sm border border-[#E5E7EB] bg-white text-xs overflow-hidden"
                >
                  <button
                    onClick={() => setOpenModuleId(isOpen ? "" : mod.id)}
                    className="w-full text-left p-4 flex items-center justify-between gap-4 cursor-pointer select-none hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#1261D6] block">
                        Module {modIdx + 1}
                      </span>
                      <h4 className="font-bold text-sm text-[#111827] truncate">
                        {mod.title}
                      </h4>
                      {mod.description && (
                        <p className="text-xs text-[#667085] truncate">
                          {mod.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs text-[#667085] font-medium hidden sm:inline">
                        {mod.lessons.length} पाठ • {mod.duration || "1.5 घंटे"}
                      </span>
                      <div className="text-slate-500">
                        {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 bg-[#F8FAFC] p-3 space-y-2">
                      {mod.lessons.map((lesson, lesIdx) => (
                        <div
                          key={lesson.id || lesIdx}
                          className="p-3 rounded-sm bg-white border border-[#E5E7EB] flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {lesson.isPreview ? (
                              <Video className="size-4 text-[#1261D6] shrink-0" />
                            ) : lesson.type === "quiz" ? (
                              <HelpCircle className="size-4 text-blue-600 shrink-0" />
                            ) : lesson.type === "resource" ? (
                              <FileText className="size-4 text-amber-600 shrink-0" />
                            ) : (
                              <Lock className="size-4 text-amber-600 shrink-0" />
                            )}
                            <span className="font-medium text-xs text-[#111827] truncate">
                              {lesIdx + 1}. {lesson.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {lesson.duration && (
                              <span className="text-xs text-[#667085] font-mono hidden sm:inline">
                                {lesson.duration}
                              </span>
                            )}

                            {lesson.isPreview ? (
                              <Badge className="bg-emerald-50 text-[#16845B] border-emerald-200 text-[10px] font-bold">
                                Free Preview
                              </Badge>
                            ) : (
                              <Button asChild size="sm" variant="outline" className="h-7 text-[11px] font-semibold text-amber-900 border-amber-300 bg-amber-50/50 hover:bg-amber-100 rounded-sm">
                                <Link href="/apply">
                                  <Lock className="size-3 mr-1" />
                                  <span>अनलॉक करें</span>
                                </Link>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}

                      {/* Module Assessment Quiz (End of Module) */}
                      {mod.quizzes && mod.quizzes.length > 0 && mod.quizzes.map((quiz) => (
                        <div
                          key={quiz.id}
                          className="p-3 rounded-sm bg-amber-50/60 border border-amber-200 flex items-center justify-between gap-3"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Award className="size-4 text-amber-600 shrink-0" />
                            <div className="min-w-0">
                              <span className="font-semibold text-xs text-[#111827] truncate block">
                                मॉड्यूल मूल्यांकन: {quiz.title}
                              </span>
                              <span className="text-[10px] text-[#667085]">
                                {quiz._count?.questions ? `${quiz._count.questions} प्रश्न • ` : ""}उत्तीर्ण अंक {quiz.passingPercentage ?? 60}%
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Badge variant="outline" className="text-[10px] bg-white border-amber-300 text-amber-900 font-medium">
                              <Lock className="size-3 mr-1 text-amber-600" />
                              नामांकन आवश्यक
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      ) : (
        /* CASE 2: ENROLLED MEMBER VIEW - Full Interactive Lesson Player */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Active Lesson Display Screen (7 Cols on LG) */}
          <div className="lg:col-span-7 bg-white rounded-sm border border-[#E5E7EB] shadow-2xs overflow-hidden flex flex-col justify-between">
            
            <div className="p-5 space-y-4">
              {/* Active Lesson Header Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#1261D6]">
                  Module {activeModuleIndex + 1}, Lesson {activeLessonIndex + 1}
                </span>
                {currentLesson?.duration && (
                  <span className="text-xs font-mono font-medium text-[#667085]">
                    {currentLesson.duration}
                  </span>
                )}
              </div>

              {/* Video Player Frame */}
              <div className="relative aspect-video bg-slate-900 rounded-sm overflow-hidden group border border-slate-800 flex items-center justify-center">
                <img
                  src="/images/dairy-course.jpg"
                  alt={currentLesson?.title || "Lesson Player"}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-slate-950/40 flex flex-col items-center justify-center gap-2">
                  <div className="size-12 rounded-full bg-white text-[#1261D6] shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform cursor-pointer">
                    <PlayCircle className="size-7 ml-0.5 fill-slate-900 text-white" />
                  </div>
                  <span className="text-white text-xs font-semibold drop-shadow">
                    Click to play video lesson
                  </span>
                </div>
              </div>

              {/* Lesson Info */}
              <div className="space-y-1.5 pt-1">
                <h4 className="text-lg font-bold text-[#111827] leading-snug">
                  {currentLesson?.title}
                </h4>
                <p className="text-xs text-[#667085] leading-relaxed">
                  {currentLesson?.description ||
                    "इस विषय में आप व्यावसायिक तकनीकों, सुरक्षा मानकों एवं व्यावहारिक क्रियान्वयन का विस्तृत अध्ययन करेंगे।"}
                </p>
              </div>

              {/* Action Buttons: Quiz / PDF Download */}
              {currentLesson?.type === "quiz" && (
                <div className="p-3.5 rounded-sm bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#111827]">ज्ञान मूल्यांकन क्विज़</p>
                    <p className="text-[11px] text-[#667085]">70% उत्तीर्ण अंक • प्रमाण पत्र हेतु अनिवार्य</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() =>
                      setActiveQuiz({
                        title: currentLesson.title,
                        questionsCount: currentLesson.questionsCount || 10,
                      })
                    }
                    className="h-8 text-xs font-bold bg-[#1261D6] hover:bg-blue-700 text-white rounded-sm cursor-pointer"
                  >
                    <Award className="size-3.5 mr-1" />
                    क्विज़ शुरू करें
                  </Button>
                </div>
              )}

              {currentLesson?.type === "resource" && (
                <div className="p-3.5 rounded-sm bg-amber-50/60 border border-amber-200/80 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#111827]">बैंक DPR व टूलकिट डाउनलोड</p>
                    <p className="text-[11px] text-[#667085]">{currentLesson.resourceType || "PDF Document"} ({currentLesson.resourceSize || "2.5 MB"})</p>
                  </div>
                  <Button size="sm" variant="outline" asChild className="h-8 text-xs font-bold border-amber-300 text-amber-900 hover:bg-amber-100 rounded-sm">
                    <a href={currentLesson.downloadUrl || "#"} download>
                      <Download className="size-3.5 mr-1" />
                      डाउनलोड करें
                    </a>
                  </Button>
                </div>
              )}

            </div>

            {/* Navigation Controls: Previous / Next Lesson */}
            <div className="border-t border-[#E5E7EB] bg-[#F8FAFC] px-5 py-3 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                disabled={isFirstLesson}
                onClick={handlePrevLesson}
                className="h-8 text-xs font-medium text-[#111827] rounded-sm disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="size-4 mr-1" />
                पिछला पाठ (Previous)
              </Button>

              <span className="text-xs font-semibold text-[#667085]">
                {activeLessonIndex + 1} / {currentModule?.lessons.length}
              </span>

              <Button
                size="sm"
                disabled={isLastLesson}
                onClick={handleNextLesson}
                className="h-8 text-xs font-bold bg-[#1261D6] hover:bg-blue-700 text-white rounded-sm disabled:opacity-40 cursor-pointer"
              >
                अगला पाठ (Next)
                <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>

          </div>

          {/* Modules Accordion List (5 Cols on LG) */}
          <div className="lg:col-span-5 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#667085] px-1">
              मॉड्यूल सूची (Course Modules)
            </div>

            <div className="space-y-2">
              {modules.map((mod, modIdx) => {
                const isOpen = openModuleId === mod.id;
                const isCurrentMod = activeModuleIndex === modIdx;

                return (
                  <div
                    key={mod.id}
                    className={`rounded-sm border text-xs transition-colors ${
                      isCurrentMod
                        ? "border-blue-300 bg-blue-50/20"
                        : "border-[#E5E7EB] bg-white"
                    }`}
                  >
                    <button
                      onClick={() => setOpenModuleId(isOpen ? "" : mod.id)}
                      className="w-full text-left p-3.5 flex items-center justify-between gap-3 cursor-pointer select-none"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <p className="font-bold text-[#111827] truncate">
                          Module {modIdx + 1}: {mod.title}
                        </p>
                        <p className="text-[11px] text-[#667085]">
                          {mod.lessons.length} पाठ • {mod.duration || "1.5 घंटे"}
                        </p>
                      </div>
                      <div className="text-[#667085] shrink-0">
                        {isOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-100 bg-[#F8FAFC] p-2 space-y-1">
                        {mod.lessons.map((lesson, lesIdx) => {
                          const isSelected =
                            activeModuleIndex === modIdx && activeLessonIndex === lesIdx;

                          return (
                            <button
                              key={lesson.id || lesIdx}
                              onClick={() => handleSelectLesson(modIdx, lesIdx)}
                              className={`w-full text-left p-2.5 rounded-sm flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                                isSelected
                                    ? "bg-[#1261D6] text-white font-bold"
                                  : "hover:bg-slate-100 text-[#111827] font-medium"
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                {lesson.type === "quiz" ? (
                                  <HelpCircle className={`size-3.5 shrink-0 ${isSelected ? "text-white" : "text-blue-600"}`} />
                                ) : lesson.type === "resource" ? (
                                  <FileText className={`size-3.5 shrink-0 ${isSelected ? "text-white" : "text-amber-600"}`} />
                                ) : (
                                  <Video className={`size-3.5 shrink-0 ${isSelected ? "text-white" : "text-slate-400"}`} />
                                )}
                                <span className="truncate text-xs">
                                  {lesIdx + 1}. {lesson.title}
                                </span>
                              </div>
                            </button>
                          );
                        })}

                        {/* Module Quiz in Enrolled Playlist */}
                        {mod.quizzes && mod.quizzes.length > 0 && mod.quizzes.map((quiz) => {
                          const isUnlocked = mod.moduleProgress?.isCompleted === true;
                          return (
                            <div
                              key={quiz.id}
                              className={`p-2.5 rounded-sm flex items-center justify-between gap-2 border transition-colors ${
                                isUnlocked
                                  ? "bg-blue-50/50 border-blue-200 text-[#111827]"
                                  : "bg-slate-100/70 border-slate-200 text-slate-400 opacity-80"
                              }`}
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <Award
                                  className={`size-3.5 shrink-0 ${
                                    isUnlocked ? "text-[#1261D6]" : "text-slate-400"
                                  }`}
                                />
                                <div className="min-w-0">
                                  <span className="truncate text-xs font-semibold block">
                                    {quiz.title}
                                  </span>
                                  <span className="text-[10px] text-slate-500">
                                    {isUnlocked
                                      ? "अनलॉक — परीक्षा दें"
                                      : "🔒 सभी पाठ पूर्ण होने पर अनलॉक"}
                                  </span>
                                </div>
                              </div>
                              {isUnlocked ? (
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    setActiveQuiz({
                                      title: quiz.title,
                                      questionsCount: quiz._count?.questions || 10,
                                    })
                                  }
                                  className="h-6 text-[10px] font-bold bg-[#1261D6] hover:bg-blue-700 text-white rounded-sm px-2 shrink-0 cursor-pointer"
                                >
                                  शुरू करें
                                </Button>
                              ) : (
                                <Lock className="size-3.5 text-slate-400 shrink-0" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      )}

      {/* Quiz Dialog Modal */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm max-w-md w-full p-6 space-y-4 shadow-xl border border-[#E5E7EB] text-[#111827]">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-3">
              <div>
                <h4 className="font-bold text-[#111827] text-sm">
                  {activeQuiz.title}
                </h4>
                <p className="text-xs text-[#667085]">
                  {activeQuiz.questionsCount} बहुविकल्पीय प्रश्न • 70% Passing Score
                </p>
              </div>
              <button
                onClick={() => setActiveQuiz(null)}
                className="text-slate-400 hover:text-slate-600 p-1 font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-sm border border-[#E5E7EB] bg-[#F8FAFC] font-medium text-[#111827]">
                प्रश्न 1: Dairy Farm में वैज्ञानिक पशु शेड का लेआउट एवं जल निकासी मानक क्या होना चाहिए?
              </div>
              <div className="space-y-1.5">
                {["14 से 16 फीट ऊंचा, उत्तर-दक्षिण खुला", "चारों तरफ से पूरी तरह बंद कमरा", "केवल टीन शेड बिना जल निकासी", "उपरोक्त में से कोई नहीं"].map(
                  (opt, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-2.5 p-2 rounded-sm border border-[#E5E7EB] hover:bg-[#F8FAFC] cursor-pointer font-medium text-slate-800"
                    >
                      <input type="radio" name="q1" className="text-[#1261D6]" />
                      <span>{opt}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E5E7EB]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveQuiz(null)}
                className="text-xs font-semibold text-[#111827] rounded-sm cursor-pointer"
              >
                रद्द करें
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  alert("🎉 क्विज़ उत्तीर्ण! आपका स्कोर: 90%। प्रमाण पत्र अनलॉक हो गया है।");
                  setActiveQuiz(null);
                }}
                className="bg-[#1261D6] hover:bg-blue-700 text-white text-xs font-bold rounded-sm cursor-pointer"
              >
                सबमिट करें
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
