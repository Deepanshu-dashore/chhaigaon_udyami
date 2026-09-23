import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { SectionBadge } from "@/components/ui/section-badge";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  Target,
  Compass,
  HeartHandshake,
  ChevronRight,
  Lightbulb,
  ShieldCheck,
  Zap,
  BookOpenCheck,
  FileCheck2,
  Award,
  CircleDot,
  Building,
} from "lucide-react";

export const metadata = {
  title: "हमारे बारे में | छैगांव उद्यमी - ग्रामीण कौशल एवं स्वावलंबन मंच",
  description:
    "छैगांव उद्यमी का उद्देश्य ग्रामीण भारत के युवाओं एवं महिलाओं को व्यावहारिक प्रशिक्षण, बैंक लोन सहायता और डिजिटल उद्यमिता से जोड़कर आत्मनिर्भर बनाना है।",
};

const missionVisionValues = [
  {
    icon: Target,
    title: "हमारा मिशन",
    subtitle: "OUR MISSION",
    tagline: "व्यावहारिक कौशल व स्वरोज़गार निर्माण",
    cardBg: "bg-[#ebf3fe] border-blue-200/80 text-blue-950",
    illustration: "/images/mission-illustration.jpg",
    desc: "ग्रामीण युवाओं एवं महिलाओं को व्यावहारिक व्यावसायिक कौशल, बैंक-मान्य DPR रिपोर्ट्स और सब्सिडी गाइडेंस प्रदान कर उनके अपने गाँव में ही सफल लघु उद्योग स्थापित करने में सक्षम बनाना।",
    highlights: [
      "व्यावहारिक उद्योग शिक्षण",
      "बैंक मान्य DPR व लोन सहायता",
      "गांव में ही स्थायी स्वरोजगार",
    ],
  },
  {
    icon: Compass,
    title: "हमारा विजन",
    subtitle: "OUR VISION",
    tagline: "आत्मनिर्भर व सशक्त ग्रामीण भारत",
    cardBg: "bg-[#e6f4ea] border-emerald-200/80 text-emerald-950",
    illustration: "/images/vision-illustration.jpg",
    desc: "एक ऐसे आत्मनिर्भर ग्रामीण भारत का निर्माण करना जहाँ हर पंचायत में कम से कम 5 नए सफल लघु उद्योग हों, पलायन रुके और स्थानीय स्तर पर सम्मानजनक रोज़गार के अवसर निर्मित हों।",
    highlights: [
      "हर पंचायत में 5+ लघु उद्योग",
      "शहरों की ओर पलायन रोकना",
      "स्थानीय आर्थिक स्वावलंबन",
    ],
  },
  {
    icon: HeartHandshake,
    title: "मूल सिद्धांत",
    subtitle: "CORE VALUES",
    tagline: "100% पारदर्शिता व अटूट प्रतिबद्धता",
    cardBg: "bg-[#fef7e0] border-amber-200/80 text-amber-950",
    illustration: "/images/core-values-illustration.jpg",
    desc: "ज़मीनी सच्चाई व सरलता, 100% पारदर्शिता, बिना किसी छुपे शुल्क के निरंतर मेंटरशिप, और हर विद्यार्थी की सफलता के प्रति अटूट प्रतिबद्धता।",
    highlights: [
      "100% पारदर्शिता & ईमानदारी",
      "बिना छुपा शुल्क मेंटरशिप",
      "आजीवन कम्युनिटी सपोर्ट",
    ],
  },
];

