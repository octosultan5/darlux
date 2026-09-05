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
    <main className="relative min-h-screen overflow-hidden font-cairo">
      {/* Sticky Top Bar */}
      <div className="bg-brand-accent text-white text-center py-2 font-bold text-sm relative z-50 shadow-md">
        <span className="animate-pulse-slow inline-block">🔥 عرض حصري خاص اليوم: 149 درهم فقط بدلاً من 299 درهم مع توصيل مجاني!</span>
      </div>

      <Header />
      <HeroSection />
      <TextMarquee />
      <VideoOverview />
      <CheckoutForm id="checkout-top" />
      <FeatureGrid />
      <TextAndImagesSection />
      <ProductDetailsSection />
      <VideoCategories />
      <ReviewsSection />
      <CheckoutForm id="checkout" />
      <Footer />

      {/* Sticky Add to Cart (Mobile) */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-950/90 backdrop-blur-md border-t border-emerald-500/30 p-4 z-40 md:hidden shadow-[0_-10px_25px_rgba(0,0,0,0.5)] flex justify-between items-center animate-slide-up">
        <div className="font-bold">
          <span className="text-xs text-slate-400 block line-through">299 د.م</span>
          <span className="text-2xl text-amber-300 font-black">149 د.م</span>
        </div>
        <a href="#checkout-top" className="btn-neon-cta text-white px-7 py-3 rounded-xl font-black text-base shadow-lg flex items-center gap-2">
          أطلب الآن بـ 149 درهم <i className="fa-solid fa-cart-arrow-down" />
        </a>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        className="fixed bottom-24 left-6 bg-emerald-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 md:bottom-6"
      >
        <i className="fa-brands fa-whatsapp text-3xl" />
      </a>
    </main>
  );
}
