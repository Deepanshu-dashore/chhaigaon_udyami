"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import {
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  LogIn,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Eye,
  EyeOff,
} from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirectedFrom") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Login Confirmation Modal Dialog State
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState<{
    email: string;
    name?: string;
  } | null>(null);
  const [countdown, setCountdown] = useState(3);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      const browserSupabase = createClient();
      const { data, error } = await browserSupabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Successful login - Open Shadcn Confirmation Modal
      setAuthenticatedUser({
        email: data.user.email || email,
        name:
          data.user.user_metadata?.full_name ||
          data.user.user_metadata?.name ||
          email.split("@")[0],
      });
      setShowConfirmModal(true);
      setCountdown(3);
    } catch (err: unknown) {
      const errMsg =
        err instanceof Error ? err.message : "लॉग इन करने में त्रुटि हुई।";
      setErrorMessage(
        errMsg === "Invalid login credentials"
          ? "ईमेल या पासवर्ड गलत है। कृपया पुनः प्रयास करें।"
          : errMsg
      );
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = () => {
    setShowConfirmModal(false);
    router.push(redirectTo);
    router.refresh();
  };

  // Auto redirect after countdown when modal opens
  useEffect(() => {
    if (!showConfirmModal) return;

    if (countdown <= 0) {
      handleProceed();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [showConfirmModal, countdown]);

  return (
    <>
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl border border-white/80 shadow-2xl shadow-blue-950/30 rounded-2xl overflow-hidden font-sans ring-1 ring-slate-900/5">
        <CardHeader className="text-center pb-2 pt-7 px-6 sm:px-8 space-y-2">
          <div className="mx-auto h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0056d2] shadow-xs ring-4 ring-blue-50/60">
            <LogIn className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-950 font-headline">
            लॉग इन करें
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm text-slate-500 font-normal">
            अपने छैगांव उद्यमी खाते में सुरक्षित प्रवेश करें
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 pt-4 space-y-4">
          {errorMessage && (
            <Alert variant="destructive" className="bg-rose-50/90 border-rose-200 text-rose-800 rounded-xl py-2.5 px-3.5 animate-in fade-in duration-200">
              <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
              <AlertDescription className="text-xs sm:text-sm font-medium text-rose-700 ml-1.5">
                {errorMessage}
              </AlertDescription>
            </Alert>
          )}

          {/* Shadcn Google Login Button */}
          <GoogleLoginButton
            redirectPath={redirectTo}
            label="Google खाते से लॉग इन करें"
          />

          <div className="relative flex items-center justify-center my-1.5">
            <Separator className="w-full bg-slate-200" />
            <span className="absolute bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              या ईमेल द्वारा
            </span>
          </div>

          {/* Email & Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="login-email" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-blue-600" />
                <span>ईमेल पता (Email)</span>
              </Label>
              <Input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="apka.naam@example.com"
                required
                autoComplete="email"
                className="h-11 rounded-xl bg-slate-50/70 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#0056d2] focus-visible:ring-4 focus-visible:ring-[#0056d2]/10 transition-all text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="login-password" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-blue-600" />
                  <span>पासवर्ड (Password)</span>
                </Label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                >
                  पासवर्ड भूल गए?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="h-11 pr-10 rounded-xl bg-slate-50/70 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#0056d2] focus-visible:ring-4 focus-visible:ring-[#0056d2]/10 transition-all text-xs sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 text-xs sm:text-sm font-semibold rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 transition-all cursor-pointer active:scale-[0.99]"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" variant="white" />
                  <span>लॉग इन हो रहा है...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>लॉग इन करें (Sign In)</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="pt-2 text-center text-xs sm:text-sm text-slate-600 border-t border-slate-100">
            <span>खाता नहीं है? </span>
            <Link
              href="/register"
              className="text-[#0056d2] font-bold hover:text-blue-800 hover:underline"
            >
              नया खाता बनाएं (Register Free)
            </Link>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-0.5">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
            <span>सुरक्षित 256-बिट एन्क्रिप्शन प्रमाणीकरण</span>
          </div>
        </CardContent>
      </Card>

      {/* Login Confirmation Modal (Shadcn Dialog Component) */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-xl shadow-2xl border border-slate-200">
          <DialogHeader className="text-center sm:text-center space-y-3">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-950 font-headline">
              लॉगिन सफल रहा! 🎉
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-slate-600">
              आपका सत्र सुरक्षित रूप से सत्यापित कर लिया गया है।
            </DialogDescription>
          </DialogHeader>

          <div className="my-3 p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">खाता धारक</span>
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <UserCheck className="h-4 w-4 text-[#0056d2]" />
                {authenticatedUser?.name || "उद्यमी"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 font-medium">ईमेल पता</span>
              <span className="font-medium text-slate-800">
                {authenticatedUser?.email}
              </span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
              <span className="text-slate-500 font-medium">सत्र स्थिति</span>
              <Badge variant="outline" className="font-bold text-emerald-700 bg-emerald-100/60 border-emerald-200 gap-1.5 text-xs rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                प्रमाणीकृत (Active)
              </Badge>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-2">
            <Button
              type="button"
              onClick={handleProceed}
              className="w-full h-11 text-xs sm:text-sm font-bold rounded-lg bg-[#0056d2] hover:bg-blue-700 text-white shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>डैशबोर्ड पर आगे बढ़ें ({countdown}s)</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}