"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function VideoOverview() {
    const [isPlaying, setIsPlaying] = useState(false);
    const youtubeId = process.env.NEXT_PUBLIC_VIDEO_YOUTUBE_ID || "WNZK4_tD4C8";

    return (
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#022c22] via-[#064e3b] to-[#022c22] text-white rtl relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 font-bold text-xs sm:text-sm mb-3">
            عرض توضيحي للمكتبة 📺
          </span>

          <h2 className="text-3xl sm:text-5xl font-black mb-4">
            شاهد كيف تعمل <span className="gold-gradient-text">فلاشة نور 64GB</span>
          </h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-base sm:text-xl text-emerald-100/90 mb-10 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            نظرة سريعة على المحتوى وكيفية استخدامه مباشرة على التلفاز الذكي، الحاسوب، أو السيارة.
          </motion.p>
  
          {/* Video Player Box */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-video bg-slate-950 rounded-3xl shadow-[0_0_50px_rgba(6,78,59,0.8)] overflow-hidden border-2 border-amber-400/40 group"
          >
            {!isPlaying ? (
              <div 
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 w-full h-full cursor-pointer flex items-center justify-center"
              >
                {/* Thumbnail Image */}
                <img 
                  src="/learning_tv.png" 
                  alt="مشاهدة محتوى نور التعليمي" 
                  className="absolute inset-0 w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#021812] via-[#021812]/50 to-transparent group-hover:bg-black/30 transition-all flex flex-col justify-between p-6">
                  
                  {/* Top Badge */}
                  <div className="self-end bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full shadow-lg">
                    فيديو توضيحي تفاعلي 🎥
                  </div>
                  
                  {/* Center Play Icon */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-amber-400 to-amber-500 text-slate-950 rounded-full flex items-center justify-center text-3xl sm:text-4xl shadow-[0_0_40px_rgba(245,158,11,0.7)] group-hover:scale-110 transition-transform mx-auto">
                    <i className="fa-solid fa-play ml-1" />
                  </div>
                  
                  {/* Bottom title */}
                  <div className="text-right">
                    <h3 className="text-amber-300 text-lg sm:text-2xl font-black drop-shadow-md">اضغط لتشغيل الفيديو التعريفي</h3>
                    <p className="text-emerald-100/90 text-xs sm:text-sm font-bold drop-shadow-sm mt-1">اكتشف روعة المحتوى وجودته العالية بدون إنترنت</p>
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title="NoorUSB Product Overview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            )}
          </motion.div>
  
        </div>
      </section>
    );
  }
