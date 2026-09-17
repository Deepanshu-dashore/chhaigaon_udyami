"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { User as SupabaseUser, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export interface UserProfileData {
  id?: string;
  name?: string | null;
  email?: string | null;
  mobile?: string | null;
  role?: string;
  avatarUrl?: string | null;
  isVerified?: boolean;
}

interface AuthContextType {
  user: SupabaseUser | null;
  session: Session | null;
  profile: UserProfileData | null;
  role: string;
  avatarUrl: string | null;
  displayName: string;
  isAuthenticated: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const supabase = createClient();

  const refresh = useCallback(async () => {
    try {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession();
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
    } catch (err) {
      console.error("Error refreshing session:", err);
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    refresh();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, refresh]);

  const signOut = async () => {
    try {
      setLoading(true);
      // 1. Call server logout endpoint to record LOGOUT activity & clear server cookies
      await fetch("/auth/logout", {
        method: "POST",
        headers: { Accept: "application/json" },
      }).catch((e) => console.warn("Server logout request failed:", e));

      // 2. Clear client-side Supabase session
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      router.push("/login?logged_out=true");
      router.refresh();
    } catch (err) {
      console.error("SignOut error:", err);
    } finally {
      setLoading(false);
    }
  };

  const avatarUrl =
    user?.user_metadata?.avatar_url ||
    user?.user_metadata?.picture ||
    null;

  const displayName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

  const role = (user?.user_metadata?.role as string) || "STUDENT";

  const profile: UserProfileData | null = user
    ? {
        id: user.id,
        name: displayName,
        email: user.email,
        mobile: user.user_metadata?.mobile || user.phone || null,
        role,
        avatarUrl,
        isVerified: user.email_confirmed_at !== null || user.phone_confirmed_at !== null,
      }
    : null;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        role,
        avatarUrl,
        displayName,
        isAuthenticated: !!user,
        loading,
        signOut,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
