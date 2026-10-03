"use client";

import React, { useState, useEffect } from "react";
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
  FileText,
  Plus,
  Search,
  Trash2,
  RefreshCw,
  Sparkles,
  ExternalLink,
  Building2,
  Landmark,
} from "lucide-react";

interface SchemeItem {
  id: string;
  title: string;
  slug: string;
  department?: string | null;
  description?: string | null;
  benefits?: string | null;
  eligibility?: string | null;
  officialUrl?: string | null;
  status: boolean;
  createdAt: string;
}

export default function AdminSchemesPage() {
  const [schemes, setSchemes] = useState<SchemeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    department: "DIC Khandwa / MSME",
    description: "",
    benefits: "35% पूंजी सब्सिडी (विशेष श्रेणी) एवं ₹50 लाख तक बैंक ऋण",
    eligibility: "8वीं पास, आयु 18 वर्ष से अधिक, मध्यप्रदेश निवासी",
    officialUrl: "https://msme.gov.in",
    status: true,
  });

  const fetchSchemes = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/schemes");
      const data = await res.json();
      if (res.ok && data.schemes) {
        setSchemes(data.schemes);
      }
    } catch (err) {
      console.error("Failed to load schemes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
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
      const res = await fetch("/api/admin/schemes", {
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
          department: "DIC Khandwa / MSME",
          description: "",
          benefits: "35% पूंजी सब्सिडी (विशेष श्रेणी) एवं ₹50 लाख तक बैंक ऋण",
          eligibility: "8वीं पास, आयु 18 वर्ष से अधिक, मध्यप्रदेश निवासी",
          officialUrl: "https://msme.gov.in",
          status: true,
        });
        fetchSchemes();
      } else {
        alert(data.error || "Failed to create scheme");
      }
    } catch (err) {
      console.error("Error creating scheme:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (schemeId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    try {
      const res = await fetch(`/api/admin/schemes/${schemeId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setSchemes((prev) =>
          prev.map((s) => (s.id === schemeId ? { ...s, status: newStatus } : s))
        );
      }
    } catch (err) {
      console.error("Failed to toggle scheme status:", err);
    }
  };

  const handleDelete = async (schemeId: string) => {
    if (!confirm("क्या आप इस सरकारी योजना को हटाना चाहते हैं?")) return;
    try {
      const res = await fetch(`/api/admin/schemes/${schemeId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setSchemes((prev) => prev.filter((s) => s.id !== schemeId));
      }
    } catch (err) {
      console.error("Failed to delete scheme:", err);
    }
  };

  const filteredSchemes = schemes.filter(
    (s) =>
      s.title?.toLowerCase().includes(search.toLowerCase()) ||
      (s.department && s.department.toLowerCase().includes(search.toLowerCase())) ||
      (s.description && s.description.toLowerCase().includes(search.toLowerCase())) ||
      (s.benefits && s.benefits.toLowerCase().includes(search.toLowerCase())) ||
      (s.id && s.id.toLowerCase().includes(search.toLowerCase()))
  );

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const totalPages = Math.ceil(filteredSchemes.length / limit) || 1;
  const paginatedSchemes = filteredSchemes.slice((page - 1) * limit, page * limit);

  return (
    <div className="space-y-6 font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-amber-600" />
            <h1 className="text-xl font-bold text-slate-900 font-headline">
              सरकारी योजनाएं एवं सब्सिडी डायरेक्टरी (Government Schemes)
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-body">
            केंद्र एवं राज्य सरकार की एमएसएमई सब्सिडी योजनाओं का प्रबंधन एवं दिशा-निर्देश जोड़ें।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchSchemes}
            disabled={loading}
            className="h-9 rounded-lg text-xs gap-1.5 cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>रिफ्रेश</span>
          </Button>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-1.5 shadow-xs cursor-pointer">
                <Plus className="h-4 w-4" />
                <span>नई योजना जोड़ें</span>
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-lg rounded-lg bg-white p-6 shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold font-headline text-slate-950 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <span>नई सरकारी योजना जोड़ें (Create Scheme)</span>
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  सरकारी योजना की पात्रता, सब्सिडी प्रतिशत व आधिकारिक लिंक भरें।
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleCreateSubmit} className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">योजना का नाम (Title) *</Label>
                  <Input
                    required
                    placeholder="उदा. प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP)"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="h-9 text-xs rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">विभाग (Department)</Label>
                    <Input
                      placeholder="DIC Khandwa / KVIC"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="h-9 text-xs rounded-xl"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-slate-700">URL स्लग (Slug) *</Label>
                    <Input
                      required
                      placeholder="pmegp-scheme"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="h-9 text-xs rounded-xl font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">सब्सिडी व लाभ (Benefits)</Label>
                  <Input
                    placeholder="35% पूंजी सब्सिडी (विशेष श्रेणी) एवं ₹50 लाख तक बैंक ऋण"
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    className="h-9 text-xs rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">पात्रता मानदंड (Eligibility)</Label>
                  <Input
                    placeholder="8वीं पास, आयु 18 वर्ष से अधिक, मध्यप्रदेश निवासी"
                    value={formData.eligibility}
                    onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                    className="h-9 text-xs rounded-xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">आधिकारिक पोर्टल वेब लिंक (Official URL)</Label>
                  <Input
                    placeholder="https://kviconline.gov.in"
                    value={formData.officialUrl}
                    onChange={(e) => setFormData({ ...formData, officialUrl: e.target.value })}
                    className="h-9 text-xs rounded-xl font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-slate-700">विवरण (Description)</Label>
                  <Textarea
                    placeholder="योजना का संक्षिप्त विवरण..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="text-xs rounded-xl min-h-[60px]"
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
                    className="h-9 text-xs rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold"
                  >
                    {isSubmitting ? "सहेजा जा रहा है..." : "योजना जोड़ें"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
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
          placeholder="Search by Scheme Title, Department, Category or ID... (Esc to clear)"
        />

        <div className="text-xs text-slate-500 font-semibold">
          Total Schemes: <strong className="text-slate-900">{filteredSchemes.length}</strong>
        </div>
      </div>

      {/* Schemes Data Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="text-xs font-bold text-slate-700">योजना विवरण</TableHead>
              <TableHead className="text-xs font-bold text-slate-700">विभाग (Department)</TableHead>
              <TableHead className="text-xs font-bold text-slate-700">मुख्य लाभ &amp; सब्सिडी</TableHead>
              <TableHead className="text-xs font-bold text-slate-700">स्थिति (Active)</TableHead>
              <TableHead className="text-xs font-bold text-slate-700 text-right">कार्रवाई</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-xs text-slate-500">
                  डेटा लोड हो रहा है...
                </TableCell>
              </TableRow>
            ) : paginatedSchemes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-xs text-slate-500">
                  कोई सरकारी योजना दर्ज नहीं है।
                </TableCell>
              </TableRow>
            ) : (
              paginatedSchemes.map((scheme) => (
                <TableRow key={scheme.id} className="hover:bg-slate-50/80 transition-colors">
                  <TableCell className="font-medium">
                    <div className="space-y-0.5 max-w-xs">
                      <p className="font-bold text-xs text-slate-900 leading-snug">{scheme.title}</p>
                      <p className="text-[10px] text-slate-400 font-mono">/{scheme.slug}</p>
                    </div>
                  </TableCell>

                  <TableCell className="text-xs text-slate-700 font-medium">
                    <Badge variant="outline" className="bg-slate-50 border-slate-200 text-slate-700 text-[10px]">
                      {scheme.department || "DIC Khandwa"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-xs text-emerald-700 font-semibold max-w-xs">
                    {scheme.benefits || "35% सब्सिडी एवं बैंक लोन"}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={scheme.status}
                        onCheckedChange={() => handleToggleStatus(scheme.id, scheme.status)}
                      />
                      <Badge
                        className={
                          scheme.status
                            ? "bg-emerald-100 text-emerald-800 text-[10px] font-bold"
                            : "bg-slate-100 text-slate-500 text-[10px] font-bold"
                        }
                      >
                        {scheme.status ? "सक्रिय" : "निष्क्रिय"}
                      </Badge>
                    </div>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {scheme.officialUrl && (
                        <Button
                          asChild
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-lg hover:bg-slate-100 text-slate-600"
                          title="पोर्टल खोलें"
                        >
                          <a href={scheme.officialUrl} target="_blank" rel="noreferrer">
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(scheme.id)}
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

        {!loading && filteredSchemes.length > 0 && (
          <AdminPagination
            meta={{ total: filteredSchemes.length, page, limit, totalPages }}
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
