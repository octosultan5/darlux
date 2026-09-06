"use client";

import Image from "next/image";

export default function HeroSection() {
  const scrollToCheckout = () => {
    document.getElementById("checkout-top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full bg-slate-50 flex flex-col items-center">
      {/* 16:9 Master Hero Banner */}
      <div className="w-full relative shadow-lg">
        <div className="w-full relative aspect-[16/9] max-h-[85vh] overflow-hidden bg-slate-900">
          <Image
            src="/solero/hero_banner.jpg"
            alt="DarLux Solero - ودع البوطا مع ريشو كهربائي RAF 1000W"
            fill
            priority
            quality={100}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Independent Floating Fast Order CTA Button */}
      <div className="w-full max-w-4xl px-4 py-8 sm:py-10 flex flex-col items-center justify-center z-20">
        <button
          onClick={scrollToCheckout}
          className="w-full max-w-md bg-gradient-to-r from-orange-500 to-[#c57d5c] hover:from-[#c57d5c] hover:to-orange-600 text-white text-xl sm:text-2xl px-6 py-4 rounded-2xl font-black shadow-[0_10px_30px_rgba(197,125,92,0.4)] flex items-center justify-center gap-3 animate-bounce transition-all border-2 border-orange-400 active:scale-95"
        >
          <span>أطلب الآن بـ 169 درهم فقط 🚚</span>
          <i className="fa-solid fa-arrow-down" />
        </button>
        <div className="flex items-center gap-4 mt-4 text-slate-500 font-bold text-sm">
          <span className="flex items-center gap-1.5"><i className="fa-solid fa-shield-check text-emerald-500"></i> ضمان الجودة</span>
          <span className="flex items-center gap-1.5"><i className="fa-solid fa-truck text-emerald-500"></i> توصيل مجاني</span>
          <span className="flex items-center gap-1.5"><i className="fa-solid fa-handshake text-emerald-500"></i> الدفع عند الاستلام</span>
        </div>
      </div>
    </section>
  );
}
