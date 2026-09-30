import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionBadge } from "@/components/ui/section-badge";
import { GalleryView } from "@/components/gallery/gallery-view";
import {
  Camera,
  Sparkles,
  ChevronRight,
  Award,
  Users,
  CheckCircle2,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "गैलरी एवं सफलता की कहानियां | Photo & Success Gallery | Chhaigaon Udyami",
  description:
    "छैगांव उद्यमी के ग्रामीण उद्यमियों की सफलता की कहानियां, DIC खंडवा कार्यशालाएं एवं QR-सत्यापित सर्टिफिकेट्स की फोटो गैलरी देखें।",
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-white border-b border-slate-200/90 relative overflow-hidden py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <Link href="/" className="hover:text-blue-700 transition-colors">होम (Home)</Link>
              <ChevronRight className="w-3 h-3 text-slate-400" />
              <span className="text-blue-700 font-bold">मीडिया एवं सफलता गैलरी</span>
            </div>

            <SectionBadge icon={Camera} variant="primary">
              मीडिया एवं वर्कशॉप गैलरी
            </SectionBadge>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight font-headline">
              ग्रामीण उद्यमिता व सफलता की झलकियां
            </h1>

            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-body leading-relaxed">
              छैगांव माखन, खंडवा एवं निमाड़ अंचल में जिला उद्योग केंद्र (DIC) व NABARD के साथ आयोजित प्रशिक्षण शिविरों तथा सफल उद्यमियों की प्रामाणिक तस्वीरें।
            </p>
          </div>
        </section>

        {/* Gallery Grid View Component */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <GalleryView />
        </div>
      </main>

      <Footer />
    </div>
  );
}
