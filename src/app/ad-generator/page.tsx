"use client";

import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";

export default function AdGenerator() {
  const [bgImage, setBgImage] = useState(
    "https://images.unsplash.com/photo-1516627145497-ae6968895b74?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
  );
  const [phone, setPhone] = useState("0600000000");
  const adRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setBgImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleDownload = async () => {
    if (!adRef.current) return;
    
    // Create a temporary unscaled clone for perfect capture
    const clone = adRef.current.cloneNode(true) as HTMLDivElement;
    clone.style.transform = 'scale(1)';
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '-9999px';
    document.body.appendChild(clone);

    try {
        const canvas = await html2canvas(clone, {
            scale: 1,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null,
            width: 1080,
            height: 1080,
        });
        
        const link = document.createElement("a");
        link.download = "NoorUSB_Ad_Creative.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    } finally {
        document.body.removeChild(clone);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 rtl font-cairo">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-none shadow-lg mb-8 relative z-50">
        <h2 className="text-3xl font-bold mb-4 text-brand-primary">
          صانع الإعلانات الاحترافي
        </h2>
        <p className="text-slate-600 mb-6">
          قم برفع أي صورة من جهازك، وسيتم تحويلها لإعلان احترافي عالي الدقة.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block font-bold mb-2">ارفع صورة الخلفية:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="border-2 border-slate-200 p-3 rounded-xl w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-primary file:text-white hover:file:bg-brand-accent cursor-pointer"
            />
          </div>
          <div>
            <label className="block font-bold mb-2">رقم الهاتف أو الواتساب:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-2 border-slate-200 p-3 rounded-xl w-full text-left font-bold text-xl"
              dir="ltr"
            />
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="bg-brand-green text-white px-8 py-4 rounded-xl font-black text-xl w-full hover:bg-emerald-600 shadow-lg hover:shadow-xl transition-all"
        >
          <i className="fa-solid fa-download ml-2"></i> تحميل الإعلان (1080x1080)
        </button>
      </div>

      {/* Preview Container Wrapper - Scaled down to fit screen */}
      <div className="w-full flex justify-center overflow-hidden">
        <div 
            ref={adRef}
            className="relative bg-white shadow-2xl overflow-hidden shrink-0"
            style={{ width: '1080px', height: '1080px', transform: 'scale(0.5)', transformOrigin: 'top center' }}
        >
            {/* Background Image */}
            <img
                src={bgImage}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Top Left Limited Offer */}
            <div className="absolute top-[40px] left-[40px] text-red-600 text-[3rem] font-black z-10 drop-shadow-2xl" style={{ textShadow: '2px 2px 0 white, -2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white' }}>
                عرض محدود 🔥
            </div>

            {/* Top Right Price Tag */}
            <div className="absolute top-0 right-[40px] bg-gradient-to-br from-amber-500 to-orange-600 text-white pt-8 pb-12 px-10 z-20 text-center shadow-2xl" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)' }}>
                <span className="text-[5rem] font-black block leading-none mb-2 drop-shadow-lg">149</span>
                <span className="text-[2.5rem] font-bold block drop-shadow-lg">درهم</span>
                <div className="bg-slate-900 text-white px-4 py-2 rounded-full text-2xl font-black mt-6 border-4 border-white shadow-xl">
                    ثمن الباك
                </div>
            </div>

            {/* Top Center Main Title (3D) */}
            <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 z-20 w-full text-center flex flex-col items-center">
                <div className="bg-gradient-to-b from-blue-700 to-blue-900 border-8 border-yellow-400 rounded-[3rem] px-16 py-8 shadow-2xl relative">
                    <div className="absolute -top-12 -left-12 text-yellow-400 text-[5rem] rotate-[-20deg] drop-shadow-xl"><i className="fa-solid fa-bullhorn"></i></div>
                    <h1 className="text-[5rem] font-black text-white leading-tight" style={{ textShadow: '-3px -3px 0 #1e3a8a, 3px -3px 0 #1e3a8a, -3px 3px 0 #1e3a8a, 3px 3px 0 #1e3a8a, 0px 6px 0 #0f172a, 0px 10px 20px rgba(0,0,0,0.6)' }}>أفضل هدية</h1>
                    <h2 className="text-[4rem] font-black text-white" style={{ textShadow: '-3px -3px 0 #1e3a8a, 3px -3px 0 #1e3a8a, -3px 3px 0 #1e3a8a, 3px 3px 0 #1e3a8a, 0px 6px 0 #0f172a, 0px 10px 20px rgba(0,0,0,0.6)' }}>لأطفالك اليوم!</h2>
                </div>
            </div>

            {/* Center Elements */}
            <div className="absolute top-[450px] left-1/2 transform -translate-x-1/2 z-20 flex gap-12 items-center w-full justify-center">
                <div className="bg-white/95 backdrop-blur-md px-10 py-5 rounded-full border-8 border-orange-500 shadow-2xl rotate-[-5deg]">
                    <span className="text-4xl font-black text-orange-600 drop-shadow-sm">فلاش ميموري 64GB</span>
                </div>
                <div className="text-[8rem] font-black text-yellow-400 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">+</div>
                <div className="bg-white/95 backdrop-blur-md px-10 py-5 rounded-full border-8 border-orange-500 shadow-2xl rotate-[5deg]">
                    <span className="text-4xl font-black text-orange-600 drop-shadow-sm">بدون أنترنيت</span>
                </div>
            </div>

            {/* Bottom Splash Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-[400px] bg-gradient-to-t from-orange-600 via-orange-600/80 to-transparent z-10"></div>

            {/* Bottom Right Delivery */}
            <div className="absolute bottom-[140px] right-[60px] z-20 text-center transform rotate-[-10deg]">
                <h3 className="text-[6rem] font-black text-yellow-400 leading-tight drop-shadow-2xl" style={{ textShadow: '-3px -3px 0 #b45309, 3px -3px 0 #b45309, -3px 3px 0 #b45309, 3px 3px 0 #b45309, 0px 8px 0 #78350f, 0px 15px 25px rgba(0,0,0,0.6)' }}>التوصيل<br/>مجاني</h3>
            </div>

            {/* Bottom Left Gift Box */}
            <div className="absolute bottom-[120px] left-[100px] z-20 drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]">
                <i className="fa-solid fa-gift text-[150px] text-red-600"></i>
            </div>

            {/* Bottom Center WhatsApp */}
            <div className="absolute bottom-[40px] left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center">
                <p className="text-white font-bold text-3xl mb-4 drop-shadow-lg">للتواصل عبر الواتساب أو الهاتف</p>
                <div className="bg-orange-500 rounded-full px-10 py-4 border-8 border-white shadow-2xl flex items-center gap-6">
                    <div className="bg-green-500 rounded-full p-3 border-4 border-white shadow-inner">
                        <i className="fa-brands fa-whatsapp text-white text-6xl"></i>
                    </div>
                    <span className="text-white text-[4rem] font-black tracking-wider leading-none">{phone}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
