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

export function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-700 border-t border-slate-200 mt-auto">
      {/* Top Value Banner */}
      <div className="border-b border-slate-200/80 py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-primary-fixed/30 border border-primary-fixed-dim">
              <div className="h-12 w-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm shadow-primary/20">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-on-surface text-sm font-headline">प्रमाणित पाठ्यक्रम (Certified)</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">Government recognized & industry aligned</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-tertiary-fixed/30 border border-tertiary-fixed-dim">
              <div className="h-12 w-12 rounded-xl bg-tertiary text-on-tertiary flex items-center justify-center shrink-0 shadow-sm shadow-tertiary/20">
                <Award className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-on-surface text-sm font-headline">व्यावहारिक प्रशिक्षण (Practical)</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">Learn by doing in regional Hindi language</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-secondary-fixed/30 border border-secondary-fixed-dim">
              <div className="h-12 w-12 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm shadow-secondary/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-on-surface text-sm font-headline">मेंटरशिप व सहयोग (Community)</h4>
                <p className="text-xs text-on-surface-variant mt-0.5">Direct guidance from local successful udyamis</p>
              </div>
            </div>
          </div>
        </div>
      </div>

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
