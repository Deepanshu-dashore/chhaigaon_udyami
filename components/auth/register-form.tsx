"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Eye,
  EyeOff,
} from "lucide-react";

export function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <Card className="w-full max-w-lg border border-white/80 shadow-2xl shadow-blue-950/30 bg-white/95 backdrop-blur-xl rounded-2xl font-sans ring-1 ring-slate-900/5">
      <CardHeader className="space-y-1 text-center pb-4">
        <div className="mx-auto w-12 h-12 rounded-2xl bg-blue-50 text-[#0056d2] flex items-center justify-center mb-2 border border-blue-100 shadow-xs">
          <UserPlus className="h-6 w-6" />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-slate-950 font-headline">
          निःशुल्क खाता बनाएं (Register)
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-slate-500">
          ग्रामीण उद्यमिता क्रांति से जुड़ें और अपनी नई यात्रा शुरू करें
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Error / Success Notifications using Shadcn Alert */}
        {errorMessage && (
          <Alert variant="destructive" className="bg-rose-50 border-rose-200 text-rose-800 rounded-xl py-3 animate-in fade-in duration-200">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <AlertDescription className="text-xs font-medium text-rose-700">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800 rounded-xl py-3 animate-in fade-in duration-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <AlertDescription className="text-xs font-medium text-emerald-700">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Shadcn Google OAuth Button */}
        <GoogleLoginButton
          redirectPath="/dashboard"
          role={role}
          label="Google के साथ शुरू करें (Sign up with Google)"
        />

        <div className="relative flex items-center justify-center my-2">
          <Separator className="w-full" />
          <span className="absolute bg-white px-3 text-xs uppercase font-semibold text-slate-400">
            या विवरण भरें
          </span>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Role Selection */}
          <div className="space-y-1.5">
            <Label className="text-xs font-semibold text-slate-700 block">
              आपकी भूमिका चुनें (Choose Role)
            </Label>
            <div className="grid grid-cols-3 gap-2">
              {roleOptions.map((opt) => {
                const isSelected = role === opt.id;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRole(opt.id)}
                    className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? "border-[#0056d2] bg-blue-50/90 text-blue-950 shadow-xs font-semibold ring-1 ring-[#0056d2]"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white text-slate-700"
                    }`}
                  >
                    <div
                      className={`h-7 w-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? "bg-blue-100 text-[#0056d2]"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-xs font-bold leading-tight truncate">
                        {opt.label}
                      </span>
                      <span className="text-[10px] text-slate-500 hidden sm:inline leading-tight truncate mt-0.5">
                        {opt.subtext}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full Name */}
          <div className="space-y-1.5">
            <Label htmlFor="reg-name" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-blue-600" />
              <span>पूरा नाम (Full Name)</span>
            </Label>
            <Input
              id="reg-name"
              type="text"
              placeholder="उदा. रमेश कुमार"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11 rounded-xl bg-slate-50/70 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#0056d2] focus-visible:ring-4 focus-visible:ring-[#0056d2]/10 transition-all text-xs sm:text-sm"
            />
          </div>

          {/* Email & Mobile Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="reg-email" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-blue-600" />
                <span>ईमेल (Email)</span>
              </Label>
              <Input
                id="reg-email"
                type="email"
                placeholder="aapka.naam@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 rounded-xl bg-slate-50/70 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#0056d2] focus-visible:ring-4 focus-visible:ring-[#0056d2]/10 transition-all text-xs sm:text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="reg-mobile" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-blue-600" />
                <span>मोबाइल नंबर (Mobile)</span>
              </Label>
              <Input
                id="reg-mobile"
                type="tel"
                placeholder="9876543210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="h-11 rounded-xl bg-slate-50/70 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#0056d2] focus-visible:ring-4 focus-visible:ring-[#0056d2]/10 transition-all text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <Label htmlFor="reg-password" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-blue-600" />
              <span>पासवर्ड बनाएं (Create Password)</span>
            </Label>
            <div className="relative">
              <Input
                id="reg-password"
                type={showPassword ? "text" : "password"}
                placeholder="कम से कम 6 अक्षर"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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

          {/* Agreement Checkbox with Shadcn Checkbox */}
          <div className="flex items-start gap-2.5 pt-1">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(Boolean(checked))}
              className="mt-0.5 rounded-md border-slate-300 data-[state=checked]:bg-[#0056d2] data-[state=checked]:border-[#0056d2]"
            />
            <Label htmlFor="terms" className="text-xs text-slate-600 leading-snug cursor-pointer select-none font-normal">
              मैं Chhaigaon Udyami के{" "}
              <Link href="/terms" className="text-[#0056d2] font-semibold hover:underline">
                नियम व शर्तों
              </Link>{" "}
              तथा{" "}
              <Link href="/privacy" className="text-[#0056d2] font-semibold hover:underline">
                गोपनीयता नीति
              </Link>{" "}
              से सहमत हूँ।
            </Label>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-11 text-xs sm:text-sm font-semibold rounded-xl bg-[#0056d2] hover:bg-blue-700 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 text-white transition-all cursor-pointer active:scale-[0.99]"
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
