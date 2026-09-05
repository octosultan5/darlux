"use client";

export default function ProductDetailsSection() {
  const scrollToCheckout = () => {
    document.getElementById("checkout-top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#022c22] via-[#064e3b] to-[#022c22] text-white rtl relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16">
          
          {/* Left Visual Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-3xl overflow-hidden p-1 bg-gradient-to-br from-amber-400/40 to-emerald-500/30 shadow-2xl border border-amber-400/30 hover:scale-[1.02] transition-transform">
                <img src="/noorusb_hero_usb_3d.png" alt="مجموعة فلاشات نور التعليمية 64GB" className="rounded-2xl w-full object-cover aspect-[4/5] bg-slate-950/80" />
              </div>
              <div className="relative rounded-3xl overflow-hidden p-1 bg-gradient-to-br from-emerald-500/30 to-amber-400/40 shadow-2xl mt-8 border border-amber-400/30 hover:scale-[1.02] transition-transform">
                <img src="/noorusb_tv_box_3d.png" alt="أطفال يتعلمون عبر التلفاز بدون إنترنت" className="rounded-2xl w-full object-cover aspect-[4/5] bg-slate-950/80" />
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="w-full lg:w-1/2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 font-bold text-xs sm:text-sm mb-4">
              الحل الأفضل لحماية أطفالك 🛡️
            </span>

            <h2 className="text-3xl sm:text-5xl font-black mb-6 leading-tight">
              البديل التربوي الآمن <br />
              <span className="gold-gradient-text">لليوتيوب والإعلانات الخطيرة</span>
            </h2>
            
            <div className="space-y-6 text-base sm:text-lg text-emerald-100/90 font-medium">
              <p className="leading-relaxed">
                في عصر أصبحت فيه الهواتف الذكية تسرق تركيز أطفالنا، وتبرمج عقولهم بمحتوى غير آمن... جاءت <strong className="text-amber-300 font-bold">فلاشة نور الذكية 64GB</strong> لتكون الحل البديل والآمن بالكامل.
              </p>
              
              <div className="emerald-glass p-5 sm:p-6 rounded-2xl border-r-4 border-amber-400 shadow-xl">
                <p className="font-bold text-amber-300 text-sm sm:text-base leading-relaxed">
                  "منذ بدأت أستعمل فلاشة نور لابني، تحسنت لغته العربية وبدأ يحفظ قصص الأنبياء. وارتحت تماماً من قلق خوارزميات الإنترنت والإعلانات."
                </p>
              </div>

              <ul className="space-y-3.5 pt-2">
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-amber-400 text-xl mt-1" />
                  <span><strong className="text-white">يعمل بدون إنترنت:</strong> يعمل مباشرة على شاشة التلفاز، الحاسوب، والسيارة فور التوصيل.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-amber-400 text-xl mt-1" />
                  <span><strong className="text-white">تأسيس اللغات الثلاث:</strong> يضم كورسات شاملة للغة العربية الفصحى، الإنجليزية والفرنسية.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-amber-400 text-xl mt-1" />
                  <span><strong className="text-white">تنمية القيم الإسلامية:</strong> أناشيد هادفة بدون موسيقى وقصص القرآن الكريم لغرس العقيدة.</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={scrollToCheckout}
              className="btn-neon-cta text-white font-black text-lg sm:text-xl px-8 py-4 rounded-2xl shadow-xl mt-8 w-full sm:w-auto flex items-center justify-center gap-3"
            >
              <span>احصل عليها الآن بـ 149 درهم</span>
              <i className="fa-solid fa-arrow-left text-amber-300" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
