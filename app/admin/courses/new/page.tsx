"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  ArrowLeft,
  BookOpen,
  PlusCircle,
  Save,
  Clock,
  IndianRupee,
  Layers,
  Sparkles,
} from "lucide-react";

export default function AddCoursePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    thumbnail: "",
    price: "0",
    level: "BEGINNER",
    duration: "60",
    status: "DRAFT",
    language: "hi",
  });

  // Auto generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    setForm((prev) => ({
      ...prev,
      title,
      slug: generatedSlug,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("Please enter a course title");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success && data.course) {
        toast.success("Course created! Redirecting to Curriculum Builder... 🚀");
        router.push(`/admin/courses/${data.course.id}`);
      } else {
        toast.error(data.error || "Failed to create course");
      }
    } catch (err) {
      toast.error("An error occurred while creating the course");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12 font-sans">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            size="icon"
            className="size-9 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-100"
          >
            <Link href="/admin/courses">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-headline">
              Create New Course
            </h1>
            <p className="text-xs text-slate-500 font-body">
              Fill in the initial details below. You can add Modules and Lessons right after!
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Course Info Card */}
        <Card className="bg-white border-slate-200 shadow-xs">
          <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
            <CardTitle className="text-base font-bold text-slate-900 flex items-center gap-2 font-headline">
              <BookOpen className="size-4.5 text-[#0056d2]" />
              Basic Course Information
            </CardTitle>
            <CardDescription className="text-xs text-slate-500">
              Provide course title, slug, duration, level, and pricing details.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 col-span-1 sm:col-span-2">
                <Label className="text-xs font-bold text-slate-800">
                  Course Title *
                </Label>
                <Input
                  type="text"
                  required
                  placeholder="e.g. Micro-Entrepreneurship & Digital Marketing Masterclass"
                  value={form.title}
                  onChange={handleTitleChange}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-800">
                  Course URL Slug *
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
                    /courses/
                  </span>
                  <Input
                    type="text"
                    required
                    placeholder="digital-marketing-masterclass"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="h-10 pl-20 rounded-xl bg-slate-50 border-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-800">
                  Course Level
                </Label>
                <select
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800"
                >
                  <option value="BEGINNER">Beginner (प्रारंभिक)</option>
                  <option value="INTERMEDIATE">Intermediate (मध्यम)</option>
                  <option value="ADVANCED">Advanced (उन्नत)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <IndianRupee className="size-3.5 text-slate-500" /> Course Price (₹)
                </Label>
                <Input
                  type="number"
                  min="0"
                  placeholder="0 for Free Course"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs font-numeric font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Clock className="size-3.5 text-slate-500" /> Total Duration (Minutes)
                </Label>
                <Input
                  type="number"
                  min="1"
                  placeholder="60"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs font-numeric"
                />
              </div>

              <div className="space-y-1.5 col-span-1 sm:col-span-2">
                <Label className="text-xs font-bold text-slate-800">
                  Thumbnail Image URL
                </Label>
                <Input
                  type="url"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={form.thumbnail}
                  onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs font-mono"
                />
              </div>

              <div className="space-y-1.5 col-span-1 sm:col-span-2">
                <Label className="text-xs font-bold text-slate-800">
                  Course Description / Overview
                </Label>
                <Textarea
                  rows={4}
                  placeholder="Write a clear course overview, what students will learn, and key highlights..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="rounded-xl bg-slate-50 border-slate-200 text-xs p-3"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-800">
                  Publication Status
                </Label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-800"
                >
                  <option value="DRAFT">DRAFT (ड्राफ्ट)</option>
                  <option value="PUBLISHED">PUBLISHED (प्रकाशित)</option>
                  <option value="ARCHIVED">ARCHIVED (संग्रहीत)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Button Footer */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/admin/courses")}
            className="h-10 px-5 rounded-xl text-xs font-semibold"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={submitting}
            className="h-10 px-6 rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white font-bold text-xs gap-2 shadow-sm cursor-pointer"
          >
            {submitting ? (
              <Spinner size="sm" variant="white" />
            ) : (
              <Sparkles className="size-4" />
            )}
            <span>Save & Proceed to Modules Builder</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
