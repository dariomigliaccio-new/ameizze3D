"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";
import { ShoppingCart, Layers } from "lucide-react";

export default function Header() {
  const totalItems = useCart((s) => s.totalItems());

  return (
    <header className="sticky top-0 z-50 border-b border-[#27272a] bg-[#09090b]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#f97316]">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Ameizze <span className="text-[#f97316]">3D</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/products"
              className="text-sm text-[#71717a] hover:text-[#fafafa] transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/#about"
              className="text-sm text-[#71717a] hover:text-[#fafafa] transition-colors"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="text-sm text-[#71717a] hover:text-[#fafafa] transition-colors"
            >
              Contact
            </Link>
          </nav>

          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-md border border-[#27272a] px-3 py-2 text-sm hover:border-[#f97316] hover:text-[#f97316] transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#f97316] text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
