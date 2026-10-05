"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Lightbulb,
  Plus,
  Search,
  RefreshCw,
  FileText,
  ExternalLink,
  BookMarked,
} from "lucide-react";

interface ResourceItem {
  id: string;
  title: string;
  category: string;
  description?: string | null;
  content?: string | null;
  resourceUrl?: string | null;
  status: boolean;
}

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal state
  const [createOpen, setCreateOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    category: "BUSINESS_PLAN",
    description: "",
    content: "",
    resourceUrl: "",
  });

  const fetchResources = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/resources?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setResources(data.data);
      }
    } catch (err) {
      toast.error("रिसोर्स डेटा लोड करने में विफल");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.category) {
      toast.error("शीर्षक और श्रेणी आवश्यक हैं");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("नया स्टार्टअप रिसोर्स सफलतापूर्वक जोड़ा गया! 🚀");
        setCreateOpen(false);
        setForm({
          title: "",
          category: "BUSINESS_PLAN",
          description: "",
          content: "",
          resourceUrl: "",
        });
        fetchResources();
      } else {
        toast.error(data.error || "जोड़ने में विफल");
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
            स्टार्टअप गाइड व टूल्स (Startup Resources & Toolkits)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-body mt-0.5">
            बिजनेस प्लान टेम्प्लेट्स, प्रोजेक्ट रिपोर्ट्स और सरकारी गाइडलाइंस प्रबंधित करें
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchResources}
            disabled={loading}
            className="rounded-xl border-slate-200 text-slate-700 text-xs h-9 gap-1.5"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>रिफ्रेश</span>
          </Button>

          <Button
            onClick={() => setCreateOpen(true)}
            size="sm"
            className="rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white font-semibold text-xs h-9 gap-1.5 shadow-sm cursor-pointer"
          >
            <Plus className="size-4" />
            <span>नया रिसोर्स जोड़ें</span>
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <Card className="bg-white border-slate-200 shadow-xs">
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              type="text"
              placeholder="शीर्षक, श्रेणी या विवरण से खोजें..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
              <p className="text-xs text-slate-500">रिसोर्सेस लोड हो रहे हैं...</p>
            </div>
          ) : resources.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Lightbulb className="size-10 mx-auto text-slate-300" />
              <p className="text-sm font-semibold text-slate-700">कोई रिसोर्स नहीं मिला</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/70 border-b border-slate-100">
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Title</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Category</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Description</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase text-right">Link / File</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((resItem) => (
                    <TableRow key={resItem.id} className="hover:bg-slate-50/80 border-b border-slate-100">
                      <TableCell className="text-xs font-bold text-slate-900">
                        {resItem.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-blue-50 text-[#0056d2] text-[10px] font-bold">
                          {resItem.category}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-600 max-w-xs truncate">
                        {resItem.description || "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        {resItem.resourceUrl ? (
                          <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs text-purple-700 hover:bg-purple-50 font-semibold cursor-pointer gap-1"
                          >
                            <a href={resItem.resourceUrl} target="_blank" rel="noopener noreferrer">
                              <span>देखें</span>
                              <ExternalLink className="size-3" />
                            </a>
                          </Button>
                        ) : (
                          <span className="text-[11px] text-slate-400">N/A</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Resource Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-lg bg-white rounded-2xl p-6 border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-headline text-slate-900 flex items-center gap-2">
              <Lightbulb className="size-5 text-[#0056d2]" />
              <span>नया स्टार्टअप रिसोर्स बनाएं</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              उद्यमियों के लिए नया गाइड, DPR टेम्प्लेट या टूलकिट जोड़ें
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">शीर्षक (Title) *</label>
              <Input
                type="text"
                placeholder="उदा. PMEGP विस्तृत प्रोजेक्ट रिपोर्ट (DPR) फॉर्मेट"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="h-10 rounded-xl bg-slate-50 text-xs"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">श्रेणी (Category)</label>
              <Select
                value={form.category}
                onValueChange={(val) => setForm({ ...form, category: val })}
              >
                <SelectTrigger className="w-full h-10 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800">
                  <SelectValue placeholder="श्रेणी चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="BUSINESS_PLAN">बिजनेस प्लान (DPR / Pitch)</SelectItem>
                    <SelectItem value="GOVT_GUIDELINE">सरकारी निर्देश व नीतियां</SelectItem>
                    <SelectItem value="FINANCIAL_TOOL">वित्तीय कैलकुलेटर व टूल</SelectItem>
                    <SelectItem value="MARKETING_GUIDE">मार्केटिंग एवं पैकेजिंग गाइड</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">संक्षिप्त विवरण</label>
              <Textarea
                placeholder="रिसोर्स की जानकारी व उपयोगिता विवरण..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="rounded-xl bg-slate-50 text-xs h-20"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">रिसोर्स / पीडीएफ लिंक (URL)</label>
              <Input
                type="url"
                placeholder="https://drive.google.com/... या पीडीएफ लिंक"
                value={form.resourceUrl}
                onChange={(e) => setForm({ ...form, resourceUrl: e.target.value })}
                className="h-10 rounded-xl bg-slate-50 text-xs font-mono"
              />
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
                <span>सहेजें (Save)</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
