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
        <span className="animate-pulse-slow inline-block">🔥 عرض حصري: طلبية اليوم مع توصيل مجاني لكل المغرب!</span>
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
      <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 z-40 md:hidden shadow-[0_-10px_20px_rgba(0,0,0,0.05)] flex justify-between items-center animate-slide-up">
        <div className="font-bold">
          <span className="text-xs text-slate-500 block line-through">498 د.م</span>
          <span className="text-xl text-brand-primary">249 د.م</span>
        </div>
        <a href="#checkout-top" className="bg-brand-accent text-white px-8 py-3 rounded-full font-black text-lg shadow-lg hover:scale-105 transition-transform flex items-center gap-2">
          أطلب الآن <i className="fa-solid fa-cart-arrow-down"></i>
        </a>
      </div>

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank" 
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        className="fixed bottom-24 left-6 bg-green-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50 md:bottom-6"
      >
        <i className="fa-brands fa-whatsapp text-3xl"></i>
      </a>
    </main>
  );
}
