"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function VideoOverview() {
    const [isPlaying, setIsPlaying] = useState(false);
    const youtubeId = process.env.NEXT_PUBLIC_VIDEO_YOUTUBE_ID || "WNZK4_tD4C8";

    return (
      <section className="py-20 bg-slate-50 rtl border-b border-slate-200">
        <div className="container mx-auto px-5 max-w-5xl text-center">
          <h2 className="text-3xl md:text-5xl font-black text-brand-primary mb-6">
            شاهد كيف يعمل الفلاش ميموري
          </h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-medium"
          >
            نظرة سريعة على المحتوى وكيفية استخدامه على التلفاز الذكي، الحاسوب، أو هاتف طفلك.
          </motion.p>
  
          {/* Video Player Box */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-video bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border-4 border-slate-800 group"
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
                
                {/* Dark Vignette overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all flex flex-col justify-between p-6">
                  {/* Top tag */}
                  <div className="self-end bg-brand-accent/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    عرض توضيحي للمكتبة 📺
                  </div>
                  
                  {/* Center play icon */}
                  <div className="w-24 h-24 bg-brand-accent text-white rounded-full flex items-center justify-center text-4xl shadow-[0_0_30px_rgba(242,155,97,0.6)] group-hover:scale-110 transition-transform mx-auto">
                    <i className="fa-solid fa-play ml-2"></i>
                  </div>
                  
                  {/* Bottom title */}
                  <div className="text-right">
                    <h3 className="text-white text-xl md:text-2xl font-black drop-shadow-md">اضغط لتشغيل الفيديو التعريفي</h3>
                    <p className="text-white/80 text-sm md:text-base font-bold drop-shadow-sm mt-1">اكتشف روعة المحتوى وجودته بدون إنترنت</p>
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
  
