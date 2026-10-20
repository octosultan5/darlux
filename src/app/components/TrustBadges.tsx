"use client";

export default function TrustBadges() {
  const badges = [
    {
      icon: "fa-solid fa-money-bill-wave",
      color: "text-emerald-600 bg-emerald-100",
      title: "الدفع عند الاستلام",
      desc: "ما تخلص حتى توصلك الأمانة لعندك، تفحصها وتشعلها وتتأكد من جودتها بنفسك.",
    },
    {
      icon: "fa-solid fa-shield-check",
      color: "text-amber-600 bg-amber-100",
      title: "ضمانة 100% مضمونة",
      desc: "منتج أصلي RAF 1000W مع إمكانية التبديل والاسترجاع في حالة وجود أي عيب مصنعي.",
    },
    {
      icon: "fa-solid fa-truck-fast",
      color: "text-blue-600 bg-blue-100",
      title: "توصيل سريع ومجاني",
      desc: "التوصيل فابور لباب دارك في مدة 24 إلى 48 ساعة لجميع مدن وقرى المملكة المغربية.",
    },
    {
      icon: "fa-solid fa-headset",
      color: "text-purple-600 bg-purple-100",
      title: "خدمة زبناء متواصلة",
      desc: "فريقنا رهن إشارتك عبر الهاتف والواتساب لمتابعة طلبك والإجابة عن أي استفسار.",
    },
  ];

  return (
    <section className="py-8 bg-white border-y border-slate-200 rtl">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((b, i) => (
            <div
              key={i}
              className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 text-center flex flex-col items-center justify-start hover:shadow-md transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${b.color} flex items-center justify-center text-xl mb-3 shadow-sm`}
              >
                <i className={b.icon} />
              </div>
              <h3 className="font-black text-slate-900 text-sm sm:text-base mb-1.5">
                {b.title}
              </h3>
              <p className="text-slate-600 text-xs leading-relaxed font-medium">
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
