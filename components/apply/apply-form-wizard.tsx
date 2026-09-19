"use client";

import React, { useState } from "react";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Award,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Download,
  AlertCircle,
} from "lucide-react";

export function ApplyFormWizard() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState<string>("");

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    district: "Khandwa",
    state: "Madhya Pradesh",
    gender: "male",
    category: "obc",
    education: "12th_pass",
    program: "dairy-farming",
    hasExistingBusiness: "no",
    businessName: "",
    seekingSubsidy: "yes",
    loanAmount: "10_lakhs",
    aadharNumber: "",
    declarationChecked: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final Submit
      setIsSubmitting(true);
      setTimeout(() => {
        const randomNum = Math.floor(10000 + Math.random() * 90000);
        setTrackingId(`CU-2026-ADM-${randomNum}`);
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 900);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div id="apply-form" className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden scroll-mt-20">
      
      {/* Top Banner Header */}
      <div className="bg-linear-to-r from-[#003882] via-[#0056d2] to-[#004bb8] text-white p-5 sm:p-6 lg:p-7 relative overflow-hidden">
        {/* Subtle Ambient Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 text-left">
            {/* Session Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/95 text-[#0056d2] border border-blue-200/90 shadow-2xs backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0056d2]" />
              <span>सत्र 2026-27 प्रवेश प्रारंभ</span>
            </div>

            {/* Main Header */}
            <h3 className="text-lg sm:text-xl lg:text-2xl font-black font-headline tracking-tight text-white leading-snug">
              ऑनलाइन प्रवेश एवं सब्सिडी सहायता आवेदन फॉर्म
            </h3>

            {/* Subtitle */}
            <p className="text-xs sm:text-[13px] text-blue-100/90 font-body leading-relaxed max-w-2xl">
              कृपया सभी आवश्यक विवरण सही-सही भरें। आपका आवेदन 2–3 कार्यदिवसों में एडमिशन सेल द्वारा सत्यापित किया जाएगा।
            </p>
          </div>

          {/* Step Indicator Badge */}
          {!isSubmitted && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-blue-200/90 shadow-2xs backdrop-blur-xs shrink-0 self-start sm:self-center">
              <span className="text-[11px] font-bold text-slate-700">चरण (Step):</span>
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-black bg-[#0056d2] text-white shadow-2xs">
                <span>{step}</span>
                <span className="text-blue-200 font-normal">/</span>
                <span>3</span>
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar & Steps Checkpoints */}
        {!isSubmitted && (
          <div className="relative z-10 mt-4 pt-1">
            <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden p-0.5">
              <div
                className="bg-linear-to-r from-amber-400 to-amber-300 h-full rounded-full transition-all duration-400 shadow-sm"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] font-semibold text-blue-200 mt-1.5 px-0.5">
              <span className={step >= 1 ? "text-white font-bold" : "text-blue-200/70"}>1. व्यक्तिगत विवरण</span>
              <span className={step >= 2 ? "text-white font-bold" : "text-blue-200/70"}>2. कोर्स व व्यवसाय</span>
              <span className={step >= 3 ? "text-white font-bold" : "text-blue-200/70"}>3. आधार व घोषणा</span>
            </div>
          </div>
        )}
      </div>

      {/* Form Content Body */}
      <div className="p-5 sm:p-7">
        
        {isSubmitted ? (
          /* Success Screen */
          <div className="text-center py-8 space-y-6 max-w-lg mx-auto">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-black text-slate-950 font-headline">
                आवेदन सफलतापूर्वक प्राप्त हुआ!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-body">
                आपका ऑनलाइन प्रवेश आवेदन छैगांव उद्यमी एडमिशन सेल को प्राप्त हो चुका है।
              </p>
            </div>

            {/* Tracking ID Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2 shadow-2xs">
              <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                <span>Application Tracking ID:</span>
                <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  सत्यापित
                </span>
              </div>
              <div className="text-xl font-mono font-black text-blue-700 tracking-wider">
                {trackingId}
              </div>
              <div className="text-xs text-slate-600 pt-1 border-t border-slate-200">
                <strong>आवेदक:</strong> {formData.fullName} • <strong>मोबाइल:</strong> {formData.mobile}
              </div>
            </div>

            {/* Next Steps Checklist */}
            <div className="text-left bg-blue-50/70 border border-blue-200/80 rounded-xl p-4 space-y-2 text-xs text-slate-700">
              <div className="font-bold text-blue-950 text-sm flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>अगले कदम (Next Steps):</span>
              </div>
              <ul className="space-y-1.5 list-disc list-inside leading-relaxed text-slate-700">
                <li>आपके पंजीकृत मोबाइल नंबर पर व्हाट्सएप व SMS द्वारा पुष्टि संदेश भेज दिया गया है।</li>
                <li>हमारे मेंटर द्वारा 24 घंटे के भीतर कॉल करके आपकी DPR व सब्सिडी प्रोफाइल की जांच की जाएगी।</li>
                <li>आप छात्र डैशबोर्ड पर लॉग इन करके अपनी अध्ययन सामग्री तुरंत शुरू कर सकते हैं।</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>आवेदन रसीद प्रिंट करें</span>
              </button>
              <a
                href="/dashboard"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>डैशबोर्ड पर जाएं</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ) : (
          /* Multi-Step Wizard Form */
          <form onSubmit={handleNext} className="space-y-6">
            
            {/* STEP 1: PERSONAL DETAILS */}
            {step === 1 && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3.5 flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shadow-2xs">
                      1
                    </span>
                    <User className="w-4 h-4 text-blue-600" />
                    <span>व्यक्तिगत विवरण (Personal Information)</span>
                  </h4>
                  <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    चरण 1 / 3
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      पूरा नाम (Full Name) *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="उदा. राहुल पाटीदार"
                      className="w-full h-10 px-3.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white text-slate-900"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      मोबाइल नंबर (WhatsApp Linked) *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      required
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="उदा. 9876543210"
                      className="w-full h-10 px-3.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white text-slate-900"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      ईमेल आईडी (Email)
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="उदा. rahul@gmail.com"
                      className="w-full h-10 px-3.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white text-slate-900"
                    />
                  </div>

                  {/* District */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      जिला (District) *
                    </label>
                    <input
                      type="text"
                      name="district"
                      required
                      value={formData.district}
                      onChange={handleChange}
                      placeholder="उदा. खंडवा / खरगोन / बुरहानपुर"
                      className="w-full h-10 px-3.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white text-slate-900"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      सामाजिक श्रेणी (Category - 35% सब्सिडी पात्रता हेतु) *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-slate-900"
                    >
                      <option value="general">सामान्य (General - 25% Subsidy)</option>
                      <option value="obc">अन्य पिछड़ा वर्ग (OBC - 35% Subsidy)</option>
                      <option value="sc">अनुसूचित जाति (SC - 35% Subsidy)</option>
                      <option value="st">अनुसूचित जनजाति (ST - 35% Subsidy)</option>
                      <option value="female">महिला उद्यमी (Any Category - 35% Subsidy)</option>
                    </select>
                  </div>

                  {/* Education */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      शैक्षणिक योग्यता (Education) *
                    </label>
                    <select
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-slate-900"
                    >
                      <option value="8th_pass">8वीं पास</option>
                      <option value="10th_pass">10वीं पास</option>
                      <option value="12th_pass">12वीं पास</option>
                      <option value="graduate">स्नातक (Graduate)</option>
                      <option value="diploma">डिप्लोमा / ITI</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: PROGRAM & ENTERPRISE SELECTION */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3.5 flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shadow-2xs">
                      2
                    </span>
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span>पाठ्यक्रम एवं व्यवसाय चयन (Course &amp; Business Selection)</span>
                  </h4>
                  <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    चरण 2 / 3
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Program Selection */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      प्रशिक्षण पाठ्यक्रम चुनें (Select Program) *
                    </label>
                    <select
                      name="program"
                      value={formData.program}
                      onChange={handleChange}
                      className="w-full h-11 px-3 text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-slate-900"
                    >
                      <option value="dairy-farming">आधुनिक डेयरी फार्मिंग एवं दुग्ध उत्पाद प्रसंस्करण (₹1,299)</option>
                      <option value="food-processing">मिनी दाल मिल, मसाला उद्योग एवं FSSAI पैकेजिंग (₹999)</option>
                      <option value="pmegp-subsidy">PMEGP एवं मुख्यमंत्री उद्यम क्रांति ₹50L DPR मास्टरक्लास (₹799)</option>
                      <option value="organic-farming">प्राकृतिक एवं जैविक खेती उद्यम (निःशुल्क)</option>
                      <option value="digital-business">ग्रामीण ई-कॉमर्स व ONDC सेलिंग (₹899)</option>
                      <option value="solar-energy">सोलर पंप एवं रूफटॉप सोलर स्थापना (₹1,499)</option>
                    </select>
                  </div>

                  {/* Existing Business Status */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      क्या आपके पास पहले से कोई व्यवसाय है?
                    </label>
                    <select
                      name="hasExistingBusiness"
                      value={formData.hasExistingBusiness}
                      onChange={handleChange}
                      className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-slate-900"
                    >
                      <option value="no">नहीं, नया व्यवसाय शुरू करना है (New Startup)</option>
                      <option value="yes">हाँ, मौजूदा व्यवसाय का विस्तार करना है (Expansion)</option>
                    </select>
                  </div>

                  {/* Subsidy Assistance */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      क्या आप सरकारी सब्सिडी लोन का लाभ लेना चाहते हैं?
                    </label>
                    <select
                      name="seekingSubsidy"
                      value={formData.seekingSubsidy}
                      onChange={handleChange}
                      className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-slate-900"
                    >
                      <option value="yes">हाँ, PMEGP / मुख्यमंत्री उद्यम क्रांति योजना में आवेदन करना है</option>
                      <option value="no">नहीं, केवल तकनीकी प्रशिक्षण व प्रमाण पत्र चाहिए</option>
                    </select>
                  </div>

                  {/* Expected Loan Amount */}
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      अपेक्षित प्रोजेक्ट लागत / बैंक लोन राशि (Project Capital Requirement)
                    </label>
                    <select
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleChange}
                      className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 text-slate-900"
                    >
                      <option value="2_to_5_lakhs">₹2 लाख से ₹5 लाख (मुद्रा / सूक्ष्म उद्योग)</option>
                      <option value="5_to_10_lakhs">₹5 लाख से ₹10 लाख (PMEGP सर्विस/मैन्युफैक्चरिंग)</option>
                      <option value="10_to_25_lakhs">₹10 लाख से ₹25 लाख (PMEGP मैन्युफैक्चरिंग)</option>
                      <option value="25_to_50_lakhs">₹25 लाख से ₹50 लाख (PMEGP वृहद प्रोजेक्ट)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: DOCUMENT UPLOAD & CONFIRMATION */}
            {step === 3 && (
              <div className="space-y-5">
                <div className="border-b border-slate-100 pb-3.5 flex items-center justify-between">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center shadow-2xs">
                      3
                    </span>
                    <FileCheck className="w-4 h-4 text-blue-600" />
                    <span>आधार सत्यापन एवं घोषणा (Verification &amp; Declaration)</span>
                  </h4>
                  <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    चरण 3 / 3
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Aadhar Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block">
                      आधार कार्ड नंबर (Aadhar Number) *
                    </label>
                    <input
                      type="text"
                      name="aadharNumber"
                      required
                      maxLength={12}
                      value={formData.aadharNumber}
                      onChange={handleChange}
                      placeholder="उदा. 1234 5678 9012"
                      className="w-full h-10 px-3.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white text-slate-900"
                    />
                  </div>

                  {/* Summary Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2 text-slate-700">
                    <div className="font-bold text-slate-900 text-sm mb-1">
                      आवेदन सारांश (Application Summary):
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div><strong>नाम:</strong> {formData.fullName || "—"}</div>
                      <div><strong>मोबाइल:</strong> {formData.mobile || "—"}</div>
                      <div><strong>जिला:</strong> {formData.district}, {formData.state}</div>
                      <div><strong>श्रेणी:</strong> {formData.category.toUpperCase()}</div>
                    </div>
                  </div>

                  {/* Declaration Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-700 select-none">
                      <input
                        type="checkbox"
                        name="declarationChecked"
                        required
                        checked={formData.declarationChecked}
                        onChange={handleChange}
                        className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 h-4 w-4 border-slate-300"
                      />
                      <span>
                        मैं प्रमाणित करता/करती हूँ कि मेरे द्वारा दी गई सभी जानकारियां सत्य हैं। मैं छैगांव उद्यमी के नियमों व प्रशिक्षण शर्तों से सहमत हूँ।
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Action Buttons */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>पिछला (Back)</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-2.5 rounded-xl bg-[#0056d2] hover:bg-blue-700 text-white text-xs font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-50 active:scale-98"
              >
                {isSubmitting ? (
                  <span>प्रक्रियाधीन है...</span>
                ) : step < 3 ? (
                  <>
                    <span>अगला चरण (Continue)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                ) : (
                  <>
                    <span>आवेदन जमा करें (Submit Application)</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>

    </div>
  );
}
