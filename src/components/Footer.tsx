import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#E5E1D8] bg-[#F0EDE6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link
              href="/"
              className="inline-block text-base font-bold tracking-[0.18em] uppercase mb-4"
            >
              Ameizze
            </Link>
            <p className="text-sm text-[#6B6866] leading-relaxed max-w-xs">
              Premium 3D printed desk accessories designed for modern workspaces.
              Precision-engineered. Made in the USA.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1A1A] mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/products", label: "All Products" },
                { href: "/products?category=Desk+Accessories", label: "Desk Accessories" },
                { href: "/products?category=Cable+Management", label: "Cable Management" },
                { href: "/products?category=Organization", label: "Organization" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-[#6B6866] hover:text-[#1A1A1A] transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#1A1A1A] mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@ameizze.com"
                  className="text-sm text-[#6B6866] hover:text-[#1A1A1A] transition-colors"
                >
                  hello@ameizze.com
                </a>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-sm text-[#6B6866] hover:text-[#1A1A1A] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[#E5E1D8] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B6866]">
            © {new Date().getFullYear()} Ameizze. All rights reserved.
          </p>
          <p className="text-xs text-[#6B6866]">
            Secure payments by{" "}
            <span className="text-[#635bff] font-medium">Stripe</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
