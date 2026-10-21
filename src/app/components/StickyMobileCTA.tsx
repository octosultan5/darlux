"use client";

export default function StickyMobileCTA() {
  const scrollToCheckout = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 z-40 md:hidden shadow-[0_-5px_20px_rgba(0,0,0,0.1)] flex justify-between items-center rtl">
      <div className="font-bold pr-2">
        <span className="text-[11px] text-slate-400 block line-through font-mono">249 د.م</span>
        <div className="flex items-baseline gap-1">
          <span className="text-xl text-slate-900 font-black font-mono">129</span>
          <span className="text-xs font-black text-amber-600">د.م</span>
        </div>
      </div>
      <button
        onClick={scrollToCheckout}
        className="bg-gradient-to-r from-emerald-500 to-teal-600 active:scale-95 text-white px-6 py-3 rounded-xl font-black text-xs sm:text-sm shadow-md flex items-center gap-2 cursor-pointer animate-pulse"
      >
        <span>إستفد من العرض بـ 129 د.م</span>
        <i className="fa-solid fa-cart-arrow-down" />
      </button>
    </div>
  );
}
