"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProductData = {
  id?: string;
  slug?: string;
  name?: string;
  price?: number;
  description?: string;
  longDescription?: string;
  image?: string;
  category?: string;
  badge?: string;
  features?: string[];
  material?: string;
  dimensions?: string;
  active?: boolean;
};

export default function ProductForm({ initial = {}, isEdit = false }: { initial?: ProductData; isEdit?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [featuresText, setFeaturesText] = useState(
    (initial.features ?? []).join("\n")
  );
  const [form, setForm] = useState({
    id: initial.id ?? "",
    slug: initial.slug ?? "",
    name: initial.name ?? "",
    price: String((initial.price ?? 0) / 100),
    description: initial.description ?? "",
    longDescription: initial.longDescription ?? "",
    image: initial.image ?? "",
    category: initial.category ?? "Desk Accessories",
    badge: initial.badge ?? "",
    material: initial.material ?? "",
    dimensions: initial.dimensions ?? "",
    active: initial.active ?? true,
  });

  function set(key: string, value: string | boolean) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      price: Math.round(Number(form.price) * 100),
      features: featuresText.split("\n").filter(Boolean),
      active: form.active,
    };

    const url = isEdit ? `/api/admin/products/${form.id}` : "/api/admin/products";
    const method = isEdit ? "PATCH" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    router.push("/admin/products");
    router.refresh();
  }

  const inputClass = "w-full rounded-lg border border-[#E5E1D8] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8976A]/30 focus:border-[#B8976A]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        {!isEdit && (
          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">ID (e.g. prod_007)</label>
            <input required className={inputClass} value={form.id} onChange={(e) => set("id", e.target.value)} />
          </div>
        )}
        <div>
          <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Slug (URL)</label>
          <input required className={inputClass} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="my-product-name" />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Name</label>
        <input required className={inputClass} value={form.name} onChange={(e) => set("name", e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Price (USD)</label>
          <input required type="number" step="0.01" min="0" className={inputClass} value={form.price} onChange={(e) => set("price", e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Category</label>
          <select className={inputClass} value={form.category} onChange={(e) => set("category", e.target.value)}>
            <option>Desk Accessories</option>
            <option>Cable Management</option>
            <option>Organization</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Short Description</label>
        <input required className={inputClass} value={form.description} onChange={(e) => set("description", e.target.value)} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Long Description</label>
        <textarea required rows={4} className={inputClass} value={form.longDescription} onChange={(e) => set("longDescription", e.target.value)} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Features (one per line)</label>
        <textarea rows={4} className={inputClass} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} placeholder="Compatible with all phones&#10;Non-slip base&#10;..." />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Material</label>
          <input className={inputClass} value={form.material} onChange={(e) => set("material", e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Dimensions</label>
          <input className={inputClass} value={form.dimensions} onChange={(e) => set("dimensions", e.target.value)} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Badge (optional)</label>
          <input className={inputClass} value={form.badge} onChange={(e) => set("badge", e.target.value)} placeholder="Best Seller" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Image URL</label>
          <input className={inputClass} value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="/products/my-product.jpg" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input type="checkbox" id="active" checked={form.active} onChange={(e) => set("active", e.target.checked)} className="rounded" />
        <label htmlFor="active" className="text-sm font-medium text-[#1A1A1A]">Active (visible in store)</label>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#1A1A1A] hover:bg-[#333330] text-white rounded-xl px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : isEdit ? "Save Changes" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="border border-[#E5E1D8] rounded-xl px-6 py-3 text-sm font-semibold text-[#6B6866] hover:text-[#1A1A1A] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
