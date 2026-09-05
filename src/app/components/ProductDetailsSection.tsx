"use client";

export default function ProductDetailsSection() {
  const scrollToCheckout = () => {
    document.getElementById("checkout-top")?.scrollIntoView({ behavior: "smooth" });
  };

  const useCases = [
    { title: "🏠 الكوزينة والدار", desc: "كبلاكة إضافية رائعة فـ أوقات الزحام والأعياد" },
    { title: "🏢 المكتب والعمل", desc: "تسخين الغداء وتحضير القهوة والأتاي فـ دقائق" },
    { title: "🎓 الستوديو والطلبة", desc: "مدمجة وماكتاخدش مساحة فـ السكن" },
    { title: "🚐 السفر والتنقل", desc: "سهلة الحمل والتخزين فـ الرحلات والدوزيم بوست" },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white rtl relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 sm:gap-16">
          
          {/* Left Image Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative rounded-3xl overflow-hidden p-1 bg-gradient-to-br from-[#c57d5c]/50 to-amber-500/40 shadow-2xl border border-amber-400/30 hover:scale-[1.02] transition-transform">
                <img src="/solero/He9e36218ab68467bae1f5a9a224ef20fS.jpg" alt="RAF 1000W Electric Stove Features" className="rounded-none w-full object-cover aspect-[4/5] bg-slate-950" />
              </div>
              <div className="relative rounded-3xl overflow-hidden p-1 bg-gradient-to-br from-amber-500/40 to-[#c57d5c]/50 shadow-2xl mt-8 border border-amber-400/30 hover:scale-[1.02] transition-transform">
                <img src="/solero/Hfb1b25153c7d477d90ced37b729da262g.jpg" alt="RAF 1000W Electric Stove Specs" className="rounded-none w-full object-cover aspect-[4/5] bg-slate-950" />
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="w-full lg:w-1/2">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#c57d5c]/20 border border-[#c57d5c]/40 text-amber-300 font-bold text-xs sm:text-sm mb-4">
              صغيرة فالحجم... كبيرة فالاستعمال! 📦
            </span>

            <h2 className="text-3xl sm:text-5xl font-black mb-6 leading-tight">
              الحل العملي اليومي <br />
              <span className="copper-gradient-text">للتحضير والتسخين بلا مشاكل</span>
            </h2>
            
            <div className="space-y-6 text-base sm:text-lg text-slate-300 font-medium">
              <p className="leading-relaxed">
                سواء كنت محتاج بلاكة إضافية فـ الكوزينة، أو ساكن فـ ستوديو، أو باغي تسخن ماكلتك فـ المكتب... <strong className="text-amber-300 font-bold">Réchaud Électrique RAF 1000W</strong> هي الخيار الأول فـ السرعة والأمان.
              </p>

              {/* Use Cases Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {useCases.map((uc, i) => (
                  <div key={i} className="copper-glass p-3.5 rounded-xl border border-amber-500/20">
                    <h4 className="font-bold text-amber-300 text-sm mb-1">{uc.title}</h4>
                    <p className="text-slate-300 text-xs">{uc.desc}</p>
                  </div>
                ))}
              </div>

              <ul className="space-y-3 pt-2">
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-amber-400 text-xl mt-1" />
                  <span><strong className="text-white">سهولة الاستعمال:</strong> غير ربطها بالكهرباء، اختار درجة الحرارة وبدا الطبخ فـ رمشة عين.</span>
                </li>
                <li className="flex items-start gap-3">
                  <i className="fa-solid fa-circle-check text-amber-400 text-xl mt-1" />
                  <span><strong className="text-white">سهلة التنظيف:</strong> انتظر حتى تبرد ومسحها بتمسيحة خفيفة ترجع كتشعل.</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={scrollToCheckout}
              className="btn-copper-cta text-white font-black text-lg sm:text-xl px-8 py-4 rounded-none shadow-xl mt-8 w-full sm:w-auto flex items-center justify-center gap-3"
            >
              <span>احصل عليها الآن بـ 169 درهم</span>
              <i className="fa-solid fa-arrow-left text-amber-300" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
