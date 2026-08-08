import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgriBridge AI — Blockchain Agricultural Trust Intelligence",
  description: "From Farm to Consumer — Trust at Every Step. India's leading blockchain-based agricultural traceability and trust intelligence platform protecting 50M+ farmers.",
  keywords: "agriculture, blockchain, AI, trust score, food safety, traceability, Indian farmers, export compliance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-gray-900" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
