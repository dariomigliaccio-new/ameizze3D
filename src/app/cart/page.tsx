"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/products";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
          <Link
            href="/products"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#1A1A1A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#333330] transition-colors"
          >
            Browse Products <ArrowRight className="h-4 w-4" />
          </Link>
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
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-[#6B6866] hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0 rounded-lg border border-[#E5E1D8]">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="px-3 py-1.5 text-sm text-[#6B6866] hover:text-[#1A1A1A] transition-colors"
                      >
                        −
                      </button>
                      <span className="px-3 py-1.5 text-sm font-semibold border-x border-[#E5E1D8]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="px-3 py-1.5 text-sm text-[#6B6866] hover:text-[#1A1A1A] transition-colors"
                      >
                        +
                      </button>
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

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] px-6 py-4 text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#333330] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Redirecting..." : "Checkout with Stripe"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>

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
