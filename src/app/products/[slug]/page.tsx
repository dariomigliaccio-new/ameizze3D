"use client";

import { notFound } from "next/navigation";
import { use, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { getProduct, formatPrice, products } from "@/lib/products";
import { useCart } from "@/store/cart";
import { ShoppingCart, Check, ArrowLeft, Package, Ruler } from "lucide-react";
import Link from "next/link";

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProduct(slug);

  if (!product) notFound();

  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product!);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const related = products.filter((p) => p.id !== product!.id).slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 text-sm text-[#71717a] hover:text-[#fafafa] mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="aspect-square rounded-2xl border border-[#27272a] bg-[#18181b] flex items-center justify-center">
            <div className="text-9xl select-none">
              {product.category === "Cable Management" ? "🔌" :
               product.category === "Organization" ? "🗂️" : "🖥️"}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {product.badge && (
              <span className="mb-4 inline-flex w-fit rounded-full bg-[#f97316] px-3 py-0.5 text-xs font-semibold text-white">
                {product.badge}
              </span>
            )}

            <p className="text-sm text-[#71717a] mb-1">{product.category}</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              {product.name}
            </h1>

            <p className="text-3xl font-bold text-[#f97316] mb-6">
              {formatPrice(product.price)}
            </p>

            <p className="text-[#71717a] leading-relaxed mb-8">
              {product.longDescription}
            </p>

            <ul className="space-y-2 mb-8">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-[#f97316] mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex gap-6 mb-8 text-sm text-[#71717a]">
              <div className="flex items-center gap-1.5">
                <Package className="h-4 w-4" />
                {product.material}
              </div>
              <div className="flex items-center gap-1.5">
                <Ruler className="h-4 w-4" />
                {product.dimensions}
              </div>
            </div>

            <button
              onClick={handleAdd}
              className={`flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-base font-semibold transition-all duration-200 ${
                added
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-[#f97316] text-white hover:bg-[#ea6c0a]"
              }`}
            >
              {added ? (
                <>
                  <Check className="h-5 w-5" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs text-[#71717a]">
              Free shipping on orders over $40 · 30-day returns
            </p>
          </div>
        </div>

        {/* Related */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
