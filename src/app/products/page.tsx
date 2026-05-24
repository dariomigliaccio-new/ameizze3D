import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata = {
  title: "Shop — Ameizze 3D",
  description: "Browse all premium 3D printed utility products.",
};

export default function ProductsPage() {
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <>
      <Header />
      <main className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <p className="text-xs text-[#f97316] font-semibold uppercase tracking-widest mb-2">
            Collection
          </p>
          <h1 className="text-4xl font-bold tracking-tight">All Products</h1>
          <p className="text-[#71717a] mt-2">
            {products.length} products · Free shipping over $40
          </p>
        </div>

        {categories.map((cat) => (
          <div key={cat} className="mb-14">
            <h2 className="text-lg font-semibold mb-5 pb-3 border-b border-[#27272a]">
              {cat}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products
                .filter((p) => p.category === cat)
                .map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </>
  );
}
