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
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm text-[#6B6866] hover:text-[#1A1A1A] mb-10 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Shop
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Image */}
            <div className="aspect-square rounded-2xl border border-[#E5E1D8] bg-[#F0EDE6] flex items-center justify-center">
              <div className="w-1/2 h-1/2 rounded-2xl bg-[#E5E1D8] flex items-center justify-center">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B8976A]">
                  Photo
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              {product.badge && (
                <span className="mb-5 inline-flex w-fit rounded-full bg-[#1A1A1A] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
                  {product.badge}
                </span>
              )}

              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#B8976A] mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {product.name}
              </h1>

              <p className="text-3xl font-bold mb-6">
                {formatPrice(product.price)}
              </p>

              <p className="text-[#6B6866] leading-relaxed mb-8">
                {product.longDescription}
              </p>

              <ul className="space-y-3 mb-8">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check className="h-4 w-4 text-[#B8976A] mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex gap-6 mb-8 pb-8 border-b border-[#E5E1D8] text-sm text-[#6B6866]">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-[#B8976A]" />
                  {product.material}
                </div>
                <div className="flex items-center gap-2">
                  <Ruler className="h-4 w-4 text-[#B8976A]" />
                  {product.dimensions}
                </div>
              </div>

              <button
                onClick={handleAdd}
                className={`flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-200 ${
                  added
                    ? "bg-[#F0EDE6] text-[#6B6866]"
                    : "bg-[#1A1A1A] text-white hover:bg-[#333330]"
                }`}
              >
                {added ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs text-[#6B6866]">
                Free shipping on orders over $40 &middot; 30-day returns
              </p>
            </div>
          </div>
        </div>

        {/* Related */}
        <div className="border-t border-[#E5E1D8] bg-[#F0EDE6]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8976A] mb-2">
              Discover More
            </p>
            <h2 className="text-2xl font-bold mb-8">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
