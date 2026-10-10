"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ArrowRight,
  PlayCircle,
  Loader2,
  CheckCircle2,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface CourseEnrollButtonProps {
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  isPaid: boolean;
  price: number;
  initialIsEnrolled: boolean;
  isAuthenticated: boolean;
  variant?: "primary" | "card" | "header" | "secondary";
  className?: string;
  showSubtitle?: boolean;
}

export function CourseEnrollButton({
  courseId,
  courseSlug,
  courseTitle,
  isPaid,
  price,
  initialIsEnrolled,
  isAuthenticated,
  variant = "primary",
  className = "",
}: CourseEnrollButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isEnrolled, setIsEnrolled] = useState<boolean>(initialIsEnrolled);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Sync state if server prop changes
  useEffect(() => {
    setIsEnrolled(initialIsEnrolled);
  }, [initialIsEnrolled]);

  // Handle post-login / post-registration auto-enrollment
  useEffect(() => {
    const shouldAutoEnroll = searchParams.get("autoEnroll") === "true";
    if (shouldAutoEnroll && isAuthenticated && !isEnrolled && !isLoading) {
      handleEnroll();
    }
  }, [searchParams, isAuthenticated, isEnrolled]);

  const goToLearningPlayer = () => {
    router.push(`/courses/${courseSlug}/learn`);
  };

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.info("प्रवेश के लिए कृपया पहले लॉगिन या पंजीकरण करें", {
        description: "Please login or register to enroll in this course.",
      });
      router.push(`/login?redirect=/courses/${courseSlug}?autoEnroll=true`);
      return;
    }

    try {
      setIsLoading(true);
      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "नामांकन प्रक्रिया में त्रुटि हुई");
      }

      setIsEnrolled(true);
      setIsModalOpen(false);
      toast.success("बधाई! आपका कोर्स में प्रवेश सफलतापूर्वक हो गया है", {
        description: "आप अब सभी पाठ्य सामग्री और वीडियो देख सकते हैं।",
      });

      // Dispatch event to inform other components
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("course:enrolled", { detail: { courseId } })
        );
      }

      router.refresh();

      setTimeout(() => {
        goToLearningPlayer();
      }, 500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error enrolling in course";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    if (isEnrolled) {
      goToLearningPlayer();
      return;
    }

    if (!isPaid || price === 0) {
      handleEnroll();
    } else {
      if (!isAuthenticated) {
        toast.info("प्रवेश के लिए कृपया लॉगिन करें");
        router.push(`/login?redirect=/courses/${courseSlug}`);
      } else {
        setIsModalOpen(true);
      }
    }
  };

  // 1. If user is already enrolled
  if (isEnrolled) {
    if (variant === "header") {
      return (
        <Button
          onClick={goToLearningPlayer}
          className={`h-9 px-4 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-sm shadow-2xs cursor-pointer inline-flex items-center gap-1.5 ${className}`}
        >
          <PlayCircle className="size-4 shrink-0" />
          <span>अध्ययन जारी रखें (Continue)</span>
        </Button>
      );
    }

    if (variant === "card") {
      return (
        <div className="space-y-2">
          <Button
            onClick={goToLearningPlayer}
            className={`w-full h-11 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm rounded-sm shadow-2xs cursor-pointer inline-flex items-center justify-center gap-2 ${className}`}
          >
            <PlayCircle className="size-5 shrink-0" />
            <span>अध्ययन जारी रखें (Continue Learning)</span>
          </Button>
          <p className="text-[11px] text-center text-emerald-800 font-medium flex items-center justify-center gap-1">
            <CheckCircle2 className="size-3.5 text-emerald-700" />
            <span>आप इस कोर्स में सक्रिय रूप से नामांकित हैं</span>
          </p>
        </div>
      );
    }

    return (
      <Button
        onClick={goToLearningPlayer}
        className={`h-11 px-7 rounded-sm bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold shadow-2xs cursor-pointer inline-flex items-center gap-2 ${className}`}
      >
        <PlayCircle className="size-5 shrink-0" />
        <span>अध्ययन जारी रखें (Continue Learning)</span>
      </Button>
    );
  }

  // 2. Unenrolled State
  const isFree = !isPaid || price === 0;

  let buttonText = isFree
    ? "निःशुल्क प्रवेश लें (Free Enroll)"
    : "अभी प्रवेश लें (Enroll Now)";

  if (variant === "header") {
    buttonText = isFree ? "निःशुल्क प्रवेश (Free)" : "अभी प्रवेश लें (Enroll)";
  }

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={isLoading}
        className={
          variant === "card"
            ? `w-full h-11 bg-[#1261D6] hover:bg-blue-700 text-white font-bold text-sm rounded-sm shadow-2xs cursor-pointer inline-flex items-center justify-center gap-2 ${className}`
            : variant === "header"
            ? `h-9 px-5 bg-[#1261D6] hover:bg-blue-700 text-white text-xs font-bold rounded-sm shadow-2xs cursor-pointer inline-flex items-center gap-1.5 ${className}`
            : `h-11 px-7 rounded-sm bg-[#1261D6] hover:bg-blue-700 text-white text-sm font-bold shadow-2xs cursor-pointer inline-flex items-center gap-2 ${className}`
        }
      >
        {isLoading ? (
          <>
            <Loader2 className="size-4 animate-spin shrink-0" />
            <span>नामांकन हो रहा है...</span>
          </>
        ) : (
          <>
            <span>{buttonText}</span>
            <ArrowRight className="size-4 shrink-0" />
          </>
        )}
      </Button>

      {/* Paid Course Confirmation / Enrollment Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md bg-white text-[#111827]">
          <DialogHeader>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded w-fit mb-1 border border-emerald-200">
              <Sparkles className="size-3.5 text-emerald-700" />
              <span>प्रमाणित व्यावसायिक उद्यमिता कोर्स</span>
            </div>
            <DialogTitle className="text-lg font-bold text-[#111827]">
              {courseTitle}
            </DialogTitle>
            <DialogDescription className="text-xs text-[#667085]">
              छैगांव उद्यमी आजीविका अकादमी द्वारा DIC खंडवा एवं NABARD सहयोग से संचालित।
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-3 text-xs border-y border-[#E5E7EB]">
            <div className="flex items-center justify-between font-semibold">
              <span className="text-[#667085]">प्रशिक्षण शुल्क:</span>
              <span className="text-lg font-black text-[#111827]">
                {formatCurrency(price)}
              </span>
            </div>

            <div className="bg-[#F8FAFC] p-3 rounded-lg border border-[#E5E7EB] space-y-1.5 text-[11px] text-[#475467]">
              <div className="flex items-center gap-2 text-emerald-800 font-medium">
                <ShieldCheck className="size-4 text-emerald-700 shrink-0" />
                <span>35% PMEGP / मुख्यमंत्री उद्यम क्रांति सब्सिडी मार्गदर्शन सम्मिलित</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="size-4 text-[#1261D6] shrink-0" />
                <span>24x7 सत्यापित डिजिटल प्रमाण पत्र एवं बैंक DPR टूलकिट</span>
              </div>
            </div>
          </div>

          <DialogFooter className="flex sm:justify-between items-center gap-2 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              className="text-xs"
            >
              रद्द करें
            </Button>
            <Button
              size="sm"
              onClick={handleEnroll}
              disabled={isLoading}
              className="bg-[#1261D6] hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-1.5"
            >
              {isLoading ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>पुष्टि हो रही है...</span>
                </>
              ) : (
                <>
                  <span>प्रवेश की पुष्टि करें (Confirm Enrollment)</span>
                  <ArrowRight className="size-3.5" />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
