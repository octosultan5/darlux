"use client";

import { useState } from "react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "واش نقدر نجرب ونتأكد من السلعة قبل ما نخلص؟",
      a: "نعم بالتأكيد! مع DarLux ما كتدفع حتى كيوصلك الموزع بالمنتج حتى لباب الدار، كتفتح العلبة وتشوف الريشو ديالك بنفسك عاد كتسلمه المبلغ.",
    },
    {
      q: "شحال كياخد وقت التوصيل؟",
      a: "التوصيل سريع جداً ويستغرق عادة ما بين 24 إلى 48 ساعة فقط لجميع مدن وقرى المغرب.",
    },
    {
      q: "واش الريشو كيستهلك بزاف ديال الكهرباء؟",
      a: "نهائياً! الجهاز مصمم بقوة 1000 واط مع ترموستات أوتوماتيكي ذكي كيفصل الكهرباء تلقائياً ملي كيوصل لدرجة الحرارة المطلوبة، الشيء اللي كيخليه يقتصد حتى لـ 40% مقارنة بمصاريف البوطا.",
    },
    {
      q: "شنو ندير إلا لقيت فيه أي عيب أو مشكل؟",
      a: "كنوفرو لك ضمانة 100%، في حال واجهتك أي مشكلة أو عيب تصنيعي، يكفي تواصل معنا على الواتساب وغادي يتم استبدال الجهاز بواحد جديد فوراً وبدون أي مصاريف إضافية.",
    },
    {
      q: "كيفاش ندير نطلب الجهاز؟",
      a: "فقط عمر معلوماتك (الاسم، الهاتف، والمدينة) في استمارة الطلب أعلاه واضغط على زر 'أطلب الآن'، وسيتصل بك أحد أفراد فريقنا لتأكيد موعد التسليم.",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-t border-slate-200 rtl text-slate-900">
      <div className="container mx-auto px-4 max-w-3xl">
        
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-black text-xs mb-2">
            كل ما يهمك معرفته 💬
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            الأسئلة الشائعة حول <span className="text-amber-600">الريشو والتوصيل</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-4 sm:p-5 text-right font-black text-sm sm:text-base flex justify-between items-center text-slate-900 hover:text-amber-600 transition-colors"
                >
                  <span>{f.q}</span>
                  <span
                    className={`w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs shrink-0 mr-3 transition-transform ${
                      isOpen ? "rotate-180 text-amber-600" : "text-slate-400"
                    }`}
                  >
                    <i className="fa-solid fa-chevron-down" />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-200/50 bg-white font-medium">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
