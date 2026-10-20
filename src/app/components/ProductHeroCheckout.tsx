"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { submitOrder } from "../actions/order";
import { trackPixelEvent } from "./PixelEvents";

export default function ProductHeroCheckout() {
  const router = useRouter();

  // Gallery state
  const images = [
    { src: "/solero/hero_banner.jpg", title: "ريشو كهربائي عملي وأصلي RAF 1000W" },
    { src: "/solero/gas_banner.jpg", title: "ودع غلاء ومشاكل البوطا واقتصاد 40%" },
    { src: "/solero/solero.jpg", title: "تصميم متين من الستانلس ستيل المقاوم للصدأ" },
    { src: "/solero/He9e36218ab68467bae1f5a9a224ef20fS.jpg", title: "غليان سريع فـ أقل من 5 دقائق" },
  ];
  const [selectedImage, setSelectedImage] = useState(0);

  // Order state
  const [bundle, setBundle] = useState<number>(1);
  const [orderBump, setOrderBump] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Pixel trigger tracking flag (fires InitiateCheckout only once per session)
  const hasTriggeredCheckout = useRef(false);

  const handleInteraction = () => {
    if (!hasTriggeredCheckout.current) {
      hasTriggeredCheckout.current = true;
      trackPixelEvent("InitiateCheckout", {
        currency: "MAD",
        value: calculatePrice(),
      });
    }
  };

  const calculatePrice = () => {
    let p = bundle === 2 ? 299 : 169;
    if (orderBump) p += 59;
    return p;
  };

  const price = calculatePrice();

  // Validate Moroccan phone: starts with 06 or 07, exactly 10 digits
  const cleanPhone = phone.replace(/\s/g, "");
  const isPhoneValid = /^(06|07)\d{8}$/.test(cleanPhone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isPhoneValid) {
      setError("المرجو إدخال رقم هاتف صحيح يتكون من 10 أرقام ويبدأ بـ 06 أو 07");
      return;
    }

    if (!name.trim()) {
      setError("المرجو إدخال الاسم الكامل");
      return;
    }

    if (!city.trim()) {
      setError("المرجو إدخال المدينة والعنوان");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitOrder({
        name,
        phone: cleanPhone,
        city,
        bundle_type: bundle,
        total_price: price,
        has_bump: orderBump,
        product_name: "Réchaud Électrique RAF 1000W - DarLux",
      });

      if (!result.success) {
        setError(result.error || "حدث خطأ أثناء تسجيل الطلب، المرجو المحاولة مجدداً.");
        setIsSubmitting(false);
        return;
      }

      router.push("/thank-you");
    } catch (err) {
      console.error(err);
      setError("حدث خطأ غير متوقع. المرجو المحاولة مرة أخرى.");
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-6 sm:py-10 bg-slate-50 rtl text-slate-900" id="order-form">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* Urgency Alert Notice (Competitor Winning Hook) */}
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border-2 border-red-300 text-red-700 flex items-center gap-3 text-center sm:text-right shadow-sm">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-600 text-lg font-black">
            ⚠️
          </div>
          <div className="flex-1">
            <span className="font-black text-sm sm:text-base block">
              هام جداً: هذا العرض الترويجي لن يتكرر!
            </span>
            <span className="text-xs sm:text-sm text-red-600 font-semibold">
              الكمية المتوفرة بسعر التخفيض محدودة جداً في المستودع وسيتم إغلاق العرض فور نفاد المخزون.
            </span>
          </div>
        </div>

        {/* Two-Column Grid: Visuals on Left (in RTL right), Order Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Product Gallery & Highlights (7 Cols) */}
          <div className="lg:col-span-7 bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            
            {/* Main Interactive Product Image */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-inner group">
              <img
                src={images[selectedImage].src}
                alt={images[selectedImage].title}
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3 bg-red-600 text-white font-black text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <span>خصم 43%</span>
              </div>
              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-sm text-amber-300 font-bold text-xs px-3 py-1 rounded-lg">
                {images[selectedImage].title}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-amber-500 ring-2 ring-amber-400/30 scale-95"
                      : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Product Title & Reviews */}
            <div className="border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-400 text-sm">
                  {"★★★★★"}
                </div>
                <span className="text-xs font-black text-slate-700">4.9 / 5</span>
                <span className="text-xs text-slate-400">(أكثر من 1,480 تقييم بالمغرب)</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                ريشو كهربائي عملي وأصلي <span className="text-amber-600">RAF 1000W</span>
              </h1>
              <p className="text-sm text-slate-600 mt-1 font-medium">
                بلاكة الطهي والتسخين السريعة - بديل البوطة الذكي، سخونية فورية واقتصاد 40% فـ الطاقة.
              </p>
            </div>

            {/* Price Box */}
            <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-xs text-slate-400 line-through block font-bold">299 درهم</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-slate-950 font-mono">169</span>
                  <span className="text-base font-black text-amber-700">درهم مغربي</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="bg-emerald-600 text-white text-xs font-black px-3 py-1 rounded-full shadow-sm">
                  توصيل فابور 100% 🚚
                </span>
                <span className="text-[11px] font-bold text-amber-800">
                  الدفع بعد المعاينة عند الاستلام 🤝
                </span>
              </div>
            </div>

            {/* Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs sm:text-sm font-bold text-slate-700">
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <i className="fa-solid fa-bolt text-amber-500 text-base" />
                <span>حرارة فورية بقوة 1000W مع ترموستات ذكي</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <i className="fa-solid fa-piggy-bank text-emerald-500 text-base" />
                <span>اقتصاد 40% فـ فاتورة الطاقة مقارنة بالبوطا</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <i className="fa-solid fa-utensils text-orange-500 text-base" />
                <span>متعدد الاستعمالات: أتاي، قهوة، مقليات، وشوربة</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <i className="fa-solid fa-shield-halved text-blue-500 text-base" />
                <span>هيكل متين مقاوم للصدأ مع نظام أمان متطور</span>
              </div>
            </div>

          </div>

          {/* High-Converting Order Form Card (5 Cols) */}
          <div className="lg:col-span-5 bg-white p-5 sm:p-7 rounded-3xl border-2 border-amber-400 shadow-xl space-y-5 relative">
            
            {/* Top Form Banner */}
            <div className="text-center border-b border-slate-100 pb-4">
              <span className="inline-block bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-sm mb-2">
                ⚡ إستمارة الطلب السريع
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                أدخل معلوماتك للحصول على العرض
              </h2>
              <p className="text-xs text-slate-500 font-medium mt-1">
                الدفع نقداً بعد استلام ومعاينة المنتج بالكامل
              </p>
            </div>

            {/* Step 1: Pack Selection */}
            <div>
              <label className="block text-xs font-black text-slate-800 mb-2">
                1. اختر العرض المناسب لك:
              </label>

              <div className="space-y-2.5">
                {/* 1 Piece */}
                <div
                  onClick={() => {
                    setBundle(1);
                    handleInteraction();
                  }}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                    bundle === 1
                      ? "border-amber-500 bg-amber-50/50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        bundle === 1 ? "border-amber-500" : "border-slate-300"
                      }`}
                    >
                      {bundle === 1 && <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-slate-900">1x ريشو كهربائي RAF</h3>
                      <span className="text-[11px] text-slate-500 font-bold block">توصيل مجاني 🚚</span>
                    </div>
                  </div>
                  <div className="text-left font-mono">
                    <span className="line-through text-[11px] text-slate-400 font-bold block">299 د.م</span>
                    <span className="text-lg font-black text-amber-600">169 د.م</span>
                  </div>
                </div>

                {/* 2 Pieces (Best Value) */}
                <div
                  onClick={() => {
                    setBundle(2);
                    handleInteraction();
                  }}
                  className={`relative p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center ${
                    bundle === 2
                      ? "border-emerald-500 bg-emerald-50/60 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  }`}
                >
                  <div className="absolute -top-2.5 right-4 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-sm">
                    العرض الأكثر طلباً ⭐
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        bundle === 2 ? "border-emerald-600" : "border-slate-300"
                      }`}
                    >
                      {bundle === 2 && <div className="w-2.5 h-2.5 rounded-full bg-emerald-600" />}
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-slate-900">2x ريشو كهربائي (حبتين)</h3>
                      <span className="text-[11px] text-emerald-700 font-bold block">توفير إضافي 39 درهم + توصيل فابور</span>
                    </div>
                  </div>
                  <div className="text-left font-mono">
                    <span className="line-through text-[11px] text-slate-400 font-bold block">598 د.م</span>
                    <span className="text-lg font-black text-emerald-600">299 د.م</span>
                  </div>
                </div>
              </div>

              {/* Order Bump (Optional non-stick pan) */}
              <div
                onClick={() => {
                  setOrderBump(!orderBump);
                  handleInteraction();
                }}
                className={`mt-3 p-3 rounded-xl border-2 transition-all cursor-pointer flex gap-3 items-center ${
                  orderBump
                    ? "border-amber-500 bg-amber-50/40"
                    : "border-dashed border-slate-300 bg-slate-50 hover:border-slate-400"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                    orderBump ? "bg-amber-500 text-white" : "border border-slate-400 bg-white"
                  }`}
                >
                  {orderBump && <i className="fa-solid fa-check text-xs" />}
                </div>
                <div className="text-xs">
                  <span className="font-black text-slate-900 block">
                    إضافة مقلاة غير لاصقة بـ <span className="text-amber-600">+59 د.م فقط</span>
                  </span>
                  <span className="text-slate-500 text-[11px] block">مقلاة ملائمة تماماً للريشو وقلي البيض السريع.</span>
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <label className="block text-xs font-black text-slate-800">
                2. أدخل معلومات التوصيل:
              </label>

              {error && (
                <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-3 text-xs font-bold flex items-center gap-2">
                  <i className="fa-solid fa-circle-exclamation text-base" />
                  <span>{error}</span>
                </div>
              )}

              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="الاسم والنسب الكامل *"
                  required
                  value={name}
                  onFocus={handleInteraction}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl px-3.5 py-3 text-sm focus:outline-none transition-all font-semibold text-slate-900 placeholder:text-slate-400 shadow-inner"
                />
              </div>

              {/* Phone */}
              <div className="relative">
                <input
                  type="tel"
                  placeholder="رقم الهاتف (06/07XXXXXXXX) *"
                  dir="ltr"
                  required
                  value={phone}
                  onFocus={handleInteraction}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full bg-slate-50 border-2 focus:bg-white rounded-xl px-3.5 py-3 text-sm focus:outline-none text-right transition-all font-semibold text-slate-900 placeholder:text-slate-400 shadow-inner ${
                    phone.length >= 10
                      ? isPhoneValid
                        ? "border-emerald-500 focus:border-emerald-500"
                        : "border-red-500 focus:border-red-500"
                      : "border-slate-200 focus:border-amber-500"
                  }`}
                />
                {phone.length >= 10 && (
                  <div className="absolute left-3 top-3.5 text-xs font-bold">
                    {isPhoneValid ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <i className="fa-solid fa-circle-check" /> صحيح
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center gap-1">
                        <i className="fa-solid fa-circle-xmark" /> غير صالح
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* City */}
              <div>
                <input
                  type="text"
                  placeholder="المدينة والعنوان بالكامل *"
                  required
                  value={city}
                  onFocus={handleInteraction}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl px-3.5 py-3 text-sm focus:outline-none transition-all font-semibold text-slate-900 placeholder:text-slate-400 shadow-inner"
                />
              </div>

              {/* Competitor Red Phone Reminder Notice */}
              <div className="bg-red-50/80 border border-red-200 p-2.5 rounded-xl text-center">
                <p className="text-[11px] font-black text-red-600">
                  🔴 المرجو التأكد من صحة رقم الهاتف لكي يتصل بكم موزع التوصيل لتأكيد موعد الاستلام.
                </p>
              </div>

              {/* Price Summary */}
              <div className="flex justify-between items-center px-1 pt-1">
                <span className="text-xs font-bold text-slate-500">المجموع المطلوب للدفع:</span>
                <span className="text-2xl font-black text-slate-900 font-mono">
                  {price} <span className="text-sm font-bold text-slate-600">درهم</span>
                </span>
              </div>

              {/* Big Pulsing CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-95 text-white text-base sm:text-lg py-4 rounded-2xl font-black shadow-[0_10px_25px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 animate-pulse hover:animate-none"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <i className="fa-solid fa-spinner animate-spin" /> جاري تسجيل طلبك...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span>إستفد من العرض والخصم الآن ({price} د.م)</span>
                    <i className="fa-solid fa-arrow-left" />
                  </span>
                )}
              </button>

              {/* Trust assurances under button */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] font-black text-slate-500 text-center">
                <span className="flex flex-col items-center gap-1">
                  <i className="fa-solid fa-truck text-emerald-600 text-xs" />
                  توصيل فابور بالمجان
                </span>
                <span className="flex flex-col items-center gap-1">
                  <i className="fa-solid fa-handshake text-amber-600 text-xs" />
                  الدفع بعد المعاينة
                </span>
                <span className="flex flex-col items-center gap-1">
                  <i className="fa-solid fa-shield-halved text-blue-600 text-xs" />
                  ضمان الجودة 100%
                </span>
              </div>
            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
