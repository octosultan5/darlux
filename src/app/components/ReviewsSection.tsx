"use client";

import { motion } from "framer-motion";

export default function ReviewsSection() {
  const reviews = [
    {
      name: "كمال م.",
      city: "الدار البيضاء",
      text: "صراحة ريشو ناضي بزاف! كينفعني فـ المكتب نسخن الغدا ونوجد أتاي فـ دقائق. اقتصادية فـ الضو وماكاينش عذاب البوطا.",
      stars: 5,
    },
    {
      name: "سناء ب.",
      city: "الرباط",
      text: "خديتها للستوديو ديال بنتي كتقرا فـ الكلية، عملية بزاف وماكتاخدش المساحة فـ الكوزينة. والحرارة ديالها قوية تبارك الله.",
      stars: 5,
    },
    {
      name: "حمزة ع.",
      city: "طنجة",
      text: "الجودة ممتازة، إطار معدني متين وكابل غليظ آمن. جربت فيها غليان الماء فـ 4 دقائق والبيض كيطيب فـ البلاصة. شكراً جزيلاً!",
      stars: 5,
    }
  ];

  const scrollToCheckout = () => {
    document.getElementById("checkout-top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white rtl relative overflow-hidden">
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#c57d5c]/20 border border-[#c57d5c]/40 text-amber-300 font-bold text-xs sm:text-sm mb-3">
            آراء وتجارب زبنائنا 💬
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            ماذا يقول <span className="copper-gradient-text">زبناء DarLux فـ المغرب؟</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-medium">أكثر من 5,000 زبون يثقون فـ جودة أجهزة DarLux المنزلية</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-center">
          
          {/* Main Visual */}
          <div className="w-full lg:w-1/3">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/40 p-1 bg-gradient-to-br from-[#c57d5c]/40 to-amber-500/40">
               <img 
                 src="/solero/solero.jpg" 
                 alt="DarLux Réchaud Électrique RAF 1000W" 
                 className="w-full h-full object-cover rounded-none"
               />
               <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0f172a] via-[#0f172a]/80 to-transparent p-5">
                 <div className="flex items-center gap-1 mb-1.5">
                   {[1,2,3,4,5].map(i => <i key={i} className="fa-solid fa-star text-amber-400 text-base" />)}
                 </div>
                 <p className="text-amber-300 font-black text-base sm:text-lg">"عملي وسريع فـ الطبخ والتسخين!"</p>
               </div>
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-5">
            {reviews.map((review, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="copper-glass p-6 rounded-3xl border border-amber-500/20 relative shadow-xl hover:border-amber-400/50 transition-colors text-right"
              >
                <div className="absolute -top-3 -right-3 bg-amber-400 text-slate-950 w-8 h-8 rounded-full flex items-center justify-center shadow-lg font-black text-xs">
                  <i className="fa-solid fa-quote-right" />
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.stars)].map((_, idx) => (
                    <i key={idx} className="fa-solid fa-star text-amber-400 text-xs" />
                  ))}
                </div>
                
                <p className="text-slate-200 font-medium mb-5 leading-relaxed text-xs sm:text-sm">
                  "{review.text}"
                </p>
                
                <div className="flex items-center gap-3 mt-auto pt-2 border-t border-slate-800">
                  <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-black text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-300 text-sm">{review.name}</h4>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1">
                      <i className="fa-solid fa-location-dot text-amber-400 text-[10px]" /> {review.city}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="copper-glass p-6 rounded-3xl border-2 border-dashed border-amber-400/40 flex flex-col items-center justify-center text-center hover:border-amber-400 cursor-pointer transition-colors"
              onClick={scrollToCheckout}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-[#c57d5c] text-slate-950 rounded-full flex items-center justify-center text-xl mb-3 shadow-lg animate-bounce">
                <i className="fa-solid fa-cart-plus" />
              </div>
              <h4 className="font-black text-amber-300 text-base mb-1">انضم لزبنائنا السعداء!</h4>
              <p className="text-slate-300 text-xs font-medium">اطلب الآن بـ 169 درهم فقط والدفع عند الاستلام</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
