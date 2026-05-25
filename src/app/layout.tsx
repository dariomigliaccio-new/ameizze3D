import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ameizze — Premium 3D Printed Desk Accessories",
  description:
    "High-quality 3D printed organizers, stands, and desk accessories built to last a lifetime. Ships across the USA.",
  openGraph: {
    title: "Ameizze",
    description: "3D Printed Desk Accessories Built to Last a Lifetime",
    url: "https://ameizze.com",
    siteName: "Ameizze",
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
      <body className="min-h-full flex flex-col bg-[#F9F8F6] text-[#1A1A1A]">
        {children}
      </body>
    </html>
  );
}
