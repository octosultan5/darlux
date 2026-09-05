"use client";

export default function VideoCategories() {
  const uses = [
    { title: "غلي الماء فـ أقل من 5 دقائق", label: "سريع جداً ⚡", img: "/solero/He9e36218ab68467bae1f5a9a224ef20fS.jpg" },
    { title: "طياب البيض والقلي اليومي", label: "تحضير فوري 🍳", img: "/solero/solero.jpg" },
    { title: "تسخين الشوربة والحريرة", label: "حرارة متوازنة 🥣", img: "/solero/HTB19CR9M9zqK1RjSZPxq6A4tVXab.jpg" },
    { title: "تحضير المعكرونة والأطباق", label: "غليان قوي 🍝", img: "/solero/Hfb1b25153c7d477d90ced37b729da262g.jpg" },
    { title: "تحضير القهوة والأتاي المغربي", label: "نكهة أصيلة ☕", img: "/solero/solero.jpg" },
    { title: "المحافظة على سخونية الأكل", label: "ترموستات خفيف ♨️", img: "/solero/He9e36218ab68467bae1f5a9a224ef20fS.jpg" },
  ];

  const scrollToCheckout = () => {
    document.getElementById("checkout-top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white rtl relative overflow-hidden">
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#c57d5c]/20 border border-[#c57d5c]/40 text-amber-300 font-bold text-xs sm:text-sm mb-3">
            استعمالات يومية متعددة 🍳
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            ماذا يمكنك تحضيره بـ <span className="copper-gradient-text">RAF 1000W؟</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-medium max-w-xl mx-auto">
            جهاز متكامل يوفر لك الراحة والسرعة فـ تحضير مختلف المأكولات والمشروبات.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {uses.map((item, i) => (
            <div 
              key={i} 
              className="group relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_0_30px_rgba(197,125,92,0.4)] transition-all cursor-pointer border border-amber-500/30 bg-slate-950/80"
            >
              <div className="aspect-video w-full relative overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h3 className="text-white font-black text-base sm:text-lg drop-shadow-md">{item.title}</h3>
                  <span className="bg-amber-400 text-slate-950 text-[11px] font-black px-3 py-1 rounded-full shadow-md">
                    {item.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-14 text-center">
          <p className="text-lg sm:text-xl font-bold text-amber-300 mb-6">... مع إمكانية التأكد والتدقيق فـ المنتج قبل الدفع عند الاستلام!</p>
          <button 
            onClick={scrollToCheckout}
            className="btn-copper-cta text-white font-black text-base sm:text-lg py-4 px-10 rounded-none shadow-xl transition-transform hover:scale-105"
          >
            اطلب الريشو الآن بـ 169 درهم فقط
          </button>
        </div>
      </div>
    </section>
  );
}
