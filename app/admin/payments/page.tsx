"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { AdminPagination, PaginationMeta } from "@/components/admin/admin-pagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { Input } from "@/components/ui/input";
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
  CreditCard,
  TrendingUp,
  Search,
  RefreshCw,
  CheckCircle2,
  Clock,
  XCircle,
  IndianRupee,
  ShieldCheck,
} from "lucide-react";

interface OrderItem {
  id: string;
  amount: number | string;
  currency: string;
  status: "CREATED" | "PAID" | "PENDING" | "FAILED" | "REFUNDED";
  razorpayOrderId: string;
  createdAt: string;
  user: { id: string; name: string; email: string; mobile: string };
  course: { id: string; title: string; price: number };
  payment?: { razorpayPaymentId: string; paidAt: string } | null;
}

export default function AdminPaymentsPage() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    paidCount: 0,
    pendingCount: 0,
    totalOrders: 0,
  });
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

  const fetchPayments = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (selectedStatus !== "ALL") params.set("status", selectedStatus);
      params.set("page", page.toString());
      params.set("limit", limit.toString());

      const res = await fetch(`/api/admin/payments?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
        if (data.stats) setStats(data.stats);
        if (data.meta) setMeta(data.meta);
      }
    } catch (err) {
      toast.error("भुगतान डेटा लोड करने में समस्या आई");
    } finally {
      setLoading(false);
    }
  }, [search, selectedStatus, page, limit]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return (
    <div className="space-y-6 font-sans">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-headline">
            वित्तीय लेन-देन व भुगतान (Payments & Orders)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-body mt-0.5">
            Razorpay गेटवे ऑर्डर्स, फीस कलेक्शन एवं भुगतानों का लेखा-जोखा
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={fetchPayments}
          disabled={loading}
          className="rounded-xl border-slate-200 text-slate-700 text-xs h-9 gap-1.5 self-start sm:self-auto"
        >
          <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>रिफ्रेश</span>
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white border-slate-200 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">कुल कुल राजस्व (Total Revenue)</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 font-numeric">
                ₹{stats.totalRevenue.toLocaleString("en-IN")}
              </p>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                <TrendingUp className="size-3" /> Razorpay Verified
              </span>
            </div>
            <div className="size-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <IndianRupee className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">सफल भुगतान (Successful)</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 font-numeric">
                {stats.paidCount}
              </p>
            </div>
            <div className="size-10 rounded-xl bg-blue-50 text-[#0056d2] flex items-center justify-center">
              <CheckCircle2 className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">लंबित ऑर्डर्स (Pending)</p>
              <p className="text-2xl font-bold text-slate-900 mt-1 font-numeric">
                {stats.pendingCount}
              </p>
            </div>
            <div className="size-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="size-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">सुरक्षा स्थिति (Compliance)</p>
              <p className="text-base font-bold text-purple-700 mt-1 flex items-center gap-1">
                <ShieldCheck className="size-4" /> HMAC SHA-256
              </p>
            </div>
            <div className="size-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <CreditCard className="size-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <Card className="bg-white border-slate-200 shadow-xs">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by Order ID, Customer Name or Course..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="h-10 pl-9 pr-3 rounded-xl bg-slate-50 border-slate-200 text-xs"
            />
          </div>

          <ButtonGroup>
            {[
              { id: "ALL", label: "All" },
              { id: "PAID", label: "Paid" },
              { id: "CREATED", label: "Pending" },
              { id: "FAILED", label: "Failed" },
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

      {/* Data Table */}
      <Card className="bg-white border-slate-200 shadow-xs overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-2">
              <Spinner size="lg" />
              <p className="text-xs text-slate-500">लेन-देन डेटा लोड हो रहा है...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <CreditCard className="size-10 mx-auto text-slate-300" />
              <p className="text-sm font-semibold text-slate-700">कोई भुगतान रिकॉर्ड नहीं मिला</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/70 border-b border-slate-100">
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Razorpay Order ID</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Customer</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Course</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Amount</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Status</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((ord) => (
                    <TableRow key={ord.id} className="hover:bg-slate-50/80 border-b border-slate-100">
                      <TableCell className="text-xs font-mono font-bold text-purple-700">
                        {ord.razorpayOrderId}
                      </TableCell>
                      <TableCell className="text-xs font-semibold text-slate-900">
                        <div>
                          <p>{ord.user?.name || "N/A"}</p>
                          <p className="text-[10px] text-slate-400 font-normal">{ord.user?.email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-slate-800">
                        {ord.course?.title}
                      </TableCell>
                      <TableCell className="text-xs font-bold text-slate-900 font-numeric">
                        ₹{Number(ord.amount).toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="secondary"
                          className={`text-[10px] font-bold ${
                            ord.status === "PAID"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : ord.status === "CREATED"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-rose-50 text-rose-700 border-rose-200"
                          }`}
                        >
                          {ord.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-xs text-slate-500 font-numeric">
                        {new Date(ord.createdAt).toLocaleDateString("en-IN", {
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

          {!loading && orders.length > 0 && (
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
    </div>
  );
}
