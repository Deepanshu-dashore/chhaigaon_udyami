import React from "react";
import { getActiveSchemes } from "@/services/scheme.service";
import { SchemeExplorer, SchemeData } from "@/components/schemes/scheme-explorer";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Landmark, ShieldCheck, CheckCircle2, Award, Sparkles } from "lucide-react";

export const metadata = {
  title: "सरकारी योजनाएं व सब्सिडी | Chhaigaon Udyami",
  description:
    "मध्य प्रदेश एवं केंद्र सरकार की प्रमुख स्वरोजगार, सब्सिडी और ब्याज अनुदान योजनाएं — PMEGP, मुख्यमंत्री उद्यम क्रांति, डेयरी व उद्यानिकी योजनाएं।",
};

const defaultSchemes: SchemeData[] = [
  {
    id: "scheme-1",
    title: "प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP)",
    slug: "pmegp-scheme",
    department: "MSME मंत्रालय / KVIC",
    description: "ग्रामीण एवं शहरी क्षेत्रों में नए सूक्ष्म उद्यमों की स्थापना हेतु ऋण एवं 15% से 35% तक का वित्तीय मार्जिन मनी अनुदान।",
    benefits: "विनिर्माण क्षेत्र (Manufacturing) हेतु ₹50 लाख तक और सेवा क्षेत्र हेतु ₹20 लाख तक परियोजना लागत। सामान्य श्रेणी हेतु 15-25% और ग्रामीण/विशेष श्रेणी (SC/ST/OBC/महिला) हेतु 25-35% सरकारी सब्सिडी।",
    eligibility: "न्यूनतम आयु 18 वर्ष। ₹10 लाख से अधिक विनिर्माण और ₹5 लाख से अधिक सेवा परियोजना हेतु न्यूनतम 8वीं कक्षा उत्तीर्ण आवश्यक।",
    requiredDocuments: "आधार कार्ड, पैन कार्ड, मूल निवासी प्रमाण पत्र, शैक्षणिक योग्यता प्रमाण पत्र, विस्तृत प्रोजेक्ट रिपोर्ट (DPR), जाति प्रमाण पत्र (यदि लागू हो)।",
    applicationProcess: "KVIC ऑनलाइन पोर्टल (kviconline.gov.in) पर आवेदन करें या जिला उद्योग केंद्र (DIC) से संपर्क करें।",
    officialUrl: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp",
    lastUpdated: "2026-01-15",
  },
  {
    id: "scheme-2",
    title: "मुख्यमंत्री उद्यम क्रांति योजना (MMUKY)",
    slug: "mukhyamantri-udyam-kranti-yojana",
    department: "सूक्ष्म, लघु एवं मध्यम उद्यम विभाग, म.प्र.",
    description: "मध्य प्रदेश के 12वीं पास युवाओं को बैंक ऋण पर 3% वार्षिक ब्याज अनुदान एवं CGTMSE क्रेडिट गारंटी फीस की प्रतिपूर्ति।",
    benefits: "उद्योग/विनिर्माण इकाई हेतु ₹1 लाख से ₹50 लाख तथा सेवा/खुदरा व्यवसाय हेतु ₹1 लाख से ₹25 लाख तक का बैंक ऋण। 7 वर्षों तक प्रतिवर्ष 3% ब्याज अनुदान।",
    eligibility: "मध्य प्रदेश का मूल निवासी, आयु 18 से 40 वर्ष, न्यूनतम 12वीं कक्षा उत्तीर्ण, परिवार की वार्षिक आय ₹12 लाख से कम हो।",
    requiredDocuments: "समग्र आईडी, आधार कार्ड, 12वीं की अंकसूची, आय प्रमाण पत्र, निवास प्रमाण पत्र, बैंक पासबुक, प्रोजेक्ट प्रोफाइल।",
    applicationProcess: "एमपी एमएसएमई पोर्टल (samast.mponline.gov.in) पर ऑनलाइन आवेदन प्रस्तुत करें।",
    officialUrl: "https://samast.mponline.gov.in/",
    lastUpdated: "2026-02-01",
  },
  {
    id: "scheme-3",
    title: "आचार्य विद्यासागर गौ-संवर्धन योजना (डेयरी योजना)",
    slug: "acharya-vidyasagar-gau-samvardhan",
    department: "पशुपालन एवं डेयरी विभाग, म.प्र.",
    description: "ग्रामीण क्षेत्रों में 5 या अधिक दुधारू पशुओं की डेयरी इकाई स्थापित करने हेतु 25% से 33% तक का पूंजीगत अनुदान।",
    benefits: "अधिकतम ₹10 लाख की परियोजना लागत पर सामान्य वर्ग हेतु 25% (अधिकतम ₹1.50 लाख) तथा SC/ST वर्ग हेतु 33% (अधिकतम ₹2.00 लाख) का अनुदान।",
    eligibility: "कम से कम 5 दुधारू पशुओं की इकाई हेतु न्यूनतम 1 एकड़ सिंचित कृषि भूमि होना आवश्यक है।",
    requiredDocuments: "जमीन की खसरा-खतौनी, आधार कार्ड, बैंक खाता विवरण, जाति प्रमाण पत्र, पशु चिकित्सक सहमति पत्र।",
    applicationProcess: "निकटतम पशु चिकित्सालय या उप-संचालक पशुपालन कार्यालय में आवेदन जमा करें।",
    officialUrl: "http://mpdah.gov.in/",
    lastUpdated: "2026-01-20",
  },
  {
    id: "scheme-4",
    title: "राष्ट्रीय कृषि विकास योजना (RKVY - उद्यानिकी)",
    slug: "rkvy-horticulture-scheme",
    department: "उद्यानिकी एवं खाद्य प्रसंस्करण विभाग",
    description: "सब्जी, फल, मसाला उत्पादन, पॉलीहाउस निर्माण एवं कोल्ड स्टोरेज की स्थापना हेतु 40% से 50% तक की भारी सब्सिडी।",
    benefits: "संरक्षित खेती (पॉलीहाउस/शेडनेट), ड्रिप सिंचाई प्रणाली, पैक हाउस और लघु प्रसंस्करण संयंत्रों पर 50% तक लागत अनुदान।",
    eligibility: "मध्य प्रदेश के कृषक जिनके पास स्वयं की कृषि भूमि उपलब्ध हो और सिंचाई का साधन हो।",
    requiredDocuments: "भूमि अभिलेख (B-1/खसरा), आधार कार्ड, बैंक पासबुक, पासपोर्ट फोटो, मिट्टी व जल परीक्षण रिपोर्ट।",
    applicationProcess: "एमपी उद्यानिकी पोर्टल (mpfsts.mpegov.net) पर कृषक पंजीयन द्वारा आवेदन करें।",
    officialUrl: "https://mpfsts.mpegov.net/",
    lastUpdated: "2026-02-10",
  },
  {
    id: "scheme-5",
    title: "प्रधानमंत्री सूक्ष्म खाद्य प्रसंस्करण उद्यम (PMFME)",
    slug: "pmfme-scheme",
    department: "खाद्य प्रसंस्करण उद्योग मंत्रालय (MOFPI)",
    description: "एक जिला एक उत्पाद (ODOP) के तहत स्थानीय कृषि व खाद्य प्रसंस्करण इकाइयों के उन्नयन हेतु 35% क्रेडिट-लिंक्ड सब्सिडी।",
    benefits: "परियोजना लागत का 35% तक क्रेडिट लिंक्ड कैपिटल सब्सिडी (अधिकतम ₹10 लाख प्रति इकाई)। FPO एवं स्व-सहायता समूहों को विशेष समर्थन।",
    eligibility: "मौजूदा खाद्य प्रसंस्करण उद्यमी अथवा नए इच्छुक व्यक्ति/समूह जो संबंधित जिले के ODOP उत्पाद से जुड़े हों।",
    requiredDocuments: "उद्यम आधार, पैन, आधार, जीएसटी (यदि लागू हो), बिजली बिल, बैंक स्टेटमेंट और DPR।",
    applicationProcess: "PMFME ऑनलाइन राष्ट्रीय पोर्टल (pmfme.mofpi.gov.in) पर ऑनलाइन आवेदन करें।",
    officialUrl: "https://pmfme.mofpi.gov.in/",
    lastUpdated: "2026-01-30",
  },
  {
    id: "scheme-6",
    title: "मुख्यमंत्री सीखो-कमाओ योजना (MMSKY)",
    slug: "mukhyamantri-seekho-kamao-yojana",
    department: "तकनीकी शिक्षा, कौशल विकास एवं रोजगार विभाग",
    description: "युवाओं को औद्योगिक प्रतिष्ठानों में ऑन-द-जॉब ट्रेनिंग (OJT) के साथ ₹8,000 से ₹10,000 प्रति माह स्टाइपेंड सहायता।",
    benefits: "ट्रेनिंग के दौरान 12वीं पास को ₹8,000/माह, ITI पास को ₹8,500/माह, डिप्लोमा को ₹9,000/माह और स्नातक/उच्च को ₹10,000/माह प्रत्यक्ष डीबीटी स्टाइपेंड।",
    eligibility: "मध्य प्रदेश के 18 से 29 वर्ष आयु वर्ग के शिक्षित युवा जिनका समग्र ई-केवाईसी पूर्ण हो।",
    requiredDocuments: "समग्र आईडी, आधार कार्ड, शैक्षणिक प्रमाण पत्र, बैंक खाता (आधार डीबीटी लिंक)।",
    applicationProcess: "MMSKY पोर्टल (mmsky.mp.gov.in) पर अभ्यर्थी पंजीयन कर रिक्तियों के लिए आवेदन करें।",
    officialUrl: "https://mmsky.mp.gov.in/",
    lastUpdated: "2026-02-15",
  },
];

