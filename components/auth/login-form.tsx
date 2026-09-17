"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
} from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirectedFrom") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    setErrorMessage(null);
    setLoading(true);

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
      <Card className="w-full max-w-md bg-white border-slate-200 shadow-xl rounded-2xl overflow-hidden font-sans">
        <CardHeader className="text-center pb-2 pt-6 px-6 sm:px-8">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0056d2] mb-3 shadow-xs">
            <LogIn className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-950 font-headline">
            लॉग इन करें
          </CardTitle>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            अपने छैगांव उद्यमी खाते में प्रवेश करें
          </p>
        </CardHeader>

        <CardContent className="p-6 sm:p-8 pt-4 space-y-5">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Shadcn Google Login Button */}
          <GoogleLoginButton
            redirectPath={redirectTo}
            label="Google खाते से लॉग इन करें"
          />

          <div className="relative flex items-center justify-center my-2">
            <div className="border-t border-slate-200 w-full" />
            <div className="absolute bg-white px-3 text-xs font-semibold text-slate-400">
              या ईमेल से
            </div>
          </div>

          {/* Email & Password Form using Shadcn Input & Button */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-blue-600" />
                <span>ईमेल पता (Email Address)</span>
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="apka.naam@example.com"
                required
                autoComplete="email"
                className="h-11 rounded-xl bg-slate-50/80 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#0056d2] focus-visible:ring-[#0056d2]/20 text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-blue-600" />
                  <span>पासवर्ड (Password)</span>
                </label>
                <Link
                  href="/auth/forgot-password"
                  className="text-xs text-blue-700 hover:text-blue-900 font-bold hover:underline"
                >
                  पासवर्ड भूल गए?
                </Link>
              </div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                className="h-11 rounded-xl bg-slate-50/80 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#0056d2] focus-visible:ring-[#0056d2]/20 text-xs sm:text-sm"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 text-xs sm:text-sm font-bold rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-[0.99]"
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
              className="text-blue-700 font-bold hover:text-blue-900 hover:underline"
            >
              नया खाता बनाएं (Register Free)
            </Link>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
            <span>सुरक्षित 256-बिट एन्क्रिप्शन प्रमाणीकरण</span>
          </div>
        </CardContent>
      </Card>

      {/* Login Confirmation Modal (Shadcn Dialog Component) */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="sm:max-w-md bg-white p-6 rounded-2xl shadow-2xl border border-slate-200">
          <DialogHeader className="text-center sm:text-center space-y-3">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm animate-in zoom-in-95 duration-200">
              <CheckCircle2 className="h-9 w-9" />
            </div>
            <DialogTitle className="text-2xl font-bold text-slate-950 font-headline">
              लॉगिन सफल रहा! 🎉
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-slate-600">
              आपका सत्र सुरक्षित रूप से सत्यापित कर लिया गया है।
            </DialogDescription>
          </DialogHeader>

          <div className="my-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5 text-xs sm:text-sm">
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
              <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-full text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                प्रमाणीकृत (Active)
              </span>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-2">
            <Button
              type="button"
              onClick={handleProceed}
              className="w-full h-11 text-xs sm:text-sm font-bold rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white shadow-md cursor-pointer flex items-center justify-center gap-2"
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