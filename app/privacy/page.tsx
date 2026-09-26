import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionBadge } from "@/components/ui/section-badge";
import { Separator } from "@/components/ui/separator";
import {
  ShieldCheck,
  Lock,
  FileText,
  Eye,
  CheckCircle2,
  Mail,
  Clock,
  UserCheck,
  Database,
  Globe,
  HelpCircle,
  ArrowRight,
  Shield,
  FileDigit,
} from "lucide-react";

export const metadata = {
  title: "गोपनीयता नीति | Privacy Policy - छैगांव उद्यमी",
  description:
    "छैगांव उद्यमी प्लेटफॉर्म की आधिकारिक गोपनीयता नीति। जानें कि हम आपके व्यक्तिगत डेटा की सुरक्षा और उपयोग कैसे करते हैं।",
};

const sections = [
  { id: "intro", title: "1. परिचय (Introduction)" },
  { id: "data-collected", title: "2. एकत्रित की जाने वाली जानकारी (Data We Collect)" },
  { id: "use-of-data", title: "3. जानकारी का उपयोग (How We Use Data)" },
  { id: "data-security", title: "4. डेटा सुरक्षा व एन्क्रिप्शन (Data Security)" },
  { id: "cookies", title: "5. कुकीज़ व ट्रैकिंग नीति (Cookies Policy)" },
  { id: "third-party", title: "6. तृतीय-पक्ष सेवाएं (Third Parties)" },
  { id: "user-rights", title: "7. उपयोगकर्ता के अधिकार (Your Rights)" },
  { id: "retention", title: "8. डेटा प्रतिधारण व विलोपन (Data Retention)" },
  { id: "grievance", title: "9. शिकायत अधिकारी व संपर्क (Grievance Officer)" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Hero Banner with Generated Background Image & Light Linear Gradient Overlay */}
        <section className="relative bg-slate-900 text-white py-14 lg:py-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/privacy-hero-bg.jpg"
              alt="Privacy Protection Background"
              fill
              className="object-cover object-center opacity-85"
              priority
            />
            {/* Light Linear Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-blue-950/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <SectionBadge icon={ShieldCheck} variant="glass" className="mb-3">
                कानूनी नीति व डेटा सुरक्षा
              </SectionBadge>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-headline tracking-tight leading-tight text-white drop-shadow-xs">
                गोपनीयता नीति <span className="text-blue-300 font-sans font-normal text-xl sm:text-2xl block sm:inline sm:ml-2">(Privacy Policy)</span>
              </h1>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-sans drop-shadow-xs">
                छैगांव उद्यमी आपकी गोपनीयता का सर्वोच्च सम्मान करता है। यह दस्तावेज़ स्पष्ट करता है कि हम आपके व्यक्तिगत डेटा का संग्रह, उपयोग, सुरक्षा और प्रबंधन कैसे करते हैं।
              </p>
              
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-300 border-t border-white/5 pt-3">
                <span className="flex items-center gap-1.5 text-slate-200 font-medium">
                  <Clock className="w-3.5 h-3.5 text-blue-300" /> अंतिम अद्यतन: 25 सितम्बर 2026
                </span>
                <span className="text-slate-400">•</span>
                <span>अनुपालन: भारतीय IT Act 2000 व Digital Personal Data Protection (DPDP) Act</span>
              </div>
            </div>
          </div>
        </section>

        {/* Policy Content Layout */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Sidebar Table of Contents */}
            <aside className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-24 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <h3 className="font-bold text-slate-900 text-xs font-headline uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#0056d2]" />
                    <span>विषय सूचकांक (Contents)</span>
                  </h3>
                  <span className="text-[10px] bg-blue-50 text-[#0056d2] font-bold px-2 py-0.5 rounded-full">
                    9 अनुभाग
                  </span>
                </div>

                <nav className="space-y-0.5">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="group flex items-center justify-between px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-[#0056d2] hover:bg-blue-50/60 rounded-lg transition-all"
                    >
                      <span className="truncate">{sec.title}</span>
                      <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-[#0056d2] transition-transform group-hover:translate-x-0.5 shrink-0" />
                    </a>
                  ))}
                </nav>

                <div className="pt-2.5 border-t border-slate-100">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-slate-900 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-all"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>सहायता केंद्र से संपर्क करें</span>
                  </Link>
                </div>
              </div>
            </aside>

            {/* Right Side Minimalist Content Box */}
            <div className="lg:col-span-8 bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-2xs space-y-6 text-slate-700 leading-relaxed text-xs sm:text-sm">
              
              {/* Section 1 */}
              <section id="intro" className="scroll-mt-24">
                <div>
                  <h2 className="text-lg mb-1.5 sm:text-xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2">
                    <ShieldCheck className="w-7 h-7 p-1.5 rounded-md bg-[#0056d2]/15 text-[#0056d2] shrink-0" />
                    <span>1. परिचय (Introduction & Scope)</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    मंच का उद्देश्य, दायरा और डेटा प्रसंस्करण की मूल नीति
                  </p>
                </div>
                
                <Separator className="bg-slate-100/80 my-3" />
                
                <p className="text-slate-600 leading-relaxed font-sans text-xs sm:text-sm pt-1">
                  छैगांव उद्यमी ("हम", "हमारा" या "मंच") ग्रामीण कौशल विकास और उद्यमिता प्रशिक्षण हेतु एक समर्पित डिजिटल प्लेटफॉर्म है। यह गोपनीयता नीति बताती है कि जब आप हमारी वेबसाइट (<code className="text-xs bg-blue-50 text-[#0056d2] px-1.5 py-0.5 rounded font-medium">www.chhaigaonudyami.in</code>) का उपयोग करते हैं या पाठ्यक्रमों में नामांकन लेते हैं, तो आपकी जानकारी का किस प्रकार संग्रह और प्रसंस्करण किया जाता है।
                </p>
                
                <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100 mt-3">
                  हमारी सेवाओं का उपयोग करके, आप इस नीति में वर्णित शर्तों के अनुसार डेटा संग्रह और उपयोग के लिए अपनी सहमति प्रदान करते हैं।
                </p>
              </section>

              {/* Section 2 */}
              <section id="data-collected" className="scroll-mt-24">
                <Separator className="bg-slate-100/80 my-5" />

                <div>
                  <h2 className="text-lg mb-1.5 sm:text-xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2">
                    <Database className="w-7 h-7 p-1.5 rounded-md bg-emerald-600/15 text-emerald-600 shrink-0" />
                    <span>2. एकत्रित की जाने वाली जानकारी (Data We Collect)</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    हमारे द्वारा उपयोगकर्ताओं से एकत्रित किए जाने वाले डेटा की श्रेणीबद्ध सूची
                  </p>
                </div>

                <Separator className="bg-slate-100/80 my-3" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-blue-200 transition-colors">
                    <h4 className="font-bold text-slate-900 text-xs font-headline mb-0.5">व्यक्तिगत पहचान जानकारी</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">पूरा नाम, मोबाइल नंबर, ईमेल पता, डाक पता, राज्य एवं ज़िला।</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-blue-200 transition-colors">
                    <h4 className="font-bold text-slate-900 text-xs font-headline mb-0.5">खाता व प्रोफाइल डेटा</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">यूजरनेम, पासवर्ड, प्रोफ़ाइल चित्र, शैक्षणिक योग्यता और उद्यम संबंधी रुचियां।</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-blue-200 transition-colors">
                    <h4 className="font-bold text-slate-900 text-xs font-headline mb-0.5">पाठ्यक्रम व प्रगति डेटा</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">देखें गए वीडियो, पूर्ण किए गए क्विज़, प्राप्त अंक और जारी किए गए प्रमाण पत्र (Certificates)।</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-blue-200 transition-colors">
                    <h4 className="font-bold text-slate-900 text-xs font-headline mb-0.5">सुरक्षित भुगतान जानकारी</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">RBI पंजीकृत पेमेंट्स पार्टनर्स (Razorpay/PhonePe) द्वारा केवल सुरक्षित ट्रांजैक्शन आईडी प्रोसेस होती है।</p>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="use-of-data" className="scroll-mt-24">
                <Separator className="bg-slate-100/80 my-5" />

                <div>
                  <h2 className="text-lg mb-1.5 sm:text-xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2">
                    <UserCheck className="w-7 h-7 p-1.5 rounded-md bg-purple-600/15 text-purple-600 shrink-0" />
                    <span>3. जानकारी का उपयोग (How We Use Information)</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    डेटा के उपयोग का व्यावसायिक उद्देश्य व कानूनी सीमा
                  </p>
                </div>

                <Separator className="bg-slate-100/80 my-3" />

                <div className="space-y-2 pt-1">
                  {[
                    "प्रमाणित शिक्षण प्रदान करना: पाठ्यक्रम सामग्री, क्विज़ और डिजिटल प्रमाण पत्र जारी करने के लिए।",
                    "सरकारी योजना व लोन परामर्श: PMEGP, मुद्रा लोन हेतु आवश्यक विस्तृत प्रोजेक्ट रिपोर्ट (DPR) तैयार करने में सहयोग।",
                    "हेल्पलाइन व संचार: SMS, व्हाट्सएप या ईमेल द्वारा महत्वपूर्ण अपडेट व सहायता सूचनाएं भेजना।",
                    "सुरक्षा व अनाधिकृत पहुंच रोकना: कॉपीराइट उल्लंघन और धोखाधड़ी गतिविधियों को रोकने हेतु।",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 4 */}
              <section id="data-security" className="scroll-mt-24">
                <Separator className="bg-slate-100/80 my-5" />

                <div>
                  <h2 className="text-lg mb-1.5 sm:text-xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2">
                    <Lock className="w-7 h-7 p-1.5 rounded-md bg-amber-600/15 text-amber-600 shrink-0" />
                    <span>4. डेटा सुरक्षा व एन्क्रिप्शन (Data Security)</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    सर्वर सुरक्षा, एन्क्रिप्शन मानक और तृतीय-पक्ष गोपनीयता
                  </p>
                </div>

                <Separator className="bg-slate-100/80 my-3" />

                <p className="text-slate-600 text-xs sm:text-sm pt-1">
                  हमारी वेबसाइट SSL एन्क्रिप्शन (HTTPS) द्वारा पूर्णतः सुरक्षित है। आपका डेटा उद्योग-मानक डेटाबेस और सुरक्षित क्लाउड सर्वर पर संग्रहीत किया जाता है।
                </p>

                <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-blue-900 text-xs flex items-center gap-2 mt-3">
                  <ShieldCheck className="w-4 h-4 text-[#0056d2] shrink-0" />
                  <span>हम कभी भी आपकी व्यक्तिगत जानकारी को किसी तीसरे पक्ष को वाणिज्यिक विज्ञापनों हेतु नहीं बेचते हैं।</span>
                </div>
              </section>

              {/* Section 5 */}
              <section id="cookies" className="scroll-mt-24">
                <Separator className="bg-slate-100/80 my-5" />

                <div>
                  <h2 className="text-lg mb-1.5 sm:text-xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2">
                    <Eye className="w-7 h-7 p-1.5 rounded-md bg-blue-600/15 text-[#0056d2] shrink-0" />
                    <span>5. कुकीज़ व ट्रैकिंग नीति (Cookies & Analytics)</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    कुकी प्रकार, उपयोग सत्र प्रबंधन और एनालिटिक्स प्राथमिकताएं
                  </p>
                </div>

                <Separator className="bg-slate-100/80 my-3" />

                <p className="text-slate-600 text-xs sm:text-sm pt-1">
                  हमारी वेबसाइट लॉगिन सत्र बनाए रखने, यूजर नेविगेशन और एनालिटिक्स के लिए 'कुकीज़' का उपयोग करती है। आप अपने ब्राउज़र सेटिंग्स से कुकीज़ को बंद कर सकते हैं।
                </p>
              </section>

              {/* Section 6 */}
              <section id="third-party" className="scroll-mt-24">
                <Separator className="bg-slate-100/80 my-5" />

                <div>
                  <h2 className="text-lg mb-1.5 sm:text-xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2">
                    <Globe className="w-7 h-7 p-1.5 rounded-md bg-indigo-600/15 text-indigo-600 shrink-0" />
                    <span>6. तृतीय-पक्ष सेवाएं व साझाकरण (Third Parties)</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    सुरक्षित पेमेंट्स, प्रमाण पत्र सत्यापन व एसएमएस एपीआई प्रदाता
                  </p>
                </div>

                <Separator className="bg-slate-100/80 my-3" />

                <p className="text-slate-600 text-xs sm:text-sm pt-1">
                  हम ऑनलाइन भुगतान (Razorpay/PhonePe), एसएमएस सत्यापन (OTP) और डिजिटल प्रमाण पत्र जारी करने हेतु केवल प्रमाणित प्रदाताओं के साथ डेटा साझा करते हैं।
                </p>
              </section>

              {/* Section 7 */}
              <section id="user-rights" className="scroll-mt-24">
                <Separator className="bg-slate-100/80 my-5" />

                <div>
                  <h2 className="text-lg mb-1.5 sm:text-xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2">
                    <Shield className="w-7 h-7 p-1.5 rounded-md bg-emerald-600/15 text-emerald-600 shrink-0" />
                    <span>7. उपयोगकर्ता के अधिकार (Your Privacy Rights)</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    डेटा तक पहुंच, प्रोफाइल संशोधन और सहमति वापस लेने का अधिकार
                  </p>
                </div>

                <Separator className="bg-slate-100/80 my-3" />

                <p className="text-slate-600 text-xs sm:text-sm pt-1">
                  भारतीय DPDP अधिनियम के तहत आपके पास अपनी प्रोफ़ाइल जानकारी की समीक्षा करने, सुधार करने और डेटा प्रोसेसिंग सहमति वापस लेने का अधिकार है।
                </p>
              </section>

              {/* Section 8 */}
              <section id="retention" className="scroll-mt-24">
                <Separator className="bg-slate-100/80 my-5" />

                <div>
                  <h2 className="text-lg mb-1.5 sm:text-xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2">
                    <FileDigit className="w-7 h-7 p-1.5 rounded-md bg-amber-600/15 text-amber-600 shrink-0" />
                    <span>8. डेटा प्रतिधारण व विलोपन (Data Retention & Deletion)</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    डेटा संग्रहण अवधि और खाता स्थायी रूप से हटाने की प्रक्रिया
                  </p>
                </div>

                <Separator className="bg-slate-100/80 my-3" />

                <p className="text-slate-600 text-xs sm:text-sm pt-1">
                  हम आपका डेटा केवल तब तक रखते हैं जब तक यह सेवाएं देने और वित्तीय ऑडिट रिकॉर्ड के लिए आवश्यक हो। खाते के विलोपन के लिए <code className="text-xs bg-blue-50 text-[#0056d2] px-1.5 py-0.5 rounded font-medium">privacy@chhaigaonudyami.in</code> पर ईमेल करें।
                </p>
              </section>

              {/* Section 9 */}
              <section id="grievance" className="scroll-mt-24">
                <Separator className="bg-slate-100/80 my-5" />

                <div>
                  <h2 className="text-lg mb-1.5 sm:text-xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2">
                    <Mail className="w-7 h-7 p-1.5 rounded-md bg-slate-900/15 text-slate-900 shrink-0" />
                    <span>9. शिकायत निवारण अधिकारी व संपर्क (Grievance Officer)</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-normal mt-0.5">
                    डेटा गोपनीयता संबंधी प्रश्नों व शिकायतों हेतु अधिकृत संपर्क
                  </p>
                </div>

                <Separator className="bg-slate-100/80 my-3" />

                <div className="p-5 rounded-xl bg-gradient-to-br from-slate-900 to-blue-950 text-white space-y-2 text-xs pt-1">
                  <p className="font-bold text-blue-300 font-headline text-sm">
                    शिकायत निवारण अधिकारी (Grievance Redressal Officer)
                  </p>
                  <p className="text-slate-300">छैगांव उद्यमी मंच (Chhaigaon Udyami Ecosystem)</p>
                  <p className="text-slate-300">जनपद पंचायत मार्ग, छैगांव माखन, ज़िला खंडवा (म.प्र.) - 450771</p>
                  <div className="pt-2 border-t border-slate-800 flex flex-wrap gap-4 text-slate-300">
                    <span>ईमेल: <a href="mailto:privacy@chhaigaonudyami.in" className="text-blue-400 underline font-semibold">privacy@chhaigaonudyami.in</a></span>
                    <span>हेल्पलाइन: <strong className="text-white">+91 98765 43210</strong></span>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
