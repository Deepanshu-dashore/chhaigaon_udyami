"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Award,
  Sparkles,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export interface QuizQuestionOption {
  id: string;
  optionText: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface QuizQuestionData {
  id: string;
  question: string;
  marks: number;
  order: number;
  options: QuizQuestionOption[];
  generalExplanation?: string;
}

export interface QuizViewProps {
  quizId: string;
  quizTitle: string;
  passingPercentage?: number;
  timeLimit?: number | null;
  enrollmentId?: string | null;
  questions: QuizQuestionData[];
  onComplete?: (result: { score: number; isPassed: boolean }) => void;
  onNextLesson?: () => void;
}

export function InteractiveQuizView({
  quizId,
  quizTitle,
  passingPercentage = 70,
  enrollmentId,
  questions,
  onComplete,
  onNextLesson,
}: QuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Store user's selected option ID per question: { [questionId]: optionId }
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  // Store evaluated state per question: { [questionId]: boolean (true if user clicked check/submitted) }
  const [revealedQuestions, setRevealedQuestions] = useState<Record<string, boolean>>({});
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quizResult, setQuizResult] = useState<{
    score: number;
    earnedMarks: number;
    totalMarks: number;
    isPassed: boolean;
    certificateGenerated?: boolean;
  } | null>(null);

  if (!questions || questions.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
        <HelpCircle className="h-12 w-12 text-slate-400 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-slate-800">प्रश्नोत्तरी अभी उपलब्ध नहीं है</h3>
        <p className="text-sm text-slate-500 mt-1">इस मॉड्यूल के प्रश्न जल्द ही जोड़े जाएंगे।</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selectedOptionId = selectedAnswers[currentQuestion.id];
  const isRevealed = revealedQuestions[currentQuestion.id];
  const selectedOption = currentQuestion.options.find((opt) => opt.id === selectedOptionId);
  const isCurrentCorrect = selectedOption?.isCorrect ?? false;

  const handleSelectOption = (optionId: string) => {
    if (quizResult) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
    // Reveal answer instantly (LinkedIn Learning behavior shown in Image 5)
    setRevealedQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: true,
    }));
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setRevealedQuestions({});
    setQuizResult(null);
    setCurrentIndex(0);
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    try {
      // Format answers for submission
      const payloadAnswers = questions.map((q) => ({
        questionId: q.id,
        selectedOptionId: selectedAnswers[q.id] || null,
      }));

      // Calculate score locally for instant responsive feel
      let total = 0;
      let earned = 0;
      questions.forEach((q) => {
        total += q.marks;
        const opt = q.options.find((o) => o.id === selectedAnswers[q.id]);
        if (opt?.isCorrect) earned += q.marks;
      });

      const calculatedScore = total > 0 ? (earned / total) * 100 : 0;
      const passed = calculatedScore >= passingPercentage;

      // Submit to backend
      const res = await fetch(`/api/quizzes/${quizId}/attempts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enrollmentId: enrollmentId || undefined,
          answers: payloadAnswers,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setQuizResult({
          score: data.attempt.score,
          earnedMarks: data.attempt.earnedMarks,
          totalMarks: data.attempt.totalMarks,
          isPassed: data.attempt.isPassed,
          certificateGenerated: data.certificateGenerated,
        });
        if (onComplete) {
          onComplete({
            score: data.attempt.score,
            isPassed: data.attempt.isPassed,
          });
        }
      } else {
        // Fallback to local calculation if offline/network error
        setQuizResult({
          score: calculatedScore,
          earnedMarks: earned,
          totalMarks: total,
          isPassed: passed,
        });
        if (onComplete) {
          onComplete({ score: calculatedScore, isPassed: passed });
        }
      }
    } catch {
      // Fallback
      let total = 0;
      let earned = 0;
      questions.forEach((q) => {
        total += q.marks;
        const opt = q.options.find((o) => o.id === selectedAnswers[q.id]);
        if (opt?.isCorrect) earned += q.marks;
      });
      const calculatedScore = total > 0 ? (earned / total) * 100 : 0;
      setQuizResult({
        score: calculatedScore,
        earnedMarks: earned,
        totalMarks: total,
        isPassed: calculatedScore >= passingPercentage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If Quiz Completed, Show Summary View
  if (quizResult) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden p-8 sm:p-10 max-w-2xl mx-auto my-6 animate-in fade-in-50">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-slate-50 border border-slate-200/80">
            {quizResult.isPassed ? (
              <Award className="h-14 w-14 text-emerald-600 animate-bounce" />
            ) : (
              <AlertTriangle className="h-14 w-14 text-amber-500" />
            )}
          </div>

          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2 ${
                quizResult.isPassed
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                  : "bg-amber-100 text-amber-800 border border-amber-200"
              }`}
            >
              {quizResult.isPassed ? "सफलतापूर्वक उत्तीर्ण (Passed)" : "पुनः प्रयास आवश्यक (Needs Retake)"}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              {quizResult.isPassed ? "बधाई हो! आपने मूल्यांकन पूर्ण कर लिया" : "लगभग वहाँ! थोड़ा और अभ्यास करें"}
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto mt-1">
              {quizResult.isPassed
                ? `आपने ${Math.round(quizResult.score)}% अंक प्राप्त किए हैं। उत्तीर्ण होने के लिए आवश्यक न्यूनतम अंक ${passingPercentage}% हैं।`
                : `आपने ${Math.round(quizResult.score)}% अंक प्राप्त किए हैं। प्रमाण पत्र व अग्रिम मॉड्यूल हेतु न्यूनतम ${passingPercentage}% आवश्यक हैं।`}
            </p>
          </div>

          {/* Score Card */}
          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto p-4 bg-slate-50 rounded-xl border border-slate-200/80">
            <div className="text-center">
              <span className="text-xs font-medium text-slate-500">कुल अंक</span>
              <p className="text-xl font-bold text-slate-900">
                {quizResult.earnedMarks} / {quizResult.totalMarks}
              </p>
            </div>
            <div className="text-center">
              <span className="text-xs font-medium text-slate-500">प्राप्तांक प्रतिशत</span>
              <p
                className={`text-xl font-bold ${
                  quizResult.isPassed ? "text-emerald-600" : "text-amber-600"
                }`}
              >
                {Math.round(quizResult.score)}%
              </p>
            </div>
          </div>

          {quizResult.certificateGenerated && (
            <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-center gap-2 text-sm font-medium text-blue-800">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>डीआईसी खंडवा ई-प्रमाणपत्र स्वतः जारी कर दिया गया है!</span>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              onClick={handleRetake}
              className="gap-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" />
              पुनः प्रयास करें (Retake)
            </Button>
            {quizResult.isPassed && onNextLesson && (
              <Button
                onClick={onNextLesson}
                className="gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm"
              >
                अगले पाठ पर जाएं
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Active Question View (Replicating Image 5)
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8 max-w-3xl mx-auto my-4 transition-all">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            अध्याय मूल्यांकन • Chapter Assessment
          </span>
          <h3 className="text-sm font-medium text-slate-500 mt-0.5">{quizTitle}</h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="font-semibold text-xs text-slate-700 bg-slate-100">
            प्रश्न {currentIndex + 1} / {questions.length}
          </Badge>
          <span className="text-xs text-slate-400">({currentQuestion.marks} अंक)</span>
        </div>
      </div>

      {/* Question Statement */}
      <div className="py-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
          {currentQuestion.question}
        </h2>
      </div>

      {/* Answer Verification Feedback Banner (Matching Image 5) */}
      {isRevealed && selectedOption && (
        <div
          className={`mb-6 p-4 rounded-xl border flex items-start gap-3.5 transition-all animate-in fade-in duration-200 ${
            isCurrentCorrect
              ? "bg-emerald-50/90 border-emerald-200 text-emerald-950"
              : "bg-red-50/90 border-red-200 text-red-950"
          }`}
        >
          <div className="shrink-0 mt-0.5">
            {isCurrentCorrect ? (
              <div className="p-1 rounded-full bg-emerald-600 text-white">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            ) : (
              <div className="p-1 rounded-full bg-red-600 text-white">
                <XCircle className="h-5 w-5" />
              </div>
            )}
          </div>

          <div className="space-y-1 text-sm leading-relaxed">
            <div className="font-bold text-base flex items-center gap-2">
              <span className={isCurrentCorrect ? "text-emerald-700" : "text-red-700"}>
                {isCurrentCorrect ? "सही उत्तर (Correct)" : "गलत उत्तर (Incorrect)"}
              </span>
            </div>
            <p className="text-slate-700 text-sm">
              {selectedOption.explanation ||
                currentQuestion.generalExplanation ||
                (isCurrentCorrect
                  ? "बिल्कुल सही! यह उद्यम योजना व सरकारी दिशानिर्देशों के पूर्णतः अनुरूप है।"
                  : "यह विकल्प सही नहीं है। कृपया नियम व पात्रता शर्तों को ध्यानपूर्वक पुनः जांचें।")}
            </p>
          </div>
        </div>
      )}

      {/* Options List */}
      <div className="space-y-3">
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOptionId === option.id;
          const letter = String.fromCharCode(65 + idx); // A, B, C, D

          let optionStyle =
            "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white text-slate-800";

          if (isRevealed) {
            if (isSelected) {
              if (option.isCorrect) {
                optionStyle = "border-emerald-500 bg-emerald-50/50 text-emerald-950 ring-1 ring-emerald-400";
              } else {
                optionStyle = "border-red-500 bg-red-50/50 text-red-950 ring-1 ring-red-400";
              }
            } else if (option.isCorrect) {
              // Highlight the actual correct option softly so user learns
              optionStyle = "border-emerald-300 bg-emerald-50/30 text-emerald-900";
            }
          } else if (isSelected) {
            optionStyle = "border-blue-500 bg-blue-50/50 text-blue-900 ring-1 ring-blue-400";
          }

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelectOption(option.id)}
              className={`w-full text-left p-4 rounded-xl border flex items-start gap-3.5 transition-all text-sm font-medium ${optionStyle}`}
            >
              {/* Radio Indicator */}
              <div className="shrink-0 mt-0.5 flex items-center justify-center">
                <span
                  className={`h-6 w-6 rounded-full border flex items-center justify-center text-xs font-bold transition-colors ${
                    isRevealed && isSelected
                      ? option.isCorrect
                        ? "border-emerald-600 bg-emerald-600 text-white"
                        : "border-red-600 bg-red-600 text-white"
                      : isSelected
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-500"
                  }`}
                >
                  {letter}
                </span>
              </div>

              {/* Option Text */}
              <div className="flex-1 leading-snug pt-0.5">
                <span>{option.optionText}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation Controls Footer */}
      <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
        <Button
          variant="outline"
          size="sm"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          className="text-xs font-semibold gap-1.5"
        >
          <ArrowLeft className="h-4 w-4" />
          पिछला प्रश्न
        </Button>

        <div className="flex items-center gap-2">
          {currentIndex < questions.length - 1 ? (
            <Button
              size="sm"
              disabled={!selectedOptionId}
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white gap-1.5 shadow-xs"
            >
              अगला प्रश्न
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              size="sm"
              disabled={!selectedOptionId || isSubmitting}
              onClick={handleSubmitQuiz}
              className="text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white gap-2 shadow-xs"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>जांच जारी है...</span>
                </>
              ) : (
                <>
                  <Award className="h-4 w-4" />
                  <span>मूल्यांकन जमा करें (Submit Quiz)</span>
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
