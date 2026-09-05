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
      {/* Full Width Image Banner Shopify Style */}
      <div className="w-full max-w-[800px] mx-auto relative group">
        
        {/* DarLux Badge Overlay */}
        <div className="absolute top-4 left-4 z-10 w-28 sm:w-36 bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-2xl border-2 border-[#f48020]">
           <img src="/darlux_logo.jpg" alt="DarLux Badge" className="w-full h-auto object-contain rounded-lg" />
        </div>

        <Image
          src="/solero/hero.webp"
          alt="ريشو كهربائي للطهي"
          width={800}
          height={3000}
          priority
          quality={100}
          className="w-full h-auto object-cover block"
        />
        
        {/* Floating Call to Action Overlay at bottom of hero */}
        <div className="absolute bottom-6 left-0 right-0 px-4 flex justify-center z-20">
           <button 
              onClick={scrollToCheckout}
              className="w-full max-w-sm bg-gradient-to-r from-[#f48020] to-[#e67300] hover:from-[#e67300] hover:to-[#cc6600] text-white text-xl sm:text-2xl px-6 py-4 rounded-xl font-black shadow-[0_0_40px_rgba(244,128,32,0.6)] flex items-center justify-center gap-3 animate-bounce transition-all"
            >
              <span>أطلب الآن بـ 169 درهم فقط</span>
              <i className="fa-solid fa-arrow-down" />
            </button>
        </div>
      </div>
    </section>
  );
}