export default async function SchemesPage() {
  let schemes: SchemeData[] = defaultSchemes;

  try {
    const dbSchemes = await getActiveSchemes();
    if (dbSchemes && dbSchemes.length > 0) {
      schemes = dbSchemes.map((s) => ({
        id: s.id,
        title: s.title,
        slug: s.slug,
        department: s.department,
        description: s.description,
        benefits: s.benefits,
        eligibility: s.eligibility,
        requiredDocuments: s.requiredDocuments,
        applicationProcess: s.applicationProcess,
        officialUrl: s.officialUrl,
        lastUpdated: s.lastUpdated ? s.lastUpdated.toISOString().split("T")[0] : null,
      }));
    }
  } catch {
    // fallback to default schemes
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans">
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-900 via-[#0056d2] to-indigo-900 text-white py-14 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_60%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 text-white text-xs font-bold backdrop-blur-md mb-4 border border-white/20">
            <Landmark className="w-4 h-4 text-amber-300" />
            <span>शासकीय उद्यमिता एवं स्वरोजगार योजनाएं 2026</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-4">
            सरकारी योजनाएं, सब्सिडी व ब्याज अनुदान
          </h1>

          <p className="text-base md:text-xl text-blue-100 max-w-3xl leading-relaxed mb-6 font-medium">
            मध्य प्रदेश शासन एवं केंद्र सरकार की प्रमुख स्वरोजगार योजनाओं की संपूर्ण पात्रता, आवेदन प्रक्रिया और प्रोजेक्ट रिपोर्ट (DPR) मार्गदर्शन एक ही मंच पर।
          </p>

          {/* Value Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl">
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">100% प्रामाणिक</div>
                <div className="text-[11px] text-blue-200">आधिकारिक स्रोत</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-amber-300 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">35% तक सब्सिडी</div>
                <div className="text-[11px] text-blue-200">PMEGP व अन्य</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 flex items-center gap-2.5">
              <Award className="w-5 h-5 text-blue-300 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">DPR टेम्पलेट</div>
                <div className="text-[11px] text-blue-200">बैंक मान्य रिपोर्ट</div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3 flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">निःशुल्क मार्गदर्शन</div>
                <div className="text-[11px] text-blue-200">ग्राम स्तर पर सहायता</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <SchemeExplorer initialSchemes={schemes} />
      </main>

      <Footer />
    </div>
  );
}
