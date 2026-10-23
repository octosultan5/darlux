"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { submitOrder } from "../actions/order";
import { trackPixelEvent } from "./PixelEvents";

interface OrderFormProps {
  id?: string;
  title?: string;
  subtitle?: string;
}

export default function OrderForm({
  id = "order-form",
  title = "إستمارة الطلب السريع (الدفع عند الاستلام)",
  subtitle = "أدخل معلوماتك وسيتصل بك موزع التوصيل لتأكيد الطلب وتحديد موعد التسليم",
}: OrderFormProps) {
  const router = useRouter();

  const [bundle, setBundle] = useState<number>(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const hasTriggeredCheckout = useRef(false);

  const price = bundle === 2 ? 229 : 129;

  const handleInteraction = () => {
    if (!hasTriggeredCheckout.current) {
      hasTriggeredCheckout.current = true;
      trackPixelEvent("InitiateCheckout", {
        currency: "MAD",
        value: price,
      });
    }
  };

  // Validate Moroccan phone: starts with 06 or 07, exactly 10 digits
  const cleanPhone = phone.replace(/\s/g, "");
  const isPhoneValid = /^(06|07)\d{8}$/.test(cleanPhone);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isPhoneValid) {
      setError("المرجو إدخال رقم هاتف مغربي صحيح يتكون من 10 أرقام ويبدأ بـ 06 أو 07");
      return;
    }

    if (!name.trim()) {
      setError("المرجو إدخال الاسم والنسب الكامل");
      return;
    }

    if (!city.trim()) {
      setError("المرجو إدخال المدينة والعنوان بالتفصيل");
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
        has_bump: false,
        product_name: "Réchaud Électrique RAF 1500W - DarLux",
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
    <div
      id={id}
      className="bg-white p-5 sm:p-8 rounded-3xl border-2 border-amber-400 shadow-2xl space-y-6 relative text-right rtl my-6"
    >
      {/* Header with Urgency Stock Indicator */}
      <div className="text-center border-b border-slate-100 pb-5">
        <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 font-black text-xs px-3.5 py-1.5 rounded-full shadow-sm mb-2.5 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-red-500"></span>
          <span>🔥 متبقي 6 قطع فقط بسعر 129 درهم في المستودع</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">{title}</h3>
        <p className="text-xs text-slate-500 font-medium mt-1">{subtitle}</p>
      </div>

      {/* Step 1: Pack Selection (Cleaner, more distinct visual cards) */}
      <div>
        <label className="block text-xs sm:text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-black">1</span>
          <span>اختر العرض المناسب لك:</span>
        </label>

        <div className="space-y-3">
          {/* 1 Piece */}
          <div
            onClick={() => {
              setBundle(1);
              handleInteraction();
            }}
            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center ${
              bundle === 1
                ? "border-amber-500 bg-amber-50/70 shadow-md ring-2 ring-amber-400/20"
                : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  bundle === 1 ? "border-amber-500 bg-white" : "border-slate-300 bg-white"
                }`}
              >
                {bundle === 1 && <div className="w-3 h-3 rounded-full bg-amber-500" />}
              </div>
              <div>
                <h4 className="font-black text-sm sm:text-base text-slate-900">
                  1x ريشو كهربائي RAF 1500W
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                    توصيل مجاني فابور 🚚
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold">استعمال فردي أو عائلي</span>
                </div>
              </div>
            </div>
            <div className="text-left font-mono shrink-0 pl-1">
              <span className="line-through text-xs text-slate-400 font-bold block">249 د.م</span>
              <span className="text-xl font-black text-amber-600">129 د.م</span>
            </div>
          </div>

          {/* 2 Pieces (Best Value) */}
          <div
            onClick={() => {
              setBundle(2);
              handleInteraction();
            }}
            className={`relative p-4 rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center ${
              bundle === 2
                ? "border-emerald-500 bg-emerald-50/80 shadow-md ring-2 ring-emerald-400/20"
                : "border-slate-200 bg-slate-50/50 hover:border-slate-300 hover:bg-white"
            }`}
          >
            <div className="absolute -top-3 right-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-[11px] font-black px-3.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
              <span>🌟 العرض الأكثر طلباً وتوفيراً</span>
            </div>
            <div className="flex items-center gap-3.5">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  bundle === 2 ? "border-emerald-600 bg-white" : "border-slate-300 bg-white"
                }`}
              >
                {bundle === 2 && <div className="w-3 h-3 rounded-full bg-emerald-600" />}
              </div>
              <div>
                <h4 className="font-black text-sm sm:text-base text-slate-900">
                  2x ريشو 1500W (حبتين)
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                    وفر 29 درهم إضافية 💰
                  </span>
                  <span className="text-[11px] font-bold text-slate-600">توصيل مجاني فابور 🚚</span>
                </div>
              </div>
            </div>
            <div className="text-left font-mono shrink-0 pl-1">
              <span className="line-through text-xs text-slate-400 font-bold block">498 د.م</span>
              <span className="text-xl font-black text-emerald-600">229 د.م</span>
            </div>
          </div>
        </div>
      </div>

      {/* Step 2: Shipping Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-black">2</span>
          <span>أدخل معلومات التوصيل:</span>
        </label>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-3.5 text-xs font-bold flex items-center gap-2.5 shadow-sm">
            <i className="fa-solid fa-circle-exclamation text-base shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            الاسم والنسب الكامل <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="مثال: كريم بناني"
              required
              value={name}
              onFocus={handleInteraction}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all font-semibold text-slate-900 placeholder:text-slate-400 shadow-inner"
            />
            <span className="absolute left-3.5 top-3.5 text-slate-400 text-sm">
              <i className="fa-solid fa-user" />
            </span>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            رقم الهاتف <span className="text-red-500">*</span> <span className="text-[11px] text-slate-500 font-normal">(مكالمات أو واتساب)</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              placeholder="06XXXXXXXX أو 07XXXXXXXX"
              dir="ltr"
              required
              value={phone}
              onFocus={handleInteraction}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full bg-slate-50 border-2 focus:bg-white rounded-xl px-4 py-3.5 text-sm focus:outline-none text-right transition-all font-semibold text-slate-900 placeholder:text-slate-400 shadow-inner ${
                phone.length >= 10
                  ? isPhoneValid
                    ? "border-emerald-500 focus:border-emerald-500 bg-emerald-50/20"
                    : "border-red-500 focus:border-red-500 bg-red-50/20"
                  : "border-slate-200 focus:border-amber-500"
              }`}
            />
            <span className="absolute left-3.5 top-3.5 text-sm">
              {phone.length >= 10 ? (
                isPhoneValid ? (
                  <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                    <i className="fa-solid fa-circle-check text-sm" /> صحيح
                  </span>
                ) : (
                  <span className="text-red-500 font-bold text-xs flex items-center gap-1">
                    <i className="fa-solid fa-circle-xmark text-sm" /> غير صالح
                  </span>
                )
              ) : (
                <i className="fa-solid fa-phone text-slate-400" />
              )}
            </span>
          </div>
        </div>

        {/* City & Address */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            المدينة والعنوان بالكامل <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="مثال: الدار البيضاء، حي المعاريف، زنقة..."
              required
              value={city}
              onFocus={handleInteraction}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-slate-50 border-2 border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-3.5 text-sm focus:outline-none transition-all font-semibold text-slate-900 placeholder:text-slate-400 shadow-inner"
            />
            <span className="absolute left-3.5 top-3.5 text-slate-400 text-sm">
              <i className="fa-solid fa-location-dot" />
            </span>
          </div>
        </div>

        {/* Competitor Red Phone Notice */}
        <div className="bg-red-50 border border-red-200 p-3 rounded-xl text-center">
          <p className="text-xs font-black text-red-600 flex items-center justify-center gap-1.5">
            <i className="fa-solid fa-triangle-exclamation" />
            <span>المرجو التأكد من صحة رقم الهاتف ليتصل بكم الموزع لتأكيد موعد التسليم.</span>
          </p>
        </div>

        {/* Order Summary Box */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs font-bold">
          <div className="flex justify-between text-slate-600">
            <span>المنتج:</span>
            <span>ريشو كهربائي RAF 1500W ({bundle === 2 ? "حبتين" : "1 حبة"})</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>مصاريف التوصيل:</span>
            <span className="text-emerald-600 font-black">مجاني 100% (0 د.م)</span>
          </div>
          <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-slate-900">
            <span className="text-sm font-black">المجموع للدفع عند الاستلام:</span>
            <div className="text-left font-mono">
              <span className="text-2xl font-black text-amber-600">{price}</span>
              <span className="text-xs font-bold text-slate-600 mr-1">درهم مغربي</span>
            </div>
          </div>
        </div>

        {/* Big Pulsing High-Converting CTA Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-95 text-white text-base sm:text-xl py-4 sm:py-5 rounded-2xl font-black shadow-[0_10px_25px_rgba(16,185,129,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 animate-pulse hover:animate-none"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-spinner animate-spin" /> جاري تسجيل طلبك...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <span>إضغط هنا لإتمام الطلب بـ {price} درهم</span>
              <i className="fa-solid fa-cart-check text-xl mr-1" />
            </span>
          )}
        </button>

        {/* Trust Assurances Under Button */}
        <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] sm:text-xs font-black text-slate-500 text-center">
          <span className="flex flex-col sm:flex-row items-center justify-center gap-1 bg-slate-50 py-2 px-1 rounded-xl border border-slate-200">
            <i className="fa-solid fa-truck text-emerald-600 text-sm" />
            <span>توصيل فابور مجاني</span>
          </span>
          <span className="flex flex-col sm:flex-row items-center justify-center gap-1 bg-slate-50 py-2 px-1 rounded-xl border border-slate-200">
            <i className="fa-solid fa-handshake text-amber-600 text-sm" />
            <span>الدفع عند المعاينة</span>
          </span>
          <span className="flex flex-col sm:flex-row items-center justify-center gap-1 bg-slate-50 py-2 px-1 rounded-xl border border-slate-200">
            <i className="fa-solid fa-shield-halved text-blue-600 text-sm" />
            <span>ضمان الجودة 100%</span>
          </span>
        </div>
      </form>
    </div>
  );
}
