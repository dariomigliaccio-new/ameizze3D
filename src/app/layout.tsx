import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ameizze 3D — Premium 3D Printed Utility Products",
  description:
    "High-quality 3D printed organizers, stands, and utility accessories designed for modern living. Ships across the USA.",
  openGraph: {
    title: "Ameizze 3D",
    description: "Premium 3D printed utility products",
    url: "https://ameizze.com",
    siteName: "Ameizze 3D",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#09090b] text-[#fafafa]">
        {children}
      </body>
    </html>
  );
}
