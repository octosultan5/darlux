"use client";

export default function Header() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000";

  const scrollToCheckout = () => {
    document.getElementById("checkout")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-white py-4 shadow-sm sticky top-0 z-40 rtl border-b border-orange-100">
      <div className="container mx-auto px-5 max-w-6xl flex justify-between items-center">
        
        {/* Logo Area */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-brand-accent to-orange-400 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg">
            ن
          </div>
          <span className="text-2xl font-black text-brand-primary font-inter tracking-tight">
            NOOR<span className="text-brand-accent">USB</span>
          </span>
        </div>

        {/* Action Area */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex text-brand-green font-bold items-center gap-2 px-4 py-2 rounded-full border-2 border-brand-green hover:bg-emerald-50 transition-colors"
          >
            <i className="fa-brands fa-whatsapp text-xl"></i> واتساب
          </a>
          <button
            onClick={scrollToCheckout}
            className="bg-brand-accent text-white font-bold px-6 py-2 rounded-full shadow-md hover:shadow-orange-400/50 hover:scale-105 transition-all flex items-center gap-2"
          >
           اطلب الآن
          </button>
        </div>

      </div>
    </header>
  );
}
