import React from "react";
import { prisma } from "@/lib/prisma";
import { HelpCircle, CheckCircle2, Award, Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "क्विज़ व मूल्यांकन | Quizzes & Assessments - Admin Console",
};

export default async function AdminQuizzesPage() {
  let quizzes: any[] = [];
  let attemptsCount = 0;
  let passedCount = 0;

  try {
    quizzes = await prisma.quiz.findMany({
      include: {
        lesson: {
          include: {
            module: {
              include: {
                course: true,
              },
            },
          },
        },
        questions: true,
        _count: {
          select: { attempts: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    attemptsCount = await prisma.quizAttempt.count();
    passedCount = await prisma.quizAttempt.count({
      where: { isPassed: true },
    });
  } catch (error) {
    console.error("Failed to fetch quizzes:", error);
  }

  const passRate = attemptsCount > 0 ? Math.round((passedCount / attemptsCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-500/10 text-amber-700 border-amber-500/20 font-bold text-xs">
              Quizzes & Evaluation
            </Badge>
          </div>
          <h1 className="text-2xl font-bold font-headline text-slate-900 mt-1">
            क्विज़ व मूल्यांकन प्रबंधन (Quizzes & Assessments)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            पाठ्यक्रमवार क्विज़, उत्तीर्ण प्रतिशत, प्रश्न बैंक एवं छात्र प्रदर्शन का लेखा-जोखा।
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">कुल क्विज़ (Total Quizzes)</p>
            <h3 className="text-2xl font-extrabold text-slate-900 font-headline mt-1">{quizzes.length}</h3>
          </div>
          <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
            <HelpCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">कुल प्रयास (Total Attempts)</p>
            <h3 className="text-2xl font-extrabold text-slate-900 font-headline mt-1">{attemptsCount}</h3>
          </div>
          <div className="p-3 rounded-lg bg-blue-50 text-[#0056d2]">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-lg border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">सफलता दर (Pass Rate)</p>
            <h3 className="text-2xl font-extrabold text-emerald-600 font-headline mt-1">{passRate}%</h3>
          </div>
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
            <Award className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Quizzes List Table */}
      <div className="bg-white rounded-lg border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-sm font-headline">उपलब्ध क्विज़ सूची ({quizzes.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-100">
              <tr>
                <th className="p-3.5">शीर्षक व विवरण</th>
                <th className="p-3.5">संबद्ध पाठ्यक्रम</th>
                <th className="p-3.5">प्रश्न संख्या</th>
                <th className="p-3.5">उत्तीर्ण कटऑफ</th>
                <th className="p-3.5">छात्र प्रयास</th>
                <th className="p-3.5">कार्रवाई</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                  <tr key={quiz.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 text-xs">{quiz.title}</div>
                      {quiz.description && (
                        <div className="text-[11px] text-slate-400 truncate max-w-xs">{quiz.description}</div>
                      )}
                    </td>
                    <td className="p-3.5 text-slate-700 font-medium">
                      {quiz.lesson?.module?.course?.title || "सामान्य क्विज़"}
                    </td>
                    <td className="p-3.5 font-bold text-slate-900">
                      {quiz.questions?.length || 0} प्रश्न
                    </td>
                    <td className="p-3.5">
                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold text-[10px]">
                        {quiz.passingPercentage}% अंक
                      </Badge>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-700">
                      {quiz._count?.attempts || 0} बार
                    </td>
                    <td className="p-3.5">
                      <Link
                        href={`/admin/courses/${quiz.lesson?.module?.course?.id || ""}`}
                        className="inline-flex items-center gap-1 text-[#0056d2] hover:underline font-bold text-xs"
                      >
                        <span>प्रबंधित करें</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 text-xs">
                    कोई क्विज़ अभी तक निर्मित नहीं किया गया है।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
