"use client";

import { motion } from "framer-motion";

export default function ReviewsSection() {
  const reviews = [
    {
      name: "خديجة م.",
      city: "الدار البيضاء",
      text: "صراحة منتج رائع جداً! ولادي كانو مدمنين على التليفون واليوتوب، دابا ولفو يتفرجو فالفلاشة وفيها قصص الأنبياء وأناشيد مفيدة. شكراً بزاف!",
      stars: 5,
    },
    {
      name: "يوسف ب.",
      city: "الرباط",
      text: "الجودة ديال الفيديوهات ممتازة، ومقسومين بطريقة زوينة. بنتي تعلمات بزاف ديال الحوايج فالدين ديالنا بطريقة ممتعة.",
      stars: 5,
    },
    {
      name: "فاطمة الزهراء",
      city: "مراكش",
      text: "احسن استثمار درتو لولادي هاد العام. الفلاشة خدامة مزيان فالتلفزة والبيسي، والأهم أنني مكنبقاش خايفة من الإعلانات لي كطلع ليهم.",
      stars: 5,
    }
  ];

  const scrollToCheckout = () => {
    document.getElementById("checkout-top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[#022c22] via-[#064e3b] to-[#022c22] text-white rtl relative overflow-hidden">
      
      {/* Glow */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 font-bold text-xs sm:text-sm mb-3">
            آراء وتجارب أولياء الأمور 💬
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            ماذا يقول <span className="gold-gradient-text">الآباء والأمهات؟</span>
          </h2>
          <p className="text-base sm:text-lg text-emerald-100/80 font-medium">أكثر من 10,000 عائلة مغربية يثقون في فلاشة نور</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 sm:gap-12 items-center">
          
          {/* Main Visual */}
          <div className="w-full lg:w-1/3">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/40 p-1 bg-gradient-to-br from-amber-400/30 to-emerald-500/30">
               <img 
                 src="/noorusb_iphone16_lifestyle_hero.png" 
                 alt="أم سعيدة وطفلها يتعلمان عبر فلاشة نور" 
                 className="w-full h-full object-cover rounded-2xl"
               />
               <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#01140f] via-[#01140f]/80 to-transparent p-5">
                 <div className="flex items-center gap-1 mb-1.5">
                   {[1,2,3,4,5].map(i => <i key={i} className="fa-solid fa-star text-amber-400 text-base" />)}
                 </div>
                 <p className="text-amber-300 font-black text-base sm:text-lg">"غيّر حياة أطفالي للأفضل بالكامل!"</p>
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
                className="emerald-glass p-6 rounded-3xl border border-amber-500/20 relative shadow-xl hover:border-amber-400/50 transition-colors"
              >
                <div className="absolute -top-3 -right-3 bg-amber-400 text-slate-950 w-8 h-8 rounded-full flex items-center justify-center shadow-lg font-black text-xs">
                  <i className="fa-solid fa-quote-right" />
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(review.stars)].map((_, idx) => (
                    <i key={idx} className="fa-solid fa-star text-amber-400 text-xs" />
                  ))}
                </div>
                
                <p className="text-emerald-100/90 font-medium mb-5 leading-relaxed text-xs sm:text-sm">
                  "{review.text}"
                </p>
                
                <div className="flex items-center gap-3 mt-auto pt-2 border-t border-emerald-800/40">
                  <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 font-black text-sm">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-amber-300 text-sm">{review.name}</h4>
                    <p className="text-[11px] text-emerald-300/70 flex items-center gap-1">
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
              className="emerald-glass p-6 rounded-3xl border-2 border-dashed border-amber-400/40 flex flex-col items-center justify-center text-center hover:border-amber-400 cursor-pointer transition-colors"
              onClick={scrollToCheckout}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full text-slate-950 flex items-center justify-center text-xl mb-3 shadow-[0_0_20px_rgba(245,158,11,0.5)] animate-bounce">
                <i className="fa-solid fa-cart-plus" />
              </div>
              <h4 className="font-black text-amber-300 text-base mb-1">انضم للأسر السعيدة!</h4>
              <p className="text-emerald-100/80 text-xs font-medium">اطلب الآن بـ 149 درهم فقط والدفع عند الاستلام</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
