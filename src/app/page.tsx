import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TextMarquee from "./components/TextMarquee";
import CheckoutForm from "./components/CheckoutForm";
import FeatureGrid from "./components/FeatureGrid";
import ProductDetailsSection from "./components/ProductDetailsSection";
import VideoCategories from "./components/VideoCategories";
import TextAndImagesSection from "./components/TextAndImagesSection";
import VideoOverview from "./components/VideoOverview";
import Footer from "./components/Footer";
import ReviewsSection from "./components/ReviewsSection";

export default function Home() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000";

  return (
    <main className="relative min-h-screen overflow-hidden font-cairo bg-[#022c22] text-white">
      {/* Sticky Top Bar */}
      <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 text-white text-center py-2 font-black text-xs sm:text-sm relative z-50 shadow-md">
        <span className="animate-pulse-slow inline-block">
          🔥 عرض خاص محدود اليوم: فلاشة نور الذهبية 64GB بـ 149 درهم فقط بدلاً من 299 درهم مع توصيل مجاني لكل المغرب! 🇲🇦
        </span>
      </div>

      <Header />
      <HeroSection />
      <TextMarquee />
      <TextAndImagesSection />
      <CheckoutForm id="checkout-top" />
      <VideoOverview />
      <FeatureGrid />
      <ProductDetailsSection />
      <VideoCategories />
      <ReviewsSection />
      <CheckoutForm id="checkout" />
      <Footer />

      {/* Sticky Add to Cart (Mobile) */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-950/95 backdrop-blur-md border-t border-amber-400/40 p-3.5 z-40 md:hidden shadow-[0_-10px_30px_rgba(0,0,0,0.8)] flex justify-between items-center animate-slide-up">
        <div className="font-bold">
          <span className="text-[11px] text-slate-400 block line-through">299 د.م</span>
          <span className="text-xl text-amber-300 font-black">149 د.م</span>
        </div>
        <a href="#checkout-top" className="btn-neon-cta text-white px-6 py-3 rounded-xl font-black text-sm shadow-xl flex items-center gap-2">
          <span>أطلب الآن (149 د.م)</span>
          <i className="fa-solid fa-cart-arrow-down text-amber-300" />
        </a>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        className="fixed bottom-20 left-4 bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:scale-110 transition-transform z-50 md:bottom-6 md:left-6 md:w-14 md:h-14"
      >
        <i className="fa-brands fa-whatsapp text-2xl md:text-3xl" />
      </a>
    </main>
  );
}
