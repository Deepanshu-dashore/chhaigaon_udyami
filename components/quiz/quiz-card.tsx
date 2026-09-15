"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Send,
  HelpCircle,
} from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  explanation?: string | null;
}

interface QuizCardProps {
  quizId: string;
  title: string;
  questions: Question[];
  passPercentage?: number;
  onComplete?: (score: number, passed: boolean) => void;
}

export function QuizCard({
  title,
  questions,
  passPercentage = 60,
  onComplete,
}: QuizCardProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questions[currentIdx];

  const handleSelect = (optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: optionIdx,
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOption) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const passed = score >= passPercentage;

    if (onComplete) {
      onComplete(score, passed);
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <Card className="p-6 text-center text-zinc-500">
        <HelpCircle className="w-8 h-8 text-zinc-400 mx-auto mb-2" />
        No quiz questions available for this lesson.
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-md">
      <CardHeader className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{title}</CardTitle>
          <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full dark:bg-emerald-950 dark:text-emerald-300">
            Question {currentIdx + 1} of {questions.length}
          </span>
        </div>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        <p className="text-base font-medium text-zinc-800 dark:text-zinc-200">
          {currentQuestion?.question}
        </p>

        <div className="space-y-3">
          {currentQuestion?.options.map((option, idx) => {
            const isSelected = selectedAnswers[currentIdx] === idx;
            const isCorrect = submitted && idx === currentQuestion.correctOption;
            const isWrong =
              submitted && isSelected && idx !== currentQuestion.correctOption;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-3.5 rounded-lg border text-sm font-medium transition-all ${
                  isCorrect
                    ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200"
                    : isWrong
                    ? "border-red-500 bg-red-50 text-red-900 dark:bg-red-950/50 dark:text-red-200"
                    : isSelected
                    ? "border-emerald-600 bg-emerald-50/50 text-emerald-950 dark:border-emerald-500 dark:bg-emerald-950/30 dark:text-emerald-100"
                    : "border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border flex items-center justify-center text-xs font-semibold">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isWrong && (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="inline-flex items-center gap-1.5"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </Button>

          {currentIdx === questions.length - 1 ? (
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={submitted || selectedAnswers[currentIdx] === undefined}
              className="inline-flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submitted ? "Submitted" : "Submit Quiz"}</span>
            </Button>
          ) : (
            <Button size="sm" onClick={handleNext} className="inline-flex items-center gap-1.5">
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
