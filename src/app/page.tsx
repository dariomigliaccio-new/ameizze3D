import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";
import { ArrowRight, Truck, Shield, Zap, Star } from "lucide-react";

export default function HomePage() {
  const featured = products.slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-[#27272a]">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f97316]/10 via-transparent to-transparent pointer-events-none" />
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#f97316]/30 bg-[#f97316]/10 px-3 py-1 text-xs text-[#f97316] font-medium mb-6">
                <Zap className="h-3 w-3" />
                Precision 3D Printed in the USA
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-none mb-6">
                Upgrade Your
                <span className="block text-[#f97316]">Workspace.</span>
              </h1>
              <p className="text-lg text-[#71717a] leading-relaxed mb-8 max-w-lg">
                Premium 3D printed utility products — stands, organizers, and
                accessories engineered for modern desks. Built to last.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#f97316] px-6 py-3 text-sm font-semibold text-white hover:bg-[#ea6c0a] transition-colors"
                >
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#about"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#27272a] px-6 py-3 text-sm font-semibold text-[#fafafa] hover:border-[#71717a] transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Trust badges */}
        <section className="border-b border-[#27272a] bg-[#18181b]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                { icon: Truck, title: "Free Shipping", sub: "On orders over $40" },
                { icon: Shield, title: "Quality Guarantee", sub: "30-day returns" },
                { icon: Star, title: "5-Star Rated", sub: "100+ happy customers" },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex flex-col items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f97316]/10 text-[#f97316]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs text-[#71717a]">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs text-[#f97316] font-semibold uppercase tracking-widest mb-2">
                Top Picks
              </p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Best Sellers
              </h2>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex items-center gap-1 text-sm text-[#71717a] hover:text-[#f97316] transition-colors"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-[#f97316] font-medium"
            >
              View all products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* About */}
        <section id="about" className="border-t border-[#27272a] bg-[#18181b]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-xs text-[#f97316] font-semibold uppercase tracking-widest mb-3">
                Our Story
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Made with precision, built for life.
              </h2>
              <p className="text-[#71717a] leading-relaxed">
                Every Ameizze 3D product starts as an idea to solve a real
                problem. We design, prototype, and print everything with
                professional-grade materials so your accessories work as hard
                as you do. No cheap plastic — just high-strength PLA+ and
                PETG that lasts for years.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="rounded-2xl border border-[#f97316]/30 bg-gradient-to-br from-[#f97316]/10 to-transparent p-10 text-center">
            <h2 className="text-3xl font-bold mb-3">
              Ready to upgrade your desk?
            </h2>
            <p className="text-[#71717a] mb-6">
              Browse our full collection and find your perfect fit.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-lg bg-[#f97316] px-8 py-3 text-sm font-semibold text-white hover:bg-[#ea6c0a] transition-colors"
            >
              Shop All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
