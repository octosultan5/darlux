import React from 'react';

export default function TextAndImagesSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-[#022c22] via-[#064e3b] to-[#022c22]">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Banner 1: Overview Showcase */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 group hover:border-amber-400 transition-all duration-300">
          <img 
            src="/noorusb_banner_overview.png" 
            alt="محتوى فلاشة نور للأطفال 64 جيجا" 
            className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-500"
          />
        </div>

        {/* Banner 2: 9-Category Treasure Grid */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 group hover:border-amber-400 transition-all duration-300">
          <img 
            src="/noorusb_treasure_grid.png" 
            alt="كنز تربوي لأطفالك - 9 أقسام تعليمية" 
            className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-500"
          />
        </div>

        {/* Banner 3: Language Learning Banner */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 group hover:border-amber-400 transition-all duration-300">
          <img 
            src="/noorusb_languages_banner.png" 
            alt="400+ فيديو تفاعلي لتعليم اللغات" 
            className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-500"
          />
        </div>

        {/* Banner 4: 1200+ Organized Videos & 3D Drive */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30 group hover:border-amber-400 transition-all duration-300">
          <img 
            src="/noorusb_folders_drive_banner.png" 
            alt="1200+ فيديو منظم في ملفات 64GB" 
            className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-500"
          />
        </div>

      </div>
    </section>
  );
}
