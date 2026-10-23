"use client";

import OrderForm from "./OrderForm";

export default function HeroStorySection() {
  const scrollToOrder = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="w-full bg-slate-50 rtl text-slate-900 pt-2 pb-6">
      <div className="container mx-auto px-2 sm:px-4 max-w-2xl">
        
        {/* Full-Bleed Master Hero Graphic Poster (Uploaded As-Is, High Definition) */}
        <div 
          onClick={scrollToOrder}
          className="w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl cursor-pointer hover:opacity-98 transition-opacity border border-slate-200/80 bg-slate-900 group"
        >
          <img
            src="/creatives/hero_offer_129dh.png"
            alt="ريشو كهربائي عملي وأصلي RAF 1500W بـ 129 درهم فقط"
            className="w-full h-auto block object-cover transform group-hover:scale-[1.01] transition-transform duration-300"
            loading="eager"
          />
        </div>

        {/* Quick CTA right below Hero Poster */}
        <div className="mt-4 text-center">
          <button
            onClick={scrollToOrder}
            className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-base sm:text-lg py-4 rounded-2xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>أطلب الآن بـ 129 درهم فقط (الدفع عند الاستلام) 🚚</span>
            <i className="fa-solid fa-arrow-down text-sm" />
          </button>
        </div>

        {/* Urgency Alert Notice */}
        <div className="mt-6 p-4 rounded-2xl bg-red-50 border-2 border-red-300 text-red-700 flex items-center gap-3 text-right shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-600 text-lg font-black">
            ⚠️
          </div>
          <div className="flex-1">
            <span className="font-black text-sm sm:text-base block">
              عرض خاص ومحدود: ريشو 1500W الأصلي بـ 129 درهم فقط!
            </span>
            <span className="text-xs sm:text-sm text-red-600 font-semibold">
              الكمية المتوفرة بهذا السعر الترويجي الاستثنائي شارفت على النفاد في المستودع.
            </span>
          </div>
        </div>

        {/* Above-The-Fold Order Form */}
        <OrderForm id="order-form" />

      </div>
    </section>
  );
}
