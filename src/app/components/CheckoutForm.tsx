"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { submitOrder } from "../actions/order";

export default function CheckoutForm({ id = "checkout" }: { id?: string }) {
    const router = useRouter();
    const [bundle, setBundle] = useState<number>(1);
    const [orderBump, setOrderBump] = useState<boolean>(false);
    
    // Countdown Timer (14 mins 59 secs)
    const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { minutes: prev.minutes - 1, seconds: 59 };
                }
                return prev;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Pricing logic: 149 DH single USB
    let price = 149;
    if (bundle === 1) price = 149;
    if (bundle === 2) price = 249;
    if (bundle === 3) price = 349;
    if (orderBump) price += 49;

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const cleanPhone = phone.replace(/\s/g, "");
        if (!/^(06|07)\d{8}$/.test(cleanPhone)) {
            setError("المرجو إدخال رقم هاتف صحيح يتكون من 10 أرقام ويبدأ بـ 06 أو 07");
            return;
        }

        setIsSubmitting(true);

        try {
            let finalPrice = 149;
            if (bundle === 1) finalPrice = 149;
            if (bundle === 2) finalPrice = 249;
            if (bundle === 3) finalPrice = 349;
            if (orderBump) finalPrice += 49;

            const result = await submitOrder({
                name,
                phone: cleanPhone,
                city,
                bundle_type: bundle,
                total_price: finalPrice,
                has_bump: orderBump
            });

            if (!result.success) {
                setError(result.error || "حدث خطأ غير متوقع.");
                setIsSubmitting(false);
                return;
            }

            router.push("/thank-you");
        } catch (err) {
            console.error(err);
            setError("حدث خطأ غير متوقع. المرجو المحاولة مرة أخرى.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="bg-gradient-to-b from-[#022c22] via-[#064e3b] to-[#011b15] text-white py-16 lg:py-24 relative rtl" id={id}>
            
            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                
                {/* Header Title */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 font-bold text-sm mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                        <span>⚡ التوصيل مجاني 100% والدفع بعد المعاينة عند الاستلام 🇲🇦</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black mb-3">
                        أطلب الآن بـ <span className="gold-gradient-text">149 درهم فقط</span> بدلاً من <span className="line-through text-slate-400 text-2xl">299 د.م</span>
                    </h2>

                    {/* Countdown Urgency Timer */}
                    <div className="flex justify-center items-center gap-3 mt-4">
                        <div className="bg-slate-950/80 border border-amber-400/40 px-4 py-2 rounded-xl text-amber-300 font-mono font-black text-lg flex items-center gap-2 shadow-lg">
                            <i className="fa-solid fa-clock animate-pulse text-amber-400" />
                            <span>ينتهي العرض خلال: </span>
                            <span className="text-white text-xl">
                                {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                            </span>
                        </div>
                        <div className="bg-red-500/20 border border-red-500/40 text-red-300 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                            متبقي 4 قطع فقط بهذا السعر
                        </div>
                    </div>
                </div>

                {/* Animated Neon Checkout Card Container */}
                <div className="neon-checkout-card shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col lg:flex-row text-slate-900">
                    
                    {/* Customer Form (Left/Order 2) */}
                    <div className="w-full lg:w-1/2 p-6 md:p-10 order-2 lg:order-1 bg-white relative">
                        <h3 className="text-xl font-black mb-6 text-emerald-950 flex items-center gap-2 border-b pb-3 border-slate-100">
                            <i className="fa-solid fa-user-pen text-amber-500" />
                            <span>أدخل معلومات التوصيل:</span>
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 text-sm font-bold text-center">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">الاسم الكامل</label>
                                <input 
                                    type="text" 
                                    placeholder="مثال: محمد العلوي" 
                                    required 
                                    value={name} 
                                    onChange={e => setName(e.target.value)} 
                                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-3.5 text-base focus:outline-none transition-all font-medium" 
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">رقم الهاتف (واتساب)</label>
                                <input 
                                    type="tel" 
                                    placeholder="06XXXXXXXX" 
                                    dir="ltr" 
                                    required 
                                    value={phone} 
                                    onChange={e => setPhone(e.target.value)} 
                                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-3.5 text-base focus:outline-none text-right transition-all font-medium" 
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">المدينة / العنوان</label>
                                <input 
                                    type="text" 
                                    placeholder="مثال: الدار البيضاء، حي السلام" 
                                    required 
                                    value={city} 
                                    onChange={e => setCity(e.target.value)} 
                                    className="w-full bg-slate-50 border-2 border-slate-200 focus:border-amber-500 focus:bg-white rounded-xl px-4 py-3.5 text-base focus:outline-none transition-all font-medium" 
                                />
                            </div>

                            {/* Submit Button with Neon Shimmer Animation */}
                            <button 
                                type="submit" 
                                disabled={isSubmitting} 
                                className="w-full btn-neon-cta text-white text-xl py-4 rounded-xl font-black flex items-center justify-center gap-3 mt-6 shadow-xl"
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <i className="fa-solid fa-spinner animate-spin" /> جاري تأكيد طلبك...
                                    </span>
                                ) : (
                                    <>
                                        <span>تأكيد الطلب بـ {price} درهم فقط</span>
                                        <i className="fa-solid fa-check-circle text-amber-300" />
                                    </>
                                )}
                            </button>
                            
                            <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-500 mt-4 pt-2 border-t border-slate-100">
                                <span className="flex items-center gap-1">
                                    <i className="fa-solid fa-shield-halved text-emerald-600" /> ضمان الجودة 100%
                                </span>
                                <span className="flex items-center gap-1">
                                    <i className="fa-solid fa-truck-fast text-emerald-600" /> توصيل مجاني لكل المغرب
                                </span>
                            </div>
                        </form>
                    </div>

                    {/* Bundle Selection Offers (Right/Order 1) */}
                    <div className="w-full lg:w-1/2 bg-slate-900 p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-slate-800 text-white order-1 lg:order-2 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-black mb-6 text-amber-300 flex items-center gap-2 border-b pb-3 border-slate-800">
                                <i className="fa-solid fa-gift text-emerald-400" />
                                <span>اختر باقتك المفضلة:</span>
                            </h3>

                            <div className="space-y-3.5">
                                {/* Bundle 1 */}
                                <div 
                                    onClick={() => setBundle(1)} 
                                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${bundle === 1 ? 'border-amber-400 bg-amber-500/15 shadow-[0_0_20px_rgba(245,158,11,0.3)]' : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'}`}
                                >
                                    <div className="absolute -top-3 left-4 bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 text-[11px] font-black px-3 py-0.5 rounded-full shadow-lg">
                                        تخفيض 50% 🔥
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${bundle === 1 ? 'border-amber-400' : 'border-slate-600'}`}>
                                            {bundle === 1 && <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-base text-white">1x فلاشة نور 64GB</h4>
                                            <p className="text-xs text-amber-300 font-bold">خصم خاص لفترة محدودة</p>
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <span className="line-through text-slate-500 text-xs">299 د.م</span><br/>
                                        <span className="font-black text-xl text-amber-300">149 د.م</span>
                                    </div>
                                </div>

                                {/* Bundle 2 (Popular) */}
                                <div 
                                    onClick={() => setBundle(2)} 
                                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${bundle === 2 ? 'border-emerald-400 bg-emerald-500/15 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'}`}
                                >
                                    <div className="absolute -top-3 left-4 bg-gradient-to-r from-emerald-500 to-amber-500 text-slate-950 text-[11px] font-black px-3 py-0.5 rounded-full shadow-lg">
                                        الأكثر طلباً للأسر 👨‍👩‍👧‍👦
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${bundle === 2 ? 'border-emerald-400' : 'border-slate-600'}`}>
                                            {bundle === 2 && <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-base text-white">2x فلاشة نور 64GB</h4>
                                            <p className="text-xs text-emerald-400 font-bold">توفير إضافي كبير</p>
                                        </div>
                                    </div>
                                    <div className="text-left">
                                        <span className="line-through text-slate-500 text-xs">598 د.م</span><br/>
                                        <span className="font-black text-xl text-emerald-300">249 د.م</span>
                                    </div>
                                </div>
                                
                                {/* Bundle 3 */}
                                <div 
                                    onClick={() => setBundle(3)} 
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex justify-between items-center ${bundle === 3 ? 'border-amber-400 bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${bundle === 3 ? 'border-amber-400' : 'border-slate-600'}`}>
                                            {bundle === 3 && <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-base text-white">3x باقة العائلة الكبرى</h4>
                                            <p className="text-xs text-slate-400">أقل سعر للقطعة الواحدة</p>
                                        </div>
                                    </div>
                                    <span className="font-black text-lg text-amber-300">349 د.م</span>
                                </div>
                            </div>

                            {/* Order Bump Upgrade */}
                            <div 
                                onClick={() => setOrderBump(!orderBump)}
                                className={`mt-5 p-3.5 rounded-xl border-2 transition-all cursor-pointer flex gap-3 items-center ${orderBump ? 'border-amber-400 bg-amber-400/10' : 'border-dashed border-emerald-500/40 bg-emerald-950/30 hover:border-emerald-500'}`}
                            >
                                <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${orderBump ? 'bg-amber-400 border-amber-400 text-slate-950' : 'border-slate-500 bg-slate-800'}`}>
                                    {orderBump && <i className="fa-solid fa-check text-xs font-black" />}
                                </div>
                                <div className="text-xs">
                                    <span className="font-bold text-white block">
                                        إضافة فلاشة السيارة الإضافية بـ <span className="text-amber-300 font-black">+49 د.م فقط</span>
                                    </span>
                                    <span className="text-slate-400 block text-[11px]">أناشيد وقرآن كريم مخصصين للرحلات والسيارة</span>
                                </div>
                            </div>
                        </div>

                        {/* Price Calculation Summary */}
                        <div className="pt-4 mt-6 border-t border-slate-800 flex justify-between items-center">
                            <span className="text-sm font-bold text-slate-300">المجموع الكلي:</span>
                            <span className="text-3xl font-black text-amber-300 font-mono">{price} درهم</span>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
