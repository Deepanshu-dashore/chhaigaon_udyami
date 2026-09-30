"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, MotionValue } from "motion/react";
import { Button } from "@/components/ui/button";
import { SectionBadge } from "@/components/ui/section-badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, CheckCircle2, Award, Sparkles } from "lucide-react";

export function CredentialsScrollSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const row1Ref = useRef<HTMLDivElement | null>(null);
  const row2Ref = useRef<HTMLDivElement | null>(null);

  // Motion values for Row 1 sliding animation
  const x1Left = useMotionValue<number>(-100);
  const opacity1Left = useMotionValue<number>(0);
  const x1Right = useMotionValue<number>(100);
  const opacity1Right = useMotionValue<number>(0);

  // Motion values for Row 2 sliding animation
  const x2Left = useMotionValue<number>(-100);
  const opacity2Left = useMotionValue<number>(0);
  const x2Right = useMotionValue<number>(100);
  const opacity2Right = useMotionValue<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Helper function to bridge GSAP animations with MotionValues
    const animateMotionVal = (
      motionVal: MotionValue<number>,
      target: number,
      duration: number
    ) => {
      const state = { value: motionVal.get() };
      return gsap.to(state, {
        value: target,
        duration,
        ease: "power3.out",
        onUpdate: () => {
          motionVal.set(state.value);
        },
      });
    };

    const ctx = gsap.context(() => {
      // Row 1 ScrollTrigger
      if (row1Ref.current) {
        const animateIn1 = () => {
          animateMotionVal(x1Left, 0, 1.1);
          animateMotionVal(opacity1Left, 1, 1.1);
          animateMotionVal(x1Right, 0, 1.1);
          animateMotionVal(opacity1Right, 1, 1.1);
        };
        const animateOut1 = () => {
          animateMotionVal(x1Left, -100, 0.8);
          animateMotionVal(opacity1Left, 0, 0.8);
          animateMotionVal(x1Right, 100, 0.8);
          animateMotionVal(opacity1Right, 0, 0.8);
        };

        ScrollTrigger.create({
          trigger: row1Ref.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: animateIn1,
          onEnterBack: animateIn1,
          onLeave: animateOut1,
          onLeaveBack: animateOut1,
        });
      }

      // Row 2 ScrollTrigger
      if (row2Ref.current) {
        const animateIn2 = () => {
          animateMotionVal(x2Left, 0, 1.1);
          animateMotionVal(opacity2Left, 1, 1.1);
          animateMotionVal(x2Right, 0, 1.1);
          animateMotionVal(opacity2Right, 1, 1.1);
        };
        const animateOut2 = () => {
          animateMotionVal(x2Left, -100, 0.8);
          animateMotionVal(opacity2Left, 0, 0.8);
          animateMotionVal(x2Right, 100, 0.8);
          animateMotionVal(opacity2Right, 0, 0.8);
        };

        ScrollTrigger.create({
          trigger: row2Ref.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: animateIn2,
          onEnterBack: animateIn2,
          onLeave: animateOut2,
          onLeaveBack: animateOut2,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [x1Left, opacity1Left, x1Right, opacity1Right, x2Left, opacity2Left, x2Right, opacity2Right]);

  return (
    <section
      ref={sectionRef}
      id="credentials"
      className="py-10 lg:py-14 border-b border-slate-200 bg-white overflow-hidden space-y-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ROW 1: Turn your learning into proof */}
        <div
          ref={row1Ref}
          className="grid text-justify grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center"
        >
          {/* Left: Text (Slides in from Left) */}
          <motion.div
            style={{ x: x1Left, opacity: opacity1Left }}
            className="lg:col-span-7 space-y-3.5"
          >
            <SectionBadge icon={Award} variant="primary">
              सत्यापित प्रमाणन
            </SectionBadge>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight leading-tight font-headline">
              सीखने को आधिकारिक प्रमाण में बदलें
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-[1.75] font-body">
              सफलतापूर्वक कोर्स पूरा करने पर आपको{" "}
              <strong className="font-bold text-slate-950">
                आधिकारिक QR-सत्यापित सर्टिफिकेट
              </strong>{" "}
              एवं{" "}
              <strong className="font-bold text-slate-950">
                बैंक-मान्य DPR (प्रोजेक्ट रिपोर्ट)
              </strong>{" "}
              प्राप्त होती है, जिसे आप{" "}
              <strong className="font-bold text-slate-950">PMEGP</strong>,{" "}
              <strong className="font-bold text-slate-950">PM मुद्रा लोन</strong>{" "}
              और अपने व्यावसायिक पोर्टफोलियो में सीधा उपयोग कर सकते हैं।
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-[1.75] font-body">
              यह प्रमाण पत्र आपकी व्यावसायिक दक्षता को प्रमाणित करता है और{" "}
              <strong className="font-bold text-slate-950">
                जिला उद्योग केंद्र (DIC खंडवा)
              </strong>{" "}
              व{" "}
              <strong className="font-bold text-slate-950">
                NABARD मार्गदर्शिका
              </strong>{" "}
              के अनुसार वित्तीय स्वीकृतियों हेतु 100% मान्य है।
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-[1.75] font-body">
              इसके अलावा, हमारा प्लेटफ़ॉर्म आपको{" "}
              <strong className="font-bold text-slate-950">
                24x7 ऑनलाइन वैरिफिकेशन
              </strong>{" "}
              की सुविधा देता है, ताकि बैंक अधिकारी या वित्तीय संस्थान किसी भी
              समय आपके रिकॉर्ड की प्रामाणिकता जाँच सकें।
            </p>

            <div className="space-y-2.5 pt-1 text-xs sm:text-sm font-medium text-slate-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  <strong className="font-bold text-slate-950">
                    24x7 ऑनलाइन तत्काल QR सत्यापन
                  </strong>{" "}
                  कोड व डिजिटल रिकॉर्ड
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  <strong className="font-bold text-slate-950">
                    PM मुद्रा एवं PMEGP बैंक ऋण
                  </strong>{" "}
                  हेतु आधिकारिक रूप से मान्य
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  <strong className="font-bold text-slate-950">
                    जिला उद्योग केंद्र (DIC) व NABARD
                  </strong>{" "}
                  मार्गदर्शिका से संरेखित
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/courses">
                <Button className="bg-[#0056d2] hover:bg-blue-800 text-white font-bold rounded-lg px-5 py-2.5 text-xs shadow-xs inline-flex items-center gap-1.5 cursor-pointer">
                  <span>सर्टिफाइड कोर्स चुनें</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right: Graphic Mockup (Slides in from Right) */}
          <motion.div
            style={{ x: x1Right, opacity: opacity1Right }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <img
              src="/images/certificate-fan-proof.jpg"
              alt="सत्यापित डिजिटल सर्टिफिकेट्स - छैगांव उद्यमी"
              className="max-w-lg scale-110 w-full h-auto object-cover hover:scale-[1.015] transition-transform duration-500"
            />
          </motion.div>
        </div>

        <Separator className="bg-slate-200/80" />

        {/* ROW 2: Daily Progress */}
        <div
          ref={row2Ref}
          className="grid text-justify grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center"
        >
          {/* Left: Graphic Mockup (Slides in from Left) */}
          <motion.div
            style={{ x: x2Left, opacity: opacity2Left }}
            className="lg:col-span-5 order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <img
              src="/images/learning-progress-proof.jpg"
              alt="दैनिक शिक्षण प्रगति एवं लर्निंग पाथ - छैगांव उद्यमी"
              className="max-w-lg rotate-y-180 scale-110 w-full h-auto object-cover hover:scale-[1.015] transition-transform duration-500"
            />
          </motion.div>

          {/* Right: Text (Slides in from Right) */}
          <motion.div
            style={{ x: x2Right, opacity: opacity2Right }}
            className="lg:col-span-7 order-1 lg:order-2 space-y-3.5"
          >
            <SectionBadge icon={Sparkles} variant="emerald">
              दैनिक प्रगति
            </SectionBadge>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight leading-tight font-headline">
              प्रतिदिन कुछ ही मिनटों में करें प्रगति
            </h2>

            <p className="text-sm sm:text-base text-slate-700 leading-[1.75] font-body">
              स्पष्ट स्टेप्स और{" "}
              <strong className="font-bold text-slate-950">
                10-15 मिनट के संक्षिप्त वीडियो अध्यायों
              </strong>{" "}
              के साथ बिना किसी बाधा के निरंतर आगे बढ़ें और अपने मोबाइल पर व्यावहारिक
              ज्ञान प्राप्त करें।
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-[1.75] font-body">
              प्रत्येक मॉड्यूल के साथ{" "}
              <strong className="font-bold text-slate-950">
                डाउनलोड योग्य व्यावहारिक कार्यपुस्तिकाएं (Workbooks)
              </strong>{" "}
              और{" "}
              <strong className="font-bold text-slate-950">
                स्व-मूल्यांकन क्विज
              </strong>{" "}
              प्रदान किए जाते हैं, जिससे आप अपनी समझ और प्रगति का सटीक आकलन कर सकें।
            </p>

            <p className="text-sm sm:text-base text-slate-700 leading-[1.75] font-body">
              कोर्स पूर्ण करने के बाद भी आप अकेले नहीं हैं — हमारी समर्पित विशेषज्ञ
              टीम द्वारा आपको निरंतर{" "}
              <strong className="font-bold text-slate-950">
                आजीवन मेंटरशिप सहायता
              </strong>{" "}
              एवं कम्युनिटी सपोर्ट प्रदान किया जाता है।
            </p>

            <div className="space-y-2.5 pt-1 text-xs sm:text-sm font-medium text-slate-700">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  <strong className="font-bold text-slate-950">
                    मोबाइल एवं धीमे इंटरनेट
                  </strong>{" "}
                  पर भी सहज चलने वाले HD वीडियो
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  प्रत्येक मॉड्यूल के बाद{" "}
                  <strong className="font-bold text-slate-950">
                    लघु स्व-मूल्यांकन क्विज
                  </strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>
                  डाउनलोड योग्य{" "}
                  <strong className="font-bold text-slate-950">
                    व्यावहारिक कार्यपुस्तिकाएं (Workbooks)
                  </strong>
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/auth/register">
                <Button className="bg-slate-900 hover:bg-black text-white font-bold rounded-lg px-5 py-2.5 text-xs shadow-xs inline-flex items-center gap-1.5 cursor-pointer">
                  <span>निःशुल्क शुरुआत करें</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
