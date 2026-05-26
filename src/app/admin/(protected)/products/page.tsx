import { db } from "@/lib/db";
import { formatPrice } from "@/lib/products";
import Link from "next/link";
import { Plus } from "lucide-react";
import ProductActions from "./ProductActions";

export default async function ProductsPage() {
  const products = await db.product.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Products</h1>
          <p className="text-sm text-[#6B6866] mt-1">{products.length} products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#333330] text-white rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors"
        >
          <Plus className="h-4 w-4" /> New Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E1D8] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E1D8] bg-[#F9F8F6]">
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6866]">Product</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6866]">Category</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6866]">Price</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6866]">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-[#E5E1D8] last:border-0 hover:bg-[#F9F8F6]">
                <td className="px-6 py-4">
                  <p className="font-medium text-[#1A1A1A]">{p.name}</p>
                  <p className="text-xs text-[#6B6866]">{p.slug}</p>
                </td>
                <td className="px-6 py-4 text-[#6B6866]">{p.category}</td>
                <td className="px-6 py-4 font-semibold">{formatPrice(p.price)}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${p.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {p.active ? "Active" : "Hidden"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <ProductActions id={p.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
