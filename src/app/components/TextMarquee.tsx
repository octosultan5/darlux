"use client";

import React from "react";

const items = [
  "🚚 توصيل فابور لجميع المدن فـ المغرب",
  "🔥 تخفيض محدود اليوم: 169 درهم بدلاً من 299 درهم",
  "💵 الدفع بعد المعاينة عند الاستلام",
  "⚡ قوة 1000W وسخونية فورية",
  "💰 توفير 40% فـ استهلاك الفاتورة",
  "🛡️ إطار معدني متين وحماية ضد السخونية الزائدة",
];

export default function TextMarquee() {
  return (
    <div className="w-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 text-slate-900 py-3.5 overflow-hidden flex whitespace-nowrap border-y border-yellow-300 shadow-xl relative">
      <div className="absolute inset-0 bg-white/20 mix-blend-overlay"></div>
      <div className="flex animate-[marquee_40s_linear_infinite] relative z-10" style={{ direction: "ltr" }}>
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center px-6 text-sm sm:text-base font-black tracking-widest text-slate-900 drop-shadow-sm">
            <span>{text}</span>
            <span className="mx-6 w-2 h-2 rounded-full bg-slate-900/60 inline-block" />
          </div>
        ))}
      </div>
    </div>
  );
}
