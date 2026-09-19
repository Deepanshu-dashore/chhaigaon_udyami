import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import prisma from "@/lib/prisma";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Printer,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Sparkles,
  Lock,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CertificateVerifier } from "@/components/certificate/certificate-verifier";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "मेरे प्रमाण पत्र (My Certificates) | छैगांव उद्यमी",
  description: "आपके द्वारा अर्जित सभी आधिकारिक डिजिटल कौशल एवं उद्यमिता प्रमाण पत्र।",
};

export default async function DashboardCertificatesPage() {
  const supabase = await createClient();
  const {
    data: { user: authUser },
  } = await supabase.auth.getUser();

  if (!authUser) {
    redirect("/login?redirectedFrom=/dashboard/certificates");
  }

  // Load Prisma user
  let dbUser = null;
  try {
    dbUser = await prisma.user.findFirst({
      where: {
        OR: [
          { supabaseUserId: authUser.id },
          ...(authUser.email ? [{ email: authUser.email }] : []),
        ],
      },
      include: {
        profile: true,
        certificates: {
          include: {
            course: true,
          },
          orderBy: { issueDate: "desc" },
        },
        enrollments: {
          include: {
            course: {
              include: {
                modules: {
                  include: {
                    lessons: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  } catch (err) {
    console.error("Failed to load certificates for user:", err);
  }

  const certificates = dbUser?.certificates || [];
  const enrollments = dbUser?.enrollments || [];

  // Identify courses in progress that don't have a certificate yet
  const certCourseIds = new Set(certificates.map((c) => c.courseId));
  const inProgressCourses = enrollments.filter(
    (e) => !certCourseIds.has(e.courseId)
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-[#0a2540] via-blue-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-amber-300 border border-white/20 backdrop-blur-xs">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>प्रमाणित कौशल वॉल्ट (Certified Credentials Vault)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-headline">
              मेरे डिजिटल प्रमाण पत्र (My Certificates)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-body">
              आपके द्वारा सफलतापूर्वक पूर्ण किए गए पाठ्यक्रमों के अधिकृत एवं बैंक-सत्यापित प्रमाण पत्र।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/certificates">
              <Button
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-xs font-semibold px-4 py-2 rounded-xl backdrop-blur-xs cursor-pointer"
              >
                <span>सत्यापन पोर्टल</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
            <Link href="/courses">
              <Button className="bg-[#0056d2] hover:bg-blue-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs cursor-pointer">
                <span>नया कोर्स खोजें</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/10">
            <span className="text-[11px] text-slate-300 block">कुल अर्जित प्रमाण पत्र</span>
            <span className="text-xl sm:text-2xl font-black text-white">{certificates.length}</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/10">
            <span className="text-[11px] text-slate-300 block">सत्यापन स्थिति</span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400">100% मान्य</span>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 sm:p-4 border border-white/10 col-span-2 sm:col-span-1">
            <span className="text-[11px] text-slate-300 block">अध्ययनरत पाठ्यक्रम</span>
            <span className="text-xl sm:text-2xl font-black text-amber-300">
              {inProgressCourses.length} प्रगति पर
            </span>
          </div>
        </div>
      </div>

      {/* Section 1: Earned Certificates */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-headline flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>अर्जित प्रमाण पत्र ({certificates.length})</span>
          </h2>
        </div>

        {certificates.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 text-center space-y-4 shadow-xs">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-100">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <div className="max-w-md mx-auto space-y-1.5">
              <h3 className="text-lg font-bold text-slate-900 font-headline">
                अभी तक कोई प्रमाण पत्र जारी नहीं हुआ है
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-body">
                पाठ्यक्रम के सभी पाठ पूरे करें और अंतिम क्विज में 60% अंक प्राप्त करके अपना आधिकारिक डिजिटल प्रमाण पत्र प्राप्त करें।
              </p>
            </div>
            <div className="pt-2">
              <Link href="/courses">
                <Button className="bg-[#0056d2] hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer">
                  <span>पाठ्यक्रम शुरू करें</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {certificates.map((cert) => {
              const formattedDate = new Date(cert.issueDate).toLocaleDateString("hi-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              return (
                <div
                  key={cert.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>सत्यापित प्रमाण पत्र</span>
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {cert.certificateNumber}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-950 text-base line-clamp-1 font-headline">
                        {cert.course.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        जारी दिनांक: {formattedDate}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-slate-500">
                      Code: {cert.verificationCode}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link href={`/certificates/${cert.verificationCode}`}>
                        <Button
                          size="sm"
                          className="bg-[#0056d2] hover:bg-blue-700 text-white font-bold text-xs h-8 px-3 rounded-lg cursor-pointer inline-flex items-center gap-1"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>देखें व प्रिंट करें</span>
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section 2: In-Progress Certifications */}
      {inProgressCourses.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-headline flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-600" />
              <span>प्रगति पर पाठ्यक्रम (Certificates in Progress)</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressCourses.map((enrollment) => {
              const totalLessons =
                enrollment.course.modules?.reduce(
                  (acc, mod) => acc + (mod.lessons?.length || 0),
                  0
                ) || 1;

              return (
                <div
                  key={enrollment.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-[10px] text-amber-800 bg-amber-50 border-amber-200 font-bold">
                        प्रमाण पत्र लॉक है
                      </Badge>
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm line-clamp-2">
                      {enrollment.course.title}
                    </h4>

                    <p className="text-xs text-slate-500">
                      सभी पाठ व क्विज पूरा करने पर अधिकृत प्रमाण पत्र अनलॉक होगा।
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <Link href={`/courses/${enrollment.course.slug}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-full text-xs font-bold text-blue-700 hover:bg-blue-50 border-blue-200 h-8 rounded-lg cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <span>अध्ययन जारी रखें</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Embedded Quick Verifier Widget */}
      <div className="pt-4">
        <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80">
          <h3 className="font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>अन्य प्रमाण पत्र की सत्यता जांचें (Verify Any Credential)</span>
          </h3>
          <p className="text-xs text-slate-600 mb-4">
            किसी साथी छात्र या व्यावसायिक भागीदार के प्रमाण पत्र की ऑनलाइन जांच के लिए कोड दर्ज करें:
          </p>
          <CertificateVerifier compact={true} />
        </div>
      </div>
    </div>
  );
}
