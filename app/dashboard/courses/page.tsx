import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { resolvePrismaUserId } from "@/services/user-profile.service";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  PlayCircle,
  Award,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  GraduationCap,
  Layers,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EnrolledCoursesPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login?redirectedFrom=/dashboard/courses");
  }

  const prismaUserId = await resolvePrismaUserId(authUser.id);
  if (!prismaUserId) {
    redirect("/login");
  }

  // Fetch all enrollments with courses and modules
  const enrollments = await prisma.enrollment.findMany({
    where: { userId: prismaUserId },
    include: {
      course: {
        include: {
          modules: {
            orderBy: { order: "asc" },
            include: {
              lessons: {
                select: {
                  id: true,
                  title: true,
                  duration: true,
                },
              },
            },
          },
        },
      },
      certificate: true,
    },
    orderBy: { enrolledAt: "desc" },
  });

  // Fetch user completed lessons count for progress calculations
  const lessonProgresses = await prisma.lessonProgress.findMany({
    where: {
      userId: prismaUserId,
      isCompleted: true,
    },
    select: { lessonId: true },
  });
  const completedLessonIdSet = new Set(lessonProgresses.map((p) => p.lessonId));

  // Compute stats
  const totalEnrolled = enrollments.length;
  let totalCompletedCourses = 0;

  const coursesWithMetrics = enrollments.map((enr) => {
    const course = enr.course;
    const allLessons = course.modules.flatMap((m) => m.lessons);
    const totalLessons = allLessons.length;
    const completedLessons = allLessons.filter((l) => completedLessonIdSet.has(l.id)).length;
    const percent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    if (percent === 100 || enr.status === "COMPLETED") {
      totalCompletedCourses++;
    }

    // Find next uncompleted lesson or first lesson
    const nextLesson = allLessons.find((l) => !completedLessonIdSet.has(l.id)) || allLessons[0];

    return {
      enrollment: enr,
      course,
      totalLessons,
      completedLessons,
      percent,
      nextLessonId: nextLesson?.id,
      hasCertificate: Boolean(enr.certificate),
    };
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0056d2] via-blue-700 to-indigo-800 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-semibold">
                <GraduationCap className="size-3.5" />
                <span>अध्ययन केंद्र (Learning Hub)</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              मेरे नामांकित पाठ्यक्रम (My Enrolled Courses)
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm max-w-xl">
              जिला उद्योग केंद्र (DIC) खंडवा एवं NABARD सहयोग से प्रमाणित व्यावसायिक उद्यम प्रशिक्षण।
            </p>
          </div>

          <Link href="/courses">
            <Button
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-xs font-bold rounded-lg cursor-pointer"
            >
              <BookOpen className="size-4 mr-1.5" />
              अन्य कोर्स देखें
            </Button>
          </Link>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-white/20 mt-6">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3">
            <span className="text-xs text-blue-100 block">कुल नामांकित</span>
            <span className="text-xl font-bold">{totalEnrolled} कोर्सेस</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3">
            <span className="text-xs text-blue-100 block">सफलतापूर्वक पूर्ण</span>
            <span className="text-xl font-bold">{totalCompletedCourses} कोर्सेस</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 col-span-2 sm:col-span-1">
            <span className="text-xs text-blue-100 block">सत्यापित प्रमाण पत्र</span>
            <span className="text-xl font-bold">
              {enrollments.filter((e) => e.certificate).length} जारी
            </span>
          </div>
        </div>
      </div>

      {/* Courses List */}
      {coursesWithMetrics.length === 0 ? (
        <Card className="p-12 text-center bg-white border-[#E5E7EB] rounded-2xl shadow-xs space-y-4">
          <div className="size-16 rounded-2xl bg-blue-50 text-[#1261D6] mx-auto flex items-center justify-center">
            <BookOpen className="size-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#111827]">
              आपने अभी तक किसी कोर्स में प्रवेश नहीं लिया है
            </h3>
            <p className="text-xs text-[#667085] max-w-md mx-auto">
              डेयरी फार्मिंग, फूड प्रोसेसिंग, जैविक खेती और सरकारी सब्सिडी योजनाओं पर हमारे 12 प्रमाणित कोर्स में से चुनें।
            </p>
          </div>
          <Link href="/courses">
            <Button className="bg-[#1261D6] hover:bg-blue-700 text-white font-bold text-xs h-10 px-6 rounded-lg cursor-pointer shadow-sm">
              कोर्स कैटलॉग देखें (Browse Catalog)
              <ArrowRight className="size-4 ml-1.5" />
            </Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coursesWithMetrics.map(({ enrollment, course, totalLessons, completedLessons, percent }) => (
            <Card
              key={enrollment.id}
              className="bg-white border-[#E5E7EB] rounded-xl shadow-xs hover:shadow-md transition-shadow overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Header */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden group">
                  <img
                    src={course.thumbnail || "/images/dairy-course.jpg"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-white/95 text-[#111827] text-[10px] font-bold shadow-xs">
                      {course.level || "BEGINNER"}
                    </Badge>
                    {percent === 100 && (
                      <Badge className="bg-emerald-600 text-white text-[10px] font-bold">
                        <CheckCircle2 className="size-3 mr-1" />
                        पूर्ण (Completed)
                      </Badge>
                    )}
                  </div>

                  <Link href={`/courses/${course.slug}/learn`}>
                    <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="size-12 rounded-full bg-white text-[#1261D6] flex items-center justify-center shadow-lg">
                        <PlayCircle className="size-7 ml-0.5" />
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Card Content */}
                <CardContent className="p-5 space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-[#1261D6] uppercase tracking-wider">
                      {course.modules.length} मॉड्यूल • {totalLessons} कुल पाठ
                    </span>
                    <Link href={`/dashboard/courses/${course.slug}`}>
                      <h3 className="font-bold text-base text-[#111827] hover:text-[#1261D6] transition-colors line-clamp-2">
                        {course.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-[#667085] line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5 pt-2 border-t border-[#E5E7EB]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#111827]">प्रगति (Progress)</span>
                      <span className="font-bold text-[#1261D6]">
                        {percent}% ({completedLessons}/{totalLessons} पाठ)
                      </span>
                    </div>
                    <div className="w-full bg-[#E5E7EB] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </div>

              {/* Actions Footer */}
              <CardFooter className="p-5 pt-0 flex items-center justify-between gap-3 border-t border-slate-100 bg-slate-50/50">
                <Link href={`/dashboard/courses/${course.slug}`} className="text-xs text-[#667085] hover:text-[#111827] font-semibold">
                  पाठ्यक्रम अवलोकन
                </Link>

                <Link href={`/courses/${course.slug}/learn`}>
                  <Button size="sm" className="bg-[#1261D6] hover:bg-blue-700 text-white font-bold text-xs h-9 px-4 rounded-md shadow-2xs inline-flex items-center gap-1.5 cursor-pointer">
                    <PlayCircle className="size-4" />
                    <span>{percent > 0 ? "अध्ययन जारी रखें" : "कोर्स शुरू करें"}</span>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
