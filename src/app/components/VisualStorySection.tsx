"use client";

import OrderForm from "./OrderForm";

export default function VisualStorySection() {
  const scrollToTopOrder = () => {
    document.getElementById("order-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const stories = [
    {
      badge: "السرعة والقوة الخارقة ⚡",
      badgeColor: "bg-amber-500 text-slate-950",
      headline: "غلي الماء والطهي فـ أقل من 3 دقائق!",
      subheadline: "وداعاً للانتظار... قوة هائلة 1500W مع قرص تسخين فوري يطيب أطباقك فـ رمشة عين",
      image: "/creatives/turbo_boil.png",
      alt: "سخونية صاروخية بقوة 1500W - غليان فوري",
      caption: "بفضل قوة 1500W المطورة والقرص الحلزوني الذكي، الماء كيغلي فـ ثواني معدودة وكيخليك توجد أتاي، قهوة، مقليات، أو طاجين بلدي بكل سرعة وبلا ما تسنى بزاف.",
      buttonText: "أطلب الريشو بـ 129 درهم فقط 🛒",
    },
    {
      badge: "راحة الوالدة والأمان التام 💖",
      badgeColor: "bg-rose-600 text-white",
      headline: "ريّحي الوالدة من عذاب وثقل البوطة!",
      subheadline: "الراحة والأمان فـ كوزينتها... بدون هزان، بدون تسريب للغاز، وبدون خوف",
      image: "/creatives/mother_kitchen_relief.png",
      alt: "راحة الوالدة في المطبخ مع ريشو 1500W",
      caption: "تهنى من هزان البوطة فـ الدروج وتركيب التيو والخوف من تسريب الغاز. ريشو كهربائي خفيف، أنيق، وآمن 100% مع نظام تحكم أوتوماتيكي سهل ومريح للوالدة.",
      buttonText: "فرح الوالدة واطلب الآن بـ 129 درهم 💖",
    },
    {
      badge: "طواجن بلادية ولمة العائلة 🍲",
      badgeColor: "bg-emerald-600 text-white",
      headline: "ما كاين ما حسن من طاجين سخون يجمع العائلة!",
      subheadline: "أطباق مغربية أصيلة سخونة مباشرة فوق المائدة... بدون غاز وبدون تعب",
      image: "/creatives/family_tajine_feast.png",
      alt: "طاجين مغربي ساخن يجمع العائلة مع ريشو 1500W",
      caption: "حافظ على سخونية الطاجين والوجبات العائلية مباشرة فوق مائدة الطعام. طياب هادئ ومتوازن يخلي اللحم والخضرة يطيبو على حقهم وطريقهم وبنكهة مغربية أصيلة.",
      buttonText: "إستفد من العرض العائلي الآن 🍲",
    },
  ];

  return (
    <section className="py-8 sm:py-12 bg-slate-100 rtl text-slate-900 border-t border-slate-200">
      <div className="container mx-auto px-2 sm:px-4 max-w-2xl">
        
        {/* Section Header */}
        <div className="text-center mb-8 px-2">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-sm mb-2">
            قصة المنتج ولماذا اختاره آلاف المغاربة 🇲🇦
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            كل ما تحتاجه في جهاز واحد: <span className="text-amber-600">RAF 1500W</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            تصميم عملي، قوة حقيقية، وتوفير حتى 40% في مصاريف الطاقة اليومية
          </p>
        </div>

        {/* Vertical Story Flow: Images displayed full width as designed, with catchy narratives */}
        <div className="space-y-12">
          {stories.map((story, idx) => (
            <div key={idx} className="space-y-4">
              
              {/* Catchy Chapter Title */}
              <div className="text-right px-2">
                <span className={`inline-block ${story.badgeColor} font-black text-xs px-3 py-1 rounded-full shadow-sm mb-2`}>
                  {story.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                  {story.headline}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                  {story.subheadline}
                </p>
              </div>

              {/* Full-Bleed Design Image Poster (Uploaded As-Is, 100% Width) */}
              <div 
                onClick={scrollToTopOrder}
                className="w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 bg-slate-900 cursor-pointer group"
              >
                <img
                  src={story.image}
                  alt={story.alt}
                  className="w-full h-auto block object-cover group-hover:scale-[1.01] transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Narrative Bridge & Direct Button */}
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3 text-right">
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                  {story.caption}
                </p>
                <button
                  onClick={scrollToTopOrder}
                  className="w-full bg-slate-900 hover:bg-amber-600 active:scale-95 text-white font-black text-xs sm:text-sm py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{story.buttonText}</span>
                  <i className="fa-solid fa-arrow-up text-xs" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Secondary Order Form At The End of The Visual Story */}
        <div className="mt-12 pt-8 border-t-2 border-dashed border-slate-300">
          <div className="text-center mb-4">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              جاهز لتجربة الراحة والتوفير في منزلك؟
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              أدخل معلوماتك الآن وسيصلك الريشو حتى لباب دارك مع التوصيل المجاني والدفع عند الاستلام
            </p>
          </div>

          <OrderForm
            id="order-form-bottom"
            title="إستمارة الطلب السريع (129 درهم فقط)"
            subtitle="عرض خاص محدود لفترة قصيرة - التوصيل فابور 100% 🚚"
          />
        </div>

      </div>
    </section>
  );
}
