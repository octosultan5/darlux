"use client";

import React from "react";
import { motion } from "framer-motion";

const items = [
  "🚚 توصيل فابور لجميع المدن فـ المغرب",
  "🔥 تخفيض محدود اليوم: 169 درهم بدلاً من 299 درهم",
  "💵 الدفع بعد المعاينة عند الاستلام",
  "⚡ قوة 1000W وسخونية فورية",
  "💰 توفير 40% فـ استهلاك الفاتورة",
  "🛡️ إطار معدني متين وحماية ضد السخونية الزائدة",
];

// Duplicate items to ensure smooth infinite loop
const duplicatedItems = [...items, ...items, ...items, ...items];

export default function TextMarquee() {
  return (
    <div className="w-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 py-3.5 overflow-hidden flex border-y-2 border-yellow-300 shadow-xl relative" style={{ direction: "ltr" }}>
      <div className="absolute inset-0 bg-white/15"></div>
      <motion.div 
        className="flex items-center whitespace-nowrap relative z-10 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 45, repeat: Infinity }}
      >
        {duplicatedItems.map((text, idx) => (
          <div key={idx} className="flex items-center px-6 sm:px-8 text-sm sm:text-base font-black tracking-widest text-slate-900">
            <span style={{ textShadow: "0 1px 2px rgba(255,255,255,0.4)" }}>{text}</span>
            <span className="mx-6 sm:mx-8 w-2 h-2 rounded-full bg-slate-900/30 inline-block" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
