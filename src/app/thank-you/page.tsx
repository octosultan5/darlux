import Link from "next/link";

export const metadata = {
  title: "شكرا لطلبك | نور USB",
  description: "تم استلام طلبك بنجاح.",
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-5 rtl">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden text-center relative border border-slate-100">
        <div className="bg-emerald-500 h-32 w-full absolute top-0 left-0"></div>
        <div className="relative z-10 pt-16 pb-12 px-8">
          <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center shadow-lg mb-8 border-4 border-emerald-50 text-emerald-500">
            <i className="fa-solid fa-check text-5xl"></i>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-brand-primary mb-4">
            تم استلام طلبك بنجاح!
          </h1>
          <p className="text-xl text-slate-600 font-medium mb-8">
            شكرا لثقتك بنا. سيقوم فريقنا بالاتصال بك قريبا على الرقم الذي قدمته لتأكيد طلبك وتحديد موعد التسليم.
          </p>

          <div className="bg-blue-50 border border-blue-100 rounded-none p-6 mb-8 text-right flex gap-4 items-start">
            <i className="fa-solid fa-circle-info text-blue-500 text-2xl mt-1"></i>
            <div>
              <h3 className="font-bold text-blue-900 text-lg mb-2">معلومات هامة:</h3>
              <ul className="text-blue-800 space-y-2 list-disc list-inside">
                <li>التوصيل يستغرق عادة 24 إلى 48 ساعة.</li>
                <li>يرجى إبقاء هاتفك مفتوحا للرد على الموزع.</li>
                <li>الدفع سيكون عند استلامك للمنتج (Cash on Delivery).</li>
              </ul>
            </div>
          </div>

          <Link href="/" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors">
            <i className="fa-solid fa-arrow-right"></i>
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
