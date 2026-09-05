"use client";

export default function VideoCategories() {
  const categories = [
    { title: "الإنجليزية للأطفال", img: "/cat_english.png", label: "English for Kids" },
    { title: "الإسلام ممتع", img: "/cat_islam.png", label: "Islam for Kids" },
    { title: "قصص الأنبياء", img: "/cat_prophets.png", label: "Prophet Stories" },
    { title: "اللغة الفرنسية", img: "/cat_french.png", label: "French for Kids" },
    { title: "أناشيد بدون موسيقى", img: "/cat_nasheed.png", label: "Educational Songs" },
    { title: "السيرة والعقيدة", img: "/cat_seerah.png", label: "Islamic Values" },
  ];

  const scrollToCheckout = () => {
    document.getElementById("checkout-top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#022c22] via-[#064e3b] to-[#022c22] text-white rtl relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 font-bold text-xs sm:text-sm mb-3">
            مكتبة رقمية شاملة 📁
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            ماذا يضم محتوى <span className="gold-gradient-text">فلاشة نور 64GB؟</span>
          </h2>
          <p className="text-base sm:text-lg text-emerald-100/80 font-medium max-w-xl mx-auto">
            أكثر من 1200 فيديو ممتع منظم في مجلدات سهلة التصفح فور توصيلها.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <div 
              key={i} 
              className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] transition-all cursor-pointer border border-amber-500/30 bg-slate-950/80"
            >
              <div className="aspect-video w-full relative overflow-hidden">
                <img 
                  src={cat.img} 
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021812] via-[#021812]/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h3 className="text-white font-black text-lg sm:text-xl drop-shadow-md">{cat.title}</h3>
                  <span className="bg-amber-400 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full shadow-md">
                    {cat.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-14 text-center">
          <p className="text-lg sm:text-xl font-bold text-amber-300 mb-6">... والعديد من المفاجآت والكتيبات التعليمية المرفقة!</p>
          <button 
            onClick={scrollToCheckout}
            className="btn-neon-cta text-white font-black text-base sm:text-lg py-4 px-10 rounded-2xl shadow-xl transition-transform hover:scale-105"
          >
            اطلب الفلاشة الآن بـ 149 درهم فقط
          </button>
        </div>
      </div>
    </section>
  );
}
