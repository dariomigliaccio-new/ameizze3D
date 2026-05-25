"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const totalItems = useCart((s) => s.totalItems());
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E1D8] bg-[#F9F8F6]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Wordmark */}
          <Link
            href="/"
            className="text-base font-bold tracking-[0.18em] uppercase text-[#1A1A1A]"
          >
            Ameizze
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { href: "/products", label: "Shop" },
              { href: "/#about", label: "About" },
              { href: "/#contact", label: "Contact" },
            ].map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-[#6B6866] hover:text-[#1A1A1A] transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#1A1A1A] hover:bg-[#F0EDE6] transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline text-sm">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1A1A1A] text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden rounded-lg p-2 hover:bg-[#F0EDE6] transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#E5E1D8] bg-[#F9F8F6] px-4 py-4 flex flex-col gap-4">
          {[
            { href: "/products", label: "Shop" },
            { href: "/#about", label: "About" },
            { href: "/#contact", label: "Contact" },
          ].map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="text-sm text-[#6B6866] hover:text-[#1A1A1A] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
