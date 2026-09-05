import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "صانع إعلانات NoorUSB | لوحة التحكم",
  description: "أداة توليد وتصميم إعلانات احترافية لـ NoorUSB لتسويق منتجاتك بسهولة.",
};

export default function AdGeneratorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
