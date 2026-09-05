"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "فلاشة نور الذكية 64GB",
    subtitle: "تصميم فاخر باللون الذهبي والزمردي",
    badge: "الأصلية 100%",
    image: "/noorusb_hero_usb_3d.png",
    accentColor: "from-amber-500 to-emerald-600"
  },
  {
    id: 2,
    title: "باقة التلفزيون والأجهزة الذكية",
    subtitle: "تعمل مباشرة على التلفاز والتابلت والسيارة",
    badge: "بدون إنترنت",
    image: "/noorusb_tv_box_3d.png",
    accentColor: "from-emerald-500 to-teal-700"
  },
  {
    id: 3,
    title: "1200+ فيديو بدون إعلانات",
    subtitle: "محتوى تعليمي هادف ومصنف في مجلدات سهلة الاستخدام",
    badge: "محتوى آمن للأطفال",
    image: "/noorusb_folders_drive_banner.png",
    accentColor: "from-amber-400 to-orange-600"
  },
  {
    id: 4,
    title: "400+ فيديو لتعليم اللغات",
    subtitle: "العربية، الإنجليزية والفرنسية بأسلوب ممتع ومحفز",
    badge: "3 لغات عالمية",
    image: "/noorusb_languages_banner.png",
    accentColor: "from-teal-400 to-emerald-600"
  }
];

export default function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const scrollToCheckout = () => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full min-h-[92vh] py-12 lg:py-20 flex items-center justify-center overflow-hidden rtl bg-gradient-to-b from-[#011b15] via-[#022c22] to-[#064e3b]">
      {/* Dynamic Background Glow Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-emerald-950/80 to-[#022c22] pointer-events-none" />

      {/* Floating Glowing Orbs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10 flex flex-col lg:flex-row items-center gap-12 pt-6">
        
        {/* Right Column: High-Ticket Copy & CTA */}
        <div className="w-full lg:w-1/2 text-center lg:text-right flex flex-col justify-center">
          
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 justify-center lg:justify-start mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 font-bold text-xs md:text-sm shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              الخيار الأول للأسر المحافظة في الجزائر والمغرب 🇲🇦
            </span>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] mb-6">
            أروع هدية تعليمية لطفلك <br className="hidden sm:inline" />
            <span className="gold-gradient-text drop-shadow-md">فلاشة نور الذهبية 64GB</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-emerald-100/90 mb-8 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
            احمِ طفلك من إدمان الهواتف والإعلانات الضارة! أكثر من <span className="text-amber-300 font-bold">1200 فيديو ممتع</span> تشمل قصص الأنبياء، القرآن الكريم، تعلم اللغات، وأناشيد بدون موسيقى.
          </p>

          {/* Value Badges */}
          <div className="grid grid-cols-3 gap-3 mb-8 max-w-lg mx-auto lg:mx-0">
            <div className="emerald-glass p-3 rounded-2xl text-center border border-amber-500/20 shadow-lg">
              <span className="block text-2xl mb-1">🛡️</span>
              <span className="text-xs font-bold text-emerald-100 block">بدون إنترنت</span>
            </div>
            <div className="emerald-glass p-3 rounded-2xl text-center border border-amber-500/20 shadow-lg">
              <span className="block text-2xl mb-1">📺</span>
              <span className="text-xs font-bold text-emerald-100 block">شاشة التلفاز</span>
            </div>
            <div className="emerald-glass p-3 rounded-2xl text-center border border-amber-500/20 shadow-lg">
              <span className="block text-2xl mb-1">⚡</span>
              <span className="text-xs font-bold text-emerald-100 block">سعة 64GB</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
            <button 
              onClick={scrollToCheckout}
              className="w-full sm:w-auto btn-neon-cta text-white text-xl px-10 py-5 rounded-2xl font-black transition-all shadow-[0_0_30px_rgba(16,185,129,0.4)] flex items-center justify-center gap-3 group"
            >
              <span>أطلب الآن والدفع عند الاستلام</span>
              <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform" />
            </button>
            <a 
              href="#checkout" 
              className="text-amber-300/90 hover:text-amber-200 font-bold text-base px-6 py-4 rounded-xl border border-amber-400/30 hover:border-amber-400/60 transition-all backdrop-blur-sm"
            >
              شاهد العروض الخاصة 🔥
            </a>
          </div>

        </div>

        {/* Left Column: Animated Catchy Slide Showcase */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative w-full aspect-[4/3] max-w-[560px] mx-auto rounded-3xl p-2 bg-gradient-to-br from-amber-400/30 via-emerald-500/20 to-amber-500/30 shadow-[0_0_50px_rgba(6,78,59,0.8)] backdrop-blur-xl border border-amber-400/40">
            
            {/* Inner Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#022c22]/90 flex items-center justify-center">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, scale: 0.92, rotate: -1 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.05, rotate: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <Image
                    src={slides[activeSlide].image}
                    alt={slides[activeSlide].title}
                    fill
                    priority
                    quality={95}
                    className="object-contain p-4 drop-shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
                  />

                  {/* Top Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs px-3 py-1.5 rounded-full shadow-lg border border-amber-200">
                    {slides[activeSlide].badge}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Overlay Slide Info Bar */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#021812] via-[#021812]/90 to-transparent p-5 text-right pt-10">
                <h3 className="text-xl font-black text-amber-300 drop-shadow-sm mb-1">
                  {slides[activeSlide].title}
                </h3>
                <p className="text-xs text-emerald-100/80 font-medium">
                  {slides[activeSlide].subtitle}
                </p>
              </div>

            </div>

            {/* Interactive Slide Controls & Navigation Tabs */}
            <div className="flex justify-center items-center gap-2 mt-4">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeSlide === index 
                      ? "w-8 bg-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.8)]" 
                      : "w-2.5 bg-emerald-700/60 hover:bg-emerald-500"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
