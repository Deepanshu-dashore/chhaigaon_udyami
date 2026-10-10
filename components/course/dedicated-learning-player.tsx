"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  CheckCircle2,
  Circle,
  HelpCircle,
  FileText,
  Download,
  Share2,
  Menu,
  X,
  Award,
  BookOpen,
  Clock,
  Sparkles,
  Subtitles,
  Check,
  Plus,
  Trash2,
  User,
  GraduationCap,
  Building2,
  ExternalLink,
  RotateCcw,
  Video as VideoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ExerciseFilesModal } from "@/components/course/exercise-files-modal";
import {
  InteractiveQuizView,
  QuizQuestionData,
} from "@/components/course/interactive-quiz-view";

export interface PlayerLesson {
  id: string;
  moduleId: string;
  title: string;
  description?: string | null;
  type: "VIDEO" | "READING" | "QUIZ" | "ASSESSMENT" | "RESOURCE";
  duration?: number | null; // in seconds
  order: number;
  videoUrl?: string | null;
  videoThumbnail?: string | null;
  quiz?: {
    id: string;
    title: string;
    passingPercentage: number;
    questions: QuizQuestionData[];
  } | null;
  transcript?: string | null;
}

export interface PlayerModule {
  id: string;
  order: number;
  title: string;
  description?: string | null;
  lessons: PlayerLesson[];
  moduleQuiz?: {
    id: string;
    title: string;
    passingPercentage: number;
    questions: QuizQuestionData[];
  } | null;
}

export interface DedicatedLearningPlayerProps {
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  courseCategory?: string;
  instructor?: {
    name: string;
    title: string;
    bio: string;
    avatarUrl?: string | null;
  };
  modules: PlayerModule[];
  initialLessonId?: string;
  enrollmentId?: string | null;
  completedLessonIds?: string[];
}

