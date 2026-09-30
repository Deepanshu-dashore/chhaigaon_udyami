"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Camera,
  Award,
  Users,
  Building2,
  CheckCircle2,
  ExternalLink,
  ZoomIn,
  Sparkles,
} from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: "workshops" | "certificates" | "enterprises";
  categoryLabel: string;
  image: string;
  description: string;
  location: string;
  authorityBadge: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    title: "सत्यापित QR-सत्यापित डिजिटल सर्टिफिकेट्स",
    category: "certificates",
    categoryLabel: "सर्टिफिकेशन्स",
    image: "/images/certificate-fan-proof.jpg",
    description: "जिला उद्योग केंद्र (DIC खंडवा) एवं PMEGP ऋण हेतु 100% मान्य आधिकारिक क्यूआर कोड युक्त डिजिटल प्रमाण पत्र।",
    location: "खंडवा, मध्य प्रदेश",
    authorityBadge: "DIC / NABARD 100% Valid",
  },
  {
    id: "2",
    title: "दैनिक प्रगति एवं लर्निंग पाथवे ट्रैकिंग",
    category: "certificates",
    categoryLabel: "सर्टिफिकेशन्स",
    image: "/images/learning-progress-proof.jpg",
    description: "10-15 मिनट के संक्षिप्त वीडियो मॉड्यूल एवं स्व-मूल्यांकन कार्यपुस्तिकाएं।",
    location: "छैगांव माखन, खंडवा",
    authorityBadge: "Verified LMS Tracker",
  },
  {
    id: "3",
    title: "आधुनिक डेयरी फार्मिंग एवं मिल्क चिलिंग यूनिट",
    category: "enterprises",
    categoryLabel: "सफल उद्यम",
    image: "/images/course-dairy-farming.jpg",
    description: "15 दुधारू पशुओं की डेयरी यूनिट एवं automated BMC चिलर प्लांट की सफल स्थापना।",
    location: "ग्राम देशगाँव, खंडवा",
    authorityBadge: "PMEGP ₹25L Sanctioned",
  },
  {
    id: "4",
    title: "मिनी दाल मिल एवं FSSAI पैकेजिंग यूनिट",
    category: "enterprises",
    categoryLabel: "सफल उद्यम",
    image: "/images/course-food-processing.jpg",
    description: "चना एवं तुअर दाल प्रोसेसिंग प्लांट एवं ब्रांडेड पाैच पैकेजिंग उद्यम।",
    location: "छैगांव माखन, खंडवा",
    authorityBadge: "MSME Subsidy Approved",
  },
  {
    id: "5",
    title: "DIC खंडवा उद्यमिता जागरूकता शिविर",
    category: "workshops",
    categoryLabel: "कार्यशालाएं",
    image: "/images/apply-hero-banner.jpg",
    description: "जिला उद्योग केंद्र अधिकारियों एवं बैंक प्रबंधकों की उपस्थिति में 35% सब्सिडी आवेदन मार्गदर्शन शिविर।",
    location: "DIC ऑफिस, खंडवा",
    authorityBadge: "DIC Khandwa Workshop",
  },
  {
    id: "6",
    title: "सोलर वाटर पंप एवं रूफटॉप सोलर वर्कशॉप",
    category: "workshops",
    categoryLabel: "कार्यशालाएं",
    image: "/images/ourstd-bckgrnd.webp",
    description: "कृषि एवं उद्योग हेतु कुसुम योजना अंतर्गत 7.5 HP सोलर पंप स्थापना प्रशिक्षण शिविर।",
    location: "पंधाना, खंडवा",
    authorityBadge: "PM-KUSUM Training",
  },
];

export function GalleryView() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems =
    activeTab === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab);

  return (
    <div className="space-y-8 font-sans">
      {/* Category Filter Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1.5 p-1.5 bg-slate-200/70 rounded-2xl border border-slate-300/80 shadow-2xs overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "all"
                ? "bg-[#0056d2] text-white shadow-xs"
                : "text-slate-700 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            सभी तस्वीरें ({galleryItems.length})
          </button>

          <button
            onClick={() => setActiveTab("workshops")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "workshops"
                ? "bg-[#0056d2] text-white shadow-xs"
                : "text-slate-700 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            कार्यशालाएं (Workshops)
          </button>

          <button
            onClick={() => setActiveTab("certificates")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "certificates"
                ? "bg-[#0056d2] text-white shadow-xs"
                : "text-slate-700 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            डिजिटल प्रमाण पत्र
          </button>

          <button
            onClick={() => setActiveTab("enterprises")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "enterprises"
                ? "bg-[#0056d2] text-white shadow-xs"
                : "text-slate-700 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            सफल ग्रामीण उद्यम
          </button>
        </div>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="group bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="size-10 rounded-full bg-white/90 text-slate-900 flex items-center justify-center shadow-lg">
                  <ZoomIn className="h-5 w-5" />
                </div>
              </div>

              <div className="absolute top-3 left-3">
                <Badge className="bg-white/95 text-[#0056d2] border border-blue-200 text-[10px] font-bold shadow-2xs backdrop-blur-xs">
                  {item.categoryLabel}
                </Badge>
              </div>

              <div className="absolute bottom-3 right-3">
                <Badge className="bg-emerald-600 text-white text-[10px] font-bold shadow-2xs">
                  {item.authorityBadge}
                </Badge>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-bold text-sm text-slate-950 group-hover:text-[#0056d2] transition-colors leading-snug font-headline">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-body">
                {item.description}
              </p>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>📍 {item.location}</span>
                <span className="text-[#0056d2] font-bold group-hover:underline inline-flex items-center gap-0.5">
                  विस्तार से देखें
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Preview Zoom Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        {selectedImage && (
          <DialogContent className="max-w-3xl bg-white p-6 rounded-3xl shadow-2xl">
            <DialogHeader>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-blue-50 text-[#0056d2] border-blue-200 text-xs font-bold">
                  {selectedImage.categoryLabel}
                </Badge>
                <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-bold">
                  {selectedImage.authorityBadge}
                </Badge>
              </div>
              <DialogTitle className="text-xl font-bold font-headline text-slate-950">
                {selectedImage.title}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                📍 स्थान: {selectedImage.location}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              <div className="rounded-2xl overflow-hidden max-h-[420px] bg-slate-900 flex items-center justify-center border border-slate-200">
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-h-[420px] w-auto object-contain"
                />
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-body">
                {selectedImage.description}
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}
