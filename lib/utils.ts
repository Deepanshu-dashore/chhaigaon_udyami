import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export const getURL = (path: string = "") => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ??
    process?.env?.NEXT_PUBLIC_APP_URL ??
    process?.env?.NEXT_PUBLIC_VERCEL_URL ??
    (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");

  // Make sure to include `https://` when not localhost.
  url = url.startsWith("http") ? url : `https://${url}`;

  // Make sure to include a trailing `/`.
  url = url.endsWith("/") ? url : `${url}/`;

  if (path) {
    const cleanPath = path.replace(/^\/+/, "");
    return `${url}${cleanPath}`;
  }

  return url;
};
