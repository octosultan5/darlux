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
    <section className="py-20 sm:py-32 bg-white text-slate-900 rtl relative overflow-hidden border-t border-slate-100">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Image Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-2 gap-6 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#c57d5c]/10 rounded-full blur-3xl -z-10"></div>
              <div className="relative rounded-[2rem] overflow-hidden bg-white shadow-xl hover:-translate-y-2 transition-transform duration-500 border border-slate-100 z-10">
                <img src="/solero/He9e36218ab68467bae1f5a9a224ef20fS.jpg" alt="RAF 1000W Electric Stove Features" className="w-full object-cover aspect-[4/5]" />
              </div>
              <div className="relative rounded-[2rem] overflow-hidden bg-white shadow-xl mt-12 hover:-translate-y-2 transition-transform duration-500 border border-slate-100 z-10">
                <img src="/solero/Hfb1b25153c7d477d90ced37b729da262g.jpg" alt="RAF 1000W Electric Stove Specs" className="w-full object-cover aspect-[4/5]" />
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="w-full lg:w-1/2">
            <span className="inline-block px-5 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-bold text-sm mb-6 uppercase tracking-wider">
              صغيرة فالحجم... كبيرة فالاستعمال! 📦
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-8 leading-tight tracking-tight text-slate-900">
              الحل العملي اليومي <br />
              <span className="text-[#c57d5c]">للتحضير والتسخين بلا مشاكل</span>
            </h2>
            
            <div className="space-y-8 text-lg text-slate-600 font-medium">
              <p className="leading-relaxed">
                سواء كنت محتاج بلاكة إضافية في الكوزينة، أو ساكن في ستوديو، أو باغي تسخن ماكلتك في المكتب... <strong className="text-slate-900 font-black">Réchaud Électrique RAF 1000W</strong> هي الخيار الأول في السرعة والأمان.
              </p>

              {/* Use Cases Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {useCases.map((uc, i) => (
                  <div key={i} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 hover:border-[#c57d5c]/30 hover:shadow-md transition-all">
                    <h4 className="font-bold text-slate-900 text-base mb-2">{uc.title}</h4>
                    <p className="text-slate-500 text-sm">{uc.desc}</p>
                  </div>
                ))}
              </div>

              <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5"><i className="fa-solid fa-check"></i></div>
                  <span className="leading-relaxed"><strong className="text-slate-900 font-bold">سهولة الاستعمال:</strong> غير ربطها بالكهرباء، اختار درجة الحرارة وبدا الطبخ فـ رمشة عين.</span>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5"><i className="fa-solid fa-check"></i></div>
                  <span className="leading-relaxed"><strong className="text-slate-900 font-bold">سهلة التنظيف:</strong> انتظر حتى تبرد ومسحها بتمسيحة خفيفة ترجع كتشعل.</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={scrollToCheckout}
              className="bg-[#c57d5c] hover:bg-[#b06a4b] text-white font-black text-xl px-10 py-4.5 rounded-xl shadow-[0_8px_20px_rgba(197,125,92,0.4)] hover:shadow-[0_10px_25px_rgba(197,125,92,0.5)] transition-all active:scale-95 mt-10 w-full sm:w-auto flex items-center justify-center gap-3"
            >
              <span>احصل عليها الآن بـ 169 درهم</span>
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
