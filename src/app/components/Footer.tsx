export default function Footer() {
  return (
    <footer className="bg-[#01140f] text-emerald-100/70 py-12 rtl text-center lg:text-right border-t border-amber-500/20 pb-28 md:pb-12">
      <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-black text-white tracking-wider font-inter">
            NOOR<span className="text-amber-400">USB</span>
          </h2>
          <p className="text-xs text-emerald-300 font-bold mt-1">المكتبة الذكية الأولى للأطفال في المغرب والجزائر 🇲🇦</p>
        </div>

        <div className="flex gap-6 text-xl text-amber-300">
          <a href="#" aria-label="Facebook" className="hover:text-amber-200 transition-colors"><i className="fa-brands fa-facebook" /></a>
          <a href="#" aria-label="Instagram" className="hover:text-amber-200 transition-colors"><i className="fa-brands fa-instagram" /></a>
          <a href="#" aria-label="TikTok" className="hover:text-amber-200 transition-colors"><i className="fa-brands fa-tiktok" /></a>
          <a href="#" aria-label="WhatsApp" className="hover:text-amber-200 transition-colors"><i className="fa-brands fa-whatsapp" /></a>
        </div>

        <div className="text-xs">
          <p>© 2026 جميع الحقوق محفوظة لـ <span className="text-amber-300 font-bold">NoorUSB</span>.</p>
          <p className="mt-1 text-emerald-300">صنع بحب ❤️ من أجل مستقبل أطفالنا.</p>
        </div>
      </div>
    </footer>
  );
}
