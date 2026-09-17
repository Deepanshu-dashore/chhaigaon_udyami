"use client";

import React from "react";
import Link from "next/link";
import { Quote, ChevronRight, Star } from "lucide-react";

interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarText: string;
  avatarBg: string;
  courseTitle: string;
  courseSlug: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "1",
    quote:
      "छैगांव उद्यमी के फूड प्रोसेसिंग और FSSAI कोर्स से मुझे न सिर्फ आचार और पापड़ पैकेजिंग की व्यावहारिक समझ मिली, बल्कि मुझे स्थानीय बैंक से ₹5 लाख का मुद्रा लोन भी बिना किसी बाधा के मिल गया।",
    name: "सुनीता बाई मंडलोई",
    role: "अध्यक्ष, प्रेरणा महिला स्व-सहायता समूह (खंडवा)",
    avatarText: "SM",
    avatarBg: "bg-emerald-600 text-white",
    courseTitle: "फूड प्रोसेसिंग एवं FSSAI",
    courseSlug: "food-processing-enterprise",
  },
  {
    id: "2",
    quote:
      "डेयरी फार्मिंग कोर्स ने मेरी सोच पूरी तरह बदल दी। साइलेज मेकिंग, ऑटोमेटेड मिल्किंग और गोबर से वर्मीकम्पोस्ट बनाने की तकनीक सीखने के बाद हमारा मासिक शुद्ध लाभ 65% बढ़ गया है।",
    name: "रामेश्वर पाटीदार",
    role: "प्रोपराइटर, निमाड़ आर्गेनिक डेयरी फार्म्स",
    avatarText: "RP",
    avatarBg: "bg-blue-600 text-white",
    courseTitle: "आधुनिक डेयरी फार्मिंग",
    courseSlug: "dairy-farming-entrepreneurship",
  },
  {
    id: "3",
    quote:
      "PMEGP 35% सब्सिडी का फॉर्म और बैंक DPR बनाना पहले बहुत मुश्किल लगता था। यहाँ के वीडियो और रेडीमेड DPR टेम्पलेट की मदद से मेरा ₹25 लाख का प्रोजेक्ट उद्योग विभाग से 15 दिनों में पास हो गया।",
    name: "विकास जोशी",
    role: "संस्थापक, नर्मदा एग्रो इंडस्ट्रीज",
    avatarText: "VJ",
    avatarBg: "bg-amber-600 text-white",
    courseTitle: "PMEGP एवं बैंक सब्सिडी",
    courseSlug: "pmegp-subsidy-dpr-masterclass",
  },
  {
    id: "4",
    quote:
      "सोलर पंप एवं रूफटॉप सोलर इंस्टालेशन सीखकर मैंने अपने गांव में सोलर सर्विस सेंटर शुरू किया। आज मैं 20 से अधिक किसानों के सोलर पंप मेंटेन कर रहा हूँ और सम्मानजनक आजीविका कमा रहा हूँ।",
    name: "अमित सोलंकी",
    role: "संचालक, मालवा सौर ऊर्जा समाधान",
    avatarText: "AS",
    avatarBg: "bg-purple-600 text-white",
    courseTitle: "सौर ऊर्जा उद्यम एवं तकनीकी",
    courseSlug: "solar-energy-enterprise",
  },
];

export function CourseTestimonials() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Matching Image 2) */}
        <div className="mb-8 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-headline">
            Join others transforming their lives through learning
          </h2>
          <p className="text-sm text-slate-600">
            ग्रामीण भारत के सैकड़ों युवा और उद्यमी जो कौशल सीखकर आत्मनिर्भर बन चुके हैं।
          </p>
        </div>

        {/* 4 Cards Grid (Matching Image 2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl bg-slate-50/80 border border-slate-200/90 p-6 hover:bg-white hover:shadow-xl hover:border-slate-300 transition-all duration-300 group"
            >
              <div>
                {/* Quote Icon */}
                <div className="mb-4">
                  <span className="text-4xl leading-none text-slate-400 font-serif font-black select-none">
                    “
                  </span>
                </div>

                {/* Body Quote */}
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-body mb-6">
                  {item.quote}
                </p>
              </div>

              {/* Footer: User Info & Link */}
              <div className="pt-4 border-t border-slate-200/70 space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${item.avatarBg} flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}>
                    {item.avatarText}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[10.5px] text-slate-500 truncate">
                      {item.role}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/courses/${item.courseSlug}`}
                  className="inline-flex items-center gap-1 text-[11.5px] font-bold text-blue-700 hover:text-blue-900 transition-colors"
                >
                  <span>View this course</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
