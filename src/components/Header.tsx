"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";
import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const NAV = [
  { href: "/products", label: "Shop" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const totalItems = useCart((s) => s.totalItems());

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
            {NAV.map(({ href, label }) => (
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
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden sm:inline">Cart</span>
              </Button>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1A1A1A] text-[10px] font-bold text-white pointer-events-none">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger
                className="md:hidden"
                render={
                  <Button variant="ghost" size="icon-sm" />
                }
              >
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-64 bg-[#F9F8F6] p-6">
                <nav className="flex flex-col gap-6 mt-8">
                  {NAV.map(({ href, label }) => (
                    <SheetClose
                      key={label}
                      render={<Link href={href} />}
                      className="text-base font-medium text-[#1A1A1A] hover:text-[#B8976A] transition-colors"
                    >
                      {label}
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
