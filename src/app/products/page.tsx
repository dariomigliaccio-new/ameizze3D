import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata = {
  title: "Shop — Ameizze",
  description: "Browse all premium 3D printed desk accessories.",
};

export default function ProductsPage() {
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <>
      <Header />
      <main className="flex-1">
        {/* Page header */}
        <div className="border-b border-[#E5E1D8] bg-[#F0EDE6]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B8976A] mb-2">
              Collection
            </p>
            <h1 className="text-4xl font-bold tracking-tight">All Products</h1>
            <p className="text-[#6B6866] mt-2 text-sm">
              {products.length} products &middot; Free shipping over $40
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
          {categories.map((cat) => (
            <div key={cat} className="mb-16">
              <div className="flex items-center gap-4 mb-7">
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#6B6866]">
                  {cat}
                </h2>
                <div className="flex-1 border-t border-[#E5E1D8]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products
                  .filter((p) => p.category === cat)
                  .map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
