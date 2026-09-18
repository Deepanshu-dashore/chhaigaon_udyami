"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface GoogleLoginButtonProps {
  redirectPath?: string;
  label?: string;
  role?: "STUDENT" | "TRAINER" | "MARKET_PARTNER";
  className?: string;
}

export default function GoogleLoginButton({
  redirectPath = "/dashboard",
  label = "Google के साथ जारी रखें (Continue with Google)",
  role,
  className = "",
}: GoogleLoginButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const redirectUrl = new URL(
        "/auth/callback",
        window.location.origin
      );
      redirectUrl.searchParams.set("next", redirectPath);
      if (role) {
        redirectUrl.searchParams.set("role", role);
      }

      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl.toString(),
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });

      if (authError) throw authError;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err: unknown) {
      console.error("Google OAuth error:", err);
      const message =
        err instanceof Error ? err.message : "Google साइन-इन में समस्या आई।";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-2">
      {error && (
        <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs text-center font-medium">
          {error}
        </div>
      )}
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleLogin}
        disabled={loading}
        className={cn(
          "w-full h-11 flex items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/80 hover:border-slate-300 text-slate-800 text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-[0.99] cursor-pointer",
          className
        )}
      >
        {loading ? (
          <Spinner size="sm" variant="default" />
        ) : (
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
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
        <span>{loading ? "Google से कनेक्ट हो रहा है..." : label}</span>
      </Button>
    </div>
  );
}
