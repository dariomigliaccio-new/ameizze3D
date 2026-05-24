import Link from "next/link";
import { Layers } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#27272a] bg-[#09090b]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#f97316]">
                <Layers className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold">
                Ameizze <span className="text-[#f97316]">3D</span>
              </span>
            </Link>
            <p className="text-sm text-[#71717a] leading-relaxed">
              Premium 3D printed utility products designed for modern living.
              Made in the USA.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-[#71717a] hover:text-[#fafafa] transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Desk+Accessories"
                  className="text-sm text-[#71717a] hover:text-[#fafafa] transition-colors"
                >
                  Desk Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Organization"
                  className="text-sm text-[#71717a] hover:text-[#fafafa] transition-colors"
                >
                  Organization
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:hello@ameizze.com"
                  className="text-sm text-[#71717a] hover:text-[#fafafa] transition-colors"
                >
                  hello@ameizze.com
                </a>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-sm text-[#71717a] hover:text-[#fafafa] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#27272a] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#71717a]">
            © {new Date().getFullYear()} Ameizze 3D. All rights reserved.
          </p>
          <p className="text-xs text-[#71717a]">
            Secure payments by{" "}
            <span className="text-[#635bff] font-medium">Stripe</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
