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
  title = "أدخل معلوماتك للحصول على العرض",
  subtitle = "الدفع نقداً بعد استلام ومعاينة المنتج بالكامل",
}: OrderFormProps) {
  const router = useRouter();

  const [bundle, setBundle] = useState<number>(1);
  const [orderBump, setOrderBump] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const hasTriggeredCheckout = useRef(false);

  const calculatePrice = () => {
    let p = bundle === 2 ? 229 : 129;
    if (orderBump) p += 59;
    return p;
  };

  const price = calculatePrice();

  const handleInteraction = () => {
    if (!hasTriggeredCheckout.current) {
      hasTriggeredCheckout.current = true;
      trackPixelEvent("InitiateCheckout", {
        currency: "MAD",
        value: calculatePrice(),
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
      className="bg-white p-5 sm:p-7 rounded-3xl border-2 border-amber-400 shadow-xl space-y-5 relative text-right rtl my-6"
    >
      {/* Top Form Banner */}
      <div className="text-center border-b border-slate-100 pb-4">
        <span className="inline-block bg-amber-500 text-slate-950 font-black text-xs px-3.5 py-1 rounded-full shadow-sm mb-2">
          ⚡ إستمارة الطلب السريع
        </span>
        <h3 className="text-xl sm:text-2xl font-black text-slate-900">{title}</h3>
        <p className="text-xs text-slate-500 font-medium mt-1">{subtitle}</p>
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
                ? "border-amber-500 bg-amber-50/60 shadow-sm"
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
                <h4 className="font-black text-sm text-slate-900">1x ريشو كهربائي RAF 1500W</h4>
                <span className="text-[11px] text-slate-500 font-bold block">
                  توصيل مجاني فابور لجميع المدن 🚚
                </span>
              </div>
            </div>
            <div className="text-left font-mono">
              <span className="line-through text-[11px] text-slate-400 font-bold block">249 د.م</span>
              <span className="text-lg font-black text-amber-600">129 د.م</span>
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
                ? "border-emerald-500 bg-emerald-50/70 shadow-sm"
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
                <h4 className="font-black text-sm text-slate-900">2x ريشو 1500W (حبتين)</h4>
                <span className="text-[11px] text-emerald-700 font-bold block">
                  توفير إضافي 29 درهم + توصيل فابور بالمجان
                </span>
              </div>
            </div>
            <div className="text-left font-mono">
              <span className="line-through text-[11px] text-slate-400 font-bold block">498 د.م</span>
              <span className="text-lg font-black text-emerald-600">229 د.م</span>
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
            <span className="text-slate-500 text-[11px] block">
              مقلاة ملائمة تماماً للريشو وقلي البيض والوجبات السريعة.
            </span>
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

        {/* Red Phone Verification Notice */}
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
  );
}
