"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!agreeTerms) {
      setErrorMessage("कृपया नियम एवं शर्तों से सहमति प्रदान करें।");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("पासवर्ड कम से कम 6 अक्षरों का होना अनिवार्य है।");
      return;
    }

    setLoading(true);

    try {
      const browserSupabase = createClient();

      const { data, error } = await browserSupabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            mobile,
            role,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        setSuccessMessage("खाता सफलतापूर्वक तैयार हुआ! रीडायरेक्ट किया जा रहा है...");
        router.push("/dashboard");
        router.refresh();
      } else {
        setSuccessMessage(
          "पंजीकरण सफल रहा! कृपया अपना ईमेल चेक करें और सत्यापन लिंक पर क्लिक करके लॉगिन करें।"
        );
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "पंजीकरण में त्रुटि हुई।";
      setErrorMessage(
        message === "User already registered"
          ? "यह ईमेल पहले से पंजीकृत है। कृपया लॉगिन करें।"
          : message
      );
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    {
      id: "STUDENT" as const,
      label: "उद्यमी / छात्र",
      subtext: "कौशल व सब्सिडी सीखें",
      icon: GraduationCap,
    },
    {
      id: "TRAINER" as const,
      label: "प्रशिक्षक (Trainer)",
      subtext: "अपना कोर्स साझा करें",
      icon: Briefcase,
    },
    {
      id: "MARKET_PARTNER" as const,
      label: "व्यापार सहयोगी",
      subtext: "उत्पाद व बाज़ार",
      icon: Store,
    },
  ];

  return (
    <Card className="w-full max-w-lg border-slate-200 shadow-xl bg-white rounded-2xl font-sans">
      <CardHeader className="space-y-1 text-center pb-4">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-blue-50 text-[#0056d2] flex items-center justify-center mb-2 border border-blue-100 shadow-xs">
          <UserPlus className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-slate-950 font-headline">
          निःशुल्क खाता बनाएं (Register)
        </CardTitle>
        <p className="text-xs sm:text-sm text-slate-500">
          ग्रामीण उद्यमिता क्रांति से जुड़ें और अपनी नई यात्रा शुरू करें
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Error / Success Notifications */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="leading-relaxed font-medium">{successMessage}</span>
          </div>
        )}

        {/* Shadcn Google OAuth Button */}
        <GoogleLoginButton
          redirectPath="/dashboard"
          role={role}
          label="Google के साथ शुरू करें (Sign up with Google)"
        />

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
          {/* Role Selection */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block">
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
                        ? "border-[#0056d2] bg-blue-50 text-blue-950 shadow-xs font-bold ring-1 ring-[#0056d2]"
                        : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 mb-1 ${
                        isSelected ? "text-[#0056d2]" : "text-slate-400"
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
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-blue-600" />
              <span>पूरा नाम (Full Name)</span>
            </label>
            <Input
              type="text"
              placeholder="उदा. रमेश कुमार"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11 rounded-xl bg-slate-50/80 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#0056d2] focus-visible:ring-[#0056d2]/20 text-xs sm:text-sm"
            />
          </div>

          {/* Email & Mobile Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-blue-600" />
                <span>ईमेल (Email)</span>
              </label>
              <Input
                type="email"
                placeholder="aapka.naam@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-xl bg-slate-50/80 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#0056d2] focus-visible:ring-[#0056d2]/20 text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-blue-600" />
                <span>मोबाइल नंबर (Mobile)</span>
              </label>
              <Input
                type="tel"
                placeholder="9876543210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="h-11 rounded-xl bg-slate-50/80 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#0056d2] focus-visible:ring-[#0056d2]/20 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-blue-600" />
              <span>पासवर्ड बनाएं (Create Password)</span>
            </label>
            <Input
              type="password"
              placeholder="कम से कम 6 अक्षर"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11 rounded-xl bg-slate-50/80 border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#0056d2] focus-visible:ring-[#0056d2]/20 text-xs sm:text-sm"
            />
          </div>

          {/* Agreement Checkbox with Shadcn Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(Boolean(checked))}
              className="mt-0.5"
            />
            <label htmlFor="terms" className="text-xs text-slate-600 leading-tight cursor-pointer">
              मैं Chhaigaon Udyami के{" "}
              <Link href="/terms" className="text-blue-700 font-bold hover:underline">
                नियम व शर्तों
              </Link>{" "}
              तथा{" "}
              <Link href="/privacy" className="text-blue-700 font-bold hover:underline">
                गोपनीयता नीति
              </Link>{" "}
              से सहमत हूँ।
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 text-xs sm:text-sm font-bold rounded-xl bg-[#0056d2] hover:bg-blue-700 shadow-md hover:shadow-lg text-white transition-all cursor-pointer active:scale-[0.99]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner size="sm" variant="white" />
                <span>खाता तैयार हो रहा है...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>खाता बनाएं (Create Account)</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2">
          पहले से खाता मौजूद है?{" "}
          <Link
            href="/login"
            className="font-bold text-blue-700 hover:text-blue-900 hover:underline"
          >
            यहाँ लॉग इन करें (Sign In)
          </Link>
        </div>

        <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5 font-medium">
          <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
          <span>100% सुरक्षित पंजीकरण • कोई छुपा शुल्क नहीं</span>
        </div>
      </CardContent>
    </Card>
  );
}
