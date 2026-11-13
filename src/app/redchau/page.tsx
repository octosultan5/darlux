"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { submitOrder } from "../actions/order";
import { trackPixelEvent } from "../components/PixelEvents";

export default function RedChauPage() {
  const router = useRouter();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000";

  // Selected pack: 1 = 1 piece (129 DH), 2 = 2 pieces (229 DH)
  const [bundle, setBundle] = useState<number>(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);

  const hasTriggeredCheckout = useRef(false);

  const price = bundle === 2 ? 229 : 129;
  const comparePrice = bundle === 2 ? 398 : 199;

  // Track ViewContent on page load
  useEffect(() => {
    trackPixelEvent("ViewContent", {
      content_name: "Réchaud RAF 1500W - ShoopBeam Flow",
      value: 129,
      currency: "MAD",
    });
  }, []);

  const handleInteraction = () => {
    if (!hasTriggeredCheckout.current) {
      hasTriggeredCheckout.current = true;
      trackPixelEvent("InitiateCheckout", {
        currency: "MAD",
        value: price,
      });
    }
  };

  // Moroccan phone validation: starts with 06 or 07, exactly 10 digits
  const cleanPhone = phone.replace(/[\s\-\.]/g, "");
  const isPhoneValid = /^(06|07)\d{8}$/.test(cleanPhone);

  const scrollToCheckout = () => {
    document.getElementById("order-section")?.scrollIntoView({ behavior: "smooth" });
  };

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
      setError("المرجو إدخال المدينة");
      return;
    }

    setIsSubmitting(true);

    try {
      const fullLocation = address.trim() ? `${city.trim()} - ${address.trim()}` : city.trim();

      const result = await submitOrder({
        name: name.trim(),
        phone: cleanPhone,
        city: fullLocation,
        bundle_type: bundle,
        total_price: price,
        has_bump: false,
        product_name: "Réchaud RAF 1500W - Page /redchau",
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
    <div className="min-h-screen bg-[#F4F4F6] text-[#1A1A1A] font-cairo antialiased selection:bg-amber-200" dir="rtl">
      
      {/* 1. TOP ANNOUNCEMENT BAR (ShoopBeam style) */}
      <header className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white text-center py-2.5 px-3 text-xs sm:text-sm font-bold shadow-sm sticky top-0 z-40">
        <div className="flex items-center justify-center gap-2">
          <span>🚚 التوصيل بالمجان فالمغرب كامل والدفع عند استلام طلبيتك</span>
        </div>
      </header>

      {/* MAIN CONTAINER: Centered funnel container (ShoopBeam YouCan style, max-w-[560px] on desktop, 100% on mobile) */}
      <main className="w-full max-w-[560px] mx-auto bg-white min-h-screen shadow-2xl relative pb-28">

        {/* 2. HERO IMAGE (Displayed As-Is, 100% Width Edge-to-Edge) */}
        <div className="w-full relative bg-slate-900 cursor-pointer" onClick={scrollToCheckout}>
          <img
            src="/creatives/hero_offer_129dh.png"
            alt="Réchaud RAF 1500W عرض خاص 129 درهم"
            className="w-full h-auto block"
            loading="eager"
          />
        </div>

        {/* 3. EXPRESS CHECKOUT SECTION (ShoopBeam style dotted border #PBS-qnim9k1632909988068) */}
        <section id="order-section" className="p-3 sm:p-5">
          <div className="border-[3px] border-dotted border-black rounded-[20px] p-4 sm:p-6 bg-white shadow-sm space-y-5">
            
            {/* Header */}
            <div className="text-center space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-black">
                🔥 عرض مؤقت… ما تفوّتوش!
              </h2>
              <p className="text-base sm:text-lg font-bold text-slate-800">
                فقط بـ
              </p>
              
              {/* Product Price Display */}
              <div className="flex items-baseline justify-center gap-3 pt-1">
                <span className="text-4xl sm:text-5xl font-black text-[#FD0404] tracking-tight">
                  {price} <span className="text-2xl font-bold">د.م</span>
                </span>
                <span className="text-lg sm:text-xl text-slate-400 line-through font-semibold">
                  {comparePrice} د.م
                </span>
              </div>
            </div>

            {/* HORIZONTAL PACK SELECTOR (With 1 stove icon vs 2 stoves icon) */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs sm:text-sm font-black text-slate-900 text-center">
                👇 إختر العرض المناسب لك:
              </label>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                
                {/* OPTION 1: 1 PIECE */}
                <button
                  type="button"
                  onClick={() => {
                    setBundle(1);
                    handleInteraction();
                  }}
                  className={`relative p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-between text-center cursor-pointer min-h-[160px] ${
                    bundle === 1
                      ? "border-red-600 bg-red-50/40 shadow-md ring-2 ring-red-400/30"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  {/* Radio Checkmark */}
                  <div className="w-full flex justify-between items-center mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${bundle === 1 ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                      عرض فردي
                    </span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${bundle === 1 ? 'border-red-600 bg-red-600 text-white' : 'border-slate-300'}`}>
                      {bundle === 1 && <i className="fa-solid fa-check text-[10px]" />}
                    </span>
                  </div>

                  {/* 1 Réchaud Stove Icon/Image */}
                  <div className="my-1 flex items-center justify-center h-14">
                    <img
                      src="/creatives/single_rechaud.png"
                      alt="1 ريشو كهربائي"
                      className="h-14 w-auto object-contain drop-shadow-sm"
                    />
                  </div>

                  {/* Details */}
                  <div className="mt-1">
                    <div className="font-black text-sm text-slate-900">قطعة واحدة (1)</div>
                    <div className="text-red-600 font-black text-base">129 د.م</div>
                    <div className="text-[11px] text-emerald-700 font-bold">توصيل مجاني</div>
                  </div>
                </button>

                {/* OPTION 2: 2 PIECES (POPULAR BUNDLE) */}
                <button
                  type="button"
                  onClick={() => {
                    setBundle(2);
                    handleInteraction();
                  }}
                  className={`relative p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-between text-center cursor-pointer min-h-[160px] ${
                    bundle === 2
                      ? "border-red-600 bg-red-50/40 shadow-md ring-2 ring-red-400/30"
                      : "border-slate-200 bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  {/* Top Popular Badge */}
                  <div className="w-full flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500 text-slate-950 shadow-sm animate-pulse">
                      🔥 الأكثر طلباً
                    </span>
                    <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${bundle === 2 ? 'border-red-600 bg-red-600 text-white' : 'border-slate-300'}`}>
                      {bundle === 2 && <i className="fa-solid fa-check text-[10px]" />}
                    </span>
                  </div>

                  {/* 2 Réchaud Stoves Icons/Images Side-by-Side */}
                  <div className="my-1 flex items-center justify-center -space-x-4 rtl:space-x-reverse h-14">
                    <img
                      src="/creatives/single_rechaud.png"
                      alt="ريشو 1"
                      className="h-12 w-auto object-contain drop-shadow-sm rotate-[-6deg]"
                    />
                    <img
                      src="/creatives/single_rechaud.png"
                      alt="ريشو 2"
                      className="h-12 w-auto object-contain drop-shadow-md rotate-[6deg]"
                    />
                  </div>

                  {/* Details */}
                  <div className="mt-1">
                    <div className="font-black text-sm text-slate-900">قطعتين (2)</div>
                    <div className="text-red-600 font-black text-base">229 د.م</div>
                    <div className="text-[10px] text-amber-700 font-black bg-amber-100/70 px-1.5 py-0.5 rounded">
                      وفر 29 د.م + شحن مجاني
                    </div>
                  </div>
                </button>

              </div>
            </div>

            {/* FORM INPUTS */}
            <form onSubmit={handleSubmit} className="space-y-3.5 pt-2">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  الاسم الكامل (الاسم والنسب) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                    <i className="fa-regular fa-user" />
                  </span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      handleInteraction();
                    }}
                    placeholder="أدخل اسمك الكامل"
                    className="w-full pr-10 pl-3 py-3 border border-slate-300 rounded-xl focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none text-slate-900 text-sm transition-all bg-white"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    رقم الهاتف <span className="text-red-500">*</span>
                  </label>
                  <span className="text-[11px] text-slate-400">مثال: 0612345678</span>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                    <i className="fa-solid fa-phone" />
                  </span>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onFocus={handleInteraction}
                    onBlur={() => setPhoneTouched(true)}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      handleInteraction();
                    }}
                    placeholder="06XXXXXXXX أو 07XXXXXXXX"
                    className={`w-full pr-10 pl-3 py-3 border rounded-xl outline-none text-slate-900 text-sm transition-all bg-white ${
                      phoneTouched && !isPhoneValid
                        ? "border-red-500 ring-2 ring-red-100"
                        : "border-slate-300 focus:border-red-600 focus:ring-2 focus:ring-red-100"
                    }`}
                  />
                </div>
                {phoneTouched && !isPhoneValid && (
                  <p className="text-[11px] text-red-600 mt-1 font-semibold flex items-center gap-1">
                    <i className="fa-solid fa-circle-exclamation" />
                    <span>يجب أن يتكون رقم الهاتف من 10 أرقام ويبدأ بـ 06 أو 07</span>
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  المدينة <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                    <i className="fa-solid fa-location-dot" />
                  </span>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      handleInteraction();
                    }}
                    placeholder="مدينتك (مثال: الدار البيضاء، مراكش، طنجة...)"
                    className="w-full pr-10 pl-3 py-3 border border-slate-300 rounded-xl focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none text-slate-900 text-sm transition-all bg-white"
                  />
                </div>
              </div>

              {/* Detailed Address */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  العنوان أو الحي بالتفصيل <span className="text-slate-400 font-normal">(لتسهيل وصول الموزع)</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                    <i className="fa-regular fa-building" />
                  </span>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      handleInteraction();
                    }}
                    placeholder="الحي، رقم المنزل أو الشارع"
                    className="w-full pr-10 pl-3 py-3 border border-slate-300 rounded-xl focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none text-slate-900 text-sm transition-all bg-white"
                  />
                </div>
              </div>

              {/* Error Message if any */}
              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                  <i className="fa-solid fa-triangle-exclamation text-red-500 text-sm" />
                  <span>{error}</span>
                </div>
              )}

              {/* Big Green Confirm CTA Button (ShoopBeam style #1DAD0D) */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-[#1DAD0D] hover:bg-[#169b0b] active:scale-[0.98] text-white font-black text-lg sm:text-xl rounded-2xl shadow-[0_6px_20px_rgba(29,173,13,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin text-xl" />
                    <span>جارٍ تأكيد طلبك...</span>
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-truck-fast text-xl" />
                    <span>إضغط هنا لتأكيد الطلب</span>
                  </>
                )}
              </button>

            </form>

            {/* Trust checkmarks under form */}
            <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-1 text-center text-[10px] sm:text-[11px] text-slate-600 font-bold">
              <div className="flex flex-col items-center gap-1">
                <i className="fa-solid fa-shield-halved text-emerald-600 text-sm" />
                <span>ضمان الجودة 100%</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <i className="fa-solid fa-hand-holding-dollar text-emerald-600 text-sm" />
                <span>الدفع عند الاستلام</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <i className="fa-solid fa-truck text-emerald-600 text-sm" />
                <span>توصيل مجاني وسريع</span>
              </div>
            </div>

          </div>
        </section>

        {/* 4. BENEFIT SLICE 1: TURBO BOILING SPEED 1500W (Full Width As-Is) */}
        <section className="w-full relative mt-4 cursor-pointer" onClick={scrollToCheckout}>
          <img
            src="/creatives/turbo_boil.png"
            alt="سرعة الغليان الفائقة 1500 واط غليان في 3 دقائق"
            className="w-full h-auto block"
            loading="lazy"
          />
        </section>

        {/* 5. BENEFIT SLICE 2: MOTHER KITCHEN RELIEF (Full Width As-Is) */}
        <section className="w-full relative cursor-pointer" onClick={scrollToCheckout}>
          <img
            src="/creatives/mother_kitchen_relief.png"
            alt="راحة الوالدة بدون ثقل البوطة والغاز"
            className="w-full h-auto block"
            loading="lazy"
          />
        </section>

        {/* 6. BENEFIT SLICE 3: FAMILY TAJINE FEAST (Full Width As-Is) */}
        <section className="w-full relative cursor-pointer" onClick={scrollToCheckout}>
          <img
            src="/creatives/family_tajine_feast.png"
            alt="طاجين مغربي ساخن ومذاق أصيل مباشرة فوق المائدة"
            className="w-full h-auto block"
            loading="lazy"
          />
        </section>

        {/* 7. CUSTOMER REVIEWS SECTION (Exact ShoopBeam Title & Stars) */}
        <section className="py-6 px-3 sm:px-5 bg-white border-t border-slate-100">
          <div className="text-center space-y-1 mb-6">
            <h2 className="text-2xl sm:text-3xl font-black text-black">
              بعض آراء زبنائنا
            </h2>
            <div className="flex items-center justify-center gap-1 text-amber-400 text-xl">
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
              <span>⭐</span>
            </div>
            <p className="text-xs text-slate-500 font-bold">
              تقييم 4.9 من 5 (أكثر من 1,480 زبون راضٍ في جميع أنحاء المغرب)
            </p>
          </div>

          {/* Authentic Moroccan WhatsApp Testimonial Cards */}
          <div className="space-y-3">
            
            {/* Review 1 */}
            <div className="bg-[#F0FDF4] border border-emerald-200/80 rounded-2xl p-4 shadow-sm text-right space-y-2">
              <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    ف.ز
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">فاطمة الزهراء ع.</h4>
                    <span className="text-[10px] text-slate-500">الدار البيضاء (زبون مؤكد ✔️)</span>
                  </div>
                </div>
                <div className="text-amber-400 text-xs">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                &ldquo;سلام عليكم ختي، وصلني الريشو اليوم فـ الصباح وجربتو دغيا. تبارك الله سخونية مجهدة كيسخن الما فـ 3 دقايق وطيبت بيه الغدا دغيا. شكرا بزاف على المعاملة النقية والتوصيل فـ وقتو.&rdquo;
              </p>
            </div>

            {/* Review 2 */}
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 shadow-sm text-right space-y-2">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-xs">
                    م.س
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">سي محمد السوسي</h4>
                    <span className="text-[10px] text-slate-500">مراكش (زبون مؤكد ✔️)</span>
                  </div>
                </div>
                <div className="text-amber-400 text-xs">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                &ldquo;خديت الباك ديال 2 قطع، واحد درتو فـ المكتب والتاني ديتو للوالدة. عجبها بزااف وخفيف ومامعذبش فـ الهزان بحال البوطة. سلعة كاليتي ناضية والله يرحم الوالدين.&rdquo;
              </p>
            </div>

            {/* Review 3 */}
            <div className="bg-[#F0FDF4] border border-emerald-200/80 rounded-2xl p-4 shadow-sm text-right space-y-2">
              <div className="flex justify-between items-center border-b border-emerald-100 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    ر.ب
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">رشيد بناني</h4>
                    <span className="text-[10px] text-slate-500">طنجة (زبون مؤكد ✔️)</span>
                  </div>
                </div>
                <div className="text-amber-400 text-xs">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                &ldquo;التوصيل جا فـ 24 ساعة بالضبط. جربت طيبت بيه الطاجين فوق الطبلة كيبقى سخون ولديد، واستهلاك الضو قليل بفضل الترموستات كيطفى ملي كيسخن. كنصح بيه أي واحد.&rdquo;
              </p>
            </div>

            {/* Review 4 */}
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 shadow-sm text-right space-y-2">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-xs">
                    ح.م
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">حبيبة مكناسي</h4>
                    <span className="text-[10px] text-slate-500">مكناس (زبون مؤكد ✔️)</span>
                  </div>
                </div>
                <div className="text-amber-400 text-xs">⭐⭐⭐⭐⭐</div>
              </div>
              <p className="text-xs text-slate-800 leading-relaxed font-medium">
                &ldquo;والله حتى عتقني شحال من مرة فاش كتسالي البوطة فـ نص الطياب. كنسخنو بيه المسمن ونطيبو بيه القهوة فـ ثواني. شكرا متجر دالكس على المصداقية.&rdquo;
              </p>
            </div>

          </div>
        </section>

        {/* 8. BOTTOM TRUST BADGES BANNER (ShoopBeam final section) */}
        <section className="p-4 bg-slate-900 text-white text-center space-y-3 mt-4">
          <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center text-2xl">
            <i className="fa-solid fa-award" />
          </div>
          <h3 className="text-lg font-black">ضمان الجودة ورضا الزبون 100%</h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto font-medium">
            نحن نضمن لك منتجاً أصلياً يطابق الصور والمواصفات المذكورة، مع إمكانية تفقد المنتج قبل دفع ثمنه عند الاستلام.
          </p>
          <div className="pt-2">
            <button
              onClick={scrollToCheckout}
              className="py-3 px-8 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm rounded-xl shadow-lg transition-all cursor-pointer"
            >
              اطلب الآن بـ 129 درهم فقط 🛒
            </button>
          </div>
        </section>

      </main>

      {/* 9. FLOATING STICKY CTA BUTTON (ShoopBeam Style with bounce animation) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_25px_rgba(0,0,0,0.1)]">
        <div className="max-w-[560px] mx-auto flex items-center gap-3">
          
          {/* Price Quick Info */}
          <div className="text-right shrink-0">
            <div className="text-[10px] text-slate-500 font-bold">السعر الحالي</div>
            <div className="text-lg sm:text-xl font-black text-[#FD0404]">
              {price} <span className="text-xs font-bold">د.م</span>
            </div>
          </div>

          {/* Main Action Button */}
          <button
            onClick={scrollToCheckout}
            className="flex-1 py-3.5 px-4 bg-[#A58945] hover:bg-[#8e7539] active:scale-[0.98] text-white font-black text-base sm:text-lg rounded-full shadow-[0_4px_15px_rgba(165,137,69,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse"
          >
            <span>إشتري الآن</span>
            <i className="fa-solid fa-arrow-up text-sm" />
          </button>

          {/* Quick WhatsApp Support */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("سلام، بغيت نسول على ريشو كهربائي RAF 1500W بـ 129 درهم")}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="تواصل واتساب"
            className="w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-md transition-all shrink-0"
          >
            <i className="fa-brands fa-whatsapp text-2xl" />
          </a>

        </div>
      </div>

    </div>
  );
}
