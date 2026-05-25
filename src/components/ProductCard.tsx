"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";
import { formatPrice, type Product } from "@/lib/products";
import { Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const RATINGS: Record<string, { score: number; count: number }> = {
  prod_001: { score: 4.8, count: 142 },
  prod_002: { score: 4.6, count: 89 },
  prod_003: { score: 4.9, count: 67 },
  prod_004: { score: 4.7, count: 112 },
  prod_005: { score: 4.5, count: 54 },
  prod_006: { score: 4.8, count: 78 },
};

function Stars({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <svg
          key={n}
          className={`h-3.5 w-3.5 ${
            score >= n
              ? "text-[#B8976A]"
              : score >= n - 0.5
              ? "text-[#D4BA8A]"
              : "text-[#E5E1D8]"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const rating = RATINGS[product.id];

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col bg-white border border-[#E5E1D8] rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-[#1A1A1A]/6 transition-shadow duration-300"
    >
      {/* Image placeholder */}
      <div className="relative aspect-square bg-[#F0EDE6] flex items-center justify-center overflow-hidden">
        {product.badge && (
          <span className="absolute top-3 left-3 z-10 rounded-full bg-[#1A1A1A] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            {product.badge}
          </span>
        )}
        <div className="w-1/2 h-1/2 rounded-xl bg-[#E5E1D8] flex items-center justify-center">
          <span className="text-[10px] font-medium uppercase tracking-widest text-[#B8976A]">
            Photo
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col flex-1 p-5 gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#B8976A]">
          {product.category}
        </p>
        <h3 className="text-sm font-semibold text-[#1A1A1A] leading-snug line-clamp-2 group-hover:text-[#B8976A] transition-colors">
          {product.name}
        </h3>

        {rating && (
          <div className="flex items-center gap-2">
            <Stars score={rating.score} />
            <span className="text-[11px] text-[#6B6866]">
              {rating.score} ({rating.count})
            </span>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3">
          <span className="text-base font-bold text-[#1A1A1A]">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAdd}
            className={`rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
              added
                ? "bg-[#F0EDE6] text-[#6B6866]"
                : "bg-[#1A1A1A] text-white hover:bg-[#333330]"
            }`}
          >
            {added ? (
              <span className="flex items-center gap-1.5">
                <Check className="h-3 w-3" /> Added
              </span>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </Link>
    </motion.div>
  );
}
