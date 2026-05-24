"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/products";
import { Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const router = useRouter();
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
        <main className="flex-1 flex flex-col items-center justify-center gap-4 py-24">
          <ShoppingBag className="h-16 w-16 text-[#27272a]" />
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="text-[#71717a]">Add some products to get started.</p>
          <Link
            href="/products"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#f97316] px-6 py-3 text-sm font-semibold text-white hover:bg-[#ea6c0a] transition-colors"
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
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-4 rounded-xl border border-[#27272a] bg-[#18181b] p-4"
              >
                <div className="h-20 w-20 rounded-lg bg-[#27272a] flex items-center justify-center text-3xl shrink-0">
                  {product.category === "Cable Management" ? "🔌" :
                   product.category === "Organization" ? "🗂️" : "🖥️"}
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-[#71717a]">{product.category}</p>
                      <p className="font-semibold">{product.name}</p>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="text-[#71717a] hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-lg border border-[#27272a] bg-[#09090b]">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="px-3 py-1 text-sm hover:text-[#f97316] transition-colors"
                      >
                        −
                      </button>
                      <span className="px-2 text-sm font-medium">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="px-3 py-1 text-sm hover:text-[#f97316] transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold">
                      {formatPrice(product.price * quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-[#27272a] bg-[#18181b] p-6 space-y-4">
              <h2 className="font-semibold text-lg">Order Summary</h2>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-[#71717a]">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-[#71717a]">
                  <span>Shipping</span>
                  <span className={qualifiesFreeShipping ? "text-green-400" : ""}>
                    {qualifiesFreeShipping ? "FREE" : "Calculated at checkout"}
                  </span>
                </div>
              </div>

              {!qualifiesFreeShipping && (
                <p className="text-xs text-[#71717a] bg-[#27272a] rounded-lg p-3">
                  Add{" "}
                  <span className="text-[#f97316] font-semibold">
                    {formatPrice(freeShippingThreshold - total)}
                  </span>{" "}
                  more for free shipping!
                </p>
              )}

              <div className="border-t border-[#27272a] pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#f97316] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#ea6c0a] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Redirecting..." : "Checkout with Stripe"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </button>

              <p className="text-center text-xs text-[#71717a]">
                Secure checkout · Powered by Stripe
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
