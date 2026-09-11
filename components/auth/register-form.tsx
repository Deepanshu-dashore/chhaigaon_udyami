"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  UserPlus,
  Briefcase,
  GraduationCap,
  Store,
  ShieldCheck,
} from "lucide-react";

export function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"STUDENT" | "TRAINER" | "MARKET_PARTNER">("STUDENT");
  const [agreeTerms, setAgreeTerms] = useState(true);

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
          redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
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

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!agreeTerms) {
      setErrorMessage("कृपया नियम एवं शर्तें स्वीकार करें (Please accept terms & conditions).");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("पासवर्ड कम से कम 6 अक्षरों का होना चाहिए (Password must be at least 6 characters).");
      return;
    }

    setLoading(true);

    try {
      const browserSupabase = createClient();

      // 1. Register with Supabase Auth
      const { data, error } = await browserSupabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          data: {
            name,
            mobile,
            role,
          },
        },
      });

      if (error) throw error;

      // 2. Sync to backend Prisma User model
      try {
        const syncRes = await fetch("/api/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            name,
            mobile,
            role,
          }),
        });

        if (!syncRes.ok) {
          console.warn("Prisma user sync returned non-200 status.");
        }
      } catch (syncErr) {
        console.error("Backend sync failed:", syncErr);
      }

      if (data.session) {
        setSuccessMessage("पंजीकरण सफल रहा! आपको डैशबोर्ड पर भेजा जा रहा है...");
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1200);
      } else {
        setSuccessMessage(
          "पंजीकरण सफल! कृपया अपने ईमेल इनबॉक्स में जाकर खाता सक्रिय करें (Check your email to verify account)."
        );
      }
    } catch (err: any) {
      setErrorMessage(
        err?.message || "पंजीकरण में त्रुटि हुई। कृपया पुनः प्रयास करें।"
      );
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    {
      id: "STUDENT" as const,
      label: "उद्यमी / शिक्षार्थी",
      subtext: "नई तकनीक व व्यापार सीखें",
      icon: GraduationCap,
    },
    {
      id: "TRAINER" as const,
      label: "प्रशिक्षक (Trainer)",
      subtext: "अपना कोर्स व ज्ञान साझा करें",
      icon: Briefcase,
    },
    {
      id: "MARKET_PARTNER" as const,
      label: "व्यापार सहयोगी",
      subtext: "उत्पाद एवं बाज़ार लिंकेज",
      icon: Store,
    },
  ];

  return (
    <Card className="w-full max-w-lg border-slate-200 shadow-xl bg-white rounded-2xl">
      <CardHeader className="space-y-1 text-center pb-5">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 border border-emerald-100 shadow-sm">
          <UserPlus className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl font-semibold tracking-tight text-on-surface font-headline">
          निःशुल्क खाता बनाएं (Register)
        </CardTitle>
        <p className="text-sm text-slate-500">
          ग्रामीण उद्यमिता क्रांति से जुड़ें और अपनी नई यात्रा शुरू करें
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Error / Success Notifications */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5">
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{successMessage}</span>
          </div>
        )}

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading || loading}
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition shadow-sm disabled:opacity-60 cursor-pointer"
        >
          {googleLoading ? (
            <span className="h-4 w-4 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin" />
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24">
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
          <span>Google के साथ शुरू करें (Sign up with Google)</span>
        </button>

        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-3 text-slate-400 font-semibold">
              या विवरण भरें
            </span>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Role Selection Tabs */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
              आपकी भूमिका चुनें (Choose Role)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {roleOptions.map((opt) => {
                const isSelected = role === opt.id;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRole(opt.id)}
                    className={`p-2.5 rounded-xl border text-left flex flex-col items-center sm:items-start transition-all cursor-pointer ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50 text-emerald-950 shadow-sm"
                        : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 mb-1 ${
                        isSelected ? "text-emerald-700" : "text-slate-400"
                      }`}
                    />
                    <span className="text-xs font-bold leading-tight line-clamp-1">
                      {opt.label}
                    </span>
                    <span className="text-[10px] text-slate-500 hidden sm:inline line-clamp-1 mt-0.5">
                      {opt.subtext}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-slate-400" />
              पूरा नाम (Full Name)
            </label>
            <Input
              type="text"
              placeholder="उदा. रमेश कुमार"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11 rounded-xl bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500"
            />
          </div>

          {/* Email & Mobile Number Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-slate-400" />
                ईमेल (Email)
              </label>
              <Input
                type="email"
                placeholder="aapka.naam@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-xl bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-slate-400" />
                मोबाइल नंबर (Mobile)
              </label>
              <Input
                type="tel"
                placeholder="9876543210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="h-11 rounded-xl bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-slate-400" />
              पासवर्ड बनाएं (Create Password)
            </label>
            <Input
              type="password"
              placeholder="कम से कम 6 अक्षर"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11 rounded-xl bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500"
            />
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start gap-2 pt-1">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs text-slate-600 leading-tight">
              मैं Chhaigaon Udyami के{" "}
              <Link href="/terms" className="text-emerald-700 font-medium hover:underline">
                नियम व शर्तों
              </Link>{" "}
              तथा{" "}
              <Link href="/privacy" className="text-emerald-700 font-medium hover:underline">
                गोपनीयता नीति
              </Link>{" "}
              से सहमत हूँ।
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 text-sm font-semibold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md shadow-emerald-600/20 text-white transition-all cursor-pointer"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                खाता तैयार हो रहा है...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                खाता बनाएं (Create Account)
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2">
          पहले से खाता मौजूद है?{" "}
          <Link
            href="/login"
            className="font-bold text-emerald-700 hover:underline"
          >
            यहाँ लॉग इन करें (Sign In)
          </Link>
        </div>

        <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
          <span>100% सुरक्षित पंजीकरण • कोई छुपा शुल्क नहीं</span>
        </div>
      </CardContent>
    </Card>
  );
}
