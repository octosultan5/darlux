"use client";

import Image from "next/image";

export default function Header() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000";

  const scrollToCheckout = () => {
    document.getElementById("checkout-top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-[#022c22]/95 backdrop-blur-md py-3 shadow-xl sticky top-0 z-40 rtl border-b border-amber-500/20">
      <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center">
        
        {/* Official Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(245,158,11,0.4)] border border-amber-400/40 bg-slate-950 p-1 flex items-center justify-center">
            <Image
              src="/noorusb_logo.webp"
              alt="NoorUSB Logo"
              fill
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black text-white font-inter tracking-tight leading-none">
              NOOR<span className="text-amber-400">USB</span>
            </span>
            <span className="text-[10px] text-emerald-300 font-bold tracking-wider mt-0.5">فلاشة نور الذكية 64GB</span>
          </div>
        </div>

        {/* Action Area */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Contact"
            className="hidden sm:flex text-emerald-300 font-bold items-center gap-2 px-4 py-2 rounded-xl border border-emerald-500/40 hover:bg-emerald-800/40 transition-all text-xs sm:text-sm"
          >
            <i className="fa-brands fa-whatsapp text-lg text-emerald-400" /> واتساب
          </a>
          <button
            onClick={scrollToCheckout}
            className="btn-neon-cta text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
          >
            <span>أطلب الآن (149 د.م)</span>
            <i className="fa-solid fa-cart-shopping text-amber-300" />
          </button>
        </div>

      </div>
    </header>
  );
}
