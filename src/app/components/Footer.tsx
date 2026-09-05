export default function Footer() {
  return (
    <footer className="bg-[#0b1329] text-slate-400 py-12 rtl text-center lg:text-right border-t border-[#c57d5c]/30 pb-28 md:pb-12">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#c57d5c] to-amber-600 rounded-xl flex items-center justify-center text-slate-950 font-black text-xl shadow-lg border border-amber-300">
            <i className="fa-solid fa-utensils text-slate-950 text-base" />
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-black text-white tracking-wider font-inter">
              Dar<span className="text-amber-400">Lux</span>
            </h2>
            <p className="text-xs text-amber-300 font-bold mt-0.5">PREMIUM KITCHEN ESSENTIALS 🇲🇦</p>
          </div>
        </div>

        <div className="flex gap-6 text-xl text-amber-300">
          <a href="#" aria-label="Facebook" className="hover:text-amber-200 transition-colors"><i className="fa-brands fa-facebook" /></a>
          <a href="#" aria-label="Instagram" className="hover:text-amber-200 transition-colors"><i className="fa-brands fa-instagram" /></a>
          <a href="#" aria-label="TikTok" className="hover:text-amber-200 transition-colors"><i className="fa-brands fa-tiktok" /></a>
          <a href="#" aria-label="WhatsApp" className="hover:text-amber-200 transition-colors"><i className="fa-brands fa-whatsapp" /></a>
        </div>

        <div className="text-xs">
          <p>© 2026 جميع الحقوق محفوظة لـ <span className="text-amber-300 font-bold">DarLux Morocco</span>.</p>
          <p className="mt-1 text-slate-400">أجهزة منزلية راقية بجودة عالية وتوصيل سريع.</p>
        </div>
      </div>
    </footer>
  );
}
