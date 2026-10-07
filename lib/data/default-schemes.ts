export interface SchemeData {
  id: string;
  title: string;
  slug: string;
  department: string | null;
  category?: string | null;
  description: string | null;
  benefits: string | null;
  eligibility: string | null;
  requiredDocuments: string | null;
  applicationProcess: string | null;
  officialUrl: string | null;
  lastUpdated: string | null;
}

export interface FilterOption {
  value: string;
  label: string;
  count: number;
}

export interface SchemeFilterOptions {
  categories: FilterOption[];
  departments: FilterOption[];
}

export interface SchemesApiResponse {
  success: boolean;
  data: SchemeData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  filterOptions: SchemeFilterOptions;
}

export const CATEGORY_LABELS: Record<string, string> = {
  subsidy: "सब्सिडी / अनुदान",
  loan: "बैंक ऋण",
  stipend: "स्टाइपेंड सहायता",
  training: "प्रशिक्षण व कौशल",
  other: "अन्य योजनाएं",
};

export const defaultSchemes: SchemeData[] = [
  {
    id: "scheme-1",
    title: "प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP)",
    slug: "pmegp-scheme",
    department: "MSME मंत्रालय / KVIC",
    category: "subsidy",
    description:
      "ग्रामीण एवं शहरी क्षेत्रों में नए सूक्ष्म उद्यमों की स्थापना हेतु ऋण एवं 15% से 35% तक का वित्तीय मार्जिन मनी अनुदान।",
    benefits:
      "विनिर्माण क्षेत्र हेतु ₹50 लाख तक और सेवा क्षेत्र हेतु ₹20 लाख तक परियोजना लागत। सामान्य श्रेणी हेतु 15–25% और ग्रामीण/विशेष श्रेणी (SC/ST/OBC/महिला) हेतु 25–35% सरकारी सब्सिडी।",
    eligibility:
      "न्यूनतम आयु 18 वर्ष। ₹10 लाख से अधिक विनिर्माण और ₹5 लाख से अधिक सेवा परियोजना हेतु न्यूनतम 8वीं कक्षा उत्तीर्ण आवश्यक।",
    requiredDocuments:
      "आधार कार्ड, पैन कार्ड, मूल निवासी प्रमाण पत्र, शैक्षणिक योग्यता प्रमाण पत्र, विस्तृत प्रोजेक्ट रिपोर्ट (DPR), जाति प्रमाण पत्र (यदि लागू हो)।",
    applicationProcess:
      "KVIC ऑनलाइन पोर्टल (kviconline.gov.in) पर आवेदन करें या जिला उद्योग केंद्र (DIC) से संपर्क करें।",
    officialUrl: "https://www.kviconline.gov.in/pmegpeportal/pmegphome/index.jsp",
    lastUpdated: "2026-01-15",
  },
  {
    id: "scheme-2",
    title: "मुख्यमंत्री उद्यम क्रांति योजना (MMUKY)",
    slug: "mukhyamantri-udyam-kranti-yojana",
    department: "सूक्ष्म, लघु एवं मध्यम उद्यम विभाग, म.प्र.",
    category: "loan",
    description:
      "मध्य प्रदेश के 12वीं पास युवाओं को बैंक ऋण पर 3% वार्षिक ब्याज अनुदान एवं CGTMSE क्रेडिट गारंटी फीस की प्रतिपूर्ति।",
    benefits:
      "उद्योग/विनिर्माण इकाई हेतु ₹1 लाख से ₹50 लाख तथा सेवा/खुदरा व्यवसाय हेतु ₹1 लाख से ₹25 लाख तक का बैंक ऋण। 7 वर्षों तक प्रतिवर्ष 3% ब्याज अनुदान।",
    eligibility:
      "मध्य प्रदेश का मूल निवासी, आयु 18 से 40 वर्ष, न्यूनतम 12वीं कक्षा उत्तीर्ण, परिवार की वार्षिक आय ₹12 लाख से कम हो।",
    requiredDocuments:
      "समग्र आईडी, आधार कार्ड, 12वीं की अंकसूची, आय प्रमाण पत्र, निवास प्रमाण पत्र, बैंक पासबुक, प्रोजेक्ट प्रोफाइल।",
    applicationProcess:
      "एमपी एमएसएमई पोर्टल (samast.mponline.gov.in) पर ऑनलाइन आवेदन प्रस्तुत करें।",
    officialUrl: "https://samast.mponline.gov.in/",
    lastUpdated: "2026-02-01",
  },
  {
    id: "scheme-3",
    title: "आचार्य विद्यासागर गौ-संवर्धन योजना",
    slug: "acharya-vidyasagar-gau-samvardhan",
    department: "पशुपालन एवं डेयरी विभाग, म.प्र.",
    category: "subsidy",
    description:
      "ग्रामीण क्षेत्रों में 5 या अधिक दुधारू पशुओं की डेयरी इकाई स्थापित करने हेतु 25% से 33% तक का पूंजीगत अनुदान।",
    benefits:
      "अधिकतम ₹10 लाख की परियोजना लागत पर सामान्य वर्ग हेतु 25% (अधिकतम ₹1.50 लाख) तथा SC/ST वर्ग हेतु 33% (अधिकतम ₹2.00 लाख) का अनुदान।",
    eligibility:
      "कम से कम 5 दुधारू पशुओं की इकाई हेतु न्यूनतम 1 एकड़ सिंचित कृषि भूमि होना आवश्यक है।",
    requiredDocuments:
      "जमीन की खसरा-खतौनी, आधार कार्ड, बैंक खाता विवरण, जाति प्रमाण पत्र, पशु चिकित्सक सहमति पत्र।",
    applicationProcess:
      "निकटतम पशु चिकित्सालय या उप-संचालक पशुपालन कार्यालय में आवेदन जमा करें।",
    officialUrl: "http://mpdah.gov.in/",
    lastUpdated: "2026-01-20",
  },
  {
    id: "scheme-4",
    title: "राष्ट्रीय कृषि विकास योजना — उद्यानिकी (RKVY)",
    slug: "rkvy-horticulture-scheme",
    department: "उद्यानिकी एवं खाद्य प्रसंस्करण विभाग",
    category: "subsidy",
    description:
      "सब्जी, फल, मसाला उत्पादन, पॉलीहाउस निर्माण एवं कोल्ड स्टोरेज की स्थापना हेतु 40% से 50% तक की सब्सिडी।",
    benefits:
      "संरक्षित खेती (पॉलीहाउस/शेडनेट), ड्रिप सिंचाई प्रणाली, पैक हाउस और लघु प्रसंस्करण संयंत्रों पर 50% तक लागत अनुदान।",
    eligibility:
      "मध्य प्रदेश के कृषक जिनके पास स्वयं की कृषि भूमि उपलब्ध हो और सिंचाई का साधन हो।",
    requiredDocuments:
      "भूमि अभिलेख (B-1/खसरा), आधार कार्ड, बैंक पासबुक, पासपोर्ट फोटो, मिट्टी व जल परीक्षण रिपोर्ट।",
    applicationProcess:
      "एमपी उद्यानिकी पोर्टल (mpfsts.mpegov.net) पर कृषक पंजीयन द्वारा आवेदन करें।",
    officialUrl: "https://mpfsts.mpegov.net/",
    lastUpdated: "2026-02-10",
  },
  {
    id: "scheme-5",
    title: "प्रधानमंत्री सूक्ष्म खाद्य प्रसंस्करण उद्यम (PMFME)",
    slug: "pmfme-scheme",
    department: "खाद्य प्रसंस्करण उद्योग मंत्रालय (MOFPI)",
    category: "subsidy",
    description:
      "एक जिला एक उत्पाद (ODOP) के तहत स्थानीय कृषि व खाद्य प्रसंस्करण इकाइयों के उन्नयन हेतु 35% क्रेडिट-लिंक्ड सब्सिडी।",
    benefits:
      "परियोजना लागत का 35% तक क्रेडिट लिंक्ड कैपिटल सब्सिडी (अधिकतम ₹10 लाख प्रति इकाई)।",
    eligibility:
      "मौजूदा खाद्य प्रसंस्करण उद्यमी अथवा नए इच्छुक व्यक्ति/समूह जो संबंधित जिले के ODOP उत्पाद से जुड़े हों।",
    requiredDocuments:
      "उद्यम आधार, पैन, आधार, जीएसटी (यदि लागू हो), बिजली बिल, बैंक स्टेटमेंट और DPR।",
    applicationProcess:
      "PMFME ऑनलाइन राष्ट्रीय पोर्टल (pmfme.mofpi.gov.in) पर ऑनलाइन आवेदन करें।",
    officialUrl: "https://pmfme.mofpi.gov.in/",
    lastUpdated: "2026-01-30",
  },
  {
    id: "scheme-6",
    title: "मुख्यमंत्री सीखो-कमाओ योजना (MMSKY)",
    slug: "mukhyamantri-seekho-kamao-yojana",
    department: "तकनीकी शिक्षा, कौशल विकास एवं रोजगार विभाग",
    category: "stipend",
    description:
      "युवाओं को औद्योगिक प्रतिष्ठानों में ऑन-द-जॉब ट्रेनिंग के साथ ₹8,000 से ₹10,000 प्रति माह स्टाइपेंड सहायता।",
    benefits:
      "12वीं पास को ₹8,000/माह, ITI पास को ₹8,500/माह, डिप्लोमा को ₹9,000/माह और स्नातक/उच्च को ₹10,000/माह प्रत्यक्ष DBT स्टाइपेंड।",
    eligibility:
      "मध्य प्रदेश के 18 से 29 वर्ष आयु वर्ग के शिक्षित युवा जिनका समग्र ई-केवाईसी पूर्ण हो।",
    requiredDocuments:
      "समग्र आईडी, आधार कार्ड, शैक्षणिक प्रमाण पत्र, बैंक खाता (आधार DBT लिंक)।",
    applicationProcess:
      "MMSKY पोर्टल (mmsky.mp.gov.in) पर अभ्यर्थी पंजीयन कर रिक्तियों के लिए आवेदन करें।",
    officialUrl: "https://mmsky.mp.gov.in/",
    lastUpdated: "2026-02-15",
  },
  {
    id: "scheme-7",
    title: "प्रधानमंत्री मुद्रा योजना (PMMY)",
    slug: "pmmy-mudra-yojana",
    department: "वित्तीय सेवाएं विभाग, वित्त मंत्रालय",
    category: "loan",
    description:
      "गैर-कॉर्पोरेट और गैर-कृषि लघु/सूक्ष्म उद्यमों को विनिर्माण, व्यापार व सेवा हेतु ₹10 लाख तक संपार्श्विक-मुक्त (बिना गारंटी) ऋण।",
    benefits:
      "तीन श्रेणियां: शिशु (₹50,000 तक), किशोर (₹50,000 से ₹5 लाख तक), एवं तरुण (₹5 लाख से ₹10 लाख तक)। शून्य प्रोसेसिंग फीस और प्रतिस्पर्धी ब्याज दरें।",
    eligibility:
      "कोई भी भारतीय नागरिक जिसकी गैर-कृषि व्यवसाय योजना हो। पिछले किसी बैंक से डिफ़ॉल्टर न हो।",
    requiredDocuments:
      "पहचान प्रमाण (आधार/वोटर आईडी), निवास प्रमाण, व्यवसाय स्थापना प्रमाण, 6 माह का बैंक स्टेटमेंट, कोटेशन/परियोजना विवरण।",
    applicationProcess:
      "उद्यमी मित्र पोर्टल (udyamimitra.in) अथवा किसी भी राष्ट्रीयकृत/ग्रामीण बैंक शाखा में आवेदन करें।",
    officialUrl: "https://www.mudra.org.in/",
    lastUpdated: "2026-02-18",
  },
  {
    id: "scheme-8",
    title: "दीनदयाल अंत्योदय योजना — राष्ट्रीय ग्रामीण आजीविका मिशन (DAY-NRLM)",
    slug: "day-nrlm-scheme",
    department: "ग्रामीण विकास मंत्रालय",
    category: "subsidy",
    description:
      "महिला स्वयं सहायता समूहों (SHG) को माइक्रो-एंटरप्राइज व आजीविका गतिविधियों हेतु चक्रीय निधि (RF), सामुदायिक निवेश निधि (CIF) एवं 7% ब्याज अनुदान।",
    benefits:
      "स्वयं सहायता समूहों को ₹15,000 रिवॉल्विंग फंड और ₹1.50 लाख तक CIF। समय पर बैंक ऋण चुकाने पर 3% अतिरिक्त ब्याज सबवेंशन (प्रभावी ब्याज दर केवल 4%)।",
    eligibility:
      "कम से कम 6 माह से सक्रिय महिला स्वयं सहायता समूह जो पंचसूत्र का नियमित पालन कर रहे हों।",
    requiredDocuments:
      "समूह बैंक पासबुक, समूह संकल्प प्रस्ताव, सदस्यों की सूची व आधार, समूह ग्रेडिंग प्रमाण पत्र।",
    applicationProcess:
      "ग्राम संगठन (VO) अथवा संकुल स्तरीय संघ (CLF) / ब्लॉक मिशन प्रबंधक (BMM) से संपर्क करें।",
    officialUrl: "https://aajeevika.gov.in/",
    lastUpdated: "2026-02-20",
  },
];
