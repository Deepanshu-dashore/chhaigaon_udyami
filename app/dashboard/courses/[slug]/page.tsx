import React from "react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { resolvePrismaUserId } from "@/services/user-profile.service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  PlayCircle,
  Bookmark,
  Share2,
  Check,
  CheckCircle2,
  Award,
  Clock,
  Users,
  Building2,
  ChevronRight,
  ArrowLeft,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { LearningPathModulesList } from "@/components/course/learning-path-modules-list";

export const dynamic = "force-dynamic";

export default async function EnrolledCourseLearningPathPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect(`/login?redirectedFrom=/dashboard/courses/${slug}`);
  }

  const prismaUserId = await resolvePrismaUserId(authUser.id);
  if (!prismaUserId) {
    redirect("/login");
  }

  // Fetch course details with modules, lessons, and quizzes
  const course = await prisma.course.findUnique({
    where: { slug },
    include: {
      createdBy: true,
      modules: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            include: {
              video: true,
              material: true,
            },
          },
          quizzes: true,
        },
      },
      enrollments: {
        where: { userId: prismaUserId },
        include: {
          certificate: true,
        },
      },
    },
  });

  if (!course) {
    notFound();
  }

  const enrollment = course.enrollments[0];
  if (!enrollment) {
    redirect(`/courses/${slug}`);
  }

  // Fetch user completed lessons
  const lessonProgresses = await prisma.lessonProgress.findMany({
    where: {
      userId: prismaUserId,
      lessonId: { in: course.modules.flatMap((m) => m.lessons.map((l) => l.id)) },
      isCompleted: true,
    },
    select: { lessonId: true },
  });
  const completedLessonIdSet = new Set(lessonProgresses.map((p) => p.lessonId));

  const allLessons = course.modules.flatMap((m) => m.lessons);
  const totalLessons = allLessons.length;
  const totalCompleted = allLessons.filter((l) => completedLessonIdSet.has(l.id)).length;
  const progressPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  // Next lesson to resume
  const nextLesson = allLessons.find((l) => !completedLessonIdSet.has(l.id)) || allLessons[0];
  const totalDurationMinutes = allLessons.reduce((acc, l) => acc + (l.duration ? Math.round(l.duration / 60) : 20), 0);
  const totalHoursFormatted = `${Math.floor(totalDurationMinutes / 60)} घंटे ${totalDurationMinutes % 60} मिनट`;
  const remainingMinutes = Math.max(0, Math.round(totalDurationMinutes * (1 - progressPercent / 100)));
  const remainingFormatted = `${Math.floor(remainingMinutes / 60)}h ${remainingMinutes % 60}m left`;

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans pb-16 text-[#111827]">
      {/* Top Breadcrumb Nav */}
      <div className="flex items-center gap-2 text-xs text-[#667085]">
        <Link href="/dashboard/courses" className="hover:text-[#111827] flex items-center gap-1 font-medium">
          <ArrowLeft className="size-3.5" />
          <span>मेरे कोर्सेस (My Courses)</span>
        </Link>
        <span>/</span>
        <span className="text-[#111827] font-semibold truncate">{course.title}</span>
      </div>

      {/* ================= 1. HERO LEARNING PATH BANNER (REFERENCE IMAGE 1) ================= */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Title, Metadata, Progress Bar & CTAs */}
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-bold text-[#667085] uppercase tracking-wider block">
              Professional Certificate • व्यावसायिक आजीविका प्रमाण पत्र
            </span>

            <h1 className="text-2xl sm:text-3xl font-black text-[#111827] leading-tight">
              {course.title}
            </h1>

            {/* 4 Items metadata bar */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs text-[#667085] font-medium">
              <span>{totalHoursFormatted}</span>
              <span>•</span>
              <span>{course.modules.length} मॉड्यूल</span>
              <span>•</span>
              <span className="capitalize">{course.level || "Beginner"}</span>
              <span>•</span>
              <span>अद्यतन 2026</span>
            </div>

            {/* Partnership Line */}
            <div className="flex items-center gap-2 text-xs text-[#111827] font-semibold pt-0.5">
              <div className="size-5 rounded bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1261D6]">
                <Building2 className="size-3.5" />
              </div>
              <span>जिला उद्योग केंद्र (DIC) खंडवा व NABARD पार्टनरशिप</span>
            </div>

            {/* Learners Count */}
            <div className="flex items-center gap-2 text-xs text-[#667085]">
              <Users className="size-3.5 text-slate-400" />
              <span>4,850+ ग्रामीण उद्यमी अध्ययनरत</span>
            </div>

            <p className="text-xs sm:text-sm text-[#475467] leading-relaxed pt-1">
              {course.about || course.description}
            </p>

            {/* Progress Bar (Image 1 Style) */}
            <div className="pt-2 space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1261D6] h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-[#667085] shrink-0 font-mono">
                  {progressPercent === 100 ? "पूर्ण (100%)" : remainingFormatted}
                </span>
              </div>
            </div>

            {/* Action Buttons: Resume Button (Image 1 Blue Pill), Bookmark, Share */}
            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <Link href={`/courses/${course.slug}/learn`}>
                <Button className="h-11 px-7 rounded-full bg-[#1261D6] hover:bg-blue-700 text-white text-sm font-bold shadow-xs cursor-pointer inline-flex items-center gap-2">
                  <PlayCircle className="size-5 fill-white text-[#1261D6]" />
                  <span>{progressPercent > 0 ? "Resume (अध्ययन जारी रखें)" : "Start (कोर्स शुरू करें)"}</span>
                </Button>
              </Link>

              <Button
                variant="outline"
                size="icon"
                className="size-11 rounded-full border-[#E5E7EB] text-[#475467] hover:bg-slate-50 cursor-pointer"
                title="बुकमार्क करें"
              >
                <Bookmark className="size-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="size-11 rounded-full border-[#E5E7EB] text-[#475467] hover:bg-slate-50 cursor-pointer"
                title="शेयर करें"
              >
                <Share2 className="size-4" />
              </Button>
            </div>

          </div>

          {/* Right Column: Video Preview Thumbnail with Subtitle Overlay (Image 1 Style) */}
          <div className="lg:col-span-4 space-y-2">
            <Link href={`/courses/${course.slug}/learn`} className="block group">
              <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                <img
                  src={course.thumbnail || "/images/dairy-course.jpg"}
                  alt={course.title}
                  className="size-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                />
                
                {/* Center Play Icon */}
                <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
                  <div className="size-12 rounded-full bg-white/90 text-[#1261D6] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <PlayCircle className="size-7 ml-0.5 fill-[#1261D6] text-white" />
                  </div>
                </div>

                {/* Subtitle banner on bottom of preview (Reference Image 1) */}
                <div className="absolute bottom-2 inset-x-2 bg-black/75 backdrop-blur-xs text-white text-[11px] font-medium px-3 py-1.5 rounded text-center truncate">
                  "व्यावसायिक प्रोजेक्ट रिपोर्ट और 35% PMEGP सब्सिडी मार्गदर्शन"
                </div>
              </div>
            </Link>

            {nextLesson && (
              <p className="text-xs text-[#667085] leading-snug">
                Continue with{" "}
                <Link
                  href={`/courses/${course.slug}/learn`}
                  className="font-semibold text-[#1261D6] hover:underline"
                >
                  {nextLesson.title}
                </Link>
              </p>
            )}
          </div>

        </div>
      </div>

      {/* ================= 2. EARN A PROFESSIONAL CERTIFICATE CARD (IMAGE 1 REFERENCE) ================= */}
      <Card className="bg-white border-[#E5E7EB] rounded-2xl shadow-xs p-6 space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-[#111827]">
            Earn a Professional Certificate (व्यावसायिक प्रमाण पत्र प्राप्त करें)
          </h2>
        </div>

        <div className="flex items-start gap-4">
          <div className="size-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[#1261D6] shrink-0">
            <Award className="size-6 text-[#1261D6]" />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-bold text-sm text-[#111827]">
              जिला उद्योग केंद्र (DIC) खंडवा एवं NABARD प्रमाणित
            </h3>
            <p className="text-xs text-[#667085] leading-relaxed">
              यह आजीविका पाठ्यक्रम DIC खंडवा द्वारा मान्यता प्राप्त है। इस लर्निंग पाथवे के सभी मॉड्यूल पूरे करने और अंतिम परीक्षा उत्तीर्ण करने पर आपको 24x7 ऑनलाइन सत्यापन योग्य डिजिटल प्रमाण पत्र प्राप्त होगा, जिसे आप बैंक DPR व PMEGP सब्सिडी आवेदन के साथ संलग्न कर सकते हैं।
            </p>
            {enrollment.certificate && (
              <div className="pt-2">
                <Link href={`/dashboard/certificates`}>
                  <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs h-8 px-3 rounded">
                    <CheckCircle2 className="size-3.5 mr-1.5" />
                    अपना जारी प्रमाण पत्र देखें
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* ================= 3. WHAT YOU'LL LEARN HIGHLIGHTS ================= */}
      {course.outcomes && course.outcomes.length > 0 && (
        <Card className="bg-white border-[#E5E7EB] rounded-2xl shadow-xs p-6 space-y-4">
          <h2 className="text-lg font-bold text-[#111827]">
            What you'll learn (आप क्या सीखेंगे)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {course.outcomes.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <Check className="size-4 text-[#16845B] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-[#374151] leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* ================= 4. CONTENT IN THIS LEARNING PATH (REFERENCE IMAGE 2) ================= */}
      <Card className="bg-white border-[#E5E7EB] rounded-2xl shadow-xs p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-[#111827]">
            Content in this Learning Path (पाठ्यक्रम संरचना)
          </h2>
          <p className="text-xs text-[#667085] mt-0.5">
            {course.modules.length} मॉड्यूल • {totalHoursFormatted} कुल अवधि
          </p>
        </div>

        {/* Interactive Dropdown Modules & Lectures List */}
        <LearningPathModulesList
          modules={course.modules}
          completedLessonIds={lessonProgresses.map((p) => p.lessonId)}
          courseSlug={course.slug}
          instructorName={course.createdBy?.name || "वरिष्ठ तकनीकी सलाहकार"}
        />
      </Card>
    </div>
  );
}
