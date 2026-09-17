"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  ExternalLink,
  PlayCircle,
  HelpCircle,
  CheckCircle2,
  PhoneCall,
  Clock,
  ShieldCheck,
  Award,
  Video,
  FileCheck,
} from "lucide-react";

export function NeedToKnowTabs() {
  const [activeTab, setActiveTab] = useState<"exam" | "apply" | "support">("apply");

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-lg overflow-hidden">
      
      {/* Header Title */}
      <div className="p-6 sm:p-8 pb-4 border-b border-slate-100">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight font-headline">
          Everything You <span className="text-[#0056d2]">Need To Know</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-body">
          प्रवेश प्रक्रिया, परीक्षा पद्धति एवं 24x7 मेंटर सहायता से संबंधित संपूर्ण विवरण।
        </p>
      </div>

      {/* Tri-Color Navigation Tabs (Matching Reference Image) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 text-center text-sm font-bold text-white select-none">
        
        {/* Tab 1: Mode of Examination */}
        <button
          onClick={() => setActiveTab("exam")}
          className={`py-4 px-4 transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "exam"
              ? "bg-[#4a5568] shadow-inner font-extrabold ring-2 ring-slate-400/40 z-10"
              : "bg-[#718096] hover:bg-[#4a5568]/90 text-slate-100"
          }`}
        >
          <Award className="w-4 h-4 text-slate-200" />
          <span>Mode of Examination</span>
        </button>

        {/* Tab 2: How to Apply (Default / Active in Screenshot) */}
        <button
          onClick={() => setActiveTab("apply")}
          className={`py-4 px-4 transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "apply"
              ? "bg-[#1a237e] shadow-inner font-extrabold ring-2 ring-blue-400/50 z-10"
              : "bg-[#283593] hover:bg-[#1a237e]/90 text-slate-100"
          }`}
        >
          <FileText className="w-4 h-4 text-blue-200" />
          <span>How to Apply</span>
        </button>

        {/* Tab 3: 24x7 Support System */}
        <button
          onClick={() => setActiveTab("support")}
          className={`py-4 px-4 transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === "support"
              ? "bg-[#b7791f] shadow-inner font-extrabold ring-2 ring-amber-300/50 z-10"
              : "bg-[#d69e2e] hover:bg-[#b7791f]/90 text-slate-100"
          }`}
        >
          <PhoneCall className="w-4 h-4 text-amber-100" />
          <span>24x7 Support System</span>
        </button>

      </div>

      {/* Tab Content Body */}
      <div className="p-6 sm:p-10 bg-white">
        
        {/* 1. HOW TO APPLY (MATCHING EXACT SCREENSHOT) */}
        {activeTab === "apply" && (
          <div className="space-y-6 text-slate-800">
            
            {/* Direct Enroll Banner */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-base sm:text-lg font-bold text-slate-900">
                To enrol in the programme,
              </span>
              <a
                href="#apply-form"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-[#0056d2] text-[#0056d2] hover:bg-blue-50 font-bold text-sm transition-colors shadow-2xs"
              >
                <span>Apply Now</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Application Steps */}
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-black text-slate-950 font-headline">
                Application steps:
              </h3>
              
              <ol className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed list-decimal list-inside font-body">
                <li>
                  <strong className="font-semibold text-slate-900">Register/Login</strong> on the application portal and fill all the required details (व्यक्तिगत विवरण एवं मोबाइल सत्यापन)।
                </li>
                <li>
                  <strong className="font-semibold text-slate-900">Pay the application fee</strong> (or apply for government scheme scholarship voucher) and update the Mentor &amp; Enterprise information.{" "}
                  <a href="#fee-info" className="text-blue-700 underline font-semibold hover:text-blue-900">
                    Click here for more information
                  </a>.
                </li>
                <li>
                  <strong className="font-semibold text-slate-900">Submit the application</strong> with all required documents (आधार कार्ड, बैंक पासबुक व शैक्षणिक प्रमाण पत्र)।
                </li>
                <li>
                  The <strong className="font-semibold text-slate-900">Admissions Cell</strong> will review your application and share the admission decision via email or the application portal within 2–3 business days.
                </li>
              </ol>
            </div>

            {/* Step-by-Step Video Guide Link */}
            <div className="pt-2 flex items-center gap-2 text-xs sm:text-sm text-slate-700">
              <span>For a step-by-step guide on the application,</span>
              <a
                href="#video-guide"
                className="inline-flex items-center gap-1 text-blue-700 underline font-bold hover:text-blue-900"
              >
                <span>Watch Here</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Important Note with Sample Forms */}
            <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong className="font-bold text-slate-900">Important:</strong> If you are applying as a group under a Self-Help Group (SHG) or FPO and require mentor verification, you may upload the endorsement letter from your local Block Development Office or SHG Federation using the formats available below:{" "}
                <a href="#sample-mentor" className="text-blue-700 underline font-semibold hover:text-blue-900 mr-2">
                  Sample Mentor form ↗
                </a>
                <a href="#sample-employer" className="text-blue-700 underline font-semibold hover:text-blue-900">
                  Sample SHG / Enterprise form ↗
                </a>
              </p>
            </div>

          </div>
        )}

        {/* 2. MODE OF EXAMINATION */}
        {activeTab === "exam" && (
          <div className="space-y-6 text-slate-800">
            <h3 className="text-base sm:text-lg font-black text-slate-950 font-headline">
              Mode of Examination &amp; Certification (मूल्यांकन एवं परीक्षा पद्धति)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                  <PlayCircle className="w-4 h-4" />
                  <span>1. ऑनलाइन क्विज व मॉड्यूल टेस्ट (Online Quiz)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  प्रत्येक वीडियो मॉड्यूल के अंत में 10 प्रश्नों की बहुविकल्पीय परीक्षा (MCQs) होती है, जिसमें 60% अंक प्राप्त करना अनिवार्य है।
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <FileCheck className="w-4 h-4" />
                  <span>2. प्रोजेक्ट रिपोर्ट (DPR) सबमिशन</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  कोर्स पूर्ण होने पर छात्र को अपने उद्यम की वित्तीय योजना (DPR) तैयार करके पोर्टल पर जमा करनी होती है।
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-purple-700 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  <span>3. डिजिटल QR कोड वेरिफिकेशन</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  सफलतापूर्वक पास होने पर तुरंत बैंक-मान्य डिजिटल सर्टिफिकेट जारी किया जाता है जिसे QR कोड द्वारा स्कैन करके ऑनलाइन सत्यापित किया जा सकता है।
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                  <Clock className="w-4 h-4" />
                  <span>4. लचीला समय (Flexible Schedule)</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  आप अपने मोबाइल से कभी भी, कहीं भी अपनी सुविधा अनुसार परीक्षा दे सकते हैं और आवश्यकता पड़ने पर पुनः प्रयास कर सकते हैं।
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. 24x7 SUPPORT SYSTEM */}
        {activeTab === "support" && (
          <div className="space-y-6 text-slate-800">
            <h3 className="text-base sm:text-lg font-black text-slate-950 font-headline">
              24x7 Support &amp; Mentorship System (सहायता एवं मेंटरशिप)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-amber-950 text-sm flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-amber-700" />
                  <span>हेल्पलाइन एवं व्हाट्सएप सपोर्ट</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  प्रवेश, पोर्टल उपयोग व तकनीकी समस्याओं के त्वरित समाधान हेतु समर्पित व्हाट्सएप चैट व कॉलिंग सुविधा।
                </p>
                <div className="pt-1 text-xs font-bold text-amber-900">
                  +91 98765 43210 (टोल-फ्री)
                </div>
              </div>

              <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-blue-950 text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-blue-700" />
                  <span>उद्योग विशेषज्ञ मेंटरशिप</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  डेयरी, एग्रो-प्रोसेसिंग एवं बैंक लोन के विशेषज्ञों के साथ साप्ताहिक लाइव प्रश्नोत्तर (Q&amp;A) सत्र।
                </p>
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-emerald-950 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>सब्सिडी आवेदन हैंडहोल्डिंग</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  PMEGP व जिला उद्योग केंद्र (DIC) में सब्सिडी आवेदन फॉर्म भरने में अंतिम स्वीकृति तक मार्गदर्शन।
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
