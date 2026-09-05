import type { Metadata } from "next";
import "./globals.css";
import Pixels from "./components/Pixels";

export const metadata: Metadata = {
  title: "NoorUSB - المكتبة الذكية لطفلك",
  description: "أروع هدية لطفلك في 2026: مكتبة ذكية في جيبك. أكثر من 2000 فيديو تعليمي إسلامي وتربوي.",
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
