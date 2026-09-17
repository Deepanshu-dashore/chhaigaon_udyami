import type { Metadata } from "next";
import {
  Public_Sans,
  IBM_Plex_Sans,
  IBM_Plex_Serif,
  Inter,
  Noto_Sans_Devanagari,
  Poppins,
  Mukta,
  Nunito,
  Baloo_2,
  Modak,
  Teko,
  Oswald,
} from "next/font/google";
import "./globals.css";

// Numbers & Statistics Typography: Public Sans
const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-public-sans",
  display: "swap",
});

// Fidelity Design System - English Typography Fonts
const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// Hindi Typography & Display Fonts
const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-devanagari",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mukta",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

const baloo2 = Baloo_2({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-baloo2",
  display: "swap",
});

const modak = Modak({
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  variable: "--font-modak",
  display: "swap",
});

const teko = Teko({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-teko",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chhaigaon Udyami | ग्रामीण उद्यमिता एवं कौशल विकास मंच",
  description:
    "ग्रामीण एवं कस्बाई भारत के युवाओं और महिलाओं को सफल उद्यमी बनाने की डिजिटल पहल। सीखें डेयरी, फूड प्रोसेसिंग, जैविक खेती और सरकारी सब्सिडी योजनाएं।",
};

import { AuthProvider } from "@/hooks/use-auth";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="hi"
      className={`${publicSans.variable} ${ibmPlexSans.variable} ${ibmPlexSerif.variable} ${inter.variable} ${baloo2.variable} ${notoSansDevanagari.variable} ${poppins.variable} ${mukta.variable} ${nunito.variable} ${modak.variable} ${teko.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-surface text-on-surface">
        <AuthProvider>
          <TooltipProvider>
            {children}
            <Toaster richColors position="top-right" />
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

