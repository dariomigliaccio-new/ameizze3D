"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  const clearCart = useCart((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-24">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-3">Order Confirmed!</h1>
          <p className="text-[#71717a] mb-2">
            Thank you for your purchase. You will receive a confirmation email
            shortly.
          </p>
          <p className="text-[#71717a] text-sm mb-10">
            Your 3D printed items are being prepared and will ship within 2–3
            business days.
          </p>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-lg bg-[#f97316] px-8 py-3 text-sm font-semibold text-white hover:bg-[#ea6c0a] transition-colors"
          >
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
