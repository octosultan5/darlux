"use client";

import React from "react";

const items = [
  "توصيل مجاني لكل مدن المغرب 🇲🇦",
  "تخفيض محدود اليوم: 149 درهم فقط 🔥",
  "الدفع بعد المعاينة عند الاستلام 📦",
  "بدون إنترنت ولا إعلانات 🚫",
  "محتوى إسلامي ولغوي آمن 100% 🛡️",
];

export default function TextMarquee() {
  return (
    <div className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 text-slate-950 py-3.5 overflow-hidden flex whitespace-nowrap border-y border-amber-300 shadow-xl">
      <div className="flex animate-[marquee_30s_linear_infinite]" style={{ direction: "ltr" }}>
        {[...items, ...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center px-6 text-sm sm:text-base font-black tracking-wider text-slate-950">
            <span>{text}</span>
            <span className="mx-6 w-2 h-2 rounded-full bg-slate-950/40 inline-block" />
          </div>
        ))}
      </div>
    </div>
  );
}
