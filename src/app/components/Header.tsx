"use client";

export default function Header() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000";

  const scrollToCheckout = () => {
    document.getElementById("checkout-top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-[#0f172a]/95 backdrop-blur-md py-3.5 shadow-xl sticky top-0 z-40 rtl border-b border-[#c57d5c]/30">
      <div className="container mx-auto px-4 max-w-7xl flex justify-between items-center">
        
        {/* DarLux Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="h-14 sm:h-20 flex items-center overflow-hidden">
            <img 
              src="/darlux_logo_transparent.png" 
              alt="DarLux Logo" 
              className="h-[120%] sm:h-[140%] w-auto object-contain drop-shadow-xl" 
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Contact"
            className="hidden sm:flex text-emerald-400 font-bold items-center gap-2 px-4 py-2 rounded-xl border border-emerald-500/40 hover:bg-emerald-950/40 transition-all text-xs sm:text-sm"
          >
            <i className="fa-brands fa-whatsapp text-lg text-emerald-400" /> واتساب
          </a>
          <button
            onClick={scrollToCheckout}
            className="btn-copper-cta text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg flex items-center gap-2"
          >
            <span>أطلب الآن (169 د.م)</span>
            <i className="fa-solid fa-fire text-amber-300" />
          </button>
        </div>

      </div>
    </header>
  );
}
