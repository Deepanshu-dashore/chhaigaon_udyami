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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Check,
} from "lucide-react";

export function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState<"STUDENT" | "TRAINER" | "MARKET_PARTNER">("STUDENT");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const roleOptions = [
    {
      id: "STUDENT" as const,
      label: "उद्यमी / छात्र (कौशल व प्रशिक्षण)",
      icon: GraduationCap,
    },
    {
      id: "TRAINER" as const,
      label: "प्रशिक्षक / मास्टर ट्रेनर",
      icon: Briefcase,
    },
    {
      id: "MARKET_PARTNER" as const,
      label: "व्यापार सहयोगी / विक्रेता",
      icon: Store,
    },
  ];

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

    if (confirmPassword && password !== confirmPassword) {
      setErrorMessage("पासवर्ड और पुष्टि पासवर्ड मेल नहीं खाते।");
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

  const isPasswordValid = password.length >= 6;
  const isPasswordMatch = confirmPassword.length > 0 && password === confirmPassword;

  return (
    <Card className="w-full bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-2xl shadow-blue-950/20 rounded-2xl sm:rounded-3xl font-sans ring-1 ring-slate-900/5 overflow-hidden">
      {/* Card Header */}
      <CardHeader className="text-center pb-2 pt-7 sm:pt-8 px-5 sm:px-8 space-y-1.5">
        <div className="mx-auto h-11 w-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0056d2] shadow-xs ring-4 ring-blue-50/60">
          <UserPlus className="h-5 w-5" />
        </div>
        <CardTitle className="text-2xl sm:text-2xl font-bold tracking-tight text-slate-950 font-headline">
          नया खाता बनाएं
        </CardTitle>
        <CardDescription className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          छैगांव उद्यमी मंच पर निःशुल्क पंजीकरण करें
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 sm:p-8 pt-3 space-y-5">
        {/* Error / Success Notifications */}
        {errorMessage && (
          <Alert variant="destructive" className="bg-rose-50/90 border-rose-200 text-rose-800 rounded-xl py-3 px-4 animate-in fade-in duration-200">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <AlertDescription className="text-xs sm:text-sm font-medium text-rose-700 ml-1.5">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800 rounded-xl py-3 px-4 animate-in fade-in duration-200">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <AlertDescription className="text-xs sm:text-sm font-medium text-emerald-700 ml-1.5">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Google Quick Signup */}
        <div className="max-w-md mx-auto w-full">
          <GoogleLoginButton
            redirectPath="/dashboard"
            role={role}
            label="Google खाते से तुरंत पंजीकरण करें"
          />
        </div>

        <div className="relative flex items-center justify-center">
          <Separator className="w-full bg-slate-200" />
          <span className="absolute bg-white px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            या फॉर्म भरें
          </span>
        </div>

        {/* Horizontal Form Grid */}
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            
            {/* Full Name */}
            <div className="space-y-1.5">
              <Label htmlFor="reg-name" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-blue-600" />
                <span>पूरा नाम <span className="text-rose-500">*</span></span>
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0056d2] transition-colors">
                  <User className="h-4 w-4" />
                </div>
                <Input
                  id="reg-name"
                  type="text"
                  placeholder="उदा. रमेश कुमार"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="h-11 pl-10 rounded-xl bg-slate-50/60 border-slate-200 hover:border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#0056d2] focus-visible:ring-4 focus-visible:ring-[#0056d2]/10 transition-all text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Role Dropdown using Shadcn Select */}
            <div className="space-y-1.5">
              <Label htmlFor="reg-role" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <GraduationCap className="h-3.5 w-3.5 text-blue-600" />
                <span>आपकी भूमिका <span className="text-rose-500">*</span></span>
              </Label>
              <div className="relative group">
                <Select
                  value={role}
                  onValueChange={(val) => setRole(val as "STUDENT" | "TRAINER" | "MARKET_PARTNER")}
                >
                  <SelectTrigger
                    id="reg-role"
                    className="h-11 rounded-xl bg-slate-50/60 border-slate-200 hover:border-slate-300 text-slate-900 focus:bg-white focus:border-[#0056d2] focus:ring-4 focus:ring-[#0056d2]/10 transition-all text-xs sm:text-sm"
                  >
                    <SelectValue placeholder="भूमिका चुनें" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                    {roleOptions.map((opt) => {
                      const Icon = opt.icon;
                      return (
                        <SelectItem key={opt.id} value={opt.id} className="cursor-pointer py-2.5 rounded-lg text-xs sm:text-sm">
                          <div className="flex items-center gap-2.5">
                            <div className="h-6 w-6 rounded-md bg-blue-50 text-[#0056d2] flex items-center justify-center shrink-0">
                              <Icon className="h-3.5 w-3.5" />
                            </div>
                            <span className="font-medium">{opt.label}</span>
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="reg-email" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-blue-600" />
                <span>ईमेल पता <span className="text-rose-500">*</span></span>
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0056d2] transition-colors">
                  <Mail className="h-4 w-4" />
                </div>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="aapka.naam@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="h-11 pl-10 rounded-xl bg-slate-50/60 border-slate-200 hover:border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#0056d2] focus-visible:ring-4 focus-visible:ring-[#0056d2]/10 transition-all text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-1.5">
              <Label htmlFor="reg-mobile" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-blue-600" />
                <span>मोबाइल नंबर</span>
              </Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0056d2] transition-colors">
                  <Phone className="h-4 w-4" />
                </div>
                <Input
                  id="reg-mobile"
                  type="tel"
                  placeholder="9876543210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="h-11 pl-10 rounded-xl bg-slate-50/60 border-slate-200 hover:border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#0056d2] focus-visible:ring-4 focus-visible:ring-[#0056d2]/10 transition-all text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="reg-password" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-blue-600" />
                  <span>पासवर्ड बनाएं <span className="text-rose-500">*</span></span>
                </Label>
                {password.length > 0 && (
                  <span className={`text-[11px] font-medium flex items-center gap-1 ${isPasswordValid ? "text-emerald-600" : "text-amber-600"}`}>
                    {isPasswordValid ? <Check className="h-3 w-3" /> : null}
                    {isPasswordValid ? "मान्य लंबाई" : "कम से कम 6 अक्षर"}
                  </span>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0056d2] transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  id="reg-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="कम से कम 6 अक्षर"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="h-11 pl-10 pr-10 rounded-xl bg-slate-50/60 border-slate-200 hover:border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#0056d2] focus-visible:ring-4 focus-visible:ring-[#0056d2]/10 transition-all text-xs sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="reg-confirm-password" className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Lock className="h-3.5 w-3.5 text-blue-600" />
                  <span>पासवर्ड पुष्टि करें <span className="text-rose-500">*</span></span>
                </Label>
                {confirmPassword.length > 0 && (
                  <span className={`text-[11px] font-medium flex items-center gap-1 ${isPasswordMatch ? "text-emerald-600" : "text-rose-600"}`}>
                    {isPasswordMatch ? <Check className="h-3 w-3" /> : null}
                    {isPasswordMatch ? "पासवर्ड मेल खाता है" : "मेल नहीं खाता"}
                  </span>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#0056d2] transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <Input
                  id="reg-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="पासवर्ड दोबारा दर्ज करें"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                  className="h-11 pl-10 pr-10 rounded-xl bg-slate-50/60 border-slate-200 hover:border-slate-300 text-slate-900 placeholder:text-slate-400 focus-visible:bg-white focus-visible:border-[#0056d2] focus-visible:ring-4 focus-visible:ring-[#0056d2]/10 transition-all text-xs sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer p-1"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Terms & Agreement Checkbox */}
          <div className="flex items-start gap-2.5 pt-2">
            <Checkbox
              id="terms"
              checked={agreeTerms}
              onCheckedChange={(checked) => setAgreeTerms(Boolean(checked))}
              className="mt-0.5"
            />
            <Label htmlFor="terms" className="text-xs sm:text-sm text-slate-600 leading-snug cursor-pointer select-none font-normal">
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

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 text-sm font-semibold rounded-xl bg-[#0056d2] hover:bg-blue-700 shadow-md shadow-blue-600/20 hover:shadow-lg hover:shadow-blue-600/30 text-white transition-all cursor-pointer active:scale-[0.99] group"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <Spinner size="sm" variant="white" />
                <span>खाता तैयार हो रहा है...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>खाता बनाएं</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            )}
          </Button>
        </form>

        {/* Footer info & Login Link */}
        <div className="pt-3 text-center text-xs sm:text-sm text-slate-600 border-t border-slate-100">
          <span>पहले से खाता मौजूद है? </span>
          <Link
            href="/login"
            className="font-bold text-[#0056d2] hover:text-blue-900 hover:underline"
          >
            यहाँ लॉग इन करें
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}


