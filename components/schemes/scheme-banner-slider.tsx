"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface BannerSlide {
  id: string;
  imageSrc: string;
  alt: string;
  url?: string;
  category?: string;
}

interface SchemeBannerSliderProps {
  onSelectCategory?: (category: string) => void;
}

export function SchemeBannerSlider({ onSelectCategory }: SchemeBannerSliderProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const banners: BannerSlide[] = [
    {
      id: "wide-pmegp",
      imageSrc: "/images/banners/wide-pmegp-banner.jpg",
      alt: "प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP) - 35% सरकारी सब्सिडी व ₹50 लाख तक ऋण",
      category: "subsidy",
    },
    {
      id: "wide-mann-ki-baat",
      imageSrc: "/images/banners/wide-mann-ki-baat-banner.jpg",
      alt: "मन की बात: युवा शक्ति, ग्रामीण प्रगति - आत्मनिर्भर भारत एवं ODOP पहल",
      url: "https://www.mygov.in/home/mann-ki-baat/",
    },
    {
      id: "wide-mmuky",
      imageSrc: "/images/banners/wide-mmuky-banner.jpg",
      alt: "मुख्यमंत्री उद्यम क्रांति योजना (MMUKY) - 3% ब्याज अनुदान एवं आधुनिक डेयरी फार्मिंग",
      category: "loan",
    },
  ];

  // Sync Carousel API state
  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Auto sliding every 5 seconds
  useEffect(() => {
    if (!api || isPaused) return;

    autoPlayRef.current = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [api, isPaused]);

  const handlePrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const handleNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleSlideClick = (banner: BannerSlide) => {
    if (banner.url) {
      window.open(banner.url, "_blank", "noopener,noreferrer");
    } else if (banner.category && onSelectCategory) {
      onSelectCategory(banner.category);
    }
  };

  return (
    <div
      className="relative w-full overflow-hidden border-b border-slate-200 bg-white select-none group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="सरकारी योजनाएं मुख्य बैनर स्लाइडर"
    >
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {banners.map((banner) => (
            <CarouselItem key={banner.id} className="pl-0">
              <div
                onClick={() => handleSlideClick(banner)}
                className="relative w-full aspect-[2.6/1] sm:aspect-[3/1] md:aspect-[3.4/1] max-h-[350px] min-h-[160px] sm:min-h-[220px] md:min-h-[260px] cursor-pointer bg-slate-50 overflow-hidden flex items-center justify-center"
              >
                <Image
                  src={banner.imageSrc}
                  alt={banner.alt}
                  fill
                  priority
                  className="object-contain sm:object-cover object-center w-full h-full"
                  sizes="100vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="पिछला बैनर"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white shadow-md flex items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
        aria-label="अगला बैनर"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Pagination Indicator Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 bg-black/35 backdrop-blur-xs px-2.5 py-1 rounded-full">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`transition-all rounded-full cursor-pointer ${
              current === index
                ? "w-6 h-2 bg-white"
                : "w-2 h-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`बैनर ${index + 1} पर जाएं`}
          />
        ))}
      </div>
    </div>
  );
}
