import UrgencyHeader from "./components/UrgencyHeader";
import ProductHeroCheckout from "./components/ProductHeroCheckout";
import TrustBadges from "./components/TrustBadges";
import VisualShowcase from "./components/VisualShowcase";
import FAQSection from "./components/FAQSection";
import CustomerReviews from "./components/CustomerReviews";
import Footer from "./components/Footer";
import StickyMobileCTA from "./components/StickyMobileCTA";
import PixelEvents from "./components/PixelEvents";

export default function Home() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212600000000";

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-cairo antialiased selection:bg-amber-200">
      {/* 1. Track ViewContent event once */}
      <PixelEvents eventName="ViewContent" data={{ content_name: "Réchaud RAF 1500W", value: 129, currency: "MAD" }} />

      {/* 2. Top Urgency Banner & Header */}
      <UrgencyHeader />

      {/* 3. Hero & Above-The-Fold Order Form (Inspired by Bricoma/Lightfunnels) */}
      <ProductHeroCheckout />

      {/* 4. Four Core Trust Badges */}
      <TrustBadges />

      {/* 5. Three High-Impact Visual Demonstration Cards */}
      <VisualShowcase />

      {/* 6. Frequently Asked Questions Accordion */}
      <FAQSection />

      {/* 7. Real Moroccan Customer Reviews */}
      <CustomerReviews />

      {/* 8. Footer */}
      <Footer />

      {/* 9. Mobile Sticky 1-Click Order Bar */}
      <StickyMobileCTA />

      {/* 10. Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="تواصل معنا عبر واتساب"
        className="fixed bottom-20 left-4 bg-emerald-500 hover:bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(16,185,129,0.5)] hover:scale-110 active:scale-95 transition-all z-30 md:bottom-6 md:left-6 md:w-14 md:h-14"
      >
        <i className="fa-brands fa-whatsapp text-2xl md:text-3xl" />
      </a>
    </main>
  );
}
