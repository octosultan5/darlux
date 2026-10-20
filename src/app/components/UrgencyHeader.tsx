"use client";

export default function UrgencyHeader() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000";

  const scrollToCheckout = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Top Urgency Strip */}
      <div className="bg-gradient-to-r from-red-600 via-amber-600 to-red-600 text-white text-center py-2.5 px-3 font-black text-xs sm:text-sm shadow-md">
        <div className="container mx-auto flex items-center justify-center gap-2">
          <span className="inline-block animate-pulse">🔥</span>
          <span>
            تخفيض حصري 43% + توصيل فابور لجميع مدن المغرب والدفع بعد المعاينة عند الاستلام 🇲🇦
          </span>
        </div>
      </div>

      {/* Clean Trust Header */}
      <header className="bg-white border-b border-slate-200 py-3 sticky top-0 z-40 shadow-sm rtl">
        <div className="container mx-auto px-4 max-w-6xl flex justify-between items-center">
          
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <img 
              src="/darlux_logo_transparent.png" 
              alt="DarLux Logo" 
              className="h-10 sm:h-12 w-auto object-contain" 
            />
            <div className="hidden sm:block border-r border-slate-200 pr-3">
              <span className="text-xs font-bold text-slate-500 block">المتجر الرسمي بالمغرب</span>
              <span className="text-xs font-black text-emerald-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                طلب مباشر من المستودع
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2.5">
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="تواصل معنا عبر واتساب"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <i className="fa-brands fa-whatsapp text-emerald-600 text-base" />
              <span>مساعدة واتساب</span>
            </a>

            <button
              onClick={scrollToCheckout}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-xs sm:text-sm px-4 sm:px-6 py-2.5 rounded-xl shadow-md flex items-center gap-2 active:scale-95 transition-all"
            >
              <span>أطلب الآن بـ 169 د.م</span>
              <i className="fa-solid fa-arrow-down" />
            </button>
          </div>

        </div>
      </header>
    </>
  );
}
