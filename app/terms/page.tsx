import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SectionBadge } from "@/components/ui/section-badge";
import { Separator } from "@/components/ui/separator";
import {
  FileCheck2,
  ShieldAlert,
  BookOpen,
  CreditCard,
  UserX,
  Scale,
  Clock,
  ArrowRight,
  AlertTriangle,
  FileText,
  Award,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "नियम और शर्तें | Terms & Conditions - छैगांव उद्यमी",
  description:
    "छैगांव उद्यमी प्लेटफॉर्म के उपयोग की नियम एवं शर्तें। प्लेटफॉर्म उपयोग, बौद्धिक संपदा अधिकार और उपयोगकर्ता नियमों की जानकारी।",
};

const termsSections = [
  { id: "acceptance", title: "1. नियम व स्वीकृति (Acceptance)" },
  { id: "account", title: "2. खाता पंजीकरण व सुरक्षा (Account Terms)" },
  { id: "intellectual-property", title: "3. बौद्धिक संपदा अधिकार (Intellectual Property)" },
  { id: "conduct", title: "4. आचार संहिता (User Code of Conduct)" },
  { id: "fees-payment", title: "5. शुल्क, भुगतान व रद्दीकरण (Fees & Payments)" },
  { id: "certificates", title: "6. प्रमाण पत्र नियम (Certificates)" },
  { id: "limitation", title: "7. दायित्व की सीमा (Limitation of Liability)" },
  { id: "termination", title: "8. खाता निलंबन व समाप्ति (Termination)" },
  { id: "governing-law", title: "9. शासी कानून व क्षेत्राधिकार (Governing Law)" },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Hero Banner with Generated Background Image & Light Linear Gradient Overlay */}
        <section className="relative bg-slate-900 text-white py-14 lg:py-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/terms-hero-bg.jpg"
              alt="Terms and Conditions Background"
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
              <SectionBadge icon={FileCheck2} variant="glass" className="mb-3">
                कानूनी अनुबंध व मंच नियम
              </SectionBadge>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-headline tracking-tight leading-tight text-white drop-shadow-xs">
                नियम और शर्तें <span className="text-blue-300 font-sans font-normal text-xl sm:text-2xl block sm:inline sm:ml-2">(Terms & Conditions)</span>
              </h1>
              <p className="mt-2.5 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-2xl font-sans drop-shadow-xs">
                कृपया छैगांव उद्यमी मंच का उपयोग करने से पहले इन नियमों व शर्तों को ध्यानपूर्वक पढ़ें। हमारी सेवाओं का उपयोग करके आप इन शर्तों का पालन करने के लिए बाध्य हैं।
              </p>
              
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-300 border-t border-white/15 pt-3">
                <span className="flex items-center gap-1.5 text-slate-200 font-medium">
                  <Clock className="w-3.5 h-3.5 text-blue-300" /> अंतिम अद्यतन: 25 सितम्बर 2026
                </span>
                <span className="text-slate-400">•</span>
                <span>प्रभावी तिथि: 01 जनवरी 2026 से लागू</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            
            {/* Left Sidebar Index */}
            <aside className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-24 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <h3 className="font-bold text-slate-900 text-xs font-headline uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#0056d2]" />
                    <span>नियम सूचकांक (Index)</span>
                  </h3>
                  <span className="text-[10px] bg-blue-50 text-[#0056d2] font-bold px-2 py-0.5 rounded-full">
                    9 अनुभाग
                  </span>
                </div>

                <nav className="space-y-0.5">
                  {termsSections.map((sec) => (
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
                    href="/refund-policy"
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 bg-slate-900 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-all"
                  >
                    <span>वापसी नीति (Refund Policy) देखें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Right Side Minimalist Content Box */}
            <div className="lg:col-span-8 bg-white p-6 sm:p-10 rounded-2xl border border-slate-200/80 shadow-2xs space-y-8 text-slate-700 text-sm sm:text-base leading-relaxed sm:leading-loose">
              
              {/* Section 1 */}
              <section id="acceptance" className="scroll-mt-24 space-y-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2.5">
                    <FileCheck2 className="w-7 h-7 p-1.5 rounded-md bg-[#0056d2]/15 text-[#0056d2] shrink-0" />
                    <span>1. नियम व स्वीकृति (Acceptance of Terms)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
                    मंच के कानूनी अनुबंध और उपयोगकर्ता शर्तों की स्वीकृति
                  </p>
                </div>

                <Separator className="bg-slate-100/80 my-3" />

                <p className="text-slate-700 leading-relaxed sm:leading-loose pt-1">
                  यह वेबसाइट और डिजिटल मंच "छैगांव उद्यमी" (Chhaigaon Udyami Ecosystem) द्वारा संचालित है। जब आप हमारी वेबसाइट (<code className="text-xs sm:text-sm bg-blue-50 text-[#0056d2] px-2 py-0.5 rounded font-medium">www.chhaigaonudyami.in</code>) का उपयोग करते हैं, तो आप इन नियमों एवं शर्तों तथा हमारी गोपनीयता नीति को पूर्णतः स्वीकार करते हैं।
                </p>
              </section>

              {/* Section 2 */}
              <section id="account" className="scroll-mt-24 space-y-3">
                <Separator className="bg-slate-100/80 my-6" />

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2.5">
                    <UserX className="w-7 h-7 p-1.5 rounded-md bg-purple-600/15 text-purple-600 shrink-0" />
                    <span>2. खाता पंजीकरण व सुरक्षा (Account Terms)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
                    उपयोगकर्ता पात्रता, क्रेडेंशियल सुरक्षा और खाता नियम
                  </p>
                </div>

                <Separator className="bg-slate-100/80 my-3" />

                <ul className="space-y-3.5 pt-2 text-slate-700">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0056d2] shrink-0 mt-2.5" />
                    <div className="leading-relaxed sm:leading-loose">
                      <strong className="font-semibold text-slate-900">पात्रता नियम:</strong> मंच पर खाता खोलने के लिए न्यूनतम आयु 18 वर्ष होना आवश्यक है।
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0056d2] shrink-0 mt-2.5" />
                    <div className="leading-relaxed sm:leading-loose">
                      <strong className="font-semibold text-slate-900">सटीक जानकारी:</strong> पंजीकरण के दौरान प्रदान की गई सभी जानकारी सही, पूर्ण एवं अद्यतन होनी चाहिए।
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#0056d2] shrink-0 mt-2.5" />
                    <div className="leading-relaxed sm:leading-loose">
                      <strong className="font-semibold text-slate-900">खाता सुरक्षा:</strong> अपने खाता क्रेडेंशियल, पासवर्ड व ओटीपी की गोपनीयता बनाए रखने की आपकी संपूर्ण ज़िम्मेदारी है।
                    </div>
                  </li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="intellectual-property" className="scroll-mt-24 space-y-3">
                <Separator className="bg-slate-100/80 my-6" />

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2.5">
                    <BookOpen className="w-7 h-7 p-1.5 rounded-md bg-amber-600/15 text-amber-600 shrink-0" />
                    <span>3. बौद्धिक संपदा अधिकार (Intellectual Property Rights)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
                    कॉपीराइट सामग्री, वीडियो, DPR रिपोर्ट्स और ट्रेडमार्क सुरक्षा
                  </p>
                </div>

                <Separator className="bg-slate-100/80 my-3" />

                <p className="text-slate-700 leading-relaxed sm:leading-loose pt-1">
                  छैगांव उद्यमी पर उपलब्ध सभी पाठ्यक्रम वीडियो, पाठ्य सामग्री, विस्तृत प्रोजेक्ट रिपोर्ट्स (DPR templates) और सॉफ्टवेयर कोड छैगांव उद्यमी की एक्सक्लूसिव बौद्धिक संपदा हैं।
                </p>

                <div className="p-4 rounded-xl bg-amber-50/70 border-l-4 border-amber-500 text-amber-950 text-xs sm:text-sm flex items-center gap-3 mt-3 leading-relaxed">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                  <span>बिना पूर्व लिखित अनुमति के किसी भी सामग्री को कॉपी, शेयर या व्यावसायिक रूप से पुनः प्रकाशित करना सख्त वर्जित है।</span>
                </div>
              </section>

              {/* Section 4 */}
              <section id="conduct" className="scroll-mt-24 space-y-3">
                <Separator className="bg-slate-100/80 my-6" />

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2.5">
                    <ShieldAlert className="w-7 h-7 p-1.5 rounded-md bg-rose-600/15 text-rose-600 shrink-0" />
                    <span>4. आचार संहिता (Code of Conduct)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
                    मंच पर अनुमत और प्रतिबंधित गतिविधियों का विवरण
                  </p>
                </div>

                <Separator className="bg-slate-100/80 my-3" />

                <ul className="space-y-3 pt-2 text-slate-700">
                  <li className="flex items-start gap-3 leading-relaxed sm:leading-loose">
                    <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0 mt-2.5" />
                    <span>किसी अन्य व्यक्ति का रूप धारण करना या झूठी पहचान बताना प्रतिबंधित है।</span>
                  </li>
                  <li className="flex items-start gap-3 leading-relaxed sm:leading-loose">
                    <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0 mt-2.5" />
                    <span>अभद्र, अपमानजनक, घृणास्पद या भ्रामक भाषा का उपयोग करना सख्त मना है।</span>
                  </li>
                  <li className="flex items-start gap-3 leading-relaxed sm:leading-loose">
                    <span className="w-2 h-2 rounded-full bg-rose-600 shrink-0 mt-2.5" />
                    <span>प्रणाली में किसी भी प्रकार की हैकिंग, डेटा माइनिंग या अनाधिकृत छेड़छाड़ दंडनीय अपराध है।</span>
                  </li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="fees-payment" className="scroll-mt-24 space-y-3">
                <Separator className="bg-slate-100/80 my-6" />

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2.5">
                    <CreditCard className="w-7 h-7 p-1.5 rounded-md bg-emerald-600/15 text-emerald-600 shrink-0" />
                    <span>5. शुल्क, भुगतान व रद्दीकरण (Fees & Payments)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
                    ऑनलाइन पाठ्यक्रम शुल्क और भुगतान गेटवे सुरक्षा नीति
                  </p>
                </div>

                <Separator className="bg-slate-100/80 my-3" />

                <p className="text-slate-700 leading-relaxed sm:leading-loose pt-1">
                  सभी शुल्क भारतीय रुपये (INR) में दर्शाए जाते हैं। रद्दीकरण एवं 7-दिन की मनी-बैक गारंटी हेतु हमारी रिफंड नीति देखें।
                </p>

                <div className="p-4 rounded-xl bg-blue-50/70 border-l-4 border-[#0056d2] text-blue-950 text-xs sm:text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 leading-relaxed">
                  <span>वापसी एवं रद्दीकरण संबंधी नियमों के लिए हमारी नीति देखें:</span>
                  <Link href="/refund-policy" className="px-3.5 py-1.5 bg-[#0056d2] text-white font-bold rounded-lg text-xs hover:bg-blue-700 transition shrink-0 self-start sm:self-auto">
                    रिफंड नीति पढ़ें
                  </Link>
                </div>
              </section>

              {/* Section 6 */}
              <section id="certificates" className="scroll-mt-24 space-y-3">
                <Separator className="bg-slate-100/80 my-6" />

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2.5">
                    <Award className="w-7 h-7 p-1.5 rounded-md bg-amber-600/15 text-amber-600 shrink-0" />
                    <span>6. प्रमाण पत्र नियम (Certificates Rules)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
                    पाठ्यक्रम पूर्णता, क्विज़ अंक व डिजिटल सर्टिफिकेट पात्रता
                  </p>
                </div>

                <Separator className="bg-slate-100/80 my-3" />

                <p className="text-slate-700 leading-relaxed sm:leading-loose pt-1">
                  डिजिटल प्रमाण पत्र केवल उन पंजीकृत छात्रों को जारी किया जाता है जो सभी पाठ पूर्ण करते हैं और अनिवार्य क्विज़ पास करते हैं।
                </p>
              </section>

              {/* Section 7 */}
              <section id="limitation" className="scroll-mt-24 space-y-3">
                <Separator className="bg-slate-100/80 my-6" />

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2.5">
                    <ShieldCheck className="w-7 h-7 p-1.5 rounded-md bg-blue-600/15 text-[#0056d2] shrink-0" />
                    <span>7. दायित्व की सीमा व खाता समाप्ति (Limitation & Termination)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
                    व्यावसायिक लाभ-हानि दायित्व की सीमा और उल्लंघन पर खाता निलंबन
                  </p>
                </div>

                <Separator className="bg-slate-100/80 my-3" />

                <p className="text-slate-700 leading-relaxed sm:leading-loose pt-1">
                  व्यवसाय में सफलता स्थानीय बाजार स्थितियों और व्यक्तिगत प्रयासों पर निर्भर करती है। नियमों के गंभीर उल्लंघन की स्थिति में खाता बिना पूर्व चेतावनी निलंबित किया जा सकता है।
                </p>
              </section>

              {/* Section 9 */}
              <section id="governing-law" className="scroll-mt-24 space-y-3">
                <Separator className="bg-slate-100/80 my-6" />

                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2.5">
                    <Scale className="w-7 h-7 p-1.5 rounded-md bg-slate-900/15 text-slate-900 shrink-0" />
                    <span>8. शासी कानून व क्षेत्राधिकार (Governing Law & Jurisdiction)</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
                    न्यायालयीन क्षेत्राधिकार और भारतीय कानून
                  </p>
                </div>

                <Separator className="bg-slate-100/80 my-3" />

                <p className="text-slate-700 leading-relaxed sm:leading-loose pt-1">
                  ये नियम और शर्तें भारत के कानूनों के अनुसार शासित होंगी। किसी भी विवाद का निपटारा केवल <strong className="text-slate-900 font-semibold">खंडवा, मध्य प्रदेश (भारत)</strong> में स्थित सक्षम न्यायालयों के क्षेत्राधिकार के अधीन होगा।
                </p>
              </section>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