const whyChooseUsPoints = [
  {
    icon: BookOpenCheck,
    title: "100% व्यावहारिक व आसान हिंदी में शिक्षण",
    desc: "बिना किसी कठिन किताबी या तकनीकी शब्दों के, केवल वही सीखें जो सीधे आपके व्यवसाय की रोज़ाना बिक्री और उत्पादन में काम आता है।",
    badge: "सरल भाषा",
  },
  {
    icon: FileCheck2,
    title: "बैंक Loan व DPR कागज़ी प्रक्रिया में सीधी मदद",
    desc: "PMEGP व मुद्रा लोन के रिजेक्शन से बचाने के लिए वित्तीय विशेषज्ञों द्वारा बैंक-मान्य DPR रिपोर्ट और सब्सिडी फॉर्म भरने का मार्गदर्शन।",
    badge: "ऋण सहायता",
  },
  {
    icon: Award,
    title: "QR-प्रमाणित डिजिटल प्रमाण पत्र",
    desc: "कोर्स पूर्ण करने पर 24x7 ऑनलाइन सत्यापित QR सर्टिफिकेट प्राप्त करें, जिसे बैंक लोन व सरकारी MSME रजिस्ट्रेशन में इस्तेमाल कर सकते हैं।",
    badge: "सत्यापित रिकॉर्ड",
  },
  {
    icon: ShieldCheck,
    title: "महिला उद्यमिता व SHGs को प्राथमिकता",
    desc: "महिला स्वयं सहायता समूहों और ग्रामीण बहनों के लिए विशेष मेंटरशिप सत्र, कम लागत वाले कुटीर उद्योग प्रोजेक्ट्स और प्रोत्साहन।",
    badge: "महिला सशक्तीकरण",
  },
  {
    icon: Zap,
    title: "बाज़ार लिंकेज व ONDC डिजिटल बिक्री",
    desc: "उत्पाद बनाने के साथ-साथ उसे WhatsApp Business, ONDC और स्थानीय B2B खरीदारों तक पहुँचाकर पहली बिक्री सुनिश्चित करने में मदद।",
    badge: "मार्केट सपोर्ट",
  },
  {
    icon: Users,
    title: "आजीवन कम्युनिटी व मेंटर सपोर्ट",
    desc: "कोर्स समाप्त होने के बाद भी आप अकेले नहीं हैं — व्हाट्सएप ग्रुप, लाइव प्रश्नोत्तर सत्र और विशेषज्ञों से निरंतर संवाद की सुविधा।",
    badge: "लाइफटाइम सपोर्ट",
  },
];

const journeyMilestones = [
  {
    year: "2023",
    title: "नींव एवं ग्रामीण सर्वेक्षण",
    desc: "खंडवा एवं निमाड़ क्षेत्र के 20+ गांवों में ग्राउंड सर्वे कर ग्रामीण युवाओं की व्यावसायिक प्राथमिकताओं और समस्याओं का अध्ययन किया गया।",
  },
  {
    year: "2024",
    title: "पायलट वर्कशॉप्स एवं प्रत्यक्ष प्रशिक्षण",
    desc: "500 से अधिक युवाओं व महिला समूहों को डेयरी फार्मिंग, मसाला पिसाई और वर्मीकम्पोस्ट का व्यावहारिक प्रशिक्षण प्रदान किया गया।",
  },
  {
    year: "2025",
    title: "बैंक DPR व योजना एकीकरण",
    desc: "PMEGP, मुद्रा योजना और DIC खंडवा के मानकों के अनुसार डाउनलोड योग्य प्रोजेक्ट DPR रिपोर्ट्स एवं गाइडबुक्स तैयार की गईं।",
  },
  {
    year: "2026",
    title: "छैगांव उद्यमी डिजिटल प्लेटफॉर्म",
    desc: "सम्पूर्ण मध्य प्रदेश व कस्बाई भारत के विद्यार्थियों के लिए डिजिटल प्लेटफॉर्म का शुभारंभ, जिससे घर बैठे हुनर सीखा जा सके।",
  },
];

