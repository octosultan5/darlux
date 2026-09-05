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
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white rtl relative overflow-hidden">
      
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#c57d5c]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#c57d5c]/20 border border-[#c57d5c]/40 text-amber-300 font-bold text-xs sm:text-sm mb-3">
            علاش هاد الريشو خاصو يكون عندك فـ الدار؟ 💥
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            مميزات بلاكة <span className="copper-gradient-text">RAF 1000W الكهربائية</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-medium max-w-xl mx-auto">
            الحل العملي والسريع للطبخ والتسخين فـ أي مكان بدون حاجة للغاز.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="copper-glass rounded-3xl p-6 sm:p-8 hover:border-amber-400/60 hover:-translate-y-2 transition-all duration-300 text-center group shadow-xl"
            >
              <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-none border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${item.color}`}>
                <i className={`${item.icon} text-3xl sm:text-4xl`} />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-amber-300 mb-3">{item.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
