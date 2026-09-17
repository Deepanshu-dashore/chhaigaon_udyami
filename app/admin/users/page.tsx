"use client";

import React, { useState, useEffect, useCallback } from "react";
import UserAvatar from "@/components/ui/user-avatar";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Users,
  UserPlus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  GraduationCap,
  Briefcase,
  Store,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
  RefreshCw,
  Mail,
  Phone,
  Lock,
  User as UserIcon,
} from "lucide-react";

interface UserItem {
  id: string;
  name: string | null;
  email: string | null;
  mobile: string | null;
  role: "STUDENT" | "TRAINER" | "MARKET_PARTNER" | "MENTOR" | "CONTENT_MANAGER" | "ADMIN" | "SUPER_ADMIN";
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | "BLOCKED";
  isVerified: boolean;
  isOnline: boolean;
  createdAt: string;
  profile?: {
    profilePhoto?: string | null;
    district?: string | null;
    state?: string | null;
  } | null;
  _count?: {
    enrollments: number;
    certificates: number;
    activityLogs: number;
  };
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Create User Modal State
  const [createOpen, setCreateOpen] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createForm, setCreateForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    role: "STUDENT" as const,
    status: "ACTIVE" as const,
    isVerified: true,
  });

  // Edit User Modal State
  const [editOpen, setEditOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);

  // Delete User Confirmation State
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deletingUser, setDeletingUser] = useState<UserItem | null>(null);

  // Fetch Users
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (selectedRole !== "ALL") params.set("role", selectedRole);
      if (selectedStatus !== "ALL") params.set("status", selectedStatus);

      const res = await fetch(`/api/admin/users?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
      } else {
        toast.error(data.error || "उपयोगकर्ता लोड करने में विफल");
      }
    } catch (err) {
      toast.error("डेटाबेस से कनेक्ट करने में त्रुटि हुई");
    } finally {
      setLoading(false);
    }
  }, [search, selectedRole, selectedStatus]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handle Create User Submit
  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreateLoading(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("नया उपयोगकर्ता सफलतापूर्वक जोड़ा गया! 🎉");
        setCreateOpen(false);
        setCreateForm({
          name: "",
          email: "",
          mobile: "",
          password: "",
          role: "STUDENT",
          status: "ACTIVE",
          isVerified: true,
        });
        fetchUsers();
      } else {
        toast.error(data.error || "उपयोगकर्ता बनाने में समस्या आई");
      }
    } catch (err) {
      toast.error("सर्वर से कनेक्ट करने में त्रुटि");
    } finally {
      setCreateLoading(false);
    }
  };

  // Handle Edit User Submit
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setEditLoading(true);

    try {
      const res = await fetch(`/api/admin/users/${editingUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editingUser.name,
          email: editingUser.email,
          mobile: editingUser.mobile,
          role: editingUser.role,
          status: editingUser.status,
          isVerified: editingUser.isVerified,
        }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success("उपयोगकर्ता विवरण अपडेट कर दिया गया!");
        setEditOpen(false);
        setEditingUser(null);
        fetchUsers();
      } else {
        toast.error(data.error || "अपडेट विफल रहा");
      }
    } catch (err) {
      toast.error("अपडेट करने में समस्या आई");
    } finally {
      setEditLoading(false);
    }
  };

  // Handle Delete User
  const handleDeleteConfirm = async () => {
    if (!deletingUser) return;
    setDeleteLoading(true);

    try {
      const res = await fetch(`/api/admin/users/${deletingUser.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        toast.success("उपयोगकर्ता सफलतापूर्वक हटा दिया गया!");
        setDeleteOpen(false);
        setDeletingUser(null);
        fetchUsers();
      } else {
        toast.error(data.error || "हटाने में विफल");
      }
    } catch (err) {
      toast.error("हटाने में समस्या आई");
    } finally {
      setDeleteLoading(false);
    }
  };

  const roleCounts = {
    total: users.length,
    students: users.filter((u) => u.role === "STUDENT").length,
    trainers: users.filter((u) => u.role === "TRAINER").length,
    admins: users.filter((u) => u.role === "ADMIN" || u.role === "SUPER_ADMIN").length,
  };

  return (
    <div className="space-y-6">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-headline">
            उपयोगकर्ता प्रबंधन (User Management)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-body mt-0.5">
            सभी पंजीकृत उद्यमी, प्रशिक्षक एवं एडमिनिस्ट्रेटर खातों का प्रबंधन करें
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchUsers}
            disabled={loading}
            className="rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 text-xs h-9 gap-1.5"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>रिफ्रेश</span>
          </Button>

          <Button
            onClick={() => setCreateOpen(true)}
            size="sm"
            className="rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white font-semibold text-xs h-9 gap-1.5 shadow-sm cursor-pointer"
          >
            <UserPlus className="size-4" />
            <span>नया उपयोगकर्ता जोड़ें</span>
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="bg-white border-slate-200/80 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">कुल उपयोगकर्ता</p>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 font-numeric">
                {roleCounts.total}
              </p>
            </div>
            <div className="size-9 rounded-xl bg-blue-50 text-[#0056d2] flex items-center justify-center">
              <Users className="size-4.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200/80 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">उद्यमी / छात्र</p>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 font-numeric">
                {roleCounts.students}
              </p>
            </div>
            <div className="size-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <GraduationCap className="size-4.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200/80 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">प्रशिक्षक (Trainers)</p>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 font-numeric">
                {roleCounts.trainers}
              </p>
            </div>
            <div className="size-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Briefcase className="size-4.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200/80 shadow-xs">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium">प्रशासक (Admins)</p>
              <p className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5 font-numeric">
                {roleCounts.admins}
              </p>
            </div>
            <div className="size-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShieldCheck className="size-4.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search & Filter Bar */}
      <Card className="bg-white border-slate-200/80 shadow-xs">
        <CardContent className="p-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
            <Input
              type="text"
              placeholder="नाम, ईमेल या मोबाइल से खोजें..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 pl-9 pr-3 rounded-xl bg-slate-50/70 border-slate-200 text-xs focus-visible:bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Role Filter Buttons */}
            {["ALL", "STUDENT", "TRAINER", "MARKET_PARTNER", "ADMIN"].map((role) => (
              <Button
                key={role}
                type="button"
                size="sm"
                variant={selectedRole === role ? "default" : "ghost"}
                onClick={() => setSelectedRole(role)}
                className={`h-8 px-2.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  selectedRole === role
                    ? "bg-[#0056d2] text-white shadow-2xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {role === "ALL"
                  ? "सभी"
                  : role === "STUDENT"
                  ? "उद्यमी"
                  : role === "TRAINER"
                  ? "प्रशिक्षक"
                  : role === "MARKET_PARTNER"
                  ? "पार्टनर"
                  : "एडमिन"}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Users Data Table Card */}
      <Card className="bg-white border-slate-200 shadow-xs overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="py-16 flex flex-col items-center justify-center gap-2">
              <Spinner size="lg" variant="default" />
              <p className="text-xs text-slate-500">डेटाबेस से लोड हो रहा है...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Users className="size-10 mx-auto text-slate-300" />
              <p className="text-sm font-semibold text-slate-700">कोई उपयोगकर्ता नहीं मिला</p>
              <Button
                onClick={() => setCreateOpen(true)}
                size="sm"
                className="bg-[#0056d2] text-white rounded-xl text-xs"
              >
                पहला उपयोगकर्ता बनाएं
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-slate-100 bg-slate-50/60">
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">User</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Role</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Contact</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Status</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase">Joined</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-600 uppercase text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((u) => {
                    const avatarUrl = u.profile?.profilePhoto || null;
                    return (
                      <TableRow key={u.id} className="hover:bg-slate-50/70 border-b border-slate-100">
                        {/* User Identity */}
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <UserAvatar
                              src={avatarUrl}
                              name={u.name || "U"}
                              size="sm"
                              className="size-8.5 shrink-0"
                            />
                            <div>
                              <p className="text-xs font-bold text-slate-900 leading-tight">
                                {u.name || "अनाम उपयोगकर्ता"}
                              </p>
                              <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                                {u.email || "ईमेल नहीं"}
                              </p>
                            </div>
                          </div>
                        </TableCell>

                        {/* Role Badge */}
                        <TableCell>
                          <Badge
                            variant="secondary"
                            className={`text-[10px] font-bold border-0 ${
                              u.role === "ADMIN" || u.role === "SUPER_ADMIN"
                                ? "bg-purple-100 text-purple-800"
                                : u.role === "TRAINER"
                                ? "bg-amber-100 text-amber-800"
                                : u.role === "MARKET_PARTNER"
                                ? "bg-indigo-100 text-indigo-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {u.role}
                          </Badge>
                        </TableCell>

                        {/* Contact Info */}
                        <TableCell className="text-xs text-slate-600">
                          {u.mobile ? (
                            <span className="font-mono text-slate-800 font-medium">{u.mobile}</span>
                          ) : (
                            <span className="text-slate-400 text-[11px]">N/A</span>
                          )}
                        </TableCell>

                        {/* Status */}
                        <TableCell>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              u.status === "ACTIVE"
                                ? "bg-emerald-50 text-emerald-700"
                                : u.status === "INACTIVE"
                                ? "bg-slate-100 text-slate-600"
                                : "bg-rose-50 text-rose-700"
                            }`}
                          >
                            <span
                              className={`size-1.5 rounded-full ${
                                u.status === "ACTIVE"
                                  ? "bg-emerald-500"
                                  : u.status === "INACTIVE"
                                  ? "bg-slate-400"
                                  : "bg-rose-500"
                              }`}
                            />
                            {u.status}
                          </span>
                        </TableCell>

                        {/* Joined Date */}
                        <TableCell className="text-slate-500 text-xs font-numeric whitespace-nowrap">
                          {new Date(u.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </TableCell>

                        {/* Action Menu */}
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-8 rounded-lg hover:bg-slate-100 cursor-pointer"
                              >
                                <MoreVertical className="size-4 text-slate-500" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 rounded-xl border-slate-200">
                              <DropdownMenuLabel className="text-[10px] text-slate-400 uppercase">
                                क्रियाएं (Actions)
                              </DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() => {
                                  setEditingUser(u);
                                  setEditOpen(true);
                                }}
                                className="text-xs font-medium cursor-pointer gap-2"
                              >
                                <Edit2 className="size-3.5 text-blue-600" />
                                <span>संपादित करें (Edit)</span>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setDeletingUser(u);
                                  setDeleteOpen(true);
                                }}
                                className="text-xs font-semibold text-rose-600 focus:bg-rose-50 focus:text-rose-700 cursor-pointer gap-2"
                              >
                                <Trash2 className="size-3.5" />
                                <span>हटाएं (Delete)</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 1. Create User Modal Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-lg bg-white rounded-2xl p-6 border-slate-200">
          <DialogHeader className="pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 text-[#0056d2]">
              <UserPlus className="size-5" />
              <DialogTitle className="text-lg font-bold font-headline text-slate-900">
                नया उपयोगकर्ता बनाएं (Add User)
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs text-slate-500">
              डेटाबेस और Supabase Auth में नए सदस्य का खाता पंजीकृत करें
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                <UserIcon className="size-3.5 text-blue-600" />
                <span>पूरा नाम (Full Name) *</span>
              </label>
              <Input
                type="text"
                placeholder="उदा. अमित पाटीदार"
                value={createForm.name}
                onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                required
                className="h-10 rounded-xl bg-slate-50 text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                  <Mail className="size-3.5 text-blue-600" />
                  <span>ईमेल (Email)</span>
                </label>
                <Input
                  type="email"
                  placeholder="user@chhaigaonudyami.in"
                  value={createForm.email}
                  onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                  className="h-10 rounded-xl bg-slate-50 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                  <Phone className="size-3.5 text-blue-600" />
                  <span>मोबाइल नंबर</span>
                </label>
                <Input
                  type="tel"
                  placeholder="9876543210"
                  value={createForm.mobile}
                  onChange={(e) => setCreateForm({ ...createForm, mobile: e.target.value })}
                  className="h-10 rounded-xl bg-slate-50 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
                  <Lock className="size-3.5 text-blue-600" />
                  <span>पासवर्ड (Password)</span>
                </label>
                <Input
                  type="password"
                  placeholder="न्यूनतम 6 अक्षर"
                  value={createForm.password}
                  onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                  className="h-10 rounded-xl bg-slate-50 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1.5">
                  भूमिका (Role)
                </label>
                <select
                  value={createForm.role}
                  onChange={(e: any) => setCreateForm({ ...createForm, role: e.target.value })}
                  className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800 focus:bg-white"
                >
                  <option value="STUDENT">उद्यमी / छात्र (STUDENT)</option>
                  <option value="TRAINER">प्रशिक्षक (TRAINER)</option>
                  <option value="MARKET_PARTNER">मार्केट पार्टनर (MARKET_PARTNER)</option>
                  <option value="ADMIN">प्रशासक (ADMIN)</option>
                </select>
              </div>
            </div>

            <DialogFooter className="pt-3 border-t border-slate-100 flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCreateOpen(false)}
                className="rounded-xl text-xs h-10 font-semibold"
              >
                रद्द करें
              </Button>
              <Button
                type="submit"
                disabled={createLoading}
                className="rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white font-semibold text-xs h-10 gap-2 cursor-pointer"
              >
                {createLoading && <Spinner size="sm" variant="white" />}
                <span>{createLoading ? "बन रहा है..." : "उपयोगकर्ता बनाएं"}</span>
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 2. Edit User Modal Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-lg bg-white rounded-2xl p-6 border-slate-200">
          <DialogHeader className="pb-3 border-b border-slate-100">
            <DialogTitle className="text-lg font-bold font-headline text-slate-900">
              उपयोगकर्ता विवरण संपादित करें
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              भूमिका (Role) और स्थिति (Status) में बदलाव करें
            </DialogDescription>
          </DialogHeader>

          {editingUser && (
            <form onSubmit={handleEditSubmit} className="space-y-4 pt-2">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">पूरा नाम</label>
                <Input
                  type="text"
                  value={editingUser.name || ""}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="h-10 rounded-xl bg-slate-50 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">ईमेल</label>
                  <Input
                    type="email"
                    value={editingUser.email || ""}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="h-10 rounded-xl bg-slate-50 text-xs"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">मोबाइल</label>
                  <Input
                    type="tel"
                    value={editingUser.mobile || ""}
                    onChange={(e) => setEditingUser({ ...editingUser, mobile: e.target.value })}
                    className="h-10 rounded-xl bg-slate-50 text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">भूमिका (Role)</label>
                  <select
                    value={editingUser.role}
                    onChange={(e: any) => setEditingUser({ ...editingUser, role: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800"
                  >
                    <option value="STUDENT">STUDENT</option>
                    <option value="TRAINER">TRAINER</option>
                    <option value="MARKET_PARTNER">MARKET_PARTNER</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">स्थिति (Status)</label>
                  <select
                    value={editingUser.status}
                    onChange={(e: any) => setEditingUser({ ...editingUser, status: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-800"
                  >
                    <option value="ACTIVE">ACTIVE (सक्रिय)</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="BLOCKED">BLOCKED (अवरुद्ध)</option>
                  </select>
                </div>
              </div>

              <DialogFooter className="pt-3 border-t border-slate-100 flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditOpen(false)}
                  className="rounded-xl text-xs h-10"
                >
                  रद्द करें
                </Button>
                <Button
                  type="submit"
                  disabled={editLoading}
                  className="rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white font-semibold text-xs h-10 gap-2 cursor-pointer"
                >
                  {editLoading && <Spinner size="sm" variant="white" />}
                  <span>अपडेट करें</span>
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* 3. Delete User Confirmation Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl p-6 border-slate-200">
          <DialogHeader className="text-center sm:text-center space-y-2">
            <div className="mx-auto size-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Trash2 className="size-6" />
            </div>
            <DialogTitle className="text-lg font-bold font-headline text-slate-900">
              उपयोगकर्ता हटाएं?
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500">
              क्या आप सुनिश्चित हैं कि आप <strong>{deletingUser?.name || deletingUser?.email}</strong> को हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              className="w-full rounded-xl text-xs h-10"
            >
              रद्द करें
            </Button>
            <Button
              type="button"
              variant="destructive"
              disabled={deleteLoading}
              onClick={handleDeleteConfirm}
              className="w-full rounded-xl text-xs h-10 gap-2 bg-rose-600 hover:bg-rose-700 cursor-pointer"
            >
              {deleteLoading && <Spinner size="sm" variant="white" />}
              <span>हटाएं (Delete)</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
