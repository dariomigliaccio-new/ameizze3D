import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import FadeIn from "@/components/FadeIn";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { ArrowRight, Truck, RotateCcw, Leaf, Award } from "lucide-react";

export default function HomePage() {
  const featured = products.slice(0, 3);

  return (
    <>
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <section className="bg-[#F0EDE6] border-b border-[#E5E1D8]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-40">
            <div className="max-w-3xl">
              <FadeIn delay={0}>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#B8976A] mb-6">
                  Precision 3D Printed in the USA
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6 text-[#1A1A1A]">
                  3D Printed Desk<br />Accessories Built<br />to Last a Lifetime.
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-lg text-[#6B6866] leading-relaxed mb-10 max-w-lg">
                  Precision-engineered stands, organizers, and cable management solutions for the modern workspace. Made with high-strength PLA+ and PETG.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="bg-[#1A1A1A] hover:bg-[#333330] text-white rounded-xl px-8 h-12"
                    render={<Link href="/products" />}
                  >
                    Shop All Products
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-xl px-8 h-12 border-[#E5E1D8] bg-white"
                    render={<Link href="/#about" />}
                  >
                    Our Story
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Trust bar */}
        <section className="border-b border-[#E5E1D8] bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#E5E1D8]">
              {[
                { icon: Truck, title: "Free Shipping", sub: "On orders over $40" },
                { icon: RotateCcw, title: "30-Day Returns", sub: "Hassle-free policy" },
                { icon: Leaf, title: "Eco Materials", sub: "PLA+ & PETG only" },
                { icon: Award, title: "5-Star Rated", sub: "100+ happy customers" },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="flex items-center gap-3 px-6 py-5">
                  <Icon className="h-5 w-5 text-[#B8976A] shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-[#1A1A1A]">{title}</p>
                    <p className="text-xs text-[#6B6866]">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <FadeIn>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8976A] mb-2">
                  Top Picks
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Best Sellers
                </h2>
              </div>
              <Button
                variant="ghost"
                className="hidden sm:inline-flex text-[#6B6866]"
                render={<Link href="/products" />}
              >
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((p, i) => (
              <FadeIn key={p.id} delay={i * 0.1}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="link" render={<Link href="/products" />}>
              View all products <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Materials callout */}
        <section className="border-y border-[#E5E1D8] bg-[#F0EDE6]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <FadeIn direction="right">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8976A] mb-3">
                    Premium Materials
                  </p>
                  <h2 className="text-3xl font-bold mb-4">
                    No cheap plastic.<br />Ever.
                  </h2>
                  <p className="text-[#6B6866] leading-relaxed mb-6">
                    Every product is printed with professional-grade PLA+ or PETG filament — materials engineered for durability, not disposability.
                  </p>
                  <Button
                    variant="link"
                    className="px-0 text-[#1A1A1A] underline-offset-4 decoration-[#B8976A]"
                    render={<Link href="/products" />}
                  >
                    Explore the collection <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </FadeIn>
              <FadeIn direction="left" delay={0.1}>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "PLA+", sub: "High-strength & rigid" },
                    { label: "PETG", sub: "Flexible & durable" },
                    { label: "USA Made", sub: "Printed locally" },
                    { label: "Lasts Years", sub: "Built to endure" },
                  ].map(({ label, sub }) => (
                    <div key={label} className="rounded-xl bg-white border border-[#E5E1D8] p-5">
                      <p className="font-bold text-[#1A1A1A] mb-1">{label}</p>
                      <p className="text-xs text-[#6B6866]">{sub}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <FadeIn>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8976A] mb-3">
                Our Story
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Made with precision,<br />built for life.
              </h2>
              <p className="text-[#6B6866] leading-relaxed">
                Every Ameizze product starts as an idea to solve a real problem. We design, prototype, and print everything with professional-grade materials so your accessories work as hard as you do. No cheap plastic — just high-strength PLA+ and PETG that lasts for years.
              </p>
            </div>
          </FadeIn>
        </section>

        {/* CTA */}
        <section id="contact" className="border-t border-[#E5E1D8] bg-[#1A1A1A]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8976A] mb-4">
                Upgrade your workspace
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to get organised?
              </h2>
              <p className="text-[#9A9896] mb-8 max-w-md mx-auto">
                Browse our full collection and find the perfect addition to your desk.
              </p>
              <Button
                size="lg"
                className="bg-white text-[#1A1A1A] hover:bg-[#F0EDE6] rounded-xl px-8 h-12"
                render={<Link href="/products" />}
              >
                Shop All Products <ArrowRight className="h-4 w-4" />
              </Button>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
