"use client";

import React, { useState, useEffect } from "react";
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
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
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
            className="h-9 rounded-xl text-xs gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>रिफ्रेश</span>
          </Button>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9 rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white font-bold text-xs gap-1.5 shadow-xs cursor-pointer">
                <Plus className="h-4 w-4" />
                <span>नया कोर्स जोड़ें</span>
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold font-headline text-slate-950 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#0056d2]" />
                  <span>नया कोर्स बनाएं (Create Course)</span>
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  कृपया नए कोर्स का विवरण और शुल्क निर्धारित करें।
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateSubmit} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">कोर्स शीर्षक (Title) *</Label>
                  <Input
                    required
                    placeholder="उदा. आधुनिक डेयरी फार्मिंग एवं दुग्ध उत्पाद प्रसंस्करण"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="h-9 text-xs rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">URL स्लग (Slug) *</Label>
                    <Input
                      required
                      placeholder="dairy-farming"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="h-9 text-xs rounded-xl font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">शुल्क (Price ₹) *</Label>
                    <Input
                      type="number"
                      required
                      placeholder="999"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="h-9 text-xs rounded-xl font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">स्तर (Level)</Label>
                    <Select
                      value={formData.level}
                      onValueChange={(val) => setFormData({ ...formData, level: val })}
                    >
                      <SelectTrigger className="h-9 text-xs rounded-xl">
                        <SelectValue placeholder="स्तर चुनें" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BEGINNER">प्रारंभिक (Beginner)</SelectItem>
                        <SelectItem value="INTERMEDIATE">मध्यम (Intermediate)</SelectItem>
                        <SelectItem value="ADVANCED">उन्नत (Advanced)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">अवधि (Minutes)</Label>
                    <Input
                      type="number"
                      placeholder="120"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="h-9 text-xs rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">थंबनेल फोटो URL</Label>
                  <Input
                    placeholder="/images/dairy-farming-thumb.jpg"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="h-9 text-xs rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">विवरण (Description)</Label>
                  <Textarea
                    placeholder="कोर्स के बारे में मुख्य विवरण लिखें..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="text-xs rounded-xl min-h-[70px]"
                  />
                </div>

                <DialogFooter className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsCreateOpen(false)}
                    className="h-9 text-xs rounded-xl"
                  >
                    रद्द करें
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-9 text-xs rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white font-bold"
                  >
                    {isSubmitting ? "सहेजा जा रहा है..." : "सहेजें और प्रकाशित करें"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="कोर्स खोजें (शीर्षक या स्लग)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 pl-9 text-xs rounded-xl bg-slate-50 border-slate-200"
          />
        </div>

        <div className="text-xs text-slate-500 font-semibold">
          कुल कोर्सेज: <strong className="text-slate-900">{filteredCourses.length}</strong>
        </div>
      </div>

      {/* Courses Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
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
            ) : filteredCourses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-xs text-slate-500">
                  कोई कोर्स नहीं मिला।
                </TableCell>
              </TableRow>
            ) : (
              filteredCourses.map((course) => (
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
                        variant="ghost"
                        size="icon"
                        className="size-8 rounded-lg hover:bg-slate-100 text-slate-600"
                        title="देखें"
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
                        title="हटाएं"
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
      </div>
    </div>
  );
}
