"use client";

import React from 'react';

export default function TextAndImagesSection() {
  const scrollToCheckout = () => {
    document.getElementById("checkout-top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 sm:py-32 px-4 bg-white text-slate-900 rtl relative overflow-hidden border-t border-slate-100">
      <div className="max-w-6xl mx-auto space-y-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-5 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-bold text-sm mb-6 uppercase tracking-wider">
            المواصفات الرسمية 📷
          </span>
          <h2 className="text-4xl sm:text-6xl font-black mb-6 text-slate-900 leading-tight tracking-tight">
            كل ما تحتاج معرفته عن <br/> <span className="text-[#c57d5c]">Réchaud RAF 1000W</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            اكتشف جودة التصنيع، دقة التحكم في الحرارة، وكيف يمكن لهذا الجهاز أن يسهل حياتك اليومية ويوفر في فاتورتك.
          </p>
        </div>

        {/* Banner 1: Master Lifestyle & Frying Pan */}
        <div className="bg-slate-50 rounded-[2rem] p-6 sm:p-12 border border-slate-100 flex flex-col lg:flex-row items-center gap-12 group transition-all hover:shadow-xl hover:shadow-slate-200/50">
          <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden shadow-lg aspect-[16/9] bg-white">
            <img 
              src="/solero/family_banner.jpg" 
              alt="أطباق بلدية بنكهة مغربية أصيلة - Réchaud RAF" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-5 right-5 bg-white text-slate-900 font-black text-sm px-4 py-2 rounded-full shadow-md flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              أداء استثنائي
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6 text-right">
            <span className="text-[#c57d5c] font-bold text-sm tracking-wider uppercase bg-[#c57d5c]/10 px-3 py-1 rounded-md">01. الطبخ اليومي السريع</span>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">تحضير أشهى الوجبات في وقت قياسي</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              بفضل قوة 1000W، يمكنك الاعتماد عليه يومياً لتحضير وتسخين مختلف الأكلات. غلي الماء في أقل من 5 دقائق، تحضير الشوربة، القهوة، أو حفظ الأكل ساخناً بسهولة تامة.
            </p>
            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3 text-slate-700 font-bold">
                <i className="fa-solid fa-check text-emerald-500 text-lg"></i> غلي الماء في 5 دقائق فقط
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-bold">
                <i className="fa-solid fa-check text-emerald-500 text-lg"></i> مثالي لطبخ وتدفئة الطعام
              </li>
            </ul>
          </div>
        </div>

        {/* Banner 2: 5 Heat Levels & Overheat Protection */}
        <div className="bg-slate-50 rounded-[2rem] p-6 sm:p-12 border border-slate-100 flex flex-col lg:flex-row-reverse items-center gap-12 group transition-all hover:shadow-xl hover:shadow-slate-200/50">
          <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden shadow-lg aspect-[4/3] bg-white">
            <img 
              src="/solero/He9e36218ab68467bae1f5a9a224ef20fS.jpg" 
              alt="5 Heat Levels & Thermostat" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-5 right-5 bg-white text-slate-900 font-black text-sm px-4 py-2 rounded-full shadow-md flex items-center gap-2">
              <i className="fa-solid fa-temperature-half text-[#c57d5c]"></i>
              ترموستات دقيق
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6 text-right">
            <span className="text-[#c57d5c] font-bold text-sm tracking-wider uppercase bg-[#c57d5c]/10 px-3 py-1 rounded-md">02. تحكم كامل بالحرارة</span>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">5 مستويات حرارة لتناسب كل احتياجاتك</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              مزود بزر دوار يتيح لك ضبط مستوى الحرارة بدقة: حرارة قوية للطبخ السريع، متوسطة للتحضير اليومي، وخفيفة للتسخين والمحافظة على حرارة الأكل.
            </p>
            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3 text-slate-700 font-bold">
                <i className="fa-solid fa-fire-flame-curved text-[#c57d5c] text-lg"></i> حرارة قوية للطبخ والقلي
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-bold">
                <i className="fa-solid fa-shield-halved text-[#c57d5c] text-lg"></i> نظام حماية ذكي ضد الحرارة الزائدة
              </li>
            </ul>
          </div>
        </div>

        {/* Banner 3: Electricity vs Butane Gas Cost Savings */}
        <div className="bg-slate-50 rounded-[2rem] p-6 sm:p-12 border border-slate-100 flex flex-col lg:flex-row items-center gap-12 group transition-all hover:shadow-xl hover:shadow-slate-200/50">
          <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden shadow-lg aspect-[16/9] bg-white">
            <img 
              src="/solero/gas_banner.jpg" 
              alt="بوطا ب 50 درهم؟ علاش تخلص كثر؟" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-5 right-5 bg-emerald-500 text-white font-black text-sm px-4 py-2 rounded-full shadow-md flex items-center gap-2">
              <i className="fa-solid fa-piggy-bank"></i>
              توفير ملموس
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6 text-right">
            <span className="text-[#c57d5c] font-bold text-sm tracking-wider uppercase bg-[#c57d5c]/10 px-3 py-1 rounded-md">03. اقتصاد وأمان</span>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">وفر حتى 40% من تكاليفك الشهرية</h3>
            <p className="text-slate-600 text-lg leading-relaxed">
              تقنية المقاومة الحرارية الحلزونية تضمن استهلاكاً منخفضاً للكهرباء. انسَ عناء شراء قنينات الغاز ومخاطر التسرب، واستمتع بطبخ آمن واقتصادي.
            </p>
            <ul className="space-y-3 pt-2">
              <li className="flex items-center gap-3 text-slate-700 font-bold">
                <i className="fa-solid fa-check text-emerald-500 text-lg"></i> وداعاً لمخاطر تسرب الغاز
              </li>
              <li className="flex items-center gap-3 text-slate-700 font-bold">
                <i className="fa-solid fa-check text-emerald-500 text-lg"></i> اقتصاد 40% في الفاتورة الشهرية
              </li>
            </ul>
          </div>
        </div>

        {/* Banner 4: Specifications & Compact Dimensions */}
        <div className="bg-slate-900 rounded-[2rem] p-6 sm:p-12 border border-slate-800 flex flex-col lg:flex-row-reverse items-center gap-12 group transition-all shadow-2xl">
          <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] bg-black">
            <img 
              src="/solero/Hfb1b25153c7d477d90ced37b729da262g.jpg" 
              alt="Dimensions & Technical Specs" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
          </div>
          <div className="w-full lg:w-1/2 space-y-6 text-right text-white">
            <span className="text-amber-400 font-bold text-sm tracking-wider uppercase bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20">04. تصميم ذكي ومدمج</span>
            <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight">صغيرة في الحجم، كبيرة في الأداء</h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              بأبعاد (24.5x22x7 سم) ووزن 1.3kg فقط، هي الخيار المثالي للطلبة، المكاتب، السفر، أو كإضافة عملية في مطبخك. مصنوعة بإطار معدني متين مقاوم للصدمات.
            </p>
            <div className="pt-6">
              <button 
                onClick={scrollToCheckout}
                className="w-full sm:w-auto bg-[#c57d5c] hover:bg-[#b06a4b] text-white font-black text-xl px-10 py-4 rounded-xl shadow-[0_8px_20px_rgba(197,125,92,0.4)] hover:shadow-[0_10px_25px_rgba(197,125,92,0.5)] transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <span>احصل عليها الآن بـ 169 درهم</span>
                <i className="fa-solid fa-arrow-left"></i>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
