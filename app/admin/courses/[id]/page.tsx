"use client";

import React, { useState, useEffect, useCallback, use } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  BookOpen,
  PlusCircle,
  FolderPlus,
  Video,
  FileText,
  HelpCircle,
  Trash2,
  Edit,
  Save,
  Clock,
  IndianRupee,
  Layers,
  ChevronDown,
  ChevronUp,
  Eye,
  CheckCircle2,
} from "lucide-react";

interface LessonItem {
  id: string;
  moduleId: string;
  title: string;
  description?: string | null;
  type: "VIDEO" | "READING" | "QUIZ" | "ASSESSMENT";
  duration?: number | null;
  isPreview: boolean;
  isPublished: boolean;
  order: number;
  video?: {
    vdoVideoId?: string;
  } | null;
}

interface ModuleItem {
  id: string;
  courseId: string;
  title: string;
  description?: string | null;
  order: number;
  lessons: LessonItem[];
}

interface CourseDetail {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  thumbnail?: string | null;
  price: number | string;
  level?: string | null;
  duration?: number | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  modules: ModuleItem[];
}

export default function EditCourseBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: courseId } = use(params);

  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingCourse, setSavingCourse] = useState(false);
  const [activeTab, setActiveTab] = useState<"builder" | "settings">("builder");

  // Accordion toggle state for modules
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  // Module Modal State
  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [moduleSubmitting, setModuleSubmitting] = useState(false);
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleDesc, setModuleDesc] = useState("");
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);

  // Lesson Modal State
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [lessonSubmitting, setLessonSubmitting] = useState(false);
  const [targetModuleId, setTargetModuleId] = useState<string | null>(null);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);

  const [lessonForm, setLessonForm] = useState<{
    title: string;
    description: string;
    type: "VIDEO" | "READING" | "QUIZ" | "ASSESSMENT";
    duration: string;
    videoUrl: string;
    isPreview: boolean;
    isPublished: boolean;
  }>({
    title: "",
    description: "",
    type: "VIDEO",
    duration: "10",
    videoUrl: "",
    isPreview: false,
    isPublished: true,
  });

  // Fetch Course with Modules & Lessons
  const fetchCourse = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/courses/${courseId}`);
      const data = await res.json();
      if (data.success && data.course) {
        setCourse(data.course);
        // Expand all modules by default
        const initOpen: Record<string, boolean> = {};
        data.course.modules?.forEach((m: ModuleItem) => {
          initOpen[m.id] = true;
        });
        setOpenModules(initOpen);
      } else {
        toast.error("Course not found");
      }
    } catch (err) {
      toast.error("Failed to load course details");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  // Update Course General Details
  const handleUpdateCourseDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;

    setSavingCourse(true);
    try {
      const res = await fetch(`/api/admin/courses/${course.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: course.title,
          slug: course.slug,
          description: course.description,
          price: course.price,
          level: course.level,
          duration: course.duration,
          status: course.status,
          thumbnail: course.thumbnail,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Course details saved successfully!");
      } else {
        toast.error(data.error || "Failed to update course");
      }
    } catch (err) {
      toast.error("Error updating course");
    } finally {
      setSavingCourse(false);
    }
  };

  // Toggle Module Accordion
  const toggleModuleAccordion = (modId: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  // Open Add/Edit Module Modal
  const handleOpenModuleModal = (mod?: ModuleItem) => {
    if (mod) {
      setEditingModuleId(mod.id);
      setModuleTitle(mod.title);
      setModuleDesc(mod.description || "");
    } else {
      setEditingModuleId(null);
      setModuleTitle("");
      setModuleDesc("");
    }
    setModuleModalOpen(true);
  };

  // Save Module Submit
  const handleModuleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!moduleTitle.trim()) {
      toast.error("Module title is required");
      return;
    }

    setModuleSubmitting(true);
    try {
      const url = editingModuleId
        ? `/api/admin/courses/${courseId}/modules/${editingModuleId}`
        : `/api/admin/courses/${courseId}/modules`;
      const method = editingModuleId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: moduleTitle,
          description: moduleDesc,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingModuleId ? "Module updated!" : "Module added!");
        setModuleModalOpen(false);
        fetchCourse();
      } else {
        toast.error(data.error || "Failed to save module");
      }
    } catch (err) {
      toast.error("Error saving module");
    } finally {
      setModuleSubmitting(false);
    }
  };

  // Delete Module
  const handleDeleteModule = async (moduleId: string) => {
    if (!confirm("Are you sure you want to delete this module and all its lessons?")) return;

    try {
      const res = await fetch(`/api/admin/courses/${courseId}/modules/${moduleId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Module deleted");
        fetchCourse();
      }
    } catch (err) {
      toast.error("Failed to delete module");
    }
  };

  // Open Add/Edit Lesson Modal
  const handleOpenLessonModal = (moduleId: string, lesson?: LessonItem) => {
    setTargetModuleId(moduleId);
    if (lesson) {
      setEditingLessonId(lesson.id);
      setLessonForm({
        title: lesson.title,
        description: lesson.description || "",
        type: lesson.type,
        duration: (lesson.duration ? Math.round(lesson.duration / 60) : 10).toString(),
        videoUrl: lesson.video?.vdoVideoId || "",
        isPreview: lesson.isPreview,
        isPublished: lesson.isPublished,
      });
    } else {
      setEditingLessonId(null);
      setLessonForm({
        title: "",
        description: "",
        type: "VIDEO",
        duration: "10",
        videoUrl: "",
        isPreview: false,
        isPublished: true,
      });
    }
    setLessonModalOpen(true);
  };

  // Save Lesson Submit
  const handleLessonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lessonForm.title.trim()) {
      toast.error("Lesson title is required");
      return;
    }

    setLessonSubmitting(true);
    try {
      const url = editingLessonId
        ? `/api/admin/courses/${courseId}/lessons/${editingLessonId}`
        : `/api/admin/courses/${courseId}/lessons`;
      const method = editingLessonId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          moduleId: targetModuleId,
          title: lessonForm.title,
          description: lessonForm.description,
          type: lessonForm.type,
          duration: parseInt(lessonForm.duration, 10) * 60, // convert to seconds
          videoUrl: lessonForm.videoUrl,
          isPreview: lessonForm.isPreview,
          isPublished: lessonForm.isPublished,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(editingLessonId ? "Lesson updated!" : "Lesson added!");
        setLessonModalOpen(false);
        fetchCourse();
      } else {
        toast.error(data.error || "Failed to save lesson");
      }
    } catch (err) {
      toast.error("Error saving lesson");
    } finally {
      setLessonSubmitting(false);
    }
  };

  // Delete Lesson
  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm("Are you sure you want to delete this lesson?")) return;

    try {
      const res = await fetch(`/api/admin/courses/${courseId}/lessons/${lessonId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Lesson deleted");
        fetchCourse();
      }
    } catch (err) {
      toast.error("Failed to delete lesson");
    }
  };

  // Total lessons count helper
  const totalLessonsCount = course?.modules?.reduce(
    (acc, m) => acc + (m.lessons?.length || 0),
    0
  ) || 0;

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center gap-3">
        <Spinner size="lg" />
        <p className="text-xs text-slate-500 font-medium">Loading Course Curriculum Builder...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="py-20 text-center space-y-4">
        <p className="text-sm text-rose-600 font-bold">Course not found</p>
        <Button asChild variant="outline" size="sm" className="rounded-xl text-xs">
          <Link href="/admin/courses">Back to Courses</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 font-sans">
      {/* Top Navigation & Status Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900 font-headline">
                {course.title}
              </h1>
              <Badge
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  course.status === "PUBLISHED"
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {course.status}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-0.5">
              /courses/{course.slug}
            </p>
          </div>
        </div>

        {/* Quick Stats Header Pill */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-2xs">
            <Layers className="size-3.5 text-purple-600" />
            <span className="text-slate-500">Modules:</span>
            <strong className="text-slate-900 font-bold">{course.modules?.length || 0}</strong>
          </div>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs shadow-2xs">
            <Video className="size-3.5 text-blue-600" />
            <span className="text-slate-500">Lessons:</span>
            <strong className="text-slate-900 font-bold">{totalLessonsCount}</strong>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as "builder" | "settings")}
        className="w-full"
      >
        <TabsList variant="line" className="w-full justify-start border-b border-slate-200 p-0 h-10 gap-4 bg-transparent rounded-none">
          <TabsTrigger
            value="builder"
            className="text-xs font-bold py-2.5 px-3 data-[state=active]:text-[#0056d2] data-[state=active]:border-b-2 data-[state=active]:border-[#0056d2] rounded-none bg-transparent hover:text-slate-900 cursor-pointer shadow-none!"
          >
            Curriculum Builder (Modules & Lessons)
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="text-xs font-bold py-2.5 px-3 data-[state=active]:text-[#0056d2] data-[state=active]:border-b-2 data-[state=active]:border-[#0056d2] rounded-none bg-transparent hover:text-slate-900 cursor-pointer shadow-none!"
          >
            General Settings & Details
          </TabsTrigger>
        </TabsList>

        {/* TAB 1: CURRICULUM BUILDER */}
        <TabsContent value="builder" className="pt-6 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-headline">
                Course Curriculum & Content Structure
              </h2>
              <p className="text-xs text-slate-500">
                Organize your course into sections/modules and add video lessons or reading materials.
              </p>
            </div>

            <Button
              onClick={() => handleOpenModuleModal()}
              size="sm"
              className="h-9 px-4 rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white font-bold text-xs gap-1.5 cursor-pointer shadow-sm"
            >
              <FolderPlus className="size-4" />
              <span>Add Module</span>
            </Button>
          </div>

          {/* Module List */}
          {course.modules?.length === 0 ? (
            <Card className="bg-white border-dashed border-2 border-slate-200 py-12 text-center">
              <CardContent className="space-y-3">
                <Layers className="size-10 mx-auto text-slate-300" />
                <p className="text-sm font-bold text-slate-700">No Modules Added Yet</p>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click the "Add Module" button above to create your first course section!
                </p>
                <Button
                  onClick={() => handleOpenModuleModal()}
                  size="sm"
                  className="rounded-xl bg-[#0056d2] text-white text-xs font-semibold"
                >
                  <FolderPlus className="size-3.5 mr-1" /> Add First Module
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {course.modules.map((moduleItem, modIdx) => {
                const isOpen = openModules[moduleItem.id] ?? true;

                return (
                  <Card
                    key={moduleItem.id}
                    className="bg-white border-slate-200 shadow-2xs overflow-hidden"
                  >
                    {/* Module Header */}
                    <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between gap-3 select-none">
                      <div
                        onClick={() => toggleModuleAccordion(moduleItem.id)}
                        className="flex items-center gap-3 cursor-pointer flex-1"
                      >
                        <div className="size-7 rounded-lg bg-blue-100 text-[#0056d2] font-bold text-xs flex items-center justify-center shrink-0">
                          {modIdx + 1}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-sm text-slate-900 font-headline">
                              {moduleItem.title}
                            </h3>
                            <Badge variant="outline" className="text-[10px] text-slate-500 bg-white">
                              {moduleItem.lessons?.length || 0} Lessons
                            </Badge>
                          </div>
                          {moduleItem.description && (
                            <p className="text-xs text-slate-500 line-clamp-1">
                              {moduleItem.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenLessonModal(moduleItem.id)}
                          className="h-8 px-2.5 rounded-lg text-xs font-bold text-[#0056d2] hover:bg-blue-50 gap-1 cursor-pointer"
                        >
                          <PlusCircle className="size-3.5" />
                          <span>Add Lesson</span>
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleOpenModuleModal(moduleItem)}
                          className="size-8 rounded-lg hover:bg-slate-200/60 text-slate-600"
                        >
                          <Edit className="size-3.5" />
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteModule(moduleItem.id)}
                          className="size-8 rounded-lg hover:bg-rose-50 text-rose-600"
                        >
                          <Trash2 className="size-3.5" />
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleModuleAccordion(moduleItem.id)}
                          className="size-8 rounded-lg hover:bg-slate-200/60 text-slate-500"
                        >
                          {isOpen ? (
                            <ChevronUp className="size-4" />
                          ) : (
                            <ChevronDown className="size-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    {/* Lessons List under Module */}
                    {isOpen && (
                      <CardContent className="p-0 divide-y divide-slate-100">
                        {moduleItem.lessons?.length === 0 ? (
                          <div className="p-4 text-center text-xs text-slate-400 bg-slate-50/30">
                            No lessons added in this module yet. Click "+ Add Lesson" to add content!
                          </div>
                        ) : (
                          moduleItem.lessons.map((lessonItem, lesIdx) => (
                            <div
                              key={lessonItem.id}
                              className="p-3.5 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="size-7 rounded-md bg-slate-100 text-slate-600 font-semibold text-xs flex items-center justify-center shrink-0">
                                  {lesIdx + 1}
                                </div>

                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-2">
                                    {lessonItem.type === "VIDEO" && (
                                      <Video className="size-3.5 text-blue-600 shrink-0" />
                                    )}
                                    {lessonItem.type === "READING" && (
                                      <FileText className="size-3.5 text-emerald-600 shrink-0" />
                                    )}
                                    {lessonItem.type === "QUIZ" && (
                                      <HelpCircle className="size-3.5 text-purple-600 shrink-0" />
                                    )}

                                    <h4 className="font-semibold text-xs text-slate-900">
                                      {lessonItem.title}
                                    </h4>

                                    {lessonItem.isPreview && (
                                      <Badge className="bg-purple-50 text-purple-700 border-purple-200 text-[9px] font-bold">
                                        Free Preview
                                      </Badge>
                                    )}
                                  </div>

                                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-numeric">
                                    <span>
                                      Duration: {Math.round((lessonItem.duration || 0) / 60)} mins
                                    </span>
                                    {lessonItem.video?.vdoVideoId && (
                                      <span className="font-mono text-blue-600 text-[10px] truncate max-w-xs">
                                        {lessonItem.video.vdoVideoId}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Lesson Row Actions */}
                              <div className="flex items-center gap-1">
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleOpenLessonModal(moduleItem.id, lessonItem)}
                                  className="size-7 rounded-md hover:bg-slate-100 text-slate-600"
                                >
                                  <Edit className="size-3" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteLesson(lessonItem.id)}
                                  className="size-7 rounded-md hover:bg-rose-50 text-rose-600"
                                >
                                  <Trash2 className="size-3" />
                                </Button>
                              </div>
                            </div>
                          ))
                        )}
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* TAB 2: GENERAL SETTINGS */}
        <TabsContent value="settings" className="pt-6">
          <form onSubmit={handleUpdateCourseDetails} className="space-y-6">
          <Card className="bg-white border-slate-200 shadow-xs">
            <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
              <CardTitle className="text-base font-bold text-slate-900 font-headline">
                Course Details & Meta Information
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 col-span-1 sm:col-span-2">
                  <Label className="text-xs font-bold text-slate-800">Title</Label>
                  <Input
                    type="text"
                    required
                    value={course.title}
                    onChange={(e) => setCourse({ ...course, title: e.target.value })}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs font-medium"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-800">Slug</Label>
                  <Input
                    type="text"
                    required
                    value={course.slug}
                    onChange={(e) => setCourse({ ...course, slug: e.target.value })}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-800">Level</Label>
                  <Select
                    value={course.level || "BEGINNER"}
                    onValueChange={(val) => setCourse({ ...course, level: val })}
                  >
                    <SelectTrigger className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs font-semibold">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="BEGINNER">BEGINNER</SelectItem>
                        <SelectItem value="INTERMEDIATE">INTERMEDIATE</SelectItem>
                        <SelectItem value="ADVANCED">ADVANCED</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-800">Price (₹)</Label>
                  <Input
                    type="number"
                    value={course.price}
                    onChange={(e) => setCourse({ ...course, price: e.target.value })}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-800">Status</Label>
                  <Select
                    value={course.status}
                    onValueChange={(val) =>
                      setCourse({
                        ...course,
                        status: val as "DRAFT" | "PUBLISHED" | "ARCHIVED",
                      })
                    }
                  >
                    <SelectTrigger className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs font-bold text-slate-800">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="DRAFT">DRAFT</SelectItem>
                        <SelectItem value="PUBLISHED">PUBLISHED</SelectItem>
                        <SelectItem value="ARCHIVED">ARCHIVED</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5 col-span-1 sm:col-span-2">
                  <Label className="text-xs font-bold text-slate-800">Thumbnail URL</Label>
                  <Input
                    type="text"
                    value={course.thumbnail || ""}
                    onChange={(e) => setCourse({ ...course, thumbnail: e.target.value })}
                    className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs font-mono"
                  />
                </div>

                <div className="space-y-1.5 col-span-1 sm:col-span-2">
                  <Label className="text-xs font-bold text-slate-800">Description</Label>
                  <Textarea
                    rows={4}
                    value={course.description || ""}
                    onChange={(e) => setCourse({ ...course, description: e.target.value })}
                    className="rounded-xl bg-slate-50 border-slate-200 text-xs p-3"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={savingCourse}
              className="h-10 px-6 rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white font-bold text-xs gap-2"
            >
              {savingCourse ? <Spinner size="sm" variant="white" /> : <Save className="size-4" />}
              <span>Save Course Details</span>
            </Button>
          </div>
        </form>
        </TabsContent>
      </Tabs>

      {/* MODULE MODAL */}
      <Dialog open={moduleModalOpen} onOpenChange={setModuleModalOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6 border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-base font-bold font-headline text-slate-900 flex items-center gap-2">
              <FolderPlus className="size-5 text-[#0056d2]" />
              <span>{editingModuleId ? "Edit Module" : "Add New Module"}</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Create a section or chapter for grouping related lessons.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleModuleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-800">Module Title *</Label>
              <Input
                type="text"
                required
                placeholder="e.g. Module 1: Introduction to Business Planning"
                value={moduleTitle}
                onChange={(e) => setModuleTitle(e.target.value)}
                className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-800">Module Description</Label>
              <Textarea
                rows={3}
                placeholder="Brief summary of what this module covers..."
                value={moduleDesc}
                onChange={(e) => setModuleDesc(e.target.value)}
                className="rounded-xl bg-slate-50 border-slate-200 text-xs p-3"
              />
            </div>

            <DialogFooter className="pt-3 border-t border-slate-100 flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setModuleModalOpen(false)}
                className="rounded-xl text-xs h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={moduleSubmitting}
                className="rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white font-bold text-xs h-10 gap-2 cursor-pointer"
              >
                {moduleSubmitting && <Spinner size="sm" variant="white" />}
                <span>Save Module</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* LESSON MODAL */}
      <Dialog open={lessonModalOpen} onOpenChange={setLessonModalOpen}>
        <DialogContent className="sm:max-w-lg bg-white rounded-2xl p-6 border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-base font-bold font-headline text-slate-900 flex items-center gap-2">
              <Video className="size-5 text-[#0056d2]" />
              <span>{editingLessonId ? "Edit Lesson" : "Add New Lesson"}</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              Add video URL, duration, reading material, or preview status.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleLessonSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-800">Lesson Title *</Label>
              <Input
                type="text"
                required
                placeholder="e.g. Lesson 1.1: Understanding Entrepreneurial Mindset"
                value={lessonForm.title}
                onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
                className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-800">Lesson Type</Label>
                <Select
                  value={lessonForm.type}
                  onValueChange={(val) =>
                    setLessonForm({
                      ...lessonForm,
                      type: val as "VIDEO" | "READING" | "QUIZ",
                    })
                  }
                >
                  <SelectTrigger className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs font-bold text-slate-800">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="VIDEO">Video Lesson</SelectItem>
                      <SelectItem value="READING">Reading Material</SelectItem>
                      <SelectItem value="QUIZ">Quiz / Assessment</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-800">Duration (Minutes)</Label>
                <Input
                  type="number"
                  min="1"
                  value={lessonForm.duration}
                  onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs font-numeric"
                />
              </div>
            </div>

            {lessonForm.type === "VIDEO" && (
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-800">Video Embed / Stream URL</Label>
                <Input
                  type="text"
                  placeholder="e.g. https://www.youtube.com/embed/... or HLS URL"
                  value={lessonForm.videoUrl}
                  onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
                  className="h-10 rounded-xl bg-slate-50 border-slate-200 text-xs font-mono"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-slate-800">Lesson Summary</Label>
              <Textarea
                rows={3}
                placeholder="Optional key takeaways for students..."
                value={lessonForm.description}
                onChange={(e) => setLessonForm({ ...lessonForm, description: e.target.value })}
                className="rounded-xl bg-slate-50 border-slate-200 text-xs p-3"
              />
            </div>

            <div className="flex items-center gap-6 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700">
                <Checkbox
                  checked={lessonForm.isPreview}
                  onCheckedChange={(checked) =>
                    setLessonForm({ ...lessonForm, isPreview: Boolean(checked) })
                  }
                />
                <span>Allow Free Preview</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-slate-700">
                <Checkbox
                  checked={lessonForm.isPublished}
                  onCheckedChange={(checked) =>
                    setLessonForm({ ...lessonForm, isPublished: Boolean(checked) })
                  }
                />
                <span>Is Published</span>
              </label>
            </div>

            <DialogFooter className="pt-3 border-t border-slate-100 flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLessonModalOpen(false)}
                className="rounded-xl text-xs h-10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={lessonSubmitting}
                className="rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white font-bold text-xs h-10 gap-2 cursor-pointer"
              >
                {lessonSubmitting && <Spinner size="sm" variant="white" />}
                <span>Save Lesson</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
