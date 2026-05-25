"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ProductActions({ id }: { id: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/admin/products/${id}/edit`}
        className="rounded-lg border border-[#E5E1D8] px-3 py-1.5 text-xs font-semibold text-[#1A1A1A] hover:bg-[#F0EDE6] transition-colors"
      >
        Edit
      </Link>
      <button
        onClick={handleDelete}
        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
      >
        Delete
      </button>
    </div>
  );
}
