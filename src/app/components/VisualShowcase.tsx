"use client";

export default function VisualShowcase() {
  const scrollToCheckout = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const cards = [
    {
      img: "/solero/He9e36218ab68467bae1f5a9a224ef20fS.jpg",
      tag: "سخونية صاروخية 1500W ⚡",
      tagColor: "bg-amber-500 text-slate-950",
      title: "غلي الماء والطهي فـ أقل من 3 دقائق",
      desc: "بفضل قوة 1500W الفائقة وقرص التسخين الحلزوني الذكي، الريشو كيسخن فـ ثواني معدودة وكيخليك توجد أتاي، قهوة، مقليات، أو طاجين بلدي فـ رمشة عين وبدون أي تعب.",
    },
    {
      img: "/solero/gas_banner.jpg",
      tag: "اقتصاد حقيقي 💰",
      tagColor: "bg-emerald-600 text-white",
      title: "ودع غلاء ومشاكل البوطة نهائياً",
      desc: "علاش تخلص 50 درهم فـ البوطة كل أسبوعين وتبقى مهدد تسالي ليك وسط الطياب؟ ريشو كهربائي 1500W عملي كيستهلك قليل فـ الضو (اقتصاد حتى لـ 40%) وآمن 100% بدون أي تسريب للغاز.",
    },
    {
      img: "/solero/family_banner.jpg",
      tag: "عملي ومحمول 🍳",
      tagColor: "bg-blue-600 text-white",
      title: "أطباق بنكهة مغربية أصيلة فـ أي مكان",
      desc: "جهاز مدمج وخفيف الوزن وسهل التنظيف. مثالي للكوزينة، غرف العمل، سكن الطلبة، أو الرحلات والمخيمات. يشتغل مع جميع أنواع القدور والمقالي بكل أمان وسلاسة.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-slate-100 rtl text-slate-900">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3.5 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 font-black text-xs mb-2">
            لماذا يفضله آلاف المغاربة؟ 🇲🇦
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            مميزات تجعل <span className="text-amber-600">ريشو RAF 1500W</span> خيارك الأفضل
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mt-2 font-medium">
            جهاز متين صمم بقوة 1500 واط ليوفر لك السرعة، الأمان، والتوفير الحقيقي في مصاريف الطاقة اليومية.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="space-y-8">
          {cards.map((c, i) => (
            <div
              key={i}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center hover:shadow-lg transition-all"
            >
              {/* Image */}
              <div className="w-full md:w-1/2 aspect-[4/3] sm:aspect-[16/10] relative overflow-hidden bg-slate-900 shrink-0">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span
                  className={`absolute top-4 right-4 ${c.tagColor} text-xs font-black px-3 py-1 rounded-full shadow-md`}
                >
                  {c.tag}
                </span>
              </div>

              {/* Text Body */}
              <div className="w-full md:w-1/2 p-6 sm:p-8 space-y-4 text-right">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {c.title}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                  {c.desc}
                </p>
                <div className="pt-2">
                  <button
                    onClick={scrollToCheckout}
                    className="inline-flex items-center gap-2 bg-slate-900 hover:bg-amber-600 text-white text-xs sm:text-sm font-black px-5 py-2.5 rounded-xl transition-colors shadow-sm"
                  >
                    <span>أطلب الآن بـ 129 درهم</span>
                    <i className="fa-solid fa-cart-shopping text-xs" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
