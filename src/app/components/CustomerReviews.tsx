"use client";

export default function CustomerReviews() {
  const reviews = [
    {
      name: "كمال المنصوري",
      city: "الدار البيضاء",
      date: "منذ 3 أيام",
      text: "صراحة ريشو 1500W ناضي بزاف! كينفعني فـ الخدمة نسخن بيه الماكلة ونوجد أتاي فـ دقائق. كيسخن بسرعة واقتصادي فـ الضو، ما بقيتش هاز هم البوطا.",
      stars: 5,
    },
    {
      name: "سناء بناني",
      city: "الرباط",
      date: "منذ 5 أيام",
      text: "خديت باك جوج حبات، وحدة لداري ووحدة للستوديو ديال بنتي كتقرا فـ لافاك. كيطيب بسرعة وما كياخدش المساحة فـ الكوزينة. التوصيل كان فـ أقل من 24 ساعة.",
      stars: 5,
    },
    {
      name: "حمزة العماري",
      city: "طنجة",
      date: "منذ أسبوع",
      text: "الجودة ممتازة، إطار من الستانلس ستيل متين وكابل غليظ آمن. جربت فيه غليان الماء فـ 3 دقائق وسلقت فيه البيض. شكراً لموزع التوصيل على المعاملة الطيبة.",
      stars: 5,
    },
    {
      name: "فاطمة الزهراء",
      city: "مراكش",
      date: "منذ أسبوعين",
      text: "المنتج رائع والحرارة ديالو 1500W قوية تبارك الله. عجبني أنه كيحبس بوحدو ملي كيسخن، يعني آمن 100%. كنصح بيه أي واحد باغي يتهنى من عذاب البوطة.",
      stars: 5,
    },
  ];

  const scrollToCheckout = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-t border-slate-200 rtl text-slate-900">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 font-black text-xs mb-2">
            شهادات حقيقية ⭐
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900">
            تجارب زبنائنا مع <span className="text-amber-600">ريشو DarLux 1500W</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            أكثر من 1,480 زبون يثقون في جودة منتجاتنا في جميع أنحاء المغرب
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-amber-400 text-sm">
                    {"★★★★★"}
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold">{r.date}</span>
                </div>
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                  "{r.text}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900">{r.name}</h4>
                    <span className="text-[10px] text-slate-400 block">{r.city}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ✓ مشتري مؤكد
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-10 text-center">
          <button
            onClick={scrollToCheckout}
            className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm sm:text-base px-8 py-3.5 rounded-2xl shadow-md transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <span>انضم لزبنائنا السعداء واطلب الآن بـ 129 درهم</span>
            <i className="fa-solid fa-arrow-up text-xs" />
          </button>
        </div>

      </div>
    </section>
  );
}
