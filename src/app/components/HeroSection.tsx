"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const slides = [
    {
      src: "/solero/hero_banner.jpg",
      alt: "DarLux Solero - ودع البوطا مع ريشو كهربائي RAF 1000W"
    },
    {
      src: "/solero/gas_banner.jpg",
      alt: "بوطا ب 50 درهم؟ علاش تخلص كثر؟ توفير 40%"
    },
    {
      src: "/solero/family_banner.jpg",
      alt: "أطباق بلدية بنكهة مغربية أصيلة"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const scrollToCheckout = () => {
    document.getElementById("checkout-top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-slate-50 flex flex-col items-center">
      {/* 16:9 Master Hero Slideshow */}
      <div className="w-full relative shadow-lg overflow-hidden bg-slate-900">
        <div className="w-full relative aspect-[4/3] sm:aspect-[16/9] max-h-[85vh]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={slides[currentIndex].src}
                alt={slides[currentIndex].alt}
                fill
                priority={currentIndex === 0}
                quality={100}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Slideshow Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${idx === currentIndex ? 'bg-[#c57d5c] w-6' : 'bg-white/50 hover:bg-white'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Independent Floating Fast Order CTA Button */}
      <div className="w-full max-w-4xl px-4 py-8 sm:py-10 flex flex-col items-center justify-center z-20">
        <button
          onClick={scrollToCheckout}
          className="w-full max-w-md bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-orange-500 text-slate-900 text-xl sm:text-2xl px-6 py-4 rounded-2xl font-black shadow-[0_10px_30px_rgba(245,158,11,0.4)] flex items-center justify-center gap-3 animate-pulse transition-all border-2 border-yellow-300 active:scale-95"
        >
          <span>أطلب الآن بـ 169 درهم فقط 🚚</span>
          <i className="fa-solid fa-arrow-down" />
        </button>
        <div className="flex flex-wrap justify-center items-center gap-4 mt-5 text-slate-600 font-bold text-sm">
          <span className="flex items-center gap-1.5"><i className="fa-solid fa-shield-check text-emerald-500 text-lg"></i> ضمان الجودة</span>
          <span className="flex items-center gap-1.5"><i className="fa-solid fa-truck text-emerald-500 text-lg"></i> توصيل مجاني</span>
          <span className="flex items-center gap-1.5"><i className="fa-solid fa-handshake text-emerald-500 text-lg"></i> الدفع عند الاستلام</span>
        </div>
      </div>
    </section>
  );
}
