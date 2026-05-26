import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { db } from "@/lib/db";
import AnnouncementBar from "@/components/AnnouncementBar";
import DiscountModal from "@/components/DiscountModal";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const rows = await db.setting.findMany();
  const s = Object.fromEntries(rows.map((r) => [r.key, r.value]));

  const barActive = s.promo_bar_active === "true";
  const modalActive = s.promo_modal_active === "true";

  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#F9F8F6] text-[#1A1A1A]">
        {barActive && s.promo_bar_text && (
          <AnnouncementBar text={s.promo_bar_text} />
        )}
        {modalActive && s.promo_modal_title && (
          <DiscountModal
            title={s.promo_modal_title}
            body={s.promo_modal_body ?? ""}
            code={s.promo_modal_code ?? ""}
          />
        )}
        {children}
      </body>
    </html>
  );
}
