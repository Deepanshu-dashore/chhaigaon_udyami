"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  showText?: boolean;
}

export default function LogoutButton({
  className = "",
  variant = "outline",
  size = "sm",
  showText = true,
}: LogoutButtonProps) {
  const { signOut, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut();
  };

  const isLoading = isLoggingOut || loading;

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      disabled={isLoading}
      className={cn(
        "rounded-xl font-semibold border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 transition-colors shadow-2xs cursor-pointer",
        className
      )}
    >
      {isLoading ? (
        <Spinner size="sm" variant="destructive" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
      {showText && (
        <span>{isLoading ? "लॉगआउट हो रहा है..." : "लॉगआउट (Logout)"}</span>
      )}
    </Button>
  );
}
