"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CertificateView, CertificateData } from "./certificate-view";
import { CertificateActions } from "./certificate-actions";
import {
  Award,
  ShieldCheck,
  Printer,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const SAMPLE_CERTIFICATES: Record<string, CertificateData> = {
  fssai: {
    id: "fssai-sample-01",
    certificateNumber: "CHU-2026-FSSAI-8921",
    verificationCode: "VRF-FSSAI-001",
    issueDate: "2026-03-15",
    studentName: "राजेश कुमार पाटीदार (Rajesh Kumar Patidar)",
    studentDistrict: "छैगांव माखन, खंडवा",
    studentState: "मध्य प्रदेश",
    courseTitle: "FSSAI खाद्य सुरक्षा मानक एवं लघु प्रसंस्करण उद्यम",
    courseCategory: "Food Safety & Quality Assurance",
    courseDurationHours: 45,
    gradeScore: 94,
    status: "ACTIVE",
  },
  pmegp: {
    id: "pmegp-sample-02",
    certificateNumber: "CHU-2026-PMEGP-7412",
    verificationCode: "VRF-PMEGP-002",
    issueDate: "2026-02-28",
    studentName: "सुनीता बाई वर्मा (Sunita Bai Verma)",
    studentDistrict: "पंधाना, खंडवा",
    studentState: "मध्य प्रदेश",
    courseTitle: "₹50 लाख बैंक DPR व PMEGP लोन सब्सिडी मास्टरक्लास",
    courseCategory: "MSME Banking & Subsidy DPR",
    courseDurationHours: 40,
    gradeScore: 89,
    status: "ACTIVE",
  },
  dairy: {
    id: "dairy-sample-03",
    certificateNumber: "CHU-2026-DAIRY-3810",
    verificationCode: "VRF-DAIRY-003",
    issueDate: "2026-01-20",
    studentName: "दीपक कुमार शर्मा (Deepak Kumar Sharma)",
    studentDistrict: "हरसूद, खंडवा",
    studentState: "मध्य प्रदेश",
    courseTitle: "आधुनिक डेयरी फार्मिंग एवं कोल्ड चेन मैनेजमेंट",
    courseCategory: "Animal Husbandry & Dairy Tech",
    courseDurationHours: 50,
    gradeScore: 92,
    status: "ACTIVE",
  },
  organic: {
    id: "organic-sample-04",
    certificateNumber: "CHU-2026-ORGANIC-5194",
    verificationCode: "VRF-ORGANIC-004",
    issueDate: "2026-04-10",
    studentName: "अमित कुमार जोशी (Amit Kumar Joshi)",
    studentDistrict: "खंडवा",
    studentState: "मध्य प्रदेश",
    courseTitle: "जैविक खाद एवं वर्मीकम्पोस्ट ग्रामीण व्यवसाय",
    courseCategory: "Sustainable Agriculture & Bio-Fertilizer",
    courseDurationHours: 35,
    gradeScore: 96,
    status: "ACTIVE",
  },
};

export function CertificateShowcaseTabs() {
  const [activeTab, setActiveTab] = useState<string>("fssai");
  const [viewMode, setViewMode] = useState<"interactive" | "mockup">("interactive");
  const currentCert = SAMPLE_CERTIFICATES[activeTab];

  return (
    <div className="space-y-6">
      
      {/* Top View Mode & Category Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 no-print max-w-4xl mx-auto border-b border-slate-200 pb-3">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("fssai")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
              activeTab === "fssai"
                ? "bg-[#0056d2] text-white border-[#0056d2] shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>FSSAI खाद्य सुरक्षा</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("pmegp")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
              activeTab === "pmegp"
                ? "bg-[#0056d2] text-white border-[#0056d2] shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PMEGP ₹50L DPR</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("dairy")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
              activeTab === "dairy"
                ? "bg-[#0056d2] text-white border-[#0056d2] shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>नाबार्ड डेयरी</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("organic")}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border ${
              activeTab === "organic"
                ? "bg-[#0056d2] text-white border-[#0056d2] shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>जैविक खाद</span>
          </button>
        </div>

        {/* View Mode Toggle (Interactive HTML vs Studio Mockup) */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 shrink-0">
          <button
            type="button"
            onClick={() => setViewMode("interactive")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === "interactive"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
            <span>लाइव डिजिटल व्यू</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("mockup")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              viewMode === "mockup"
                ? "bg-white text-slate-900 shadow-2xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-amber-600" />
            <span>स्टूडियो मॉकअप (3D View)</span>
          </button>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="max-w-4xl mx-auto">
        <CertificateActions
          certificateNumber={currentCert.certificateNumber}
          verificationCode={currentCert.verificationCode}
          studentName={currentCert.studentName}
          courseTitle={currentCert.courseTitle}
        />
      </div>

      {/* Main Certificate Showcase Rendering */}
      <div className="max-w-4xl mx-auto py-2">
        {viewMode === "interactive" ? (
          <CertificateView certificate={currentCert} />
        ) : (
          <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group bg-slate-900">
            <Image
              src="/images/certificate-preview-showcase.jpg"
              alt="Official Chhaigaon Udyami Diploma Certificate of Excellence Mockup"
              fill
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-contain w-full h-full group-hover:scale-102 transition-transform duration-500 ease-out"
              priority
            />
            <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/50 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-900">
                    आधिकारिक 3D डिप्लोमा पूर्वावलोकन (Studio Render)
                  </span>
                  <span className="block text-[10px] text-slate-500 font-medium">
                    गोल्डन सील, सिल्क रिबन व बारकोड सत्यापन
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setViewMode("interactive")}
                className="text-xs font-bold text-[#0056d2] hover:underline cursor-pointer"
              >
                लाइव व्यू देखें →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Direct link to dedicated verification page */}
      <div className="text-center pt-2 no-print">
        <Link href={`/certificates/${currentCert.verificationCode}`}>
          <Button
            variant="outline"
            className="text-xs sm:text-sm font-bold text-[#0056d2] border-blue-200 hover:bg-blue-50 px-5 py-2.5 rounded-xl inline-flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span>इस प्रमाण पत्र का ऑनलाइन सत्यापन रिकॉर्ड खोलें</span>
            <ExternalLink className="w-4 h-4" />
          </Button>
        </Link>
      </div>

    </div>
  );
}