const leadershipTeam = [
  {
    name: "डॉ. राजेश शर्मा",
    role: "मुख्य परामर्शदाता & ग्रामीण विकास विशेषज्ञ",
    expertise: "20+ वर्ष का अनुभव NABARD एवं MSME प्रोजेक्ट्स में",
    image: "/images/mentor-rajesh-sharma.jpg",
  },
  {
    name: "श्रीमती सुनीता पटेल",
    role: "महिला उद्यमिता निदेशक",
    expertise: "स्वयं सहायता समूह (SHG) व खाद्य प्रसंस्करण विशेषज्ञ",
    image: "/images/mentor-sunita-patel.jpg",
  },
  {
    name: "अमित कुमार वर्मा",
    role: "डिजिटल साक्षरता एवं लोन सलाहकार",
    expertise: "PMEGP, PMMY एवं DPR वित्तीय ड्राफ्टिंग विशेषज्ञ",
    image: "/images/mentor-amit-verma.jpg",
  },
  {
    name: "विक्रम सिंह चौहान",
    role: "डेयरी एवं एग्री-टेक मेंटर",
    expertise: "आधुनिक दुग्ध प्रसंस्करण एवं नस्ल सुधार परामर्शदाता",
    image: "/images/mentor-vikram-chauhan.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* ================= SECTION 1: ABOUT HERO BANNER ================= */}
        <section className="bg-white text-slate-900 border-b border-slate-200 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative min-h-115 lg:min-h-125 flex items-center">
            
            {/* Left Column: Clean & Focused */}
            <div className="w-full lg:w-[54%] py-10 sm:py-14 lg:py-16 space-y-4 text-left z-10">
              
              {/* Reusable Section Badge */}
              <SectionBadge icon={Sparkles} variant="secondary">
                हमारे बारे में — कौशल विकास एवं स्वावलंबन
              </SectionBadge>

              {/* Main Title (H1) */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-950 tracking-tight leading-[1.18] font-headline">
                ग्रामीण स्वावलंबन से,<br />
                सशक्त भारत का निर्माण।
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-lg font-body">
                छैगांव उद्यमी ग्रामीण एवं कस्बाई भारत के युवाओं और महिलाओं को केवल हुनर ही नहीं सिखाता, बल्कि उन्हें बैंक लोन, सरकारी सब्सिडी और बाज़ार लिंकेज के साथ एक सफल उद्यमी बनाता है।
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <Link href="/courses">
                  <Button
                    size="lg"
                    className="px-5 py-3 h-11 text-xs sm:text-sm font-semibold rounded-[4px] bg-[#0056d2] hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-2 cursor-pointer font-label"
                  >
                    <span>कोर्सेज एक्सप्लोर करें</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/apply">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="px-5 py-3 h-11 text-xs sm:text-sm font-semibold rounded-[4px] border border-[#0056d2] text-[#0056d2] bg-white hover:bg-blue-50/60 transition-colors flex items-center gap-2 cursor-pointer font-label"
                  >
                    <span>प्रवेश आवेदन जमा करें</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column: Full-Bleed Image flush with right screen edge */}
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-[48%] xl:w-[50%] h-80 sm:h-100 lg:h-full relative overflow-hidden">
            <img
              src="/images/about-mission-team.jpg"
              alt="छैगांव उद्यमी - ग्रामीण कौशल एवं स्वावलंबन टीम"
              className="w-full h-full object-cover object-center"
            />
            {/* Smooth Left Horizontal Fade Gradient into White Canvas */}
            <div className="hidden lg:block absolute inset-y-0 left-0 w-44 bg-linear-to-r from-white via-white/80 to-transparent pointer-events-none" />
            <div className="block lg:hidden absolute inset-x-0 top-0 h-16 bg-linear-to-b from-white to-transparent pointer-events-none" />
          </div>
        </section>

        {/* ================= SECTION 2: WHY CHOOSE US (MOVED TO 2ND PLACE WITH SVG & GRADIENT BG) ================= */}
        <section className="py-14 lg:py-18 relative overflow-hidden border-b border-blue-900 text-white">
          {/* Blue Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-blue-900 via-[#0056d2]/90 to-blue-900 pointer-events-none" />

          {/* Overlapping Concentric Circles SVG Background Pattern Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: "url('/images/bg-concentric-circles-white.svg')",
              backgroundRepeat: "repeat",
              backgroundSize: "140px 140px",
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
            
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <SectionBadge icon={Sparkles} variant="primary">
                हमारी विशिष्टता
              </SectionBadge>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-headline">
                हमें क्यों चुनें? (Why Choose Chhaigaon Udyami)
              </h2>

              <p className="text-xs sm:text-sm text-blue-100/90 font-body">
                6 कारण जो छैगांव उद्यमी को पारंपरिक ट्रेनिंग सेंटर्स से बिल्कुल अलग और असरदार बनाते हैं।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyChooseUsPoints.map((point, idx) => {
                const IconC = point.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/20 hover:border-white/40 bg-white/95 text-slate-900 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group backdrop-blur-xs"
                  >
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between">
                        <div className="h-11 w-11 rounded-xl bg-blue-50 text-[#0056d2] flex items-center justify-center group-hover:bg-[#0056d2] group-hover:text-white transition-colors">
                          <IconC className="h-5 w-5" />
                        </div>
                        <SectionBadge variant="secondary" className="text-[10px] py-0.5 px-2">
                          {point.badge}
                        </SectionBadge>
                      </div>

                      <h3 className="font-bold text-base text-slate-950 group-hover:text-[#0056d2] transition-colors leading-snug font-headline">
                        {point.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed font-body">
                        {point.desc}
                      </p>
                    </div>

                    <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-[#0056d2]">
                      <span>सीखना शुरू करें</span>
                      <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ================= SECTION 3: MISSION, VISION & CORE VALUES ================= */}
        <section className="py-16 lg:py-24 border-b border-slate-200 bg-[#f9fafb] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <SectionBadge icon={Target} variant="secondary">
                हमारा संकल्प
              </SectionBadge>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight font-headline">
                मिशन, विजन एवं मूल सिद्धांत
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-body leading-relaxed">
                वे मूल सिद्धांत और लक्ष्य जो हमें ग्रामीण भारत के हर महत्वाकांक्षी युवा के साथ मजबूती से जोड़ते हैं।
              </p>
            </div>

            {/* Reference-style cards grid matching attached layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {missionVisionValues.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={`rounded-3xl border ${item.cardBg} p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-115 shadow-xs hover:shadow-xl transition-all duration-300 group`}
                  >
                    {/* Top Content: Title + Subtitle + Description + Bullet highlights */}
                    <div className="space-y-4 relative z-10">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1 font-sans">
                          {item.subtitle}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight font-headline leading-snug">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 font-body leading-relaxed">
                        {item.desc}
                      </p>

                      <div className="pt-2 space-y-2">
                        {item.highlights.map((hl, hIdx) => (
                          <div key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Right Hand-Drawn Illustration (as seen in reference design) */}
                    <div className="pt-6 flex justify-end relative z-10">
                      <div className="w-52 sm:w-60 h-44 sm:h-48 rounded-2xl overflow-hidden border border-slate-900/10 shadow-md bg-white p-2 group-hover:scale-103 transition-transform duration-300">
                        <img
                          src={item.illustration}
                          alt={item.title}
                          className="w-full h-full object-contain object-center rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* ================= SECTION 4: STORY & GROUND REALITIES ================= */}
        <section className="py-12 lg:py-16 border-b border-slate-200 bg-slate-50/50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Realistic Photo */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white p-2">
                  <img
                    src="/images/rural-entrepreneur-story.jpg"
                    alt="ग्रामीण महिला उद्यमी सफलता गाथा - छैगांव उद्यमी"
                    className="w-full h-auto rounded-xl object-cover"
                  />
                </div>
              </div>

              {/* Right Column: Text Narrative */}
              <div className="lg:col-span-6 space-y-4">
                <SectionBadge icon={Lightbulb} variant="secondary">
                  हमारी सोच एवं पृष्ठभूमि
                </SectionBadge>

                <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight leading-tight font-headline">
                  गाँव की ज़रूरतों से उपजा एक व्यावहारिक समाधान
                </h2>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-body">
                  अक्सर ग्रामीण युवाओं को व्यावसायिक जानकारी के अभाव में शहरों की ओर पलायन करना पड़ता है। छैगांव उद्यमी का उद्देश्य युवाओं को अपने गाँव की कृषि उपज, दुग्ध उत्पादन और स्थानीय बाज़ार का उपयोग कर समृद्ध उद्योगपति बनाना है।
                </p>

                <div className="space-y-2.5 pt-2 text-xs font-medium text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>स्थानीय भाषा में शिक्षा:</strong> जटिल अंग्रेजी के बिना, सहज निमाड़ी व हिंदी में शिक्षण।
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>प्रोजेक्ट रिपोर्ट (DPR) सरलता:</strong> बैंकों में स्वीकृत होने योग्य वित्तीय मॉडल तैयार करना।
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>महिला सशक्तीकरण:</strong> महिला स्वयं सहायता समूहों (SHG) को सशक्त व्यावसायिक ब्रांड में बदलना।
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link href="/courses">
                    <Button className="bg-[#0056d2] hover:bg-blue-800 text-white font-bold rounded-lg px-5 py-2.5 text-xs shadow-xs inline-flex items-center gap-1.5 cursor-pointer">
                      <span>पाठ्यक्रमों की सूची देखें</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ================= SECTION 5: TIMELINE JOURNEY ================= */}
        <section
          className="py-14 lg:py-20 border-t border-orange-200/80 relative overflow-hidden"
          style={{
            background: "url('/images/ourstd-bckgrnd.webp') no-repeat center center / cover",
          }}
        >
          {/* Blue Gradient Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-blue-900 via-[#0056d2]/90 to-blue-900 pointer-events-none" />

          {/* Overlapping Concentric Circles SVG Pattern Overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: "url('/images/bg-concentric-circles-white.svg')",
              backgroundRepeat: "repeat",
              backgroundSize: "140px 140px",
            }}
          />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <SectionBadge icon={CircleDot} variant="primary">
                हमारी विकास यात्रा
              </SectionBadge>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-headline">
                सफर: सर्वेक्षण से डिजिटल क्रांति तक
              </h2>

              <p className="text-xs sm:text-sm text-blue-100/90 font-body">
                कैसे एकछोटे से विचार ने आज कई गांवों में स्वरोज़गार की लहर पैदा की।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {journeyMilestones.map((ms, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/20 bg-white/95 text-slate-900 p-5 shadow-xl hover:shadow-2xl transition-all space-y-3 relative"
                >
                  <span className="text-2xl font-black text-[#0056d2] font-headline block">
                    {ms.year}
                  </span>
                  <h3 className="font-bold text-base text-slate-950 font-headline">
                    {ms.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-body">
                    {ms.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= SECTION 6: LEADERSHIP & ADVISORY TEAM ================= */}
        <section className="py-12 lg:py-16 border-b border-slate-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <SectionBadge icon={Users} variant="secondary">
                मार्गदर्शक मंडल
              </SectionBadge>

              <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight font-headline">
                मार्गदर्शन करने वाली विशेषज्ञ टीम
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 font-body">
                बैंक लोन, कृषि प्रसंस्करण एवं MSME उद्योग क्षेत्र के वरिष्ठ सलाहकारों का सहयोग।
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadershipTeam.map((member, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/90 hover:border-primary/40 bg-white overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="h-52 bg-slate-100 overflow-hidden relative">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-108 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-slate-950/75 via-slate-950/20 to-transparent" />
                      
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block text-[11px] font-semibold text-white bg-primary/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full shadow-2xs">
                          {member.role}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-5 space-y-2 pb-6">
                      <h3 className="font-bold text-base text-slate-950 group-hover:text-primary transition-colors font-headline">
                        {member.name}
                      </h3>
                      
                      <p className="text-xs text-slate-600 font-body leading-relaxed flex items-start gap-1.5">
                        <Award className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{member.expertise}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ================= SECTION 7: FULL-WIDTH CTA BANNER ================= */}
        <section className="py-8 sm:py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-[#023574] text-white overflow-hidden shadow-xl relative flex flex-col lg:flex-row items-center justify-between border border-[#0d3f7a] min-h-55 lg:min-h-60">
              {/* Overlapping SVG Concentric Circles Pattern Overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: "url('/images/bg-concentric-circles-white.svg')",
                  backgroundRepeat: "repeat",
                  backgroundSize: "180px 180px",
                }}
              />
              
              {/* Left Column Text */}
              <div className="p-6 sm:p-7 lg:p-8 max-w-xl space-y-3 relative z-10 lg:w-[58%]">
                <div className="inline-flex items-center gap-1.5 text-white">
                  <span className="text-lg sm:text-xl font-black tracking-tight">छैगांव उद्यमी</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-black tracking-wider uppercase border border-white/70 bg-white/10 backdrop-blur-xs">
                    JOIN US
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug font-headline text-white">
                  आज ही अपने स्वरोज़गार की यात्रा शुरू करें
                </h3>

                <p className="text-xs sm:text-[13px] text-blue-100/90 leading-relaxed font-body max-w-md">
                  हमारे प्रमाणित कोर्सेज एवं बैंक लोन गाइडेंस से जुड़ें और अपने गाँव में ही सफल उद्यम स्थापित करें।
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-3">
                  <Link href="/apply">
                    <Button
                      size="sm"
                      className="px-5 py-2 h-9 text-xs sm:text-sm font-bold rounded-lg bg-white hover:bg-slate-100 text-[#023574] shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>निःशुल्क आवेदन करें</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[#023574]" />
                    </Button>
                  </Link>

                  <Link href="/courses">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="px-4 py-2 h-9 text-xs font-bold rounded-lg border border-white/40 text-white hover:bg-white/10 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <span>कोर्सेज देखें</span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column: Banner Image */}
              <div className="relative w-full lg:w-[42%] lg:absolute lg:right-0 lg:top-0 lg:bottom-0 h-56 sm:h-60 lg:h-full flex items-center justify-end overflow-hidden">
                <img
                  src="/images/about-cta-banner.jpg"
                  alt="छैगांव उद्यमी ग्रामीण यात्रा"
                  className="w-full h-full object-cover object-center lg:object-left"
                />
                <div className="hidden lg:block absolute inset-y-0 left-0 w-28 bg-linear-to-r from-[#023574] via-[#023574]/80 to-transparent pointer-events-none" />
                <div className="block lg:hidden absolute inset-x-0 top-0 h-14 bg-linear-to-b from-[#023574] to-transparent pointer-events-none" />
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer showValueBanner={false} />
    </div>
  );
}
