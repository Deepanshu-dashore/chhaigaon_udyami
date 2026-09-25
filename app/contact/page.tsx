"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { SectionBadge } from "@/components/ui/section-badge";
import { toast } from "sonner";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  Building2,
  Globe2,
  ArrowRight,
  ShieldCheck,
  User,
  Smartphone,
  Tag,
} from "lucide-react";
import { FaWhatsapp, FaYoutube, FaFacebook, FaInstagram } from "react-icons/fa6";

const contactFaqs = [
  {
    q: "छैगांव उद्यमी हेल्पडेस्क का समय क्या है?",
    a: "हमारी सपोर्ट टीम सोमवार से शनिवार तक सुबह 9:00 बजे से शाम 6:00 बजे तक उपलब्ध रहती है। व्हाट्सएप सहायता के माध्यम से आप अपने सवाल 24/7 भेज सकते हैं।",
  },
  {
    q: "क्या मैं भौतिक रूप से छैगांव माखन केंद्र पर आ सकता हूँ?",
    a: "हाँ! आप हमारे परामर्श केंद्र छैगांव माखन (खंडवा, मध्य प्रदेश) में आकर हमारे मेंटर्स और उद्योग विशेषज्ञों से प्रत्यक्ष रूप से मार्गदर्शन प्राप्त कर सकते हैं।",
  },
  {
    q: "सरकारी योजना (PMEGP / मुद्रा लोन) आवेदन में क्या सहायता मिलेगी?",
    a: "हमारी टीम आपको परियोजना रिपोर्ट (DPR) तैयार करने, बैंक लोन दस्तावेजों की जांच और ऑन-पोर्टल आवेदन प्रक्रिया में पूर्ण परामर्श सहायता प्रदान करती है।",
  },
  {
    q: "कोर्स में एडमिशन के बाद सहायता कैसे लें?",
    a: "नामांकित छात्र ऐप / पोर्टल के अंदर चैट सपोर्ट के अलावा हमारे व्हाट्सएप हेल्पडेस्क (+91 98765 43210) पर अपना स्टूडेंट आईडी भेजकर प्राथमिकता सहायता प्राप्त कर सकते हैं।",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "general",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || (!formData.email.trim() && !formData.phone.trim()) || !formData.message.trim()) {
      toast.error("कृपया अपना नाम, मोबाइल नंबर/ईमेल और संदेश भरें।");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "आपका संदेश सफलतापूर्वक भेज दिया गया है!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          category: "general",
          subject: "",
          message: "",
        });
      } else {
        toast.error(data.error || "संदेश भेजने में विफल। कृपया पुनः प्रयास करें।");
      }
    } catch (err) {
      toast.error("नेटवर्क समस्या। कृपया बाद में प्रयास करें।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1">
        {/* Header Hero Section with Background Image & Light Linear Gradient Overlay */}
        <section className="relative bg-slate-900 text-white py-16 lg:py-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/contact-hero-bg.jpg"
              alt="Contact Support Background"
              fill
              className="object-cover object-center opacity-85"
              priority
            />
            {/* Light Linear Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/60 to-blue-950/45" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <SectionBadge
                icon={HelpCircle}
                className="bg-white/15 text-blue-100 border border-white/25 backdrop-blur-md shadow-xs rounded-full px-3 py-1 inline-flex items-center gap-2 text-xs font-semibold whitespace-nowrap mb-4"
              >
                संपर्क व परामर्श हेल्पडेस्क
              </SectionBadge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-headline tracking-tight leading-tight text-white drop-shadow-xs">
                हमसे संपर्क करें <span className="text-blue-300 font-sans font-normal text-2xl lg:text-3xl block sm:inline sm:ml-2">(Contact Us)</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-sans max-w-2xl mx-auto drop-shadow-xs">
                क्या आपके पास पाठ्यक्रम, सरकारी योजनाओं या व्यवसाय शुरू करने से जुड़ा कोई सवाल है? हमारी समर्पित सहायता टीम आपकी सहायता के लिए सदैव तत्पर है।
              </p>
            </div>
          </div>
        </section>

        {/* Quick Contact Cards */}
        <section className="-mt-8 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Phone & Helpline */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0056d2] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-headline">हेल्पलाइन व फोन</h3>
              <p className="text-xs text-slate-500 mt-1">सोम-शनि (प्रातः 9 से 6 बजे)</p>
              <a
                href="tel:+919876543210"
                className="mt-3 block font-bold text-slate-800 hover:text-[#0056d2] transition-colors text-sm"
              >
                +91 98765 43210
              </a>
              <span className="text-xs text-emerald-600 font-semibold mt-1 inline-flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> टोल-फ्री परामर्श
              </span>
            </div>

            {/* WhatsApp Support */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FaWhatsapp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-headline">व्हाट्सएप सपोर्ट</h3>
              <p className="text-xs text-slate-500 mt-1">24/7 त्वरित सहायता सेवा</p>
              <a
                href="https://wa.me/919876543210?text=नमस्ते!%20मुझे%20छैगांव%20उद्यमी%20के%20बारे%20में%20जानकारी%20चाहिए।"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 transition-all"
              >
                <span>व्हाट्सएप पर चैट करें</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Email Address */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-headline">ईमेल सपोर्ट</h3>
              <p className="text-xs text-slate-500 mt-1">औपचारिक प्रश्नों व सहायता के लिए</p>
              <a
                href="mailto:support@chhaigaonudyami.in"
                className="mt-3 block font-bold text-slate-800 hover:text-[#0056d2] transition-colors text-xs sm:text-sm truncate"
              >
                support@chhaigaonudyami.in
              </a>
              <span className="text-xs text-slate-400 mt-1 block">जवाब का समय: 24 घंटे में</span>
            </div>

            {/* Main Center Location */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base font-headline">मुख्य कार्यालय</h3>
              <p className="text-xs text-slate-500 mt-1">छैगांव माखन, खंडवा (म.प्र.)</p>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                विकासखंड परिसर, छैगांव माखन, ज़िला खंडवा, मध्य प्रदेश - 450771
              </p>
            </div>

          </div>
        </section>

        {/* Main Content: Form & Office Details Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Form Section (7 Columns) */}
            <div className="lg:col-span-7 bg-white p-5 sm:p-8 rounded-2xl border border-slate-200/80 shadow-2xs">
              <div className="mb-5 pb-4 border-b border-slate-100/80">
                <h2 className="text-lg sm:text-xl font-bold font-headline text-slate-900 tracking-tight flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#0056d2]" />
                  <span>संदेश भेजें (Send Message)</span>
                </h2>
                <p className="text-xs text-slate-500 font-normal mt-0.5">
                  नीचे दिए गए फ़ॉर्म को भरें। हमारी सहायता टीम आपकी शंकाओं का समाधान करेगी।
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      पूरा नाम <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="उदा. राजेश शर्मा"
                        className="w-full h-11 pl-10 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0056d2]/30 focus:border-[#0056d2] transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      मोबाइल नंबर <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="10 अंकों का मोबाइल नंबर"
                        className="w-full h-11 pl-10 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0056d2]/30 focus:border-[#0056d2] transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      ईमेल आईडी
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@mail.com"
                        className="w-full h-11 pl-10 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0056d2]/30 focus:border-[#0056d2] transition-all"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      विषय श्रेणी
                    </label>
                    <div className="relative">
                      <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full h-11 pl-10 pr-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0056d2]/30 focus:border-[#0056d2] transition-all text-slate-800 appearance-none cursor-pointer"
                      >
                        <option value="general">सामान्य सवाल (General Query)</option>
                        <option value="courses">पाठ्यक्रम एवं एडमिशन (Courses)</option>
                        <option value="schemes">सरकारी योजना व सब्सिडी (Schemes)</option>
                        <option value="dpr">प्रोजेक्ट रिपोर्ट (DPR Help)</option>
                        <option value="certificate">सर्टिफिकेट एवं सत्यापन</option>
                        <option value="feedback">सुझाव या प्रतिक्रिया</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    विषय शीर्षक (Subject)
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="उदा. डेयरी लोन आवेदन के संबंध में"
                    className="w-full h-11 px-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0056d2]/30 focus:border-[#0056d2] transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    विस्तृत संदेश <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="अपना प्रश्न या संदेश यहाँ विस्तार से लिखें..."
                    className="w-full p-4 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0056d2]/30 focus:border-[#0056d2] transition-all resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-[#0056d2] hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-600/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  {loading ? (
                    <span>भेजा जा रहा है...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>संदेश जमा करें (Submit Message)</span>
                    </>
                  )}
                </Button>

                <p className="text-xs text-slate-500 text-center flex items-center justify-center gap-1 mt-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>आपकी गोपनीयता हमारे लिए महत्वपूर्ण है। आपकी जानकारी पूरी तरह सुरक्षित रहेगी।</span>
                </p>
              </form>
            </div>

            {/* Sidebar Details (5 Columns) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Working Hours & Physical Office */}
              <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-7 rounded-3xl shadow-md">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg font-headline">छैगांव माखन केंद्र</h3>
                    <p className="text-xs text-blue-200">कौशल विकास व ग्रामीण परामर्श केंद्र</p>
                  </div>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-3 border-b border-slate-800 pb-3">
                    <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">स्थान पता:</p>
                      <p className="mt-0.5 text-slate-300 leading-relaxed">
                        विकासखंड रोड, जनपद पंचायत के समीप, छैगांव माखन, ज़िला खंडवा, मध्य प्रदेश - 450771
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 border-b border-slate-800 pb-3">
                    <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">कार्यालय कार्य समय:</p>
                      <p className="mt-0.5 text-slate-300">सोमवार से शनिवार: 09:00 AM - 06:00 PM</p>
                      <p className="text-xs text-slate-400">रविवार: अवकाश (व्हाट्सएप ऑनलाइन सपोर्ट उपलब्ध)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Globe2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-white">डिजिटल पोर्टल:</p>
                      <p className="mt-0.5 text-slate-300">www.chhaigaonudyami.in</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">सोशल मीडिया पर जुड़ें:</span>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://whatsapp.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white flex items-center justify-center transition-all"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                    </a>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all"
                    >
                      <FaYoutube className="w-4 h-4" />
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all"
                    >
                      <FaFacebook className="w-4 h-4" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-pink-500/20 text-pink-400 hover:bg-pink-500 hover:text-white flex items-center justify-center transition-all"
                    >
                      <FaInstagram className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Location Card / Visual Placeholder */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs text-center">
                <div className="relative rounded-2xl overflow-hidden bg-slate-100 h-44 border border-slate-200 flex flex-col items-center justify-center p-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg animate-bounce mb-2">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <p className="font-bold text-slate-900 text-sm font-headline">खंडवा-इंदौर रोड, छैगांव माखन</p>
                  <p className="text-xs text-slate-500 mt-0.5">मध्य प्रदेश, भारत</p>
                  <a
                    href="https://maps.google.com/?q=Chhaigaon+Makhan+Khandwa"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#0056d2] hover:underline"
                  >
                    <span>गूगल मैप्स पर दिशा-निर्देश देखें</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-slate-100/70 border-t border-slate-200 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <SectionBadge className="bg-blue-100 text-[#0056d2] mb-3 inline-flex">अक्सर पूछे जाने वाले सवाल</SectionBadge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-headline">
                संपर्क से जुड़े सामान्य प्रश्न
              </h2>
            </div>

            <div className="space-y-4">
              {contactFaqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs transition-all"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-[#0056d2] transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2.5">
                        <HelpCircle className="w-5 h-5 text-[#0056d2] shrink-0" />
                        <span>{faq.q}</span>
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#0056d2]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
