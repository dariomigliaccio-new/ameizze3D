"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/products";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);

  const total = totalPrice();
  const freeShippingThreshold = 4000;
  const qualifiesFreeShipping = total >= freeShippingThreshold;

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center gap-4 py-32 text-center">
          <ShoppingBag className="h-14 w-14 text-[#E5E1D8]" />
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="text-[#6B6866] text-sm">Add some products to get started.</p>
          <Button
            className="mt-4 bg-[#1A1A1A] hover:bg-[#333330] text-white rounded-xl px-6 h-11"
            render={<Link href="/products" />}
          >
            Browse Products <ArrowRight className="h-4 w-4" />
          </Button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-10">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-4 rounded-2xl border border-[#E5E1D8] bg-white p-4"
              >
                <div className="h-20 w-20 rounded-xl bg-[#F0EDE6] flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-[#B8976A]">
                    Photo
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#B8976A]">
                        {product.category}
                      </p>
                      <p className="font-semibold text-[#1A1A1A]">{product.name}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => removeItem(product.id)}
                      className="text-[#6B6866] hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-[#E5E1D8] overflow-hidden">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="rounded-none border-r border-[#E5E1D8] h-8 w-8"
                      >
                        −
                      </Button>
                      <span className="px-4 text-sm font-semibold">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="rounded-none border-l border-[#E5E1D8] h-8 w-8"
                      >
                        +
                      </Button>
                    </div>
                    <p className="font-bold text-[#1A1A1A]">
                      {formatPrice(product.price * quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-[#E5E1D8] bg-white p-6 space-y-5">
              <h2 className="font-bold text-lg">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-[#6B6866]">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-[#6B6866]">
                  <span>Shipping</span>
                  <span className={qualifiesFreeShipping ? "text-green-600 font-medium" : ""}>
                    {qualifiesFreeShipping ? "FREE" : "Calculated at checkout"}
                  </span>
                </div>
              </div>

              {!qualifiesFreeShipping && (
                <p className="text-xs text-[#6B6866] bg-[#F0EDE6] rounded-xl p-3">
                  Add{" "}
                  <span className="text-[#B8976A] font-semibold">
                    {formatPrice(freeShippingThreshold - total)}
                  </span>{" "}
                  more for free shipping!
                </p>
              )}

              <div className="border-t border-[#E5E1D8] pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-[#1A1A1A] hover:bg-[#333330] text-white rounded-xl h-12 uppercase tracking-wider text-xs font-semibold"
              >
                {loading ? "Redirecting..." : "Checkout with Stripe"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </Button>

              <p className="text-center text-xs text-[#6B6866]">
                Secure checkout &middot; Powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
