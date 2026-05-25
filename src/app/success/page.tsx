"use client";

import { useEffect } from "react";
import { useCart } from "@/store/cart";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  const clearCart = useCart((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-32">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#F0EDE6] border border-[#E5E1D8]">
              <CheckCircle className="h-10 w-10 text-[#B8976A]" />
            </div>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8976A] mb-3">
            Thank you
          </p>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-[#6B6866] mb-2">
            You will receive a confirmation email shortly.
          </p>
          <p className="text-[#6B6866] text-sm mb-10">
            Your 3D printed items are being prepared and will ship within 2–3
            business days.
          </p>

          <Button
            size="lg"
            className="bg-[#1A1A1A] hover:bg-[#333330] text-white rounded-xl px-8 h-12 uppercase tracking-wider text-sm"
            render={<Link href="/products" />}
          >
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
