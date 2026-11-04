"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  Volume1,
  VolumeX,
  Maximize2,
  Minimize2,
  Tv,
  Subtitles,
  CheckCircle2,
  Check,
  Share2,
  Download,
  BookOpen,
  Sparkles,
  FileText,
  Clock,
  Plus,
  Trash2,
  Award,
  Video as VideoIcon,
  ChevronDown,
  ChevronUp,
  Layers,
  Menu,
  X,
  Copy,
  CheckCheck,
  ExternalLink,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    name: "डॉ. राजेश पाटिल",
    title: "वरिष्ठ उद्यम सलाहकार, डीआईसी खंडवा एवं आरसेटी",
    bio: "कृषि-व्यवसाय, खाद्य प्रसंस्करण एवं सूक्ष्म उद्यम स्थापना में 15+ वर्षों का परामर्श अनुभव। 500+ सफल ग्रामीण उद्यमियों के मार्गदर्शक।",
    avatarUrl: null,
  },
  modules,
  initialLessonId,
  enrollmentId,
  completedLessonIds: initialCompletedIds = [],
}: DedicatedLearningPlayerProps) {
  // Flattened lessons list for sequential navigation
  const allLessons = useMemo(() => {
    const list: PlayerLesson[] = [];
    modules.forEach((mod) => {
      mod.lessons.forEach((l) => list.push(l));
    });
    return list;
  }, [modules]);

  // Active Lesson
  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    if (initialLessonId && allLessons.some((l) => l.id === initialLessonId)) {
      return initialLessonId;
    }
    return allLessons[0]?.id || "";
  });

  const activeLesson = allLessons.find((l) => l.id === activeLessonId) || allLessons[0];
  const activeModule = modules.find((m) => m.id === activeLesson?.moduleId) || modules[0];

  // Active lesson is a Quiz (Video is completely hidden and Quiz takes its place)
  const isQuizActive = Boolean(
    activeLesson?.type === "QUIZ" ||
    activeLesson?.type === "ASSESSMENT" ||
    activeLesson?.quiz
  );

  // Check if current module has a quiz available
  const currentModuleQuizLesson = useMemo(() => {
    return allLessons.find(
      (l) =>
        l.moduleId === activeLesson?.moduleId &&
        (l.type === "QUIZ" || l.type === "ASSESSMENT" || Boolean(l.quiz))
    );
  }, [allLessons, activeLesson?.moduleId]);

  // Completed lessons set
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    () => new Set(initialCompletedIds)
  );

  // Layout View Modes (YouTube Standard vs Theater Mode)
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [isMobilePlaylistOpen, setIsMobilePlaylistOpen] = useState(false);
  const [selectedModuleFilter, setSelectedModuleFilter] = useState<string>("all");
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Video Player Controls & State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(activeLesson?.duration || 300);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);
  const [showControls, setShowControls] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCertVerify, setCopiedCertVerify] = useState(false);
  const [showExerciseModal, setShowExerciseModal] = useState(false);

  const handleCopyCertVerify = async () => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "https://chhaigaonudyami.in";
    const url = `${origin}/certificates/CHU-SAMPLE-2026`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedCertVerify(true);
      setTimeout(() => setCopiedCertVerify(false), 2500);
    } catch {
      prompt("सत्यापन लिंक कॉपी करें:", url);
    }
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);

  // Navigation indices
  const currentIndex = allLessons.findIndex((l) => l.id === activeLessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Reset video state on lesson change
  useEffect(() => {
    if (activeLesson) {
      setDuration(activeLesson.duration || 300);
      setCurrentTime(0);
      setIsPlaying(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.pause();
      }
    }
  }, [activeLesson?.id]);

  // Auto-hide controls when playing
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2500);
    }
  };

  // Sync completion API
  const markLessonComplete = useCallback(async (lessonId: string) => {
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
  }, [duration]);

  const isCurrentCompleted = activeLesson ? completedLessons.has(activeLesson.id) : false;

  // Handlers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleNext = () => {
    if (activeLesson) markLessonComplete(activeLesson.id);
    if (nextLesson) setActiveLessonId(nextLesson.id);
  };

  const handlePrev = () => {
    if (prevLesson) setActiveLessonId(prevLesson.id);
  };

  const seekRelative = (seconds: number) => {
    if (!videoRef.current) return;
    const target = Math.min(Math.max(videoRef.current.currentTime + seconds, 0), duration);
    videoRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const seekTo = (seconds: number) => {
    if (!videoRef.current) return;
    const target = Math.min(Math.max(seconds, 0), duration);
    videoRef.current.currentTime = target;
    setCurrentTime(target);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      playerContainerRef.current.requestFullscreen().catch(() => {});
    }
  };

  // Keyboard Shortcuts (Space, K, J, L, M, F, T)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in textarea or input
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      if (e.code === "Space" || e.key.toLowerCase() === "k") {
        e.preventDefault();
        togglePlay();
      } else if (e.key.toLowerCase() === "j" || e.code === "ArrowLeft") {
        e.preventDefault();
        seekRelative(-10);
      } else if (e.key.toLowerCase() === "l" || e.code === "ArrowRight") {
        e.preventDefault();
        seekRelative(10);
      } else if (e.key.toLowerCase() === "m") {
        e.preventDefault();
        setIsMuted((prev) => {
          if (videoRef.current) videoRef.current.muted = !prev;
          return !prev;
        });
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key.toLowerCase() === "t") {
        e.preventDefault();
        setIsTheaterMode((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, duration]);

  // Share URL handler
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
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

  // Filter lessons for sidebar if module filter is selected
  const filteredLessons = useMemo(() => {
    if (selectedModuleFilter === "all") return allLessons;
    return allLessons.filter((l) => l.moduleId === selectedModuleFilter);
  }, [allLessons, selectedModuleFilter]);

  // Reusable YouTube-Style Playlist Column Component
  const renderPlaylistSidebar = () => (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden">
      {/* Playlist Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/70">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              पाठ्यक्रम सूची (Course Playlist)
            </h3>
          </div>
          <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70">
            {completedLessons.size}/{allLessons.length}
          </span>
        </div>

        <p className="text-xs text-slate-500 line-clamp-1 mb-3">
          {courseTitle}
        </p>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-medium text-slate-600">
            <span>प्रगति: {completionPercentage}% पूर्ण</span>
            <span className="text-slate-400">पाठ {currentIndex + 1} / {allLessons.length}</span>
          </div>
          <Progress value={completionPercentage} className="h-1.5 bg-slate-200" />
        </div>

        {/* Autoplay Next toggle row */}
        <div className="mt-3.5 pt-3 border-t border-slate-200/60 flex items-center justify-between">
          <label htmlFor="autoplay-switch" className="text-xs font-semibold text-slate-700 cursor-pointer flex items-center gap-1.5">
            <span>स्वतः अगला पाठ (Autoplay Next)</span>
          </label>
          <Switch
            id="autoplay-switch"
            checked={autoplayNext}
            onCheckedChange={setAutoplayNext}
            className="data-[state=checked]:bg-blue-600"
          />
        </div>

        {/* Module Filter Chips */}
        {modules.length > 1 && (
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedModuleFilter("all")}
              className={`text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                selectedModuleFilter === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600"
              }`}
            >
              सभी ({allLessons.length})
            </button>
            {modules.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedModuleFilter(m.id)}
                className={`text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap font-medium transition-colors ${
                  selectedModuleFilter === m.id
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-600"
                }`}
              >
                मॉड्यूल {m.order}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Playlist Scrollable Items List */}
      <div className="flex-1 overflow-y-auto divide-y divide-slate-100 select-none">
        {filteredLessons.map((lesson, idx) => {
          const isActive = lesson.id === activeLessonId;
          const isDone = completedLessons.has(lesson.id);
          const parentMod = modules.find((m) => m.id === lesson.moduleId);

          return (
            <button
              key={lesson.id}
              type="button"
              onClick={() => {
                setActiveLessonId(lesson.id);
                setIsMobilePlaylistOpen(false);
              }}
              className={`w-full text-left p-3 sm:p-3.5 flex items-start gap-3 transition-colors group relative ${
                isActive
                  ? "bg-blue-50/90 hover:bg-blue-50"
                  : isDone
                  ? "hover:bg-slate-50 bg-white"
                  : "hover:bg-slate-50 bg-white"
              }`}
            >
              {/* Active Indicator Bar on left edge */}
              {isActive && (
                <div className="absolute left-0 inset-y-0 w-1 bg-blue-600 rounded-r-full" />
              )}

              {/* Number / Status Icon */}
              <div className="shrink-0 w-5 text-center mt-1">
                {isActive ? (
                  <div className="flex items-end justify-center gap-0.5 h-3.5">
                    <span className="w-1 bg-blue-600 h-full animate-pulse rounded-full" />
                    <span className="w-1 bg-blue-600 h-2/3 animate-pulse delay-75 rounded-full" />
                    <span className="w-1 bg-blue-600 h-4/5 animate-pulse delay-150 rounded-full" />
                  </div>
                ) : isDone ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                ) : (
                  <span className="text-xs font-mono text-slate-400 group-hover:text-slate-600">
                    {idx + 1}
                  </span>
                )}
              </div>

              {/* Video Thumbnail (YouTube 16:9 Pill) */}
              <div className="relative w-24 sm:w-28 aspect-video rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-200/80 shadow-2xs group-hover:opacity-95">
                <Image
                  src={lesson.videoThumbnail || "/images/dairy-course.jpg"}
                  alt={lesson.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 96px, 112px"
                />

                {/* Duration Badge */}
                <span className="absolute bottom-1 right-1 bg-black/80 text-white font-mono text-[9px] px-1 py-0.5 rounded font-semibold backdrop-blur-2xs">
                  {lesson.type === "QUIZ" ? "क्विज" : formatTime(lesson.duration || 300)}
                </span>

                {/* Center Hover Play Icon */}
                <div className={`absolute inset-0 bg-black/30 flex items-center justify-center transition-opacity ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}>
                  <Play className={`h-4 w-4 ${isActive ? "text-blue-400 fill-blue-400" : "text-white fill-white"}`} />
                </div>
              </div>

              {/* Lesson Details */}
              <div className="min-w-0 flex-1">
                <p
                  className={`text-xs sm:text-sm leading-snug line-clamp-2 ${
                    isActive ? "font-bold text-blue-950" : "font-medium text-slate-800"
                  }`}
                >
                  {lesson.title}
                </p>

                <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                  {parentMod && (
                    <span className="text-[10px] text-slate-500 font-medium">
                      मॉड्यूल {parentMod.order}
                    </span>
                  )}
                  {lesson.type === "QUIZ" ? (
                    <Badge variant="outline" className="text-[9px] h-4 px-1.5 bg-amber-50 text-amber-700 border-amber-200 font-semibold">
                      प्रश्नोत्तरी
                    </Badge>
                  ) : isDone ? (
                    <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-0.5">
                      • पूर्ण
                    </span>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f9fafb] text-slate-900 font-sans flex flex-col">
      {/* ======================================================== */}
      {/* 1. TOP YOUTUBE-STYLE CLEAN NAVIGATION HEADER             */}
      {/* ======================================================== */}
      <header className="sticky top-0 z-40 h-14 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Back & Breadcrumb */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href={`/dashboard/courses/${courseSlug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors shrink-0"
            title="कोर्स अवलोकन पर वापस जाएं"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">डैशबोर्ड</span>
          </Link>

          <div className="h-4 w-px bg-slate-200 hidden sm:block shrink-0" />

          <div className="min-w-0 flex items-center gap-2">
            <span className="text-xs font-bold text-blue-700 shrink-0 font-headline hidden md:inline">
              छैगांव उद्यमी
            </span>
            <span className="text-slate-300 hidden md:inline">•</span>
            <h1 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
              {courseTitle}
            </h1>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile Playlist Toggle Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobilePlaylistOpen(true)}
            className="lg:hidden h-8 px-2.5 text-xs font-semibold gap-1.5 border-slate-200 rounded-full"
          >
            <Layers className="h-3.5 w-3.5 text-blue-600" />
            <span>पाठ्यक्रम ({allLessons.length})</span>
          </Button>

          {/* Mark Complete Pill Button */}
          <Button
            size="sm"
            onClick={() => activeLesson && markLessonComplete(activeLesson.id)}
            className={`h-8 px-3.5 text-xs font-semibold rounded-full gap-1.5 transition-all shadow-2xs ${
              isCurrentCompleted
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-slate-900 hover:bg-slate-800 text-white"
            }`}
          >
            <Check className="h-3.5 w-3.5" />
            <span>{isCurrentCompleted ? "पूर्ण है" : "पूर्ण चिह्नित करें"}</span>
          </Button>

          {/* Certificate Download Pill in Header when 100% completed */}
          {completionPercentage === 100 && (
            <Link href="/certificates/CHU-SAMPLE-2026" target="_blank">
              <Button
                size="sm"
                className="h-8 px-3 text-xs font-bold rounded-full bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 shadow-2xs"
                title="आधिकारिक प्रमाण पत्र डाउनलोड करें"
              >
                <Award className="h-3.5 w-3.5 fill-white text-emerald-600" />
                <span>प्रमाण पत्र</span>
              </Button>
            </Link>
          )}

          {/* Theater Mode Button on Desktop */}
          <button
            type="button"
            onClick={() => setIsTheaterMode((prev) => !prev)}
            className="hidden lg:flex items-center justify-center h-8 w-8 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
            title={isTheaterMode ? "डिफ़ॉल्ट दृश्य (Default View - T)" : "थिएटर मोड (Theater Mode - T)"}
          >
            <Tv className="h-4 w-4" />
          </button>
        </div>
      </header>

      {/* ======================================================== */}
      {/* 2. THEATER MODE FULL-WIDTH VIDEO STRIP (IF ACTIVE)       */}
      {/* ======================================================== */}
      {isTheaterMode && !isQuizActive && (
        <section className="w-full bg-black py-2 sm:py-4 flex justify-center border-b border-slate-900">
          <div className="w-full max-w-7xl px-0 sm:px-4">
            {/* Embedded Theater Player */}
            {renderVideoPlayerStage()}
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 3. MAIN YOUTUBE 2-COLUMN WORKSPACE                       */}
      {/* ======================================================== */}
      <main className="flex-1 max-w-[1780px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
          
          {/* ---------------------------------------------------- */}
          {/* PRIMARY COLUMN (Video/Quiz, Info, Description, Tabs) */}
          {/* ---------------------------------------------------- */}
          <div className={`space-y-5 ${isTheaterMode && !isQuizActive ? "lg:col-span-12" : "lg:col-span-8 xl:col-span-8 2xl:col-span-9"}`}>
            
            {/* Video Player OR Quiz View (Replaces Video Completely) */}
            {(!isTheaterMode || isQuizActive) && renderVideoPlayerStage()}

            {/* Video Title & Meta Bar */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 uppercase tracking-wide text-[10px]">
                  {courseCategory}
                </Badge>
                <span>•</span>
                <span className="text-slate-500 font-medium">
                  {activeModule?.title}
                </span>
                <span>•</span>
                <span className="text-slate-500 font-mono">
                  पाठ {currentIndex + 1} / {allLessons.length}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                {activeLesson?.title || courseTitle}
              </h1>
            </div>

            {/* YouTube-Style Channel / Instructor & Actions Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 pb-3 border-b border-slate-200/80">
              {/* Instructor / Channel Info */}
              <div className="flex items-center gap-3">
                <Avatar className="h-11 w-11 border border-slate-200 bg-blue-100 text-blue-900 font-bold shrink-0">
                  <AvatarFallback>RP</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight">
                      {instructor.name}
                    </h3>
                    <CheckCircle2 className="h-4 w-4 text-blue-600 fill-blue-50" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium line-clamp-1">
                    {instructor.title}
                  </p>
                </div>
              </div>

              {/* YouTube Action Pill Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Previous Lesson */}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!prevLesson}
                  onClick={handlePrev}
                  className="h-9 px-3.5 text-xs font-semibold rounded-full border-slate-200 text-slate-700 hover:bg-slate-100 gap-1"
                  title="पिछला पाठ (Previous)"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">पिछला</span>
                </Button>

                {/* Next Lesson */}
                <Button
                  size="sm"
                  disabled={!nextLesson}
                  onClick={handleNext}
                  className="h-9 px-3.5 text-xs font-semibold rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 gap-1"
                  title="अगला पाठ (Next)"
                >
                  <span>अगला</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>

                {/* Module Quiz Toggle Button: Click to hide video and show Quiz */}
                {!isQuizActive && currentModuleQuizLesson && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveLessonId(currentModuleQuizLesson.id)}
                    className="h-9 px-3.5 text-xs font-semibold rounded-full border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 gap-1.5 shadow-2xs"
                    title="वीडियो छुपाएं और इस मॉड्यूल का क्विज हल करें"
                  >
                    <Award className="h-4 w-4 text-amber-600" />
                    <span>क्विज हल करें</span>
                  </Button>
                )}

                {/* Return to Video Lecture Button when Quiz is active */}
                {isQuizActive && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const videoLesson = allLessons.find(
                        (l) => l.moduleId === activeLesson?.moduleId && l.type !== "QUIZ" && l.type !== "ASSESSMENT"
                      ) || allLessons[0];
                      if (videoLesson) setActiveLessonId(videoLesson.id);
                    }}
                    className="h-9 px-3.5 text-xs font-semibold rounded-full border-blue-200 bg-blue-50 text-blue-900 hover:bg-blue-100 gap-1.5 shadow-2xs"
                    title="क्विज से वापस वीडियो व्याख्यान देखें"
                  >
                    <VideoIcon className="h-4 w-4 text-blue-600" />
                    <span>वीडियो देखें</span>
                  </Button>
                )}

                {/* Download Exercise Files Pill */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowExerciseModal(true)}
                  className="h-9 px-3.5 text-xs font-semibold rounded-full border-slate-200 text-slate-700 hover:bg-slate-100 gap-1.5"
                >
                  <Download className="h-4 w-4 text-blue-600" />
                  <span className="hidden sm:inline">फाइलें</span>
                </Button>

                {/* Share Pill Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyLink}
                  className="h-9 px-3 text-xs font-semibold rounded-full border-slate-200 text-slate-700 hover:bg-slate-100 gap-1.5"
                  title="पाठ लिंक कॉपी करें"
                >
                  {copiedLink ? (
                    <>
                      <CheckCheck className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-700">कॉपी हुआ</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-4 w-4" />
                      <span>शेयर</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* YouTube-Style Clean Description Box */}
            <div
              onClick={() => setIsDescriptionExpanded((prev) => !prev)}
              className="p-4 sm:p-5 rounded-2xl bg-slate-100/90 hover:bg-slate-100 transition-colors text-slate-800 text-sm cursor-pointer space-y-3"
            >
              {/* Meta stats line */}
              <div className="flex items-center gap-3 text-xs font-bold text-slate-700 flex-wrap">
                <span className="font-mono">
                  अवधि: {formatTime(activeLesson?.duration || 300)}
                </span>
                <span>•</span>
                <span>अध्याय {activeLesson?.order || 1}</span>
                <span>•</span>
                <span className="text-blue-700">#ग्रामीण_उद्यमिता #छैगांव_माखन</span>
              </div>

              {/* Description Body */}
              <div className={`space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed ${!isDescriptionExpanded ? "line-clamp-2" : ""}`}>
                <p>
                  {activeLesson?.description ||
                    "इस व्यावहारिक सत्र में ग्रामीण उद्यम स्थापना, मशीनरी चयन, लागत आकलन, डीआईसी खंडवा व नाबार्ड की अनुदान योजनाओं की विस्तृत जानकारी दी गई है।"}
                </p>

                {isDescriptionExpanded && (
                  <div className="pt-2 border-t border-slate-200/70 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                      <span>इस सत्र के मुख्य बिंदु (Key Takeaways):</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 list-disc list-inside">
                      <li>कस्टम हायरिंग सेंटर एवं कृषि यंत्र बैंक की विस्तृत परियोजना रिपोर्ट (DPR)।</li>
                      <li>रोटावेटर, थ्रेशर, कल्टीवेटर व सोलर ड्रायर के भाड़ा दर निर्धारण सूत्र।</li>
                      <li>PMEGP एवं राज्य कृषि अभियांत्रिकी योजनाओं के तहत 40% तक पूंजीगत अनुदान नियम।</li>
                    </ul>

                    <div className="pt-2 text-xs text-slate-500">
                      प्रशिक्षक: <strong className="text-slate-800">{instructor.name}</strong> • {instructor.bio}
                    </div>
                  </div>
                )}
              </div>

              {/* Show more / Show less toggle */}
              <button
                type="button"
                className="text-xs font-bold text-slate-900 hover:underline flex items-center gap-1 pt-0.5"
              >
                <span>{isDescriptionExpanded ? "कम दिखाएं (Show less)" : "और दिखाएं (Show more)..."}</span>
                {isDescriptionExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>
            </div>

            {/* Clean 4-Tab Navigation Below Description */}
            <div className="pt-2">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-5">
                <TabsList className="bg-slate-100 p-1 rounded-full h-10 w-full sm:w-auto inline-flex overflow-x-auto no-scrollbar">
                  <TabsTrigger
                    value="overview"
                    className="rounded-full px-4 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-xs"
                  >
                    अवलोकन (Overview)
                  </TabsTrigger>
                  <TabsTrigger
                    value="transcript"
                    className="rounded-full px-4 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-xs"
                  >
                    ट्रांसक्रिप्ट (Transcript)
                  </TabsTrigger>
                </TabsList>

                {/* TAB 1: OVERVIEW */}
                <TabsContent value="overview" className="space-y-4">
                  {/* Certificate Celebration Card (when course is completed) */}
                  {completionPercentage === 100 && (
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in-50">
                      <div className="flex items-center gap-3.5">
                        <div className="size-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                          <Award className="size-6 fill-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm sm:text-base font-bold text-emerald-950">
                              बधाई हो! आपने यह पाठ्यक्रम पूर्ण कर लिया है
                            </h4>
                            <Badge className="bg-emerald-600 text-white text-[10px] font-bold">100% Certified</Badge>
                          </div>
                          <p className="text-xs text-emerald-800 pt-0.5">
                            आपका आधिकारिक डिजिटल उद्यमिता प्रमाण पत्र तैयार है। इसे तुरंत डाउनलोड करें अथवा सत्यापन लिंक साझा करें।
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 flex-wrap">
                        <Button
                          type="button"
                          onClick={handleCopyCertVerify}
                          variant="outline"
                          size="sm"
                          className="h-9 px-3.5 text-xs font-semibold rounded-full border-emerald-300 bg-white text-emerald-800 hover:bg-emerald-100 gap-1.5 shadow-2xs cursor-pointer"
                          title="सत्यापन लिंक कॉपी करें"
                        >
                          {copiedCertVerify ? (
                            <>
                              <Check className="size-3.5 text-emerald-600" />
                              <span className="font-bold">सत्यापन लिंक कॉपी हुआ!</span>
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="size-3.5 text-blue-600" />
                              <span>सत्यापन लिंक कॉपी</span>
                            </>
                          )}
                        </Button>

                        <Link href="/certificates/CHU-SAMPLE-2026" target="_blank">
                          <Button
                            size="sm"
                            className="h-9 px-4 text-xs font-bold rounded-full bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 shadow-xs cursor-pointer"
                          >
                            <Download className="size-3.5" />
                            <span>प्रमाण पत्र डाउनलोड</span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setShowExerciseModal(true)}
                      className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 group-hover:scale-105 transition-transform">
                          <Download className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">अभ्यास फाइलें (Exercise Files)</h4>
                          <p className="text-xs text-slate-500">DPR एक्सेल मॉडल, चेकलिस्ट व प्रपत्र</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
                    </div>

                    <div className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-blue-50 text-blue-700">
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
                </TabsContent>

                {/* TAB 2: TRANSCRIPT WITH CLICKABLE TIME JUMPS */}
                <TabsContent value="transcript" className="space-y-4">
                  <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-4 shadow-2xs text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">पाठ ट्रांसक्रिप्ट (Lesson Transcript)</h4>
                      <p className="text-xs text-slate-500">किसी भी समय पर क्लिक करके उस भाग पर जाएं।</p>
                    </div>

                    <div className="space-y-3.5 divide-y divide-slate-100">
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => seekTo(0)}
                          className="font-mono text-xs font-bold text-blue-600 hover:underline mb-1 inline-block"
                        >
                          [00:00] परिचय एवं कस्टम हायरिंग सेंटर का उद्देश्य
                        </button>
                        <p className="text-slate-600">
                          नमस्कार किसान व उद्यमी भाइयों! आज हम कस्टम हायरिंग सेंटर (Custom Hiring Center) की स्थापना, उपयुक्त मशीनरी चयन व ग्रामीण मांग का विश्लेषण करेंगे।
                        </p>
                      </div>

                      <div className="pt-3">
                        <button
                          type="button"
                          onClick={() => seekTo(85)}
                          className="font-mono text-xs font-bold text-blue-600 hover:underline mb-1 inline-block"
                        >
                          [01:25] उपकरण चयन: रोटावेटर, थ्रेशर एवं सोलर ड्रायर
                        </button>
                        <p className="text-slate-600">
                          निमाड़ क्षेत्र में कपास, सोयाबीन, गेहूं और मिर्च की खेती मुख्य है। अतः 50HP ट्रैक्टर, मल्टीक्रॉप थ्रेशर, लेजर लैंड लेवलर व 500kg सोलर ड्रायर का संयोजन सर्वाधिक लाभदायक सिद्ध होता है।
                        </p>
                      </div>

                      <div className="pt-3">
                        <button
                          type="button"
                          onClick={() => seekTo(180)}
                          className="font-mono text-xs font-bold text-blue-600 hover:underline mb-1 inline-block"
                        >
                          [03:00] बैंक ऋण व 40% सब्सिडी आवेदन नियम
                        </button>
                        <p className="text-slate-600">
                          कृषि यंत्रीकरण उप-मिशन (SMAM) व PMEGP के तहत ₹10 लाख से ₹25 लाख तक की परियोजनाओं पर 40% तक पूंजीगत सब्सिडी का प्रावधान है। आवश्यक दस्तावेजों में आधार, जमीन की खतौनी और बैंक कोटेशन शामिल हैं।
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* SIDEBAR COLUMN (YouTube-Style Playlist Column)       */}
          {/* ---------------------------------------------------- */}
          <div className={`hidden lg:block shrink-0 sticky top-20 ${
            isTheaterMode
              ? "lg:col-span-12 max-w-4xl mx-auto w-full"
              : "lg:col-span-4 xl:col-span-4 2xl:col-span-3 h-[calc(100vh-6.5rem)]"
          }`}>
            {renderPlaylistSidebar()}
          </div>
        </div>
      </main>

      {/* ======================================================== */}
      {/* 4. MOBILE PLAYLIST DRAWER (FOR SMALL SCREENS)            */}
      {/* ======================================================== */}
      {isMobilePlaylistOpen && (
        <div className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-xs flex">
          <div className="w-full max-w-sm h-full bg-white shadow-2xl relative flex flex-col">
            <div className="p-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">पाठ्यक्रम सामग्री</span>
              <button
                type="button"
                onClick={() => setIsMobilePlaylistOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              {renderPlaylistSidebar()}
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobilePlaylistOpen(false)} />
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. EXERCISE FILES MODAL                                  */}
      {/* ======================================================== */}
      <ExerciseFilesModal
        isOpen={showExerciseModal}
        onClose={() => setShowExerciseModal(false)}
        courseTitle={courseTitle}
      />
    </div>
  );

  // Helper renderer: Video Player / Quiz Stage (Hides video completely if quiz is active)
  function renderVideoPlayerStage() {
    if (isQuizActive) {
      // In place of video player: Render clean, dedicated Quiz View taking over the left player section
      return (
        <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-8 animate-in fade-in-50">
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200/80 shadow-2xs">
                <Award className="size-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
                  मॉड्यूल स्व-मूल्यांकन एवं प्रश्नोत्तरी
                </span>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {activeLesson?.title}
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs bg-amber-50/70 border-amber-200 text-amber-800 font-semibold">
                उत्तीर्ण अंक: {activeLesson?.quiz?.passingPercentage || 70}%
              </Badge>
              {currentModuleQuizLesson && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const videoLesson = allLessons.find(
                      (l) => l.moduleId === activeLesson?.moduleId && l.type !== "QUIZ" && l.type !== "ASSESSMENT"
                    ) || allLessons[0];
                    if (videoLesson) setActiveLessonId(videoLesson.id);
                  }}
                  className="h-7 text-xs px-2.5 rounded-full border-slate-200 text-slate-600 hover:text-slate-900"
                  title="वीडियो व्याख्यान देखें"
                >
                  <VideoIcon className="h-3.5 w-3.5 text-blue-600 mr-1" />
                  <span>वीडियो देखें</span>
                </Button>
              )}
            </div>
          </div>

          <InteractiveQuizView
            quizId={activeLesson?.quiz?.id || activeLesson?.id || "quiz-default"}
            quizTitle={activeLesson?.title || "प्रश्नोत्तरी"}
            passingPercentage={activeLesson?.quiz?.passingPercentage || 70}
            enrollmentId={enrollmentId}
            questions={
              activeLesson?.quiz?.questions && activeLesson.quiz.questions.length > 0
                ? activeLesson.quiz.questions
                : [
                    {
                      id: "q-1",
                      question:
                        "कस्टम हायरिंग सेंटर (CHC) योजना के अंतर्गत सामान्य वर्ग के लाभार्थियों को कितने प्रतिशत तक पूंजीगत अनुदान (Capital Subsidy) अनुमन्य है?",
                      marks: 1,
                      order: 1,
                      options: [
                        {
                          id: "opt-1",
                          optionText: "25% पूंजीगत अनुदान",
                          isCorrect: false,
                        },
                        {
                          id: "opt-2",
                          optionText: "40% पूंजीगत अनुदान (अधिकतम ₹10 लाख)",
                          isCorrect: true,
                          explanation: "सही उत्तर! कृषि यंत्रीकरण उप-मिशन (SMAM) के तहत CHC स्थापना हेतु 40% तक पूंजीगत अनुदान देय है।",
                        },
                        {
                          id: "opt-3",
                          optionText: "10% केवल ब्याज अनुदान",
                          isCorrect: false,
                        },
                        {
                          id: "opt-4",
                          optionText: "50% पूर्ण अनुदान",
                          isCorrect: false,
                        },
                      ],
                    },
                  ]
            }
            onComplete={() => activeLesson && markLessonComplete(activeLesson.id)}
            onNextLesson={handleNext}
          />
        </div>
      );
    }

    // Video Player Stage (Video is ONLY shown when lesson is not a quiz)
    return (
      <div
        ref={playerContainerRef}
        className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl border border-slate-800/90 group select-none flex items-center justify-center"
      >
        <iframe
          key={activeLesson?.id}
          src={getEmbedUrl(activeLesson?.videoUrl, activeLesson?.id)}
          title={activeLesson?.title || "पाठ्यक्रम व्याख्यान"}
          className="w-full h-full border-0 aspect-video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }
}

/**
 * Helper to construct an iframe embed URL.
 * Handles:
 * - YouTube watch URLs (https://www.youtube.com/watch?v=...)
 * - YouTube short URLs (https://youtu.be/...)
 * - Direct YouTube 11-char IDs
 * - VdoCipher embed URLs (https://player.vdocipher.com/...)
 * - Vimeo / external iframe embed URLs
 * - Curated fallback Hindi agricultural machinery & entrepreneurship video tutorials
 */
function getEmbedUrl(videoUrlOrId?: string | null, lessonId?: string): string {
  if (!videoUrlOrId) {
    // High quality Hindi training videos for Custom Hiring Center & agricultural equipment
    const sampleVideos = [
      "https://www.youtube-nocookie.com/embed/fW-8O4pT5kI?rel=0&autoplay=1",
      "https://www.youtube-nocookie.com/embed/9p_b0v0F7rU?rel=0&autoplay=1",
      "https://www.youtube-nocookie.com/embed/XqZsoesa55w?rel=0&autoplay=1",
    ];
    const hash = (lessonId || "1").split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return sampleVideos[hash % sampleVideos.length];
  }

  const str = videoUrlOrId.trim();

  // If already an embed URL
  if (
    str.includes("youtube.com/embed/") ||
    str.includes("youtube-nocookie.com/embed/") ||
    str.includes("player.vdocipher.com") ||
    str.includes("player.vimeo.com")
  ) {
    return str.includes("?") ? `${str}&autoplay=1` : `${str}?autoplay=1`;
  }

  // YouTube watch or youtu.be URL
  const ytMatch = str.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch && ytMatch[1]) {
    return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=1&rel=0&modestbranding=1`;
  }

  // 11-char YouTube ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(str)) {
    return `https://www.youtube-nocookie.com/embed/${str}?autoplay=1&rel=0&modestbranding=1`;
  }

  // Full external URL (HTTP/HTTPS)
  if (str.startsWith("http://") || str.startsWith("https://")) {
    return str;
  }

  // Fallback
  return `https://www.youtube-nocookie.com/embed/fW-8O4pT5kI?autoplay=1&rel=0`;
}
