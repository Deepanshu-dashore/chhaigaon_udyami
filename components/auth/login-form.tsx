"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  LogIn,
  ShieldCheck,
} from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get("redirectedFrom") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setErrorMessage(null);
    try {
      const browserSupabase = createClient();
      const { data, error } = await browserSupabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Google साइन-इन में समस्या आई।");
      setGoogleLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const browserSupabase = createClient();
      const { error } = await browserSupabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      setSuccessMessage("सफलतापूर्वक लॉग इन हुआ! आपको रीडायरेक्ट किया जा रहा है...");
      router.push(redirectTo);
      router.refresh();
    } catch (err: any) {
      setErrorMessage(
        err?.message === "Invalid login credentials"
          ? "ईमेल या पासवर्ड गलत है। कृपया पुनः प्रयास करें।"
          : err?.message || "लॉग इन करने में त्रुटि हुई।"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-white border-slate-200/80 shadow-xl rounded-2xl overflow-hidden font-sans">
      <CardHeader className="text-center pb-2 pt-6 px-6 sm:px-8">
        <div className="mx-auto h-12 w-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 mb-3 shadow-inner">
          <LogIn className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl font-semibold tracking-tight text-on-surface font-headline">
          लॉग इन करें
        </CardTitle>
        <p className="text-sm text-slate-500 mt-1">
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

        {successMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200">
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{successMessage}</span>
          </div>
        )}

        {/* Google Sign-in */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition shadow-sm disabled:opacity-60 cursor-pointer"
        >
          {googleLoading ? (
            <div className="h-4 w-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          <span>Google खाते से लॉग इन करें</span>
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <div className="absolute bg-white px-3 text-xs font-semibold text-slate-400">
            या ईमेल से
          </div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-1.5">
              <Mail className="h-3.5 w-3.5 text-slate-400" />
              ईमेल पता (Email)
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="apka.naam@example.com"
              required
              className="rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-slate-400" />
                पासवर्ड (Password)
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-emerald-700 hover:text-emerald-800 font-medium hover:underline"
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
              className="rounded-xl border-slate-200 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>

          <Button
            type="submit"
            disabled={loading || googleLoading}
            className="w-full py-2.5 h-11 text-base font-semibold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-md shadow-emerald-600/20 transition cursor-pointer"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>लॉग इन हो रहा है...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2">
                <span>लॉग इन करें</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            )}
          </Button>
        </form>

        <div className="pt-2 text-center text-xs sm:text-sm text-slate-600 border-t border-slate-100">
          <span>खाता नहीं है? </span>
          <Link
            href="/register"
            className="text-emerald-700 font-semibold hover:underline"
          >
            नया खाता बनाएं (Register)
          </Link>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>सुरक्षित 256-बिट एन्क्रिप्शन प्रमाणीकरण</span>
        </div>
      </CardContent>
    </Card>
  );
}