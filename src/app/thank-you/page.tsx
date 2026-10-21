import Link from "next/link";
import PixelEvents from "../components/PixelEvents";

export const metadata = {
  title: "تم تأكيد طلبك بنجاح | DarLux Maroc",
  description: "شكراً لطلبك، سنتصل بك قريباً لتأكيد موعد التسليم.",
};

export default function ThankYouPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 rtl text-slate-900 font-cairo">
      {/* Track Purchase on load */}
      <PixelEvents eventName="Purchase" data={{ currency: "MAD", value: 129.0 }} />

      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl overflow-hidden text-center border border-slate-200">
        
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 py-8 px-6 text-white relative">
          <div className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg text-emerald-600 text-3xl mb-3 border-4 border-emerald-200">
            <i className="fa-solid fa-check" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            تم استلام طلبك بنجاح! 🎉
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm font-semibold mt-1">
            شكراً لثقتك بمتجر DarLux Maroc - ريشو RAF 1500W الأصلي
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 text-right">
          
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium text-center">
            سيقوم فريق خدمة الزبناء بالاتصال بك هاتفياً عبر الرقم الذي أدخلته لتأكيد العنوان وتحديد موعد التسليم المناسب لك.
          </p>

          {/* Important Info Card */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 text-right space-y-3">
            <h3 className="font-black text-amber-900 text-sm sm:text-base flex items-center gap-2">
              <i className="fa-solid fa-circle-info text-amber-600 text-base" />
              <span>معلومات مهمة حول التوصيل:</span>
            </h3>
            <ul className="text-xs sm:text-sm text-amber-950/80 space-y-2 font-semibold">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>مدة التوصيل: يستغرق التوصيل ما بين <strong>24 إلى 48 ساعة</strong> كحد أقصى.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>المرجو إبقاء هاتفك مشغلاً للرد على مكالمة موزع التوصيل.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">•</span>
                <span>الدفع: نقداً بعد استلامك ومعاينتك للمنتج <strong>(Cash on Delivery)</strong>.</span>
              </li>
            </ul>
          </div>

          {/* WhatsApp Support CTA */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
            <div>
              <span className="text-xs font-black text-slate-800 block">هل لديك أي تعديل أو سؤال حول طلبك؟</span>
              <span className="text-[11px] text-slate-500 font-medium">فريق الدعم متاح للإجابة عليك فوراً عبر الواتساب</span>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all shrink-0"
            >
              <i className="fa-brands fa-whatsapp text-lg" />
              <span>تواصل عبر واتساب</span>
            </a>
          </div>

          {/* Back Home */}
          <div className="text-center pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-bold text-xs sm:text-sm"
            >
              <i className="fa-solid fa-arrow-right text-xs" />
              <span>العودة إلى الصفحة الرئيسية</span>
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
