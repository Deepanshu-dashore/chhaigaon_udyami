import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionBadge } from "@/components/ui/section-badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertCircle,
  Building,
  DollarSign,
  FileSpreadsheet,
  ExternalLink,
  HelpCircle,
  ShieldAlert,
  Clock,
} from "lucide-react";

export const metadata = {
  title: "अस्वीकरण | Disclaimer - छैगांव उद्यमी",
  description:
    "छैगांव उद्यमी प्लेटफॉर्म का आधिकारिक अस्वीकरण (Disclaimer)। सरकारी योजनाओं, वित्तीय आय, प्रोजेक्ट रिपोर्ट और प्रशिक्षण से जुड़ी स्पष्ट जानकारी।",
};

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Hero Banner with Generated Background Image & Light Linear Gradient Overlay */}
        <section className="relative bg-slate-900 text-white py-14 lg:py-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/disclaimer-hero-bg.jpg"
              alt="Disclaimer Background"
              fill
              className="object-cover object-center opacity-85"
              priority
            />
            {/* Light Linear Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-amber-950/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <SectionBadge icon={ShieldAlert} variant="glass" className="mb-3">
                पारदर्शिता व अस्वीकरण घोषणा
              </SectionBadge>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-headline tracking-tight leading-tight text-white drop-shadow-xs">
                अस्वीकरण <span className="text-amber-300 font-sans font-normal text-xl sm:text-2xl block sm:inline sm:ml-2">(Disclaimer)</span>
              </h1>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-sans drop-shadow-xs">
                छैगांव उद्यमी मंच का मुख्य उद्देश्य ग्रामीण क्षेत्रों में स्वरोज़गार, व्यावहारिक कौशल विकास और जागरूकता बढ़ाना है। कृपया निम्नलिखित प्रकटीकरण कथनों को ध्यान से पढ़ें।
              </p>
              
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-300 border-t border-white/15 pt-3">
                <span className="flex items-center gap-1.5 text-slate-200 font-medium">
                  <Clock className="w-3.5 h-3.5 text-amber-300" /> अंतिम अद्यतन: 25 सितम्बर 2026
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-2xs space-y-6 text-slate-700 leading-relaxed text-xs sm:text-sm">
            
            {/* Disclaimer 1: Non-Government Entity */}
            <div className="p-4 sm:p-5 rounded-xl bg-amber-50/80 border border-amber-200/70 text-amber-950 space-y-2">
              <div>
                <h2 className="text-base sm:text-lg font-bold font-headline text-amber-900 tracking-tight flex items-center gap-2">
                  <Building className="w-7 h-7 p-1 rounded-md bg-amber-600/20 text-amber-700 shrink-0" />
                  <span>1. गैर-सरकारी संस्था प्रकटीकरण (Non-Governmental Entity Disclosure)</span>
                </h2>
                <p className="text-xs text-amber-700 font-normal mt-0.5">
                  शासकीय योजनाओं से संबंध व निजी परामर्श मंच की स्पष्ट घोषणा
                </p>
              </div>

              <Separator className="bg-amber-200/60 my-2.5" />

              <p className="text-xs sm:text-sm leading-relaxed text-amber-900 pt-1">
                <strong>छैगांव उद्यमी (Chhaigaon Udyami)</strong> एक स्वतंत्र कौशल विकास और निजी परामर्श मंच है। यह किसी भी केंद्र या राज्य सरकार के विभाग का आधिकारिक प्रतिनिधि नहीं है। 
              </p>
              <p className="text-xs sm:text-sm leading-relaxed text-amber-900">
                मंच पर दी गई सरकारी योजनाओं (जैसे PMEGP, PM मुद्रा योजना, मुख्यमंत्री उद्यम क्रांति आदि) की जानकारी केवल अभ्यर्थियों के मार्गदर्शन हेतु सार्वजनिक रूप से उपलब्ध दिशानिर्देशों से संकलित की गई है। सरकारी योजनाओं में लोन स्वीकृति या सब्सिडी देने का अंतिम अधिकार केवल संबंधित बैंक और शासकीय अधिकारियों के पास है।
              </p>
            </div>

            {/* Disclaimer 2: Educational Purpose */}
            <div className="space-y-1.5">
              <Separator className="bg-slate-100/80 my-5" />

              <div>
                <h2 className="text-base sm:text-lg font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2">
                  <AlertCircle className="w-7 h-7 p-1 rounded-md bg-[#0056d2]/15 text-[#0056d2] shrink-0" />
                  <span>2. केवल शैक्षणिक व प्रशिक्षण उद्देश्य (Educational & Mentorship Purpose)</span>
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  पाठ्यक्रम सामग्री और अध्ययन परामर्श की कानूनी सीमाएं
                </p>
              </div>

              <Separator className="bg-slate-100/80 my-3" />

              <p className="text-slate-600 text-xs sm:text-sm pt-1">
                हमारी वेबसाइट और पाठ्यक्रमों में प्रस्तुत सभी जानकारी, वीडियो ट्यूटोरियल और अध्ययन सामग्री केवल शैक्षणिक एवं प्रशिक्षण उद्देश्यों के लिए है। इसे पेशेवर कानूनी या वित्तीय सलाह न माना जाए।
              </p>
            </div>

            {/* Disclaimer 3: Income Disclaimer */}
            <div className="space-y-1.5">
              <Separator className="bg-slate-100/80 my-5" />

              <div>
                <h2 className="text-base sm:text-lg font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2">
                  <DollarSign className="w-7 h-7 p-1 rounded-md bg-emerald-600/15 text-emerald-600 shrink-0" />
                  <span>3. आय या व्यावसायिक सफलता की गैर-गारंटी (Earnings Disclaimer)</span>
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  व्यवसाय में लाभ, हानि और व्यक्तिगत प्रयासों पर निर्भरता
                </p>
              </div>

              <Separator className="bg-slate-100/80 my-3" />

              <p className="text-slate-600 text-xs sm:text-sm pt-1">
                प्रशिक्षण या DPR रिपोर्ट्स के आधार पर किसी निश्चित आय या व्यावसायिक सफलता की कोई गारंटी नहीं दी जाती है। सफलता व्यक्तिगत मेहनत, बाजार की स्थितियों और वित्तीय प्रबंधन पर निर्भर करती है।
              </p>
            </div>

            {/* Disclaimer 4 & 5 */}
            <div className="space-y-1.5">
              <Separator className="bg-slate-100/80 my-5" />

              <div>
                <h2 className="text-base sm:text-lg font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2">
                  <ExternalLink className="w-7 h-7 p-1 rounded-md bg-purple-600/15 text-purple-600 shrink-0" />
                  <span>4. प्रोजेक्ट रिपोर्ट अनुमान व बाहरी लिंक्स (DPR & External Links)</span>
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  वित्तीय मॉडल अनुमान और शासकीय बाहरी पोर्टल्स
                </p>
              </div>

              <Separator className="bg-slate-100/80 my-3" />

              <p className="text-slate-600 text-xs sm:text-sm pt-1">
                DPR रिपोर्ट्स मानक बाजार दरों पर आधारित अनुमानित मॉडल हैं। वास्तविक लागत भिन्न हो सकती है। बाहरी सरकारी पोर्टल्स (kviconline.gov.in) के लिए हम उत्तरदायी नहीं हैं।
              </p>
            </div>

            {/* Bottom Contact card */}
            <div className="pt-2">
              <div className="p-4 sm:p-5 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <p className="font-bold text-white text-xs sm:text-sm font-headline">क्या आपका कोई और सवाल है?</p>
                    <p className="text-slate-400 text-xs">हमारी सहायता टीम से सीधा परामर्श लें।</p>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="px-3.5 py-2 bg-[#0056d2] hover:bg-blue-600 text-white font-bold text-xs rounded-lg shadow-2xs transition-all whitespace-nowrap"
                >
                  संपर्क करें
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
