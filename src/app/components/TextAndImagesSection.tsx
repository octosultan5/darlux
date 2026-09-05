"use client";

import React from 'react';

export default function TextAndImagesSection() {
  const scrollToCheckout = () => {
    document.getElementById("checkout-top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-24 px-4 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white rtl relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#c57d5c]/20 border border-[#c57d5c]/40 text-amber-300 font-bold text-xs sm:text-sm mb-4">
            معرض الصور والمواصفات الرسمية 📷
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            كل ما تريد معرفته عن <span className="copper-gradient-text">Réchaud RAF 1000W</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-medium">
            شاهد بالتفصيل جودة التصنيع، دقة التحكم فـ الحرارة، واقتصاد الفاتورة.
          </p>
        </div>

        {/* Banner 1: Master Lifestyle & Frying Pan */}
        <div className="copper-glass rounded-3xl p-4 sm:p-8 shadow-2xl border border-amber-400/30 flex flex-col lg:flex-row items-center gap-8 group">
          <div className="w-full lg:w-1/2 relative rounded-none overflow-hidden shadow-xl aspect-[4/3] bg-slate-950">
            <img 
              src="/solero/solero.jpg" 
              alt="Réchaud RAF 1000W DarLux Lifestyle" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg">
              169 DH - ثمن استثنائي 🔥
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-4 text-right">
            <span className="text-amber-400 font-bold text-xs tracking-wider uppercase">01. الطبخ والتسخين اليومي السريع</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">تحضير أشهى الوجبات فـ وقت قياسي وبسهولة</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              بفضل قوة 1000W، تقدر تستعملها يومياً لتحضير أو تسخين بزاف ديال الأكلات: غلي الماء فـ أقل من 5 دقائق، طياب البيض، الشوربة، المعكرونة، القهوة، أو حفظ الأكل ساخناً.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-slate-950/80 text-emerald-400 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-500/30">✓ غلي الماء فـ 5 دقائق</span>
              <span className="bg-slate-950/80 text-emerald-400 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-500/30">✓ طياب وتدفئة الأكل</span>
            </div>
          </div>
        </div>

        {/* Banner 2: 5 Heat Levels & Overheat Protection */}
        <div className="copper-glass rounded-3xl p-4 sm:p-8 shadow-2xl border border-amber-400/30 flex flex-col lg:flex-row-reverse items-center gap-8 group">
          <div className="w-full lg:w-1/2 relative rounded-none overflow-hidden shadow-xl aspect-[4/3] bg-slate-950">
            <img 
              src="/solero/He9e36218ab68467bae1f5a9a224ef20fS.jpg" 
              alt="5 Heat Levels & Thermostat" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 right-4 bg-amber-400 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg">
              Thermostat Réglable 🌡️
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-4 text-right">
            <span className="text-amber-400 font-bold text-xs tracking-wider uppercase">02. تحكم دقيق فـ درجة الحرارة</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">5 مستويات حرارة مع ترموستات قابل للتعديل</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              مجهزة بـ Bouton Rotatif كيسماح ليك تضبط مستوى الحرارة حسب الأكلة: حرارة قوية للطبخ والغلي، حرارة متوسطة للتحضير اليومي، وحرارة خفيفة للتسخين والمحافظة على السخونية.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-slate-950/80 text-amber-300 text-xs font-bold px-3 py-1 rounded-lg border border-amber-400/30">🔥 حرارة قوية للطبخ</span>
              <span className="bg-slate-950/80 text-amber-300 text-xs font-bold px-3 py-1 rounded-lg border border-amber-400/30">🛡️ حماية ضد السخونية الزائدة</span>
            </div>
          </div>
        </div>

        {/* Banner 3: Electricity vs Butane Gas Cost Savings */}
        <div className="copper-glass rounded-3xl p-4 sm:p-8 shadow-2xl border border-amber-400/30 flex flex-col lg:flex-row items-center gap-8 group">
          <div className="w-full lg:w-1/2 relative rounded-none overflow-hidden shadow-xl aspect-[4/3] bg-slate-950">
            <img 
              src="/solero/HTB19CR9M9zqK1RjSZPxq6A4tVXab.jpg" 
              alt="Electricity vs Gas Cost Comparison" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 right-4 bg-emerald-500 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg">
              توفير 40% فـ الفاتورة 💰
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-4 text-right">
            <span className="text-amber-400 font-bold text-xs tracking-wider uppercase">03. مقارنة التوفير والأمان</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">40 DH بدلاً من 60 DH شهرياً ودون مشاكل الغاز</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              توفر تقنية المقاومة الحرارية الحلزونية استهلاكاً منخفضاً للكهرباء مقارنة بعناء وشراء بوطا الغاز الشهرية، مع القضاء التام على خطر تسرب الغاز والرائحة.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="bg-slate-950/80 text-emerald-400 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-500/30">✓ صفر تسرب غاز</span>
              <span className="bg-slate-950/80 text-emerald-400 text-xs font-bold px-3 py-1 rounded-lg border border-emerald-500/30">✓ اقتصاد 40% فـ الفاتورة</span>
            </div>
          </div>
        </div>

        {/* Banner 4: Specifications & Compact Dimensions */}
        <div className="copper-glass rounded-3xl p-4 sm:p-8 shadow-2xl border border-amber-400/30 flex flex-col lg:flex-row-reverse items-center gap-8 group">
          <div className="w-full lg:w-1/2 relative rounded-none overflow-hidden shadow-xl aspect-[4/3] bg-slate-950">
            <img 
              src="/solero/Hfb1b25153c7d477d90ced37b729da262g.jpg" 
              alt="Dimensions & Technical Specs" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 right-4 bg-amber-400 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg">
              صغيرة فالحجم... كبيرة فالاستعمال!
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-4 text-right">
            <span className="text-amber-400 font-bold text-xs tracking-wider uppercase">04. المواصفات التقنية والأبعاد</span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">تصميم مدمج (24.5x22x7 سم) وزن خفيف 1.3kg</h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              مثالية للدراسة، المكتب، السفر، الستوديو، أو كبلاكة إضافية فالكوزينة. مجهزة بكابل متين 55 سم وإطار معدني مقاوم للصدمات والحرارة العالية.
            </p>
            <div className="pt-2">
              <button 
                onClick={scrollToCheckout}
                className="btn-copper-cta text-white font-black text-base sm:text-lg px-8 py-3.5 rounded-none shadow-xl hover:scale-105 transition-transform"
              >
                احصل عليها الآن بـ 169 درهم
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
