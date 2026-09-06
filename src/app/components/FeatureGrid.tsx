"use client";

import { motion } from "framer-motion";

export default function FeatureGrid() {
  const features = [
    {
      icon: "fa-solid fa-[#c57d5c] fa-bolt",
      title: "قوة 1000W وسخونية فورية",
      desc: "تضمن غليان الماء فـ أقل من 5 دقائق وطبخ وجباتك اليومية فـ وقت قياسي.",
      color: "text-amber-300 bg-amber-500/15 border-amber-400/30"
    },
    {
      icon: "fa-solid fa-piggy-bank",
      title: "توفير 40% فـ الفاتورة",
      desc: "مقاومة حرارية بشكل spirale اقتصادية فـ الطاقة وبدون عناء شراء البوطا.",
      color: "text-emerald-300 bg-emerald-500/15 border-emerald-400/30"
    },
    {
      icon: "fa-solid fa-[#c57d5c] fa-temperature-arrow-up",
      title: "5 مستويات حرارة (Thermostat)",
      desc: "تحكم كامل بـ زر دوار: للغلي، الطبخ المتوسط، أو الحفاظ على سخونية الأكل.",
      color: "text-amber-300 bg-amber-500/15 border-amber-400/30"
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "إطار معدني وحماية أمان",
      desc: "مقاوم للحرارة العالية والمخاطر مع ضوء بيان التشغيل وحماية ضد السخونية.",
      color: "text-emerald-300 bg-emerald-500/15 border-emerald-400/30"
    }
  ];

  return (
    <section className="py-20 sm:py-32 bg-slate-50 text-slate-900 rtl relative overflow-hidden border-t border-slate-100">
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-5 py-2 rounded-full bg-[#c57d5c]/10 text-[#c57d5c] font-bold text-sm mb-4">
            علاش هاد الريشو خاصو يكون عندك فـ الدار؟ 💥
          </span>
          <h2 className="text-4xl sm:text-6xl font-black mb-6 text-slate-900 tracking-tight">
            مميزات بلاكة <span className="text-[#c57d5c]">RAF 1000W</span>
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 font-medium max-w-2xl mx-auto">
            الحل العملي والسريع للطبخ والتسخين في أي مكان بدون الحاجة للغاز.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 text-center group"
            >
              <div className="w-20 h-20 mx-auto rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-sm text-[#c57d5c]">
                <i className={`${item.icon.replace('text-amber-300', '').replace('text-emerald-300', '')} text-4xl`} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4 leading-tight">{item.title}</h3>
              <p className="text-slate-600 text-base leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
