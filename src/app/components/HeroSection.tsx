"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const scrollToCheckout = () => {
    document.getElementById("checkout-top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-[#0f172a] flex flex-col items-center overflow-hidden">
      {/* 16:9 Master Hero Banner */}
      <div className="w-full relative shadow-2xl">
        <div className="w-full relative aspect-[16/9] max-h-[85vh] overflow-hidden bg-slate-950">
          <Image
            src="/darlux_solero_banner.jpg"
            alt="DarLux Solero - موقد كهربائي واحد قوة وراحة في مطبخك"
            fill
            priority
            quality={100}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Floating Fast Order CTA Button Overlay */}
        <div className="absolute bottom-3 sm:bottom-6 inset-x-0 px-4 flex justify-center z-20">
          <button
            onClick={scrollToCheckout}
            className="w-full max-w-sm sm:max-w-md bg-gradient-to-r from-[#f48020] via-orange-500 to-[#e67300] hover:from-[#e67300] hover:to-[#cc6600] text-white text-lg sm:text-2xl px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-black shadow-[0_10px_35px_rgba(244,128,32,0.7)] flex items-center justify-center gap-3 animate-bounce transition-all border-2 border-amber-300"
          >
            <span>أطلب الآن بـ 169 درهم فقط 🚚</span>
            <i className="fa-solid fa-arrow-down" />
          </button>
        </div>
      </div>
    </section>
  );
}