export function DedicatedLearningPlayer({
  courseId,
  courseTitle,
  courseSlug,
  courseCategory = "उद्यमिता एवं कौशल विकास",
  instructor = {
    name: "डॉ. राजेश पाटिल (वरिष्ठ उद्यम सलाहकार)",
    title: "उद्यमिता एवं एमएसएमई विशेषज्ञ, डीआईसी खंडवा एवं आरसेटी",
    bio: "कृषि-व्यवसाय, खाद्य प्रसंस्करण एवं सूक्ष्म उद्यम स्थापना में 15+ वर्षों का परामर्श अनुभव। 500+ सफल ग्रामीण उद्यमियों के मार्गदर्शक।",
  },
  modules,
  initialLessonId,
  enrollmentId,
  completedLessonIds: initialCompletedIds = [],
}: DedicatedLearningPlayerProps) {
  // Mobile drawer state only for small screens (sidebar is ALWAYS visible on desktop md:)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Exercise files modal state
  const [showExerciseModal, setShowExerciseModal] = useState(false);

  // Flattened lessons list for easy sequential navigation
  const allLessons = React.useMemo(() => {
    const list: PlayerLesson[] = [];
    modules.forEach((mod) => {
      mod.lessons.forEach((l) => list.push(l));
    });
    return list;
  }, [modules]);

  // Active Lesson selection
  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    if (initialLessonId && allLessons.some((l) => l.id === initialLessonId)) {
      return initialLessonId;
    }
    return allLessons[0]?.id || "";
  });

  const activeLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const activeModule = modules.find((m) => m.id === activeLesson?.moduleId) || modules[0];

  // Completed lessons set
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    () => new Set(initialCompletedIds)
  );

  // Video player controls
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(activeLesson?.duration || 300);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [videoHasError, setVideoHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Student notebook notes
  const [notes, setNotes] = useState<Array<{ id: string; time: number; text: string; date: string }>>([]);
  const [newNoteText, setNewNoteText] = useState("");

  // Load notes from local storage
  useEffect(() => {
    if (typeof window !== "undefined" && activeLesson) {
      const saved = localStorage.getItem(`notes_${courseId}_${activeLesson.id}`);
      if (saved) {
        try {
          setNotes(JSON.parse(saved));
        } catch {
          setNotes([]);
        }
      } else {
        setNotes([]);
      }
    }
  }, [courseId, activeLesson?.id]);

  // Update duration and reset video states when lesson changes
  useEffect(() => {
    if (activeLesson) {
      setDuration(activeLesson.duration || 300);
      setCurrentTime(0);
      setIsPlaying(false);
      setVideoHasError(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.pause();
      }
    }
  }, [activeLesson?.id]);

  // Mark lesson complete API call
  const markLessonComplete = async (lessonId: string) => {
    setCompletedLessons((prev) => new Set([...prev, lessonId]));

    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId,
          progressPercent: 100,
          isCompleted: true,
          watchedSeconds: duration,
          lastPosition: duration,
        }),
      });
    } catch (err) {
      console.error("Failed to sync progress:", err);
    }
  };

  const isCompleted = activeLesson ? completedLessons.has(activeLesson.id) : false;

  // Next and Previous lesson navigation
  const currentIndex = allLessons.findIndex((l) => l.id === activeLessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const handleNext = () => {
    if (activeLesson) markLessonComplete(activeLesson.id);
    if (nextLesson) setActiveLessonId(nextLesson.id);
  };

  const handlePrev = () => {
    if (prevLesson) setActiveLessonId(prevLesson.id);
  };

  // Safe play toggle avoiding unhandled rejections
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Fallback if media source isn't playable
          setIsPlaying(false);
          setVideoHasError(true);
        });
    }
  };

  // Add note handler
  const handleAddNote = () => {
    if (!newNoteText.trim() || !activeLesson) return;
    const newNote = {
      id: Date.now().toString(),
      time: Math.floor(currentTime),
      text: newNoteText.trim(),
      date: new Date().toLocaleDateString("hi-IN"),
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    setNewNoteText("");
    if (typeof window !== "undefined") {
      localStorage.setItem(`notes_${courseId}_${activeLesson.id}`, JSON.stringify(updated));
    }
  };

  const handleDeleteNote = (noteId: string) => {
    if (!activeLesson) return;
    const updated = notes.filter((n) => n.id !== noteId);
    setNotes(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem(`notes_${courseId}_${activeLesson.id}`, JSON.stringify(updated));
    }
  };

  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? "0" : ""}${remainder}`;
  };

  const completionPercentage =
    allLessons.length > 0 ? Math.round((completedLessons.size / allLessons.length) * 100) : 0;

  // Reusable Sidebar Contents Markup (rendered on desktop and mobile drawer)
  const renderSidebarContent = () => (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Sidebar Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-slate-50/60">
        <Link
          href={`/dashboard/courses/${courseSlug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-wider mb-2.5 group"
        >
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>← सीखने के पथ पर वापस जाएं</span>
        </Link>

        <h2 className="text-sm font-bold text-slate-900 line-clamp-2 leading-snug">
          {courseTitle}
        </h2>

        {/* Progress Card */}
        <div className="mt-3.5 pt-3 border-t border-slate-200/70 space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>पाठ्यक्रम सामग्री (Contents)</span>
            <span className="font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">
              {completedLessons.size}/{allLessons.length} ({completionPercentage}%)
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2 bg-slate-200" />
        </div>
      </div>

      {/* Modules & Lessons List with Scroll */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {modules.map((module) => {
          const moduleCompleted = module.lessons.every((l) => completedLessons.has(l.id));
          return (
            <div key={module.id} className="py-2.5">
              {/* Module Title Header */}
              <div className="px-4 py-1.5 flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-wider">
                <span className="truncate pr-2">
                  मॉड्यूल {module.order}: {module.title}
                </span>
                {moduleCompleted && (
                  <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-700 border-emerald-200 shrink-0 font-medium">
                    पूर्ण
                  </Badge>
                )}
              </div>

              {/* Lesson Items */}
              <div className="space-y-1 mt-1 px-2">
                {module.lessons.map((lesson) => {
                  const isActive = lesson.id === activeLessonId;
                  const isLessonDone = completedLessons.has(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      type="button"
                      onClick={() => {
                        setActiveLessonId(lesson.id);
                        setMobileDrawerOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl flex items-start gap-3 transition-all ${
                        isActive
                          ? "bg-blue-600 text-white shadow-xs font-semibold ring-1 ring-blue-700"
                          : isLessonDone
                          ? "bg-slate-50/70 hover:bg-slate-100 text-slate-800"
                          : "hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      {/* Status Icon */}
                      <div className="shrink-0 mt-0.5">
                        {isLessonDone ? (
                          <CheckCircle2
                            className={`h-4 w-4 ${
                              isActive ? "text-emerald-200" : "text-emerald-600"
                            }`}
                          />
                        ) : isActive ? (
                          <Play className="h-4 w-4 text-white fill-white" />
                        ) : lesson.type === "QUIZ" || lesson.type === "ASSESSMENT" ? (
                          <Award className="h-4 w-4 text-amber-500" />
                        ) : lesson.type === "READING" ? (
                          <FileText className="h-4 w-4 text-slate-400" />
                        ) : (
                          <VideoIcon className="h-4 w-4 text-slate-400" />
                        )}
                      </div>

                      {/* Lesson Title & Duration */}
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-xs leading-snug line-clamp-2 ${
                            isActive ? "text-white font-semibold" : "text-slate-800"
                          }`}
                        >
                          {lesson.title}
                        </p>
                        <div
                          className={`flex items-center gap-2 mt-1 text-[11px] ${
                            isActive ? "text-blue-100" : "text-slate-500"
                          }`}
                        >
                          {lesson.type === "QUIZ" || lesson.type === "ASSESSMENT" ? (
                            <span className="flex items-center gap-1 text-amber-500 font-medium">
                              <Award className="h-3 w-3" /> प्रश्नोत्तरी
                            </span>
                          ) : (
                            <span className="font-mono">{formatTime(lesson.duration || 300)}</span>
                          )}
                          {isLessonDone && !isActive && (
                            <span className="text-emerald-600 font-medium">• पूर्ण</span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* ---------------------------------------------------- */}
      {/* 1. PERMANENT LEFT SIDEBAR (DO NOT HIDE ON DESKTOP)   */}
      {/* ---------------------------------------------------- */}
      <aside className="hidden md:flex w-80 lg:w-96 shrink-0 h-full border-r border-slate-200 bg-white flex-col z-20 shadow-xs">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Drawer (Overlay only when open on < md screens) */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/50 backdrop-blur-xs flex">
          <div className="w-80 max-w-[85%] h-full bg-white shadow-2xl relative flex flex-col">
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(false)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
            {renderSidebarContent()}
          </div>
          <div className="flex-1" onClick={() => setMobileDrawerOpen(false)} />
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. RIGHT MAIN LECTURE & MEDIA WORKSPACE              */}
      {/* ---------------------------------------------------- */}
      <main className="flex-1 flex flex-col h-full bg-slate-100 overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 z-10 shadow-2xs">
          <div className="flex items-center gap-3 min-w-0">
            {/* Mobile Hamburger Drawer Trigger */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileDrawerOpen(true)}
              className="md:hidden p-2 h-9 w-9 border-slate-200 text-slate-700"
              title="पाठ्यक्रम सूची खोलें"
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200 font-semibold uppercase tracking-wider">
                  {courseCategory}
                </Badge>
                <span className="text-xs text-slate-400 hidden sm:inline">•</span>
                <span className="text-xs font-medium text-slate-500 hidden sm:inline truncate">
                  {activeModule?.title}
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-slate-900 truncate mt-0.5">
                {activeLesson?.title || courseTitle}
              </h1>
            </div>
          </div>

          {/* Quick Header Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={isCompleted ? "outline" : "default"}
              onClick={() => activeLesson && markLessonComplete(activeLesson.id)}
              className={`h-9 text-xs font-semibold gap-1.5 transition-all ${
                isCompleted
                  ? "border-emerald-300 text-emerald-800 bg-emerald-50 hover:bg-emerald-100"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
              }`}
            >
              <Check className="h-3.5 w-3.5" />
              <span>{isCompleted ? "पूर्ण है (Completed)" : "पूर्ण चिह्नित करें"}</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowExerciseModal(true)}
              className="h-9 text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-50 gap-1.5"
            >
              <Download className="h-3.5 w-3.5 text-blue-600" />
              <span className="hidden sm:inline">अभ्यास फाइलें (Files)</span>
            </Button>
          </div>
        </header>

        {/* Scrollable Main Player & Tabbed Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Main Stage Display (Video Player or Quiz) */}
          <div className="w-full bg-slate-950 p-3 sm:p-6 flex items-center justify-center">
            {activeLesson?.type === "QUIZ" || activeLesson?.type === "ASSESSMENT" || activeLesson?.quiz ? (
              // Quiz View (Matching Image 5)
              <div className="w-full max-w-4xl min-h-[460px]">
                <InteractiveQuizView
                  quizId={activeLesson.quiz?.id || activeLesson.id}
                  quizTitle={activeLesson.title}
                  passingPercentage={activeLesson.quiz?.passingPercentage || 70}
                  enrollmentId={enrollmentId}
                  questions={
                    activeLesson.quiz?.questions || [
                      {
                        id: "q-1",
                        question:
                          "प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP) के तहत ग्रामीण क्षेत्र में सामान्य वर्ग को कितनी मार्जिन मनी सब्सिडी मिलती है?",
                        marks: 1,
                        order: 1,
                        options: [
                          {
                            id: "opt-1",
                            optionText: "15% पूंजीगत सब्सिडी",
                            isCorrect: false,
                            explanation: "15% सब्सिडी केवल शहरी क्षेत्र के सामान्य वर्ग के लिए निर्धारित है।",
                          },
                          {
                            id: "opt-2",
                            optionText: "25% पूंजीगत सब्सिडी",
                            isCorrect: true,
                            explanation:
                              "सही उत्तर! PMEGP दिशानिर्देशों के तहत ग्रामीण क्षेत्र में सामान्य वर्ग को 25% मार्जिन मनी सब्सिडी प्रदान की जाती है।",
                          },
                          {
                            id: "opt-3",
                            optionText: "35% पूंजीगत सब्सिडी",
                            isCorrect: false,
                            explanation:
                              "35% सब्सिडी ग्रामीण क्षेत्र के विशेष वर्ग (SC/ST/OBC/महिला/दिव्यांग) हेतु देय होती है।",
                          },
                          {
                            id: "opt-4",
                            optionText: "10% पूंजीगत सब्सिडी",
                            isCorrect: false,
                            explanation: "10% लाभार्थी का स्वयं का अंशदान होता है, सब्सिडी नहीं।",
                          },
                        ],
                      },
                    ]
                  }
                  onComplete={() => activeLesson && markLessonComplete(activeLesson.id)}
                  onNextLesson={handleNext}
                />
              </div>
            ) : (
              // HD Video Lecture Player (Matching Image 3)
              <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl relative group flex items-center justify-center border border-slate-800">
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain"
                  src={activeLesson?.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
                  poster={activeLesson?.videoThumbnail || "/images/dairy-course.jpg"}
                  onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                  onLoadedMetadata={(e) => {
                    setDuration(e.currentTarget.duration || 300);
                    setVideoHasError(false);
                  }}
                  onError={() => {
                    // Prevent unhandled rejection and mark error state cleanly
                    setVideoHasError(true);
                    setIsPlaying(false);
                  }}
                  onEnded={() => {
                    setIsPlaying(false);
                    if (activeLesson) markLessonComplete(activeLesson.id);
                  }}
                  playsInline
                />

                {/* Subtitle Overlay Banner (Image 3 Feature) */}
                {showSubtitles && (
                  <div className="absolute bottom-16 inset-x-0 mx-auto max-w-2xl text-center px-4 pointer-events-none transition-opacity duration-300">
                    <span className="inline-block px-4 py-1.5 rounded-lg bg-black/85 text-white font-medium text-xs sm:text-sm backdrop-blur-xs border border-white/10 shadow-lg">
                      {currentTime < 10
                        ? `नमस्कार, छैगांव माखन उद्यमी मिशन में आपका स्वागत है।`
                        : currentTime < 25
                        ? `आज हम ${activeLesson?.title || "इस सत्र"} के व्यावहारिक पहलुओं को समझेंगे।`
                        : `परियोजना रिपोर्ट एवं बैंक ऋण के मानकों का समुचित पालन आवश्यक है।`}
                    </span>
                  </div>
                )}

                {/* Center Play Overlay Button when paused or on fallback */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="absolute inset-0 m-auto h-20 w-20 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-2xl hover:scale-110 hover:bg-blue-600 transition-all backdrop-blur-xs cursor-pointer"
                  >
                    <Play className="h-8 w-8 fill-white ml-1" />
                  </button>
                )}

                {/* Custom Video Controls Bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-2">
                  {/* Progress Bar Scrubber */}
                  <div
                    className="w-full bg-white/20 hover:bg-white/30 h-1.5 rounded-full cursor-pointer relative"
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      if (videoRef.current && duration > 0) {
                        videoRef.current.currentTime = pos * duration;
                        setCurrentTime(pos * duration);
                      }
                    }}
                  >
                    <div
                      className="bg-blue-500 h-full rounded-full relative"
                      style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                    />
                  </div>

                  {/* Buttons Row */}
                  <div className="flex items-center justify-between text-xs text-white">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={togglePlay}
                        className="hover:text-blue-400 cursor-pointer p-1"
                      >
                        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (videoRef.current) {
                            videoRef.current.muted = !isMuted;
                            setIsMuted(!isMuted);
                          }
                        }}
                        className="hover:text-blue-400 cursor-pointer p-1"
                      >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </button>

                      <span className="font-mono text-[11px] text-slate-300">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Playback speed switcher */}
                      <button
                        type="button"
                        onClick={() => {
                          const speeds = [1, 1.25, 1.5, 2];
                          const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
                          const nextSpeed = speeds[nextIdx];
                          setPlaybackSpeed(nextSpeed);
                          if (videoRef.current) videoRef.current.playbackRate = nextSpeed;
                        }}
                        className="hover:text-blue-400 font-mono text-[11px] font-semibold px-2 py-0.5 rounded bg-white/10"
                      >
                        {playbackSpeed}x
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowSubtitles((prev) => !prev)}
                        className={`hover:text-white flex items-center gap-1 cursor-pointer ${
                          showSubtitles ? "text-blue-400" : "text-slate-400"
                        }`}
                        title="सबटाइटल्स चालू/बंद करें"
                      >
                        <Subtitles className="h-4 w-4" />
                        <span className="text-[10px] font-semibold">CC</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (videoRef.current) {
                            if (document.fullscreenElement) {
                              document.exitFullscreen().catch(() => {});
                            } else {
                              videoRef.current.requestFullscreen().catch(() => {});
                            }
                          }
                        }}
                        className="hover:text-blue-400 cursor-pointer p-1"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Under-Player Navigation Strip */}
          <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between gap-4">
            <Button
              variant="outline"
              size="sm"
              disabled={!prevLesson}
              onClick={handlePrev}
              className="text-xs font-semibold text-slate-700 border-slate-300 hover:bg-slate-50 gap-1.5"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>पिछला पाठ (Previous)</span>
            </Button>

            <span className="text-xs font-semibold text-slate-500 font-mono">
              पाठ {currentIndex + 1} / {allLessons.length}
            </span>

            <Button
              size="sm"
              disabled={!nextLesson}
              onClick={handleNext}
              className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white gap-1.5 shadow-xs"
            >
              <span>अगला पाठ (Next)</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* 3-Tab Interface (Built with shadcn Tabs) */}
          <div className="p-6 sm:p-8 max-w-5xl mx-auto">
            <Tabs defaultValue="overview" className="w-full space-y-6">
              {/* Tabs List */}
              <TabsList className="bg-slate-200/70 p-1 rounded-xl h-11 w-full sm:w-auto grid grid-cols-3 sm:inline-flex">
                <TabsTrigger
                  value="overview"
                  className="rounded-lg text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-xs"
                >
                  अवलोकन (Overview)
                </TabsTrigger>
                <TabsTrigger
                  value="notebook"
                  className="rounded-lg text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-xs flex items-center gap-1.5"
                >
                  <span>नोटबुक (Notebook)</span>
                  {notes.length > 0 && (
                    <Badge variant="secondary" className="text-[10px] bg-blue-100 text-blue-800 h-4 px-1.5">
                      {notes.length}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="transcript"
                  className="rounded-lg text-xs sm:text-sm font-bold data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-xs"
                >
                  ट्रांसक्रिप्ट (Transcript)
                </TabsTrigger>
              </TabsList>

              {/* TAB 1: OVERVIEW */}
              <TabsContent value="overview" className="space-y-6">
                <Card className="border-slate-200/90 shadow-xs">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-bold text-slate-900 leading-snug">
                      {activeLesson?.title}
                    </CardTitle>
                    <p className="text-sm text-slate-600 pt-1 leading-relaxed">
                      {activeLesson?.description ||
                        "इस व्याख्यान में ग्रामीण उद्यम संचालन, लागत नियंत्रण, सरकारी योजनाओं की पात्रता तथा बैंक ऋण स्वीकृति के व्यावहारिक गुर सिखाए गए हैं।"}
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-6 pt-2">
                    {/* Key Takeaways */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                        <Sparkles className="size-3.5 text-blue-600" />
                        <span>इस पाठ के मुख्य बिंदु (Key Takeaways)</span>
                      </h4>
                      <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 pt-1">
                        <li className="flex items-start gap-2">
                          <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>विस्तृत परियोजना रिपोर्ट (DPR) तैयार करने के मानक और आवश्यक दस्तावेज।</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>DIC खंडवा एवं PMEGP के अंतर्गत 25% से 35% पूंजीगत सब्सिडी के आवेदन नियम।</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>स्थानीय बाजार व आपूर्ति श्रृंखला में मूल्य संवर्धन (Value Addition) के तरीके।</span>
                        </li>
                      </ul>
                    </div>

                    {/* Instructor Profile Card */}
                    <div className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <Avatar className="h-14 w-14 border-2 border-blue-200 bg-blue-100 text-blue-800 font-bold shrink-0">
                        <AvatarFallback>RP</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                            {instructor.name}
                          </h4>
                          <Badge variant="outline" className="text-[10px] text-blue-700 bg-blue-50 border-blue-200">
                            प्रमाणित मार्गदर्शक
                          </Badge>
                        </div>
                        <p className="text-xs font-semibold text-slate-500">{instructor.title}</p>
                        <p className="text-xs text-slate-600 leading-relaxed pt-0.5">{instructor.bio}</p>
                      </div>
                    </div>

                    {/* Related to this Course Cards (Image 3 Feature) */}
                    <div className="space-y-3 pt-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        संबंधित संसाधन व सहायता (Related to this Course)
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div
                          onClick={() => setShowExerciseModal(true)}
                          className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/40 transition-all cursor-pointer flex items-center justify-between group bg-white shadow-2xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700 group-hover:scale-105 transition-transform">
                              <Download className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900">अभ्यास फाइलें (Exercise Files)</h4>
                              <p className="text-xs text-slate-500">DPR एक्सेल मॉडल, चेकलिस्ट व प्रपत्र</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                        </div>

                        <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-lg bg-blue-50 text-blue-700">
                              <Award className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900">डीआईसी व नाबार्ड प्रमाणन</h4>
                              <p className="text-xs text-slate-500">सभी अध्याय पूर्ण करने पर डिजिटल प्रमाण पत्र</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-[10px] text-slate-700 bg-slate-100">
                            70% न्यूनतम
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TAB 2: NOTEBOOK */}
              <TabsContent value="notebook" className="space-y-4">
                <Card className="border-slate-200 shadow-xs">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-slate-900">
                      विद्यार्थी नोटबुक (Personal Notes)
                    </CardTitle>
                    <p className="text-xs text-slate-500">
                      वीडियो देखते समय मुख्य बिंदु नोट करें। आपके नोट्स सुरक्षित रखे जाएंगे।
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Add Note Input */}
                    <div className="space-y-2">
                      <Textarea
                        value={newNoteText}
                        onChange={(e) => setNewNoteText(e.target.value)}
                        placeholder={`समय ${formatTime(currentTime)} पर अपने विचार या प्रश्न लिखें...`}
                        className="p-3 text-sm resize-none h-24 border-slate-200 bg-slate-50/50"
                      />
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs text-slate-500 font-mono">
                          वर्तमान समय: {formatTime(currentTime)}
                        </span>
                        <Button
                          size="sm"
                          disabled={!newNoteText.trim()}
                          onClick={handleAddNote}
                          className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white gap-1.5"
                        >
                          <Plus className="h-4 w-4" />
                          <span>नोट सहेजें</span>
                        </Button>
                      </div>
                    </div>

                    {/* Notes List */}
                    <div className="space-y-3 pt-3">
                      {notes.length === 0 ? (
                        <div className="p-8 text-center border border-dashed border-slate-200 rounded-xl bg-slate-50">
                          <BookOpen className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                          <p className="text-sm text-slate-500">इस पाठ के लिए अभी कोई नोट नहीं जोड़ा गया है।</p>
                        </div>
                      ) : (
                        notes.map((note) => (
                          <div
                            key={note.id}
                            className="p-4 rounded-xl border border-slate-200 bg-white shadow-2xs flex items-start justify-between gap-4"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="text-[10px] font-mono text-blue-700 bg-blue-50 border-blue-200">
                                  {formatTime(note.time)}
                                </Badge>
                                <span className="text-[11px] text-slate-400">{note.date}</span>
                              </div>
                              <p className="text-sm text-slate-800 whitespace-pre-wrap">{note.text}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteNote(note.id)}
                              className="text-slate-400 hover:text-red-500 p-1 cursor-pointer"
                              title="नोट हटाएं"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TAB 3: TRANSCRIPT */}
              <TabsContent value="transcript">
                <Card className="border-slate-200 shadow-xs">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-bold text-slate-900">
                      पाठ ट्रांसक्रिप्ट (Lesson Transcript)
                    </CardTitle>
                    <p className="text-xs text-slate-500">
                      व्याख्यान की पूरी लिखित सामग्री द्विभाषी (हिंदी/अंग्रेजी) रूप में पढ़ें।
                    </p>
                  </CardHeader>

                  <CardContent className="space-y-4 text-sm text-slate-700 leading-relaxed">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 font-mono text-xs text-blue-700 inline-block">
                      [00:00 - 01:15] परिचय एवं उद्यमिता की अवधारणा
                    </div>
                    <p>
                      नमस्कार उद्यमी साथियों! छैगांव माखन ब्लॉक और निमाड़ क्षेत्र के सभी महत्वाकांक्षी भाइयों और बहनों का इस विशेष प्रशिक्षण सत्र में हार्दिक अभिनंदन।
                    </p>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 font-mono text-xs text-blue-700 inline-block">
                      [01:15 - 02:45] विस्तृत परियोजना रिपोर्ट (DPR) तैयार करना
                    </div>
                    <p>
                      जब हम किसी नए सूक्ष्म उद्यम या कृषि-आधारित प्रसंस्करण इकाई की नींव रखते हैं, तो सबसे महत्वपूर्ण पहलू होता है विस्तृत परियोजना रिपोर्ट (DPR) तैयार करना। बैंक ऋण के मूल्यांकन में 70% ध्यान आपके कैश-फ्लो और ब्रेक-ईवन विश्लेषण पर होता है।
                    </p>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 font-mono text-xs text-blue-700 inline-block">
                      [02:45 - 04:10] सरकारी योजनाएं व सब्सिडी मानदंड
                    </div>
                    <p>
                      प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP) तथा मुख्यमंत्री उद्यम क्रांति योजना में ऋण आवेदन प्रस्तुत करने से पूर्व यह सुनिश्चित करें कि आपके पास जीएसटी पंजीयन, उद्यम आधार तथा भूमि/परिसर का वैध अनुबंध उपलब्ध हो।
                    </p>

                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 font-mono text-xs text-blue-700 inline-block">
                      [04:10 - समाप्ति] वित्तीय अनुमान एक्सेल मॉडल
                    </div>
                    <p>
                      इस पाठ के साथ संलग्न अभ्यास फाइल (Exercise File) में दिए गए एक्सेल टेम्पलेट की सहायता से आप अपने व्यवसाय का 3 वर्षीय लाभ-हानि अनुमान सरलता से बना सकते हैं।
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      {/* Exercise Files Download Modal */}
      <ExerciseFilesModal
        isOpen={showExerciseModal}
        onClose={() => setShowExerciseModal(false)}
        courseTitle={courseTitle}
      />
    </div>
  );
}
