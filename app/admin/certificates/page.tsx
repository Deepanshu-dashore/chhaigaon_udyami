"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { AdminPagination } from "@/components/admin/admin-pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Award,
  Plus,
  Search,
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  QrCode,
} from "lucide-react";

interface CertificateItem {
  id: string;
  certificateNumber: string;
  verificationCode: string;
  issueDate: string;
  status: string;
  user: { id: string; name: string; email: string; mobile: string };
  course: { id: string; title: string; slug: string };
}

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const totalPages = Math.ceil(certificates.length / limit) || 1;
  const paginatedCertificates = certificates.slice((page - 1) * limit, page * limit);

  // Modal State
  const [createOpen, setCreateOpen] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchCertificates = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/certificates?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setCertificates(data.data);
      }
    } catch (err) {
      toast.error("प्रमाणपत्र डेटा लोड करने में विफल");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

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
      toast.error("कृपया छात्र और कोर्स दोनों चुनें");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: selectedUser, courseId: selectedCourse }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("प्रमाणपत्र सफलतापूर्वक जारी किया गया! 🏆");
        setCreateOpen(false);
        fetchCertificates();
      } else {
        toast.error(data.error || "प्रमाणपत्र जारी करने में विफल");
      }
    } catch (err) {
      toast.error("सर्वर से कनेक्ट करने में त्रुटि");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-headline">
            प्रमाणपत्र प्रबंधन व सत्यापन (Certificate Issuance)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-body mt-0.5">
            डिजिटल प्रमाणपत्र जारी करें, QR वेरिफिकेशन कोड्स और प्रामाणिकता प्रबंधित करें
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchCertificates}
            disabled={loading}
            className="rounded-xl border-slate-200 text-slate-700 text-xs h-9 gap-1.5"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>रिफ्रेश</span>
          </Button>

          <Button
            onClick={handleOpenCreateModal}
            size="sm"
            className="rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white font-semibold text-xs h-9 gap-1.5 shadow-sm cursor-pointer"
          >
            <Award className="size-4" />
            <span>नया प्रमाणपत्र जारी करें</span>
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-white border-slate-200 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">कुल जारी प्रमाणपत्र</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 font-numeric">
                {certificates.length}
              </p>
            </div>
            <div className="size-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">सत्यापित स्टेटस (Active)</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 font-numeric">
                {certificates.filter((c) => c.status === "ACTIVE").length}
              </p>
            </div>
            <div className="size-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">QR सत्यापन प्रणाली</p>
              <p className="text-base font-bold text-blue-700 mt-1 flex items-center gap-1">
                <QrCode className="size-4" /> 24x7 Live Verify
              </p>
            </div>
            <div className="size-10 rounded-xl bg-blue-50 text-[#0056d2] flex items-center justify-center">
              <ShieldCheck className="size-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <Card className="bg-white border-slate-200 shadow-xs">
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by Certificate Number, Verification Code or Student Name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="h-10 pl-9 pr-3 rounded-xl bg-slate-50 border-slate-200 text-xs"
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Table */}
      <Card className="bg-white border-slate-200 shadow-xs overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-2">
              <Spinner size="lg" />
              <p className="text-xs text-slate-500">प्रमाणपत्र लोड हो रहे हैं...</p>
            </div>
          ) : certificates.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Award className="size-10 mx-auto text-slate-300" />
              <p className="text-sm font-semibold text-slate-700">कोई प्रमाणपत्र रिकॉर्ड नहीं मिला</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/70 border-b border-slate-100">
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Certificate No.</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Verification Code</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Student</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Course</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Issue Date</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase text-right">Verify Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCertificates.map((cert) => (
                    <TableRow key={cert.id} className="hover:bg-slate-50/80 border-b border-slate-100">
                      <TableCell className="text-xs font-mono font-bold text-slate-900">
                        {cert.certificateNumber}
                      </TableCell>
                      <TableCell className="text-xs font-mono text-purple-700 font-bold">
                        {cert.verificationCode}
                      </TableCell>
                      <TableCell className="text-xs font-semibold text-slate-900">
                        {cert.user?.name || "N/A"}
                      </TableCell>
                      <TableCell className="text-xs text-slate-800">
                        {cert.course?.title}
                      </TableCell>
                      <TableCell className="text-xs text-slate-500 font-numeric">
                        {new Date(cert.issueDate).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2.5 text-xs text-[#0056d2] hover:bg-blue-50 font-semibold cursor-pointer gap-1"
                        >
                          <a
                            href={`/certificates/${cert.verificationCode}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span>जांचें</span>
                            <ExternalLink className="size-3" />
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {!loading && certificates.length > 0 && (
            <AdminPagination
              meta={{ total: certificates.length, page, limit, totalPages }}
              onPageChange={setPage}
              onLimitChange={(newLimit) => {
                setLimit(newLimit);
                setPage(1);
              }}
            />
          )}
        </CardContent>
      </Card>

      {/* Issue Certificate Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6 border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-headline text-slate-900 flex items-center gap-2">
              <Award className="size-5 text-[#0056d2]" />
              <span>प्रमाणपत्र जारी करें (Issue Certificate)</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              कोर्स पूर्ण करने वाले छात्र के लिए नया QR सत्यापित प्रमाणपत्र बनाएं
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                छात्र चुनें (Student) *
              </label>
              <Select
                value={selectedUser}
                onValueChange={(val) => setSelectedUser(val)}
              >
                <SelectTrigger className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800">
                  <SelectValue placeholder="-- छात्र का चयन करें --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {users.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.name || u.email} ({u.email || u.mobile})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">
                कोर्स चुनें (Course) *
              </label>
              <Select
                value={selectedCourse}
                onValueChange={(val) => setSelectedCourse(val)}
              >
                <SelectTrigger className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800">
                  <SelectValue placeholder="-- कोर्स का चयन करें --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {courses.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter className="pt-3 border-t border-slate-100 flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateOpen(false)}
                className="rounded-xl text-xs h-10"
              >
                रद्द करें
              </Button>
              <Button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white font-semibold text-xs h-10 gap-2 cursor-pointer"
              >
                {submitting && <Spinner size="sm" variant="white" />}
                <span>प्रमाणपत्र जारी करें</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
