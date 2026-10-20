"use client";

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000";

  return (
    <footer className="bg-slate-900 text-slate-400 py-10 rtl border-t border-slate-800 pb-24 md:pb-10">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-right">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <img 
            src="/darlux_logo_transparent.png" 
            alt="DarLux Logo" 
            className="h-10 w-auto object-contain brightness-125" 
          />
          <div className="border-r border-slate-700 pr-3">
            <span className="text-xs font-bold text-slate-400 block">DarLux Maroc</span>
            <span className="text-[11px] text-amber-400 font-semibold">أجهزة منزلية راقية بجودة عالية</span>
          </div>
        </div>

        {/* Support links */}
        <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-300">
          <a href="#order-form" className="hover:text-amber-400 transition-colors">إستمارة الطلب</a>
          <span>•</span>
          <a 
            href={`https://wa.me/${whatsappNumber}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-emerald-400 transition-colors flex items-center gap-1"
          >
            <i className="fa-brands fa-whatsapp text-emerald-500" />
            <span>خدمة العملاء واتساب</span>
          </a>
          <span>•</span>
          <span>التوصيل بالمجان لجميع المدن</span>
        </div>

        {/* Copyright */}
        <div className="text-xs text-slate-500">
          <p>© 2026 جميع الحقوق محفوظة لمتجر <span className="text-slate-300 font-bold">DarLux Store</span> 🇲🇦</p>
        </div>

      </div>
    </footer>
  );
}
