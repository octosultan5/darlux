"use client";

import { motion } from "framer-motion";

export default function FeatureGrid() {
  const features = [
    {
      icon: "fa-solid fa-moon",
      title: "تربية إسلامية صحيحة",
      desc: "قصص الأنبياء، أحاديث، وأناشيد تربوية هادفة ترسخ القيم والمبادئ.",
      color: "text-amber-300 bg-amber-500/15 border-amber-400/30"
    },
    {
      icon: "fa-solid fa-language",
      title: "تعلم 3 لغات بسهولة",
      desc: "دروس تفاعلية بالإنجليزية، الفرنسية، والعربية الفصحى لجميع الأعمار.",
      color: "text-emerald-300 bg-emerald-500/15 border-emerald-400/30"
    },
    {
      icon: "fa-solid fa-shield-cat",
      title: "بيئة آمنة 100%",
      desc: "فيديوهات مختارة بعناية، بدون إعلانات مزعجة وبدون حاجة للأنترنيت.",
      color: "text-amber-300 bg-amber-500/15 border-amber-400/30"
    },
    {
      icon: "fa-solid fa-sd-card",
      title: "سعة 64 جيجا فائقة السرعة",
      desc: "فلاش ميموري ذهبية عالية الجودة تضم مئات الساعات من المرح والتعلم.",
      color: "text-emerald-300 bg-emerald-500/15 border-emerald-400/30"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#022c22] via-[#064e3b] to-[#022c22] text-white rtl relative overflow-hidden">
      
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 font-bold text-xs sm:text-sm mb-3">
            لماذا يختار الأباء والأمهات فلاشة نور؟ 🌟
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            مميزات الاستثمار في <span className="gold-gradient-text">مستقبل طفلك</span>
          </h2>
          <p className="text-base sm:text-lg text-emerald-100/80 font-medium max-w-xl mx-auto">
            كل ما يحتاجه طفلك لينمو ذكياً، محافظاً، ومتفوقاً في مكان واحد آمن.
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
              className="emerald-glass rounded-3xl p-6 sm:p-8 hover:border-amber-400/60 hover:-translate-y-2 transition-all duration-300 text-center group shadow-xl"
            >
              <div className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-2xl border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${item.color}`}>
                <i className={`${item.icon} text-3xl sm:text-4xl`} />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-amber-300 mb-3">{item.title}</h3>
              <p className="text-emerald-100/80 text-sm leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
