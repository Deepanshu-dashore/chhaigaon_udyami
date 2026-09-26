import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionBadge } from "@/components/ui/section-badge";
import { Separator } from "@/components/ui/separator";
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  CreditCard,
} from "lucide-react";

export const metadata = {
  title: "वापसी एवं रद्दीकरण नीति | Refund & Cancellation Policy - छैगांव उद्यमी",
  description:
    "छैगांव उद्यमी मंच की आधिकारिक वापसी एवं रद्दीकरण नीति (Refund Policy)। जानें कि रिफंड के लिए कौन पात्र है और रिफंड प्रोसेसिंग समय क्या है।",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Hero Banner with Generated Background Image & Light Linear Gradient Overlay */}
        <section className="relative bg-slate-900 text-white py-14 lg:py-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/refund-hero-bg.jpg"
              alt="Refund and Payment Guarantee Background"
              fill
              className="object-cover object-center opacity-85"
              priority
            />
            {/* Light Linear Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-emerald-950/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <SectionBadge icon={RotateCcw} variant="glass" className="mb-3">
                भुगतान एवं सेवा गारंटी
              </SectionBadge>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-headline tracking-tight leading-tight text-white drop-shadow-xs">
                वापसी एवं रद्दीकरण नीति <span className="text-emerald-300 font-sans font-normal text-xl sm:text-2xl block sm:inline sm:ml-2">(Refund Policy)</span>
              </h1>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-sans drop-shadow-xs">
                छैगांव उद्यमी मंच अपने उपयोगकर्ताओं को पारदर्शी, भरोसेमंद और गुणवत्तापूर्ण सेवाएं देने के लिए प्रतिबद्ध है। हमारी रिफंड और रद्दीकरण प्रक्रिया अत्यंत सरल है।
              </p>
              
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400 border-t border-white/15 pt-3">
                <span className="flex items-center gap-1.5 text-slate-200 font-medium">
                  <Clock className="w-3.5 h-3.5 text-emerald-300" /> अंतिम अद्यतन: 25 सितम्बर 2026
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-emerald-300 font-semibold">7-दिवसीय मनी-बैक गारंटी शामिल</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-2xs space-y-6 text-slate-700 leading-relaxed text-xs sm:text-sm">
            
            {/* Highlight Banner: 7 Day Money Back Guarantee */}
            <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-200/80 flex items-center gap-3.5 text-emerald-950">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm font-headline text-emerald-900">7-दिन की मनी-बैक गारंटी (7-Day Money Back Guarantee)</h3>
                <p className="text-xs text-slate-600 mt-0.5 leading-normal">
                  यदि आप खरीदे गए ऑनलाइन पाठ्यक्रम से संतुष्ट नहीं हैं, तो नामांकन के 7 दिनों के भीतर 100% रिफंड का दावा कर सकते हैं।
                </p>
              </div>
            </div>

            {/* Section 1: Refund Eligibility */}
            <div className="space-y-1.5">
              <div>
                <h2 className="text-base sm:text-lg font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2">
                  <CheckCircle2 className="w-7 h-7 p-1 rounded-md bg-emerald-600/15 text-emerald-600 shrink-0" />
                  <span>1. रिफंड हेतु पात्रता (Refund Eligibility)</span>
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  स्वीकृत रिफंड दावे हेतु आवश्यक शर्तें व समय सीमा
                </p>
              </div>

              <Separator className="bg-slate-100/80 my-3" />

              <div className="space-y-1.5 pt-1 text-xs text-slate-600">
                <p className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">• खरीद के 7 दिनों के भीतर अनुरोध किया गया हो और 30% से कम पाठ्यक्रम देखा गया हो।</p>
                <p className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">• खाते से गलती से एक ही कोर्स हेतु दोहरा भुगतान (Duplicate Charge) हुआ हो।</p>
                <p className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">• तकनीकी खराबी के कारण कोर्स कंटेंट सक्रिय (Activate) न होने पर।</p>
              </div>
            </div>

            {/* Section 2: Non-Refundable */}
            <div className="space-y-1.5">
              <Separator className="bg-slate-100/80 my-5" />

              <div>
                <h2 className="text-base sm:text-lg font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2">
                  <XCircle className="w-7 h-7 p-1 rounded-md bg-rose-600/15 text-rose-600 shrink-0" />
                  <span>2. गैर-वापसी योग्य स्थितियां (Non-Refundable Scenarios)</span>
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  अपवाद जहां रिफंड का दावा अमान्य माना जाएगा
                </p>
              </div>

              <Separator className="bg-slate-100/80 my-3" />

              <div className="space-y-1.5 pt-1 text-xs text-rose-950">
                <p className="p-2.5 rounded-lg bg-rose-50/50 border border-rose-100">• 7 दिन से अधिक समय बीत जाने के बाद।</p>
                <p className="p-2.5 rounded-lg bg-rose-50/50 border border-rose-100">• यदि 50% से अधिक कोर्स पूर्ण हो चुका हो या प्रमाण पत्र जारी हो गया हो।</p>
                <p className="p-2.5 rounded-lg bg-rose-50/50 border border-rose-100">• कस्टमाइज्ड प्रोजेक्ट रिपोर्ट (DPR) डिलीवरी पूर्ण होने के बाद।</p>
              </div>
            </div>

            {/* Section 3: Processing Time */}
            <div className="space-y-1.5">
              <Separator className="bg-slate-100/80 my-5" />

              <div>
                <h2 className="text-base sm:text-lg font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2">
                  <Clock className="w-7 h-7 p-1 rounded-md bg-[#0056d2]/15 text-[#0056d2] shrink-0" />
                  <span>3. रिफंड प्रोसेसिंग समय (Timeline)</span>
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  बैंक ट्रांसफर और मूल भुगतान स्रोत में रिफंड क्रेडिट का समय
                </p>
              </div>

              <Separator className="bg-slate-100/80 my-3" />

              <p className="text-slate-600 text-xs sm:text-sm pt-1">
                अनुरोध स्वीकृत होने के बाद, आपका रिफंड <strong>5 से 7 कार्य दिवसों (5-7 Business Days)</strong> में आपके मूल भुगतान खाते में क्रेडिट कर दिया जाएगा।
              </p>
            </div>

            {/* Section 4: How to Request */}
            <div className="space-y-1.5">
              <Separator className="bg-slate-100/80 my-5" />

              <div>
                <h2 className="text-base sm:text-lg font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2">
                  <CreditCard className="w-7 h-7 p-1 rounded-md bg-purple-600/15 text-purple-600 shrink-0" />
                  <span>4. रिफंड अनुरोध कैसे करें? (How to Request)</span>
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  हेल्पडेस्क ईमेल पर रिफंड टिकट जमा करने की विधि
                </p>
              </div>

              <Separator className="bg-slate-100/80 my-3" />

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs text-slate-700">
                <p>1. पंजीकृत ईमेल से <code className="text-xs bg-blue-50 text-[#0056d2] px-1.5 py-0.5 rounded font-semibold">support@chhaigaonudyami.in</code> पर ईमेल भेजें।</p>
                <p>2. विषय (Subject): <strong>"Refund Request - [ट्रांजैक्शन आईडी]"</strong></p>
                <p>3. नाम, मोबाइल नंबर और कारण स्पष्ट लिखें।</p>
              </div>
            </div>

            {/* Bottom Support Banner */}
            <div className="pt-2">
              <div className="p-4 sm:p-5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-white text-xs sm:text-sm font-headline">भुगतान या रिफंड संबंधी समस्या है?</p>
                  <p className="text-slate-400 text-xs mt-0.5">हमारी सहायता टीम से संपर्क करें: +91 98765 43210</p>
                </div>
                <Link
                  href="/contact"
                  className="px-3.5 py-2 bg-[#0056d2] hover:bg-blue-600 text-white font-bold text-xs rounded-lg shadow-2xs transition-all whitespace-nowrap"
                >
                  हेल्पडेस्क
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
