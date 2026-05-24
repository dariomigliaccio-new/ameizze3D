"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";
import { formatPrice, type Product } from "@/lib/products";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col rounded-xl border border-[#27272a] bg-[#18181b] overflow-hidden hover:border-[#f97316]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#f97316]/5"
    >
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 rounded-full bg-[#f97316] px-2.5 py-0.5 text-xs font-semibold text-white">
          {product.badge}
        </span>
      )}

      <div className="aspect-square bg-[#27272a] flex items-center justify-center overflow-hidden">
        <div className="text-6xl select-none">
          {product.category === "Cable Management" ? "🔌" :
           product.category === "Organization" ? "🗂️" : "🖥️"}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <p className="text-xs text-[#71717a] mb-1">{product.category}</p>
          <h3 className="font-semibold text-[#fafafa] group-hover:text-[#f97316] transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-[#71717a] mt-1 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-lg font-bold text-[#fafafa]">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200 ${
              added
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "bg-[#f97316] text-white hover:bg-[#ea6c0a]"
            }`}
          >
            {added ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5" />
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
