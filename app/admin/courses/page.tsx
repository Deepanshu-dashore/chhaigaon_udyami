"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminSearchInput } from "@/components/admin/admin-search-input";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  RefreshCw,
  Sparkles,
} from "lucide-react";

interface CourseItem {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  thumbnail?: string | null;
  price: number | string;
  level?: string | null;
  duration?: number | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdById: string;
  createdBy?: { id: string; name: string; email?: string | null };
  _count?: { modules: number; enrollments: number; certificates: number };
  createdAt: string;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // New Course Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    thumbnail: "",
    price: "999",
    level: "BEGINNER",
    duration: "120",
    status: "PUBLISHED",
  });

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/courses");
      const data = await res.json();
      if (res.ok && data.courses) {
        setCourses(data.courses);
      }
    } catch (err) {
      console.error("Failed to load courses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleTitleChange = (val: string) => {
    const slugified = val
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    setFormData((prev) => ({ ...prev, title: val, slug: slugified }));
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setIsCreateOpen(false);
        setFormData({
          title: "",
          slug: "",
          description: "",
          thumbnail: "",
          price: "999",
          level: "BEGINNER",
          duration: "120",
          status: "PUBLISHED",
        });
        fetchCourses();
      } else {
        alert(data.error || "Failed to create course");
      }
    } catch (err) {
      console.error("Error creating course:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (courseId: string, currentStatus: string) => {
    const newStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setCourses((prev) =>
          prev.map((c) => (c.id === courseId ? { ...c, status: newStatus } : c))
        );
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);
    }
  };

  const handleDelete = async (courseId: string) => {
    if (!confirm("क्या आप निश्चित रूप से इस कोर्स को हटाना चाहते हैं?")) return;
    try {
      const res = await fetch(`/api/admin/courses/${courseId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCourses((prev) => prev.filter((c) => c.id !== courseId));
      }
    } catch (err) {
      console.error("Failed to delete course:", err);
    }
  };

  const filteredCourses = courses.filter(
    (c) =>
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.slug?.toLowerCase().includes(search.toLowerCase()) ||
      (c.level && c.level.toLowerCase().includes(search.toLowerCase())) ||
      (c.description && c.description.toLowerCase().includes(search.toLowerCase())) ||
      c.id?.toLowerCase().includes(search.toLowerCase())
  );

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const totalPages = Math.ceil(filteredCourses.length / limit) || 1;
  const paginatedCourses = filteredCourses.slice((page - 1) * limit, page * limit);

  return (
    <div className="space-y-6 font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#0056d2]" />
            <h1 className="text-xl font-bold text-slate-900 font-headline">
              कोर्स प्रबंधन (Course Management)
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-body">
            सभी व्यावसायिक एवं तकनीकी पाठ्यक्रमों का प्रबंधन, प्रकाशन स्थिति तथा मूल्य नियंत्रण करें।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchCourses}
            disabled={loading}
            className="h-9 rounded-lg text-xs gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>रिफ्रेश</span>
          </Button>

          <Button asChild size="sm" className="h-9 rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white font-bold text-xs gap-1.5 shadow-xs cursor-pointer">
            <Link href="/admin/courses/new">
              <Plus className="h-4 w-4" />
              <span>Add New Course</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
        <AdminSearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          placeholder="Search by Title, Slug, Category or ID... (Esc to clear)"
        />

        <div className="text-xs text-slate-500 font-semibold">
          Total Courses: <strong className="text-slate-900">{filteredCourses.length}</strong>
        </div>
      </div>

      {/* Courses Data Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="text-xs font-bold text-slate-700">कोर्स विवरण</TableHead>
              <TableHead className="text-xs font-bold text-slate-700">स्तर व अवधि</TableHead>
              <TableHead className="text-xs font-bold text-slate-700">शुल्क (Price)</TableHead>
              <TableHead className="text-xs font-bold text-slate-700">नामांकन (Enrolled)</TableHead>
              <TableHead className="text-xs font-bold text-slate-700">स्थिति (Status)</TableHead>
              <TableHead className="text-xs font-bold text-slate-700 text-right">कार्रवाई (Actions)</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-xs text-slate-500">
                  डेटा लोड हो रहा है...
                </TableCell>
              </TableRow>
            ) : paginatedCourses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-xs text-slate-500">
                  कोई कोर्स नहीं मिला।
                </TableCell>
              </TableRow>
            ) : (
              paginatedCourses.map((course) => (
                <TableRow key={course.id} className="hover:bg-slate-50/80 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-xl bg-slate-100 overflow-hidden border border-slate-200 shrink-0 flex items-center justify-center font-bold text-blue-700 text-xs">
                        {course.thumbnail ? (
                          <img src={course.thumbnail} alt="" className="size-full object-cover" />
                        ) : (
                          "CU"
                        )}
                      </div>
                      <div className="space-y-0.5 max-w-xs">
                        <p className="font-bold text-xs text-slate-900 truncate">{course.title}</p>
                        <p className="text-[10px] text-slate-400 font-mono">/{course.slug}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="text-xs text-slate-600">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-slate-800">{course.level || "BEGINNER"}</p>
                      <p className="text-[10px] text-slate-400">{course.duration || 60} मिनट</p>
                    </div>
                  </TableCell>

                  <TableCell className="text-xs font-bold text-slate-900">
                    ₹{Number(course.price).toLocaleString("en-IN")}
                  </TableCell>

                  <TableCell className="text-xs">
                    <Badge variant="secondary" className="bg-blue-50 text-[#0056d2] border-blue-200 text-[11px]">
                      {course._count?.enrollments || 0} विद्यार्थी
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={course.status === "PUBLISHED"}
                        onCheckedChange={() => handleToggleStatus(course.id, course.status)}
                      />
                      <Badge
                        className={
                          course.status === "PUBLISHED"
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 text-[10px] font-bold"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200 text-[10px] font-bold"
                        }
                      >
                        {course.status === "PUBLISHED" ? "प्रकाशित" : "ड्राफ्ट"}
                      </Badge>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="h-8 px-2.5 text-xs text-[#0056d2] border-blue-200 hover:bg-blue-50 font-bold gap-1 cursor-pointer"
                      >
                        <Link href={`/admin/courses/${course.id}`}>
                          <BookOpen className="size-3.5" />
                          <span>Curriculum Builder</span>
                        </Link>
                      </Button>

                      <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-lg hover:bg-slate-100 text-slate-600"
                        title="View Course"
                      >
                        <a href={`/courses/${course.slug}`} target="_blank" rel="noreferrer">
                          <Eye className="h-3.5 w-3.5" />
                        </a>
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(course.id)}
                        className="size-8 rounded-lg hover:bg-rose-50 text-rose-600"
                        title="Delete Course"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {!loading && filteredCourses.length > 0 && (
          <AdminPagination
            meta={{ total: filteredCourses.length, page, limit, totalPages }}
            onPageChange={setPage}
            onLimitChange={(newLimit) => {
              setLimit(newLimit);
              setPage(1);
            }}
          />
        )}
      </div>
    </div>
  );
}
