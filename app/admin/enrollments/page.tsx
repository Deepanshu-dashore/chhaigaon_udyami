"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AdminSearchInput } from "@/components/admin/admin-search-input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { AdminPagination, PaginationMeta } from "@/components/admin/admin-pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import {
  GraduationCap,
  UserCheck,
  Search,
  RefreshCw,
  Plus,
  BookOpen,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

interface EnrollmentItem {
  id: string;
  userId: string;
  courseId: string;
  status: "ACTIVE" | "COMPLETED" | "PENDING" | "CANCELLED";
  enrolledAt: string;
  user: { id: string; name: string | null; email: string | null; role: string };
  course: { id: string; title: string; slug: string; price: number };
}

export default function AdminEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<EnrollmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  // Modal State
  const [createOpen, setCreateOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchEnrollments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (selectedStatus !== "ALL") params.set("status", selectedStatus);
      params.set("page", page.toString());
      params.set("limit", limit.toString());

      const res = await fetch(`/api/admin/enrollments?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setEnrollments(data.data);
        if (data.meta) setMeta(data.meta);
      }
    } catch (err) {
      toast.error("नामांकन डेटा लोड करने में त्रुटि");
    } finally {
      setLoading(false);
    }
  }, [search, selectedStatus, page, limit]);

  useEffect(() => {
    fetchEnrollments();
  }, [fetchEnrollments]);

  // Load dropdown lists when opening create modal
  const handleOpenCreateModal = async () => {
    setCreateOpen(true);
    try {
      const [uRes, cRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/courses"),
      ]);
      const uData = await uRes.json();
      const cData = await cRes.json();

      if (uData.success) setUsers(uData.data || []);
      if (cData.courses) setCourses(cData.courses || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || !selectedCourse) {
      toast.error("कृपया उपयोगकर्ता और कोर्स दोनों चुनें");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUser, courseId: selectedCourse }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("उपयोगकर्ता को सफलतापूर्वक नामांकित किया गया! 🎉");
        setCreateOpen(false);
        fetchEnrollments();
      } else {
        toast.error(data.error || "नामांकन विफल रहा");
      }
    } catch (err) {
      toast.error("सर्वर से कनेक्ट करने में विफल");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-headline">
            विद्यार्थी नामांकन प्रबंधन (Enrollments Management)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-body mt-0.5">
            कोर्स एक्सेस, छात्र नामांकन स्थिति एवं मैन्युअल आवंटन का नियंत्रण करें
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchEnrollments}
            disabled={loading}
            className="rounded-lg border-slate-200 text-slate-700 text-xs h-9 gap-1.5"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>रिफ्रेश</span>
          </Button>

          <Button
            onClick={handleOpenCreateModal}
            size="sm"
            className="rounded-lg bg-[#0056d2] hover:bg-blue-700 text-white font-semibold text-xs h-9 gap-1.5 shadow-sm cursor-pointer"
          >
            <UserCheck className="size-4" />
            <span>मैन्युअल नामांकन जोड़ें</span>
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-white border-slate-200 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">कुल सक्रिय नामांकन</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 font-numeric">
                {enrollments.filter((e) => e.status === "ACTIVE").length}
              </p>
            </div>
            <div className="size-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">पूर्ण किए गए कोर्स</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 font-numeric">
                {enrollments.filter((e) => e.status === "COMPLETED").length}
              </p>
            </div>
            <div className="size-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <GraduationCap className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">कुल नामांकित छात्र</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 font-numeric">
                {enrollments.length}
              </p>
            </div>
            <div className="size-10 rounded-lg bg-blue-50 text-[#0056d2] flex items-center justify-center">
              <BookOpen className="size-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <Card className="bg-white border-slate-200 shadow-xs">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <AdminSearchInput
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            placeholder="Search by Student Name, Email, Course or Enrollment ID... (Esc to clear)"
          />

          <ButtonGroup>
            {[
              { id: "ALL", label: "All" },
              { id: "ACTIVE", label: "Active" },
              { id: "COMPLETED", label: "Completed" },
            ].map(({ id, label }) => (
              <ButtonGroupItem
                key={id}
                isActive={selectedStatus === id}
                onClick={() => {
                  setSelectedStatus(id);
                  setPage(1);
                }}
              >
                {label}
              </ButtonGroupItem>
            ))}
          </ButtonGroup>
        </CardContent>
      </Card>

      {/* Enrollments Data Table */}
      <Card className="bg-white border-slate-200 shadow-xs overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-2">
              <Spinner size="lg" />
              <p className="text-xs text-slate-500">नामांकन लोड हो रहे हैं...</p>
            </div>
          ) : enrollments.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <GraduationCap className="size-10 mx-auto text-slate-300" />
              <p className="text-sm font-semibold text-slate-700">कोई नया नामांकन नहीं मिला</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/70 border-b border-slate-100">
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">User / Student</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Enrolled Course</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Status</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase text-right">Date Enrolled</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {enrollments.map((item) => (
                    <TableRow key={item.id} className="hover:bg-slate-50/80 border-b border-slate-100">
                      <TableCell className="text-xs font-semibold text-slate-900">
                        <div>
                          <p>{item.user?.name || "Unassigned"}</p>
                          <p className="text-[10px] text-slate-400 font-normal">{item.user?.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-slate-800 font-bold">
                        {item.course?.title}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] font-bold ${
                            item.status === "ACTIVE"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-purple-50 text-purple-700 border-purple-200"
                          }`}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-xs text-slate-500 font-numeric">
                        {new Date(item.enrolledAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {!loading && enrollments.length > 0 && (
            <AdminPagination
              meta={meta}
              onPageChange={setPage}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1);
              }}
            />
          )}
        </CardContent>
      </Card>

      {/* Create Enrollment Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-lg p-6 border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-headline text-slate-900 flex items-center gap-2">
              <UserCheck className="size-5 text-[#0056d2]" />
              <span>मैन्युअल कोर्स नामांकन (Enroll User)</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              किसी भी छात्र या उद्यमी को सीधे कोर्स का एक्सेस प्रदान करें
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                1. उपयोगकर्ता चुनें (User) *
              </label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                required
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800"
              >
                <option value="">-- उपयोगकर्ता का चयन करें --</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name || u.email} ({u.email || u.mobile})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                2. कोर्स चुनें (Course) *
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                required
                className="w-full h-10 px-3 rounded-lg border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800"
              >
                <option value="">-- कोर्स का चयन करें --</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} (₹{c.price})
                  </option>
                ))}
              </select>
            </div>

            <DialogFooter className="pt-3 border-t border-slate-100 flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateOpen(false)}
                className="rounded-lg text-xs h-10"
              >
                रद्द करें
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-[#0056d2] hover:bg-blue-700 text-white font-semibold text-xs h-10 gap-2 cursor-pointer"
              >
                {submitting && <Spinner size="sm" variant="white" />}
                <span>नामांकन प्रदान करें</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
