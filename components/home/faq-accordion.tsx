"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category?: string;
}

const defaultFaqs: FAQItem[] = [
  {
    category: "सर्टिफिकेट एवं मान्यता",
    q: "क्या छैगांव उद्यमी के सर्टिफिकेट्स बैंक लोन के लिए आधिकारिक रूप से मान्य हैं?",
    a: "हाँ! प्रत्येक पाठ्यक्रम पूर्ण करने और क्विज पास करने पर जारी होने वाला QR कोड युक्त डिजिटल सर्टिफिकेट आपके प्रशिक्षण और व्यावसायिक दक्षता का प्रमाणित दस्तावेज होता है। इसे PMEGP, PM मुद्रा व मुख्यमंत्री उद्यम क्रांति योजना के बैंक आवेदनों में प्रस्तुत किया जा सकता है।",
  },
  {
    category: "सरकारी सब्सिडी व लोन",
    q: "PMEGP एवं अन्य सरकारी योजनाओं में 35% तक सब्सिडी कैसे प्राप्त करें?",
    a: "PMEGP योजना के तहत ग्रामीण क्षेत्रों में सामान्य वर्ग को 25% तथा महिला/आरक्षित वर्ग को 35% तक की क्रेडिट-लिंक्ड बैक-एंडेड सब्सिडी मिलती है। हमारे प्लेटफॉर्म पर आवेदन फॉर्म, प्रोजेक्ट रिपोर्ट (DPR) और बैंक लोन स्वीकृति की संपूर्ण मार्गदर्शिका उपलब्ध है।",
  },
  {
    category: "पाठ्यक्रम एवं भाषा",
    q: "क्या प्रशिक्षण सामग्री पूरी तरह से हिंदी भाषा में उपलब्ध है?",
    a: "हाँ, हमारे सभी वीडियो लेक्चर्स, विस्तृत प्रोजेक्ट रिपोर्ट्स (DPR), लागत-लाभ कैलकुलेटर और नोट्स अत्यंत सरल एवं व्यावहारिक हिंदी भाषा में तैयार किए गए हैं ताकि कोई भी ग्रामीण युवा या महिला आसानी से समझ सके।",
  },
  {
    category: "प्रोजेक्ट रिपोर्ट (DPR)",
    q: "क्या मुझे कोर्स के साथ डाउनलोड योग्य बैंक प्रोजेक्ट रिपोर्ट (DPR) मिलेगी?",
    a: "बिल्कुल! प्रत्येक कोर्स के साथ बैंक-मान्य डिटेल्ड प्रोजेक्ट रिपोर्ट (Word व Excel फॉर्मेट में) शामिल है, जिसमें कच्चा माल, मशीनरी लागत, लाभ-हानि व मासिक कैश-फ्लो का संपूर्ण हिसाब-किताब दिया गया है।",
  },
  {
    category: "लाइसेंसिंग व रजिस्ट्रेशन",
    q: "लघु उद्योग शुरू करने के लिए कौन-कौन से लाइसेंस और रजिस्ट्रेशन जरूरी हैं?",
    a: "उद्योग के प्रकार के अनुसार MSME उद्यम रजिस्ट्रेशन (निःशुल्क), खाद्य पदार्थों हेतु FSSAI रजिस्ट्रेशन, ग्राम पंचायत एनओसी और GST नंबर की आवश्यकता होती है। इन सभी के स्टेप-बाय-स्टेप ट्यूटोरियल हमारे कोर्सेज में शामिल हैं।",
  },
];

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("सभी");

  const categories = ["सभी", "सर्टिफिकेट एवं मान्यता", "सरकारी सब्सिडी व लोन", "पाठ्यक्रम एवं भाषा", "प्रोजेक्ट रिपोर्ट (DPR)"];

  const filteredFaqs = activeCategory === "सभी"
    ? defaultFaqs
    : defaultFaqs.filter((f) => f.category === activeCategory);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setOpenIndex(null);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-[#0056d2] text-white shadow-xs"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="divide-y divide-slate-200 border-y border-slate-200 bg-white">
        {filteredFaqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="transition-colors">
              <button
                onClick={() => toggleFaq(i)}
                className="w-full py-5 text-left flex items-center justify-between gap-4 cursor-pointer group"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-[#0056d2] transition-colors font-headline">
                  {faq.q}
                </span>
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 bg-blue-50 text-[#0056d2]" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  <ChevronDown className="h-4 w-4" />
                </div>
              </button>

              {isOpen && (
                <div className="pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed font-body animate-fadeIn">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                    {faq.a}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
