import type { Metadata } from "next";
import "./globals.css";
import Pixels from "./components/Pixels";

export const metadata: Metadata = {
  title: "DarLux - Réchaud Électrique RAF 1000W | بلاكة كهربائية للطهي والتسخين",
  description: "بلاكة كهربائية محمولة RAF 1000W - بديل الفرن والبوطا، اقتصاد 40% فـ الكهرباء وسخونية فورية بـ 169 درهم مع توصيل مجاني والدفع بعد المعاينة عند الاستلام بالمغرب.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" className="scroll-smooth" dir="rtl">
      <head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans min-h-screen bg-slate-50 antialiased">
        <Pixels />
        {children}
      </body>
    </html>
  );
}
