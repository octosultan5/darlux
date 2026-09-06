"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { submitOrder } from "../actions/order";
import PixelEvents from "./PixelEvents";

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

    // Pricing logic
    let price = 169;
    if (bundle === 1) price = 169;
    if (bundle === 2) price = 299;
    if (orderBump) price += 59;

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
            let finalPrice = 169;
            if (bundle === 1) finalPrice = 169;
            if (bundle === 2) finalPrice = 299;
            if (orderBump) finalPrice += 59;

            const result = await submitOrder({
                name,
                phone: cleanPhone,
                city,
                bundle_type: bundle,
                total_price: finalPrice,
                has_bump: orderBump,
                product_name: "Réchaud Électrique RAF 1000W - DarLux"
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
        <section className="bg-slate-50 py-16 lg:py-24 relative rtl border-t border-slate-200" id={id}>
            <PixelEvents eventName="InitiateCheckout" />
            
            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                
                {/* Header Title */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-sm mb-4 shadow-sm">
                        <i className="fa-solid fa-truck-fast"></i>
                        <span>التوصيل مجاني 100% والدفع بعد المعاينة عند الاستلام 🇲🇦</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-black mb-3 text-slate-900 tracking-tight">
                        أطلب الآن بـ <span className="text-[#c57d5c]">169 درهم فقط</span> <br className="hidden sm:block" />
                        <span className="text-xl sm:text-2xl text-slate-500 font-bold">بدلاً من <span className="line-through decoration-red-500/50">299 درهم</span> (توفير 43%)</span>
                    </h2>

                    {/* Countdown Urgency Timer */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6">
                        <div className="bg-red-50 border border-red-100 px-5 py-2.5 rounded-xl text-red-600 font-bold text-base flex items-center gap-3 shadow-sm">
                            <i className="fa-solid fa-fire animate-pulse" />
                            <span>عرض محدود ينتهي خلال: </span>
                            <span className="font-mono text-xl font-black bg-red-100 px-2 py-0.5 rounded-md">
                                {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                            </span>
                        </div>
                        <div className="bg-orange-50 border border-orange-200 text-orange-700 px-5 py-3 rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm">
                            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
                            متبقي 4 قطع فقط بهذا السعر
                        </div>
                    </div>
                </div>

                {/* Main Checkout Card */}
                <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row border border-slate-100">
                    
                    {/* Bundle Options (Left side conceptually, but Right side in RTL) */}
                    <div className="w-full lg:w-1/2 bg-slate-50 p-6 md:p-10 border-b lg:border-b-0 lg:border-l border-slate-200 order-1">
                        <div>
                            <h3 className="text-xl font-black mb-6 text-slate-900 flex items-center gap-2 border-b pb-4 border-slate-200">
                                <i className="fa-solid fa-box-open text-[#c57d5c]" />
                                <span>1. اختر العرض المناسب لك:</span>
                            </h3>

                            <div className="space-y-4">
                                {/* Bundle 1 */}
                                <div 
                                    onClick={() => setBundle(1)} 
                                    className={`relative p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center ${bundle === 1 ? 'border-[#c57d5c] bg-[#c57d5c]/5 shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${bundle === 1 ? 'border-[#c57d5c]' : 'border-slate-300'}`}>
                                            {bundle === 1 && <div className="w-3 h-3 rounded-full bg-[#c57d5c]" />}
                                        </div>
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0">
                                            <img src="/solero/solero.jpg" alt="1x Rechaud" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">1x Réchaud Électrique</h4>
                                            <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-1">مثالي للاستعمال الفردي</p>
                                        </div>
                                    </div>
                                    <div className="text-left shrink-0 ml-2">
                                        <span className="line-through text-slate-400 text-[11px] sm:text-xs font-bold">299 د.م</span><br/>
                                        <span className="font-black text-lg sm:text-2xl text-[#c57d5c]">169 د.م</span>
                                    </div>
                                </div>

                                {/* Bundle 2 (Popular) */}
                                <div 
                                    onClick={() => setBundle(2)} 
                                    className={`relative p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all flex justify-between items-center ${bundle === 2 ? 'border-emerald-500 bg-emerald-50 shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'}`}
                                >
                                    <div className="absolute -top-3.5 right-6 bg-emerald-500 text-white text-[11px] font-black px-4 py-1 rounded-full shadow-md">
                                        الخيار الأكثر طلباً 🌟
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${bundle === 2 ? 'border-emerald-500' : 'border-slate-300'}`}>
                                            {bundle === 2 && <div className="w-3 h-3 rounded-full bg-emerald-500" />}
                                        </div>
                                        <div className="flex -space-x-4 space-x-reverse shrink-0">
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-white bg-white shadow-sm relative z-10">
                                                <img src="/solero/solero.jpg" alt="1st Rechaud" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-white bg-white shadow-sm">
                                                <img src="/solero/solero.jpg" alt="2nd Rechaud" className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-tight">2x Réchaud (جوج)</h4>
                                            <p className="text-[11px] sm:text-xs text-emerald-600 font-bold mt-1">وفر 39 درهم إضافية!</p>
                                        </div>
                                    </div>
                                    <div className="text-left shrink-0 ml-2">
                                        <span className="line-through text-slate-400 text-[11px] sm:text-xs font-bold">598 د.م</span><br/>
                                        <span className="font-black text-lg sm:text-2xl text-emerald-600">299 د.م</span>
                                    </div>
                                </div>
                            </div>

                            {/* Order Bump Upgrade */}
                            <div 
                                onClick={() => setOrderBump(!orderBump)}
                                className={`mt-6 p-4 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 items-center ${orderBump ? 'border-[#c57d5c] bg-[#c57d5c]/5' : 'border-dashed border-slate-300 bg-white hover:border-slate-400'}`}
                            >
                                <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 transition-colors ${orderBump ? 'bg-[#c57d5c] text-white' : 'border-2 border-slate-300 bg-slate-50'}`}>
                                    {orderBump && <i className="fa-solid fa-check text-sm" />}
                                </div>
                                <div className="text-sm">
                                    <span className="font-bold text-slate-900 block">
                                        إضافة مقلاة غير لاصقة بـ <span className="text-[#c57d5c] font-black">+59 د.م فقط</span>
                                    </span>
                                    <span className="text-slate-500 block text-xs mt-0.5">مقلاة عالية الجودة متوافقة تماماً مع الريشو.</span>
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="pt-6 mt-8 border-t border-slate-200 flex justify-between items-end">
                            <div>
                                <span className="block text-sm font-bold text-slate-500 mb-1">المجموع الكلي:</span>
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-md">التوصيل مجاني</span>
                            </div>
                            <span className="text-4xl font-black text-slate-900 font-mono">{price} د.م</span>
                        </div>
                    </div>

                    {/* Customer Form (Right side conceptually, Left side in RTL) */}
                    <div className="w-full lg:w-1/2 p-6 md:p-10 order-2">
                        <h3 className="text-xl font-black mb-6 text-slate-900 flex items-center gap-2 border-b pb-4 border-slate-200">
                            <i className="fa-solid fa-address-card text-[#c57d5c]" />
                            <span>2. أدخل معلومات التوصيل:</span>
                        </h3>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 text-sm font-bold flex items-start gap-3">
                                    <i className="fa-solid fa-circle-exclamation mt-0.5" />
                                    <span>{error}</span>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">الاسم الكامل <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    placeholder="مثال: محمد السعدي" 
                                    required 
                                    value={name} 
                                    onChange={e => setName(e.target.value)} 
                                    className="w-full bg-white border-2 border-slate-200 focus:border-[#c57d5c] focus:ring-4 focus:ring-[#c57d5c]/10 rounded-xl px-4 py-3.5 text-base focus:outline-none transition-all font-semibold text-slate-900 placeholder:text-slate-400 shadow-sm" 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">رقم الهاتف <span className="text-slate-500 font-normal text-xs">(مكالمات أو واتساب)</span> <span className="text-red-500">*</span></label>
                                <input 
                                    type="tel" 
                                    placeholder="06XXXXXXXX" 
                                    dir="ltr" 
                                    required 
                                    value={phone} 
                                    onChange={e => setPhone(e.target.value)} 
                                    className="w-full bg-white border-2 border-slate-200 focus:border-[#c57d5c] focus:ring-4 focus:ring-[#c57d5c]/10 rounded-xl px-4 py-3.5 text-base focus:outline-none text-right transition-all font-semibold text-slate-900 placeholder:text-slate-400 shadow-sm" 
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">المدينة / العنوان <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    placeholder="مثال: الدار البيضاء، حي سيدي مومن..." 
                                    required 
                                    value={city} 
                                    onChange={e => setCity(e.target.value)} 
                                    className="w-full bg-white border-2 border-slate-200 focus:border-[#c57d5c] focus:ring-4 focus:ring-[#c57d5c]/10 rounded-xl px-4 py-3.5 text-base focus:outline-none transition-all font-semibold text-slate-900 placeholder:text-slate-400 shadow-sm" 
                                />
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                disabled={isSubmitting} 
                                className="relative overflow-hidden group w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-teal-600 hover:to-emerald-500 active:scale-[0.97] text-white text-xl py-4 sm:py-5 rounded-2xl font-black flex items-center justify-center gap-3 mt-4 shadow-[0_10px_25px_rgba(16,185,129,0.4)] transition-all duration-300 animate-pulse hover:animate-none"
                            >
                                {/* Shine Sweep Effect */}
                                <div className="absolute inset-0 -translate-x-[150%] group-hover:translate-x-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 transition-transform duration-1000 ease-in-out"></div>
                                
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2 py-1 relative z-10">
                                        <i className="fa-solid fa-spinner animate-spin" /> جاري تأكيد الطلب...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2 py-1 relative z-10">
                                        تأكيد الطلب بـ {price} درهم <i className="fa-solid fa-cart-check ml-1 text-2xl" />
                                    </span>
                                )}
                            </button>
                            
                            {/* Trust Badges */}
                            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-600 mt-6 pt-5 border-t border-slate-100">
                                <span className="flex items-center gap-1.5">
                                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600"><i className="fa-solid fa-shield-check" /></div>
                                    ضمان الجودة
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><i className="fa-solid fa-truck" /></div>
                                    توصيل مجاني
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"><i className="fa-solid fa-handshake" /></div>
                                    الدفع عند الاستلام
                                </span>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
