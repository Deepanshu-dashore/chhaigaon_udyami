"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  Store,
  Plus,
  Search,
  RefreshCw,
  MapPin,
  Phone,
  Globe,
  ExternalLink,
  Users,
} from "lucide-react";

interface PartnerItem {
  id: string;
  name: string;
  businessType?: string | null;
  description?: string | null;
  location?: string | null;
  contact?: string | null;
  website?: string | null;
  status: boolean;
  _count?: { leads: number };
}

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [createOpen, setCreateOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    businessType: "MACHINERY_SUPPLIER",
    description: "",
    location: "Khandwa, MP",
    contact: "",
    website: "",
  });

  const fetchPartners = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);

      const res = await fetch(`/api/admin/partners?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setPartners(data.data);
      }
    } catch (err) {
      toast.error("मार्केट पार्टनर डेटा लोड करने में विफल");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchPartners();
  }, [fetchPartners]);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) {
      toast.error("मार्केट पार्टनर का नाम आवश्यक है");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/partners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("नया B2B मार्केट पार्टनर सफलतापूर्वक जोड़ा गया! 🤝");
        setCreateOpen(false);
        setForm({
          name: "",
          businessType: "MACHINERY_SUPPLIER",
          description: "",
          location: "Khandwa, MP",
          contact: "",
          website: "",
        });
        fetchPartners();
      } else {
        toast.error(data.error || "जोड़ने में समस्या आई");
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
            B2B मार्केट पार्टनर्स (Market Partners Directory)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-body mt-0.5">
            मशीनरी आपूर्तिकर्ताओं, पैकेजिंग व रॉ-मटीरियल वेंडर्स का डायरेक्टरी प्रबंधन
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchPartners}
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
            <span>नया पार्टनर जोड़ें</span>
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
              placeholder="नाम, व्यवसाय प्रकार या स्थान से खोजें..."
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
              <p className="text-xs text-slate-500">मार्केट पार्टनर डेटा लोड हो रहा है...</p>
            </div>
          ) : partners.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Store className="size-10 mx-auto text-slate-300" />
              <p className="text-sm font-semibold text-slate-700">कोई मार्केट पार्टनर रिकॉर्ड नहीं मिला</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/70 border-b border-slate-100">
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Partner Name</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Business Category</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Location</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Contact</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase text-right">Assigned Leads</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {partners.map((p) => (
                    <TableRow key={p.id} className="hover:bg-slate-50/80 border-b border-slate-100">
                      <TableCell className="text-xs font-bold text-slate-900">
                        {p.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 text-[10px] font-bold">
                          {p.businessType || "VENDOR"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="size-3 text-slate-400" />
                          {p.location || "N/A"}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs font-mono text-slate-800">
                        {p.contact || "N/A"}
                      </TableCell>
                      <TableCell className="text-right text-xs font-bold text-[#0056d2]">
                        {p._count?.leads || 0} लीड्स
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Create Partner Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-lg bg-white rounded-2xl p-6 border-slate-200">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold font-headline text-slate-900 flex items-center gap-2">
              <Store className="size-5 text-[#0056d2]" />
              <span>नया B2B मार्केट पार्टनर जोड़ें</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              मशीनरी आपूर्तिकर्ता, पैकेजिंग पार्टनर या लॉजिस्टिक्स वेंडर का विवरण दर्ज करें
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">संस्था / पार्टनर का नाम *</label>
              <Input
                type="text"
                placeholder="उदा. एमपी एग्रो मशीनरी कॉर्पोरेशन"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="h-10 rounded-xl bg-slate-50 text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">व्यापार श्रेणी</label>
                <select
                  value={form.businessType}
                  onChange={(e) => setForm({ ...form, businessType: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800"
                >
                  <option value="MACHINERY_SUPPLIER">मशीनरी एवं प्लांट सप्लाई</option>
                  <option value="PACKAGING_VENDOR">पैकेजिंग व ब्रांडिंग मटेरियल</option>
                  <option value="RAW_MATERIAL">कच्चा माल (Raw Material)</option>
                  <option value="COLD_STORAGE">कोल्ड स्टोरेज व लॉजिस्टिक्स</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">स्थान (Location)</label>
                <Input
                  type="text"
                  placeholder="उदा. खंडवा / इंदौर"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="h-10 rounded-xl bg-slate-50 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">संपर्क नंबर / ईमेल</label>
                <Input
                  type="text"
                  placeholder="9876543210"
                  value={form.contact}
                  onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  className="h-10 rounded-xl bg-slate-50 text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">वेबसाइट लिंक</label>
                <Input
                  type="url"
                  placeholder="https://partnerwebsite.com"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="h-10 rounded-xl bg-slate-50 text-xs font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1">विवरण</label>
              <Textarea
                placeholder="पार्टनर की विशेषताएं, उत्पाद और आपूर्ति क्षमता..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="rounded-xl bg-slate-50 text-xs h-20"
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
                <span>पार्टनर सहेजें</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
