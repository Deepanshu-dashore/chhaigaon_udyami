"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AdminSearchInput } from "@/components/admin/admin-search-input";
import { AdminPagination, PaginationMeta } from "@/components/admin/admin-pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Store,
  Search,
  RefreshCw,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
} from "lucide-react";

interface LeadItem {
  id: string;
  userId: string;
  partnerId: string;
  message?: string | null;
  status: string; // "NEW" | "CONTACTED" | "IN_PROGRESS" | "RESOLVED"
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email?: string | null;
    mobile?: string | null;
    profile?: { district?: string | null; state?: string | null; businessName?: string | null };
  };
  partner?: {
    id: string;
    name: string;
    businessType?: string | null;
  };
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Pagination State
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [meta, setMeta] = useState<PaginationMeta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      params.set("page", page.toString());
      params.set("limit", limit.toString());

      const res = await fetch(`/api/admin/leads?${params.toString()}`);
      const data = await res.json();
      if (res.ok && data.leads) {
        setLeads(data.leads);
        if (data.meta) {
          setMeta(data.meta);
        }
      }
    } catch (err) {
      console.error("Failed to load leads:", err);
    } finally {
      setLoading(false);
    }
  }, [search, page, limit]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: leadId, status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
      }
    } catch (err) {
      console.error("Failed to update lead status:", err);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW":
        return <Badge className="bg-rose-100 text-rose-800 text-[10px] font-bold">नया (New)</Badge>;
      case "CONTACTED":
        return <Badge className="bg-blue-100 text-blue-800 text-[10px] font-bold">संपर्क किया</Badge>;
      case "IN_PROGRESS":
        return <Badge className="bg-amber-100 text-amber-800 text-[10px] font-bold">प्रक्रियाधीन</Badge>;
      case "RESOLVED":
        return <Badge className="bg-emerald-100 text-emerald-800 text-[10px] font-bold">सत्यापित / पूर्ण</Badge>;
      default:
        return <Badge variant="secondary" className="text-[10px]">{status}</Badge>;
    }
  };

  const filteredLeads = leads.filter(
    (l) =>
      (l.user?.name && l.user.name.toLowerCase().includes(search.toLowerCase())) ||
      (l.user?.email && l.user.email.toLowerCase().includes(search.toLowerCase())) ||
      (l.user?.mobile && l.user.mobile.includes(search)) ||
      (l.message && l.message.toLowerCase().includes(search.toLowerCase())) ||
      (l.partner?.name && l.partner.name.toLowerCase().includes(search.toLowerCase())) ||
      (l.id && l.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-lg border border-slate-200 shadow-2xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Store className="h-5 w-5 text-purple-600" />
            <h1 className="text-xl font-bold text-slate-900 font-headline">
              आवेदन एवं लीड प्रबंधन (Subsidy &amp; Market Leads)
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-body">
            विद्यार्थियों द्वारा भेजे गए प्रवेश आवेदनों, सब्सिडी पूछताछ तथा B2B पार्टनर्स लीड्स का प्रबंधन करें।
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchLeads}
          disabled={loading}
          className="h-9 rounded-lg text-xs gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>रिफ्रेश</span>
        </Button>
      </div>

      {/* Search and Stats */}
      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
        <AdminSearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setPage(1);
          }}
          placeholder="Search by Applicant Name, Mobile, Email, Interest or Lead ID... (Esc to clear)"
        />

        <div className="text-xs text-slate-500 font-semibold">
          Total Leads: <strong className="text-slate-900">{filteredLeads.length}</strong>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="text-xs font-bold text-slate-700">आवेदक (Applicant)</TableHead>
              <TableHead className="text-xs font-bold text-slate-700">संपर्क विवरण</TableHead>
              <TableHead className="text-xs font-bold text-slate-700">आवेदन संदेश / विवरण</TableHead>
              <TableHead className="text-xs font-bold text-slate-700">पार्टनर / Cell</TableHead>
              <TableHead className="text-xs font-bold text-slate-700">स्थिति (Status)</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-xs text-slate-500">
                  डेटा लोड हो रहा है...
                </TableCell>
              </TableRow>
            ) : filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-xs text-slate-500">
                  कोई आवेदन या लीड प्राप्त नहीं हुआ है।
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                  <TableCell className="font-medium">
                    <div className="space-y-0.5">
                      <p className="font-bold text-xs text-slate-900">{lead.user?.name || "अज्ञात"}</p>
                      <p className="text-[10px] text-slate-400">
                        {lead.user?.profile?.district || "खंडवा"}, {lead.user?.profile?.state || "MP"}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="text-xs text-slate-700">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-slate-900">{lead.user?.mobile || "—"}</p>
                      <p className="text-[10px] text-slate-400">{lead.user?.email || "—"}</p>
                    </div>
                  </TableCell>

                  <TableCell className="text-xs text-slate-600 max-w-sm">
                    <p className="line-clamp-2 leading-relaxed font-mono text-[11px] bg-slate-50 p-2 rounded-lg border border-slate-200/80">
                      {lead.message || "प्रवेश एवं सब्सिडी पूछताछ"}
                    </p>
                  </TableCell>

                  <TableCell className="text-xs text-slate-700">
                    <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 text-[10px]">
                      {lead.partner?.name || "DIC Khandwa Cell"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Select
                        value={lead.status}
                        onValueChange={(val) => handleStatusChange(lead.id, val)}
                      >
                        <SelectTrigger className="h-8 w-32 text-xs rounded-lg">
                          <SelectValue>{getStatusBadge(lead.status)}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NEW">नया (New)</SelectItem>
                          <SelectItem value="CONTACTED">संपर्क किया</SelectItem>
                          <SelectItem value="IN_PROGRESS">प्रक्रियाधीन</SelectItem>
                          <SelectItem value="RESOLVED">सत्यापित / पूर्ण</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {!loading && leads.length > 0 && (
          <AdminPagination
            meta={meta}
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
