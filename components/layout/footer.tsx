import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Heart,
  ShieldCheck,
  Award,
  Sparkles,
} from "lucide-react";
import {
  FaWhatsapp,
  FaYoutube,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa6";

interface FooterProps {
  showValueBanner?: boolean;
}

export function Footer({ showValueBanner = false }: FooterProps) {
  return (
    <footer className="bg-slate-50 text-slate-700 border-t border-slate-200 mt-auto">
      {/* Top Value Banner (Only shown when showValueBanner is true, e.g. Home Page) */}
      {showValueBanner && (
        <div className="border-b border-slate-200 py-8 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-blue-50/70 border border-blue-100">
                <div className="h-11 w-11 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-headline">प्रमाणित पाठ्यक्रम</h4>
                  <p className="text-xs text-slate-500 mt-0.5">शासकीय एवं वित्तीय संस्थाओं से संरेखित</p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100">
                <div className="h-11 w-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-headline">व्यावहारिक प्रशिक्षण</h4>
                  <p className="text-xs text-slate-500 mt-0.5">सरल हिंदी में वीडियो एवं DPR रिपोर्ट्स</p>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-purple-50/70 border border-purple-100">
                <div className="h-11 w-11 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm font-headline">मेंटरशिप व सहयोग</h4>
                  <p className="text-xs text-slate-500 mt-0.5">विशेषज्ञों से सीधा संवाद और मार्गदर्शन</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative h-11 w-11 flex items-center justify-center shrink-0">
                <Image
                  src="/assets/logo.png"
                  alt="छैगांव उद्यमी Logo"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-lg text-slate-900 block font-headline">छैगांव उद्यमी</span>
                <span className="text-xs text-primary font-semibold font-label">Chhaigaon Udyami Ecosystem</span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              ग्रामीण एवं कस्बाई भारत के युवाओं और महिलाओं को सफल उद्यमी बनाने की एक डिजिटल पहल। सीखें, कमाएं और अपने क्षेत्र को समृद्ध बनाएं।
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Chhaigaon Makhan, Khandwa, Madhya Pradesh (India)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>support@chhaigaonudyami.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>हेल्पलाइन: +91 98765 43210</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-3 text-slate-500">
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors"
              >
                <FaWhatsapp className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors"
              >
                <FaYoutube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
              >
                <FaFacebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-on-surface font-headline">प्रमुख पाठ्यक्रम (Courses)</h4>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li>
                <Link href="/courses?category=dairy" className="hover:text-primary transition-colors">
                  डेयरी एवं पशुपालन
                </Link>
              </li>
              <li>
                <Link href="/courses?category=food-processing" className="hover:text-primary transition-colors">
                  खाद्य प्रसंस्करण (Food Processing)
                </Link>
              </li>
              <li>
                <Link href="/courses?category=organic-farming" className="hover:text-primary transition-colors">
                  जैविक खेती (Organic Farming)
                </Link>
              </li>
              <li>
                <Link href="/courses?category=digital-marketing" className="hover:text-primary transition-colors">
                  डिजिटल ग्रामीण व्यापार
                </Link>
              </li>
              <li>
                <Link href="/courses?category=tailoring" className="hover:text-primary transition-colors">
                  सिलाई व परिधान उद्योग
                </Link>
              </li>
            </ul>
          </div>

          {/* Government Initiatives */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-on-surface font-headline">सरकारी योजनाएं (Schemes)</h4>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li>
                <a href="#schemes" className="hover:text-primary transition-colors">
                  PM मुद्रा योजना (PMMY)
                </a>
              </li>
              <li>
                <a href="#schemes" className="hover:text-primary transition-colors">
                  PMEGP सब्सिडी लोन
                </a>
              </li>
              <li>
                <a href="#schemes" className="hover:text-primary transition-colors">
                  NABARD ग्रामीण विकास
                </a>
              </li>
              <li>
                <a href="#schemes" className="hover:text-primary transition-colors">
                  MSME उद्यम रजिस्ट्रेशन
                </a>
              </li>
              <li>
                <a href="#schemes" className="hover:text-primary transition-colors">
                  महिला समृद्धि योजना
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Platform Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-on-surface font-headline">मंच (Platform)</h4>
            <ul className="space-y-2 text-sm text-on-surface-variant">
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">
                  लॉग इन (Sign In)
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary transition-colors">
                  निःशुल्क पंजीकरण (Register)
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-emerald-600 transition-colors">
                  विद्यार्थी डैशबोर्ड
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-emerald-600 transition-colors">
                  अक्सर पूछे जाने वाले सवाल (FAQ)
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-600 transition-colors">
                  गोपनीयता नीति (Privacy Policy)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-200 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Chhaigaon Udyami. All rights reserved. आत्मनिर्भर भारत की ओर अग्रसर।</p>
          <div className="flex items-center gap-1 text-slate-600">
            <span>Made with</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
            <span>for Rural Entrepreneurs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
