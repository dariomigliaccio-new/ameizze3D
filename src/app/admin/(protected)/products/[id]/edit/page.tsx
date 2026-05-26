import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductForm from "../../ProductForm";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await db.product.findUnique({ where: { id } });
  if (!product) notFound();

  const initial = {
    ...product,
    features: JSON.parse(product.features) as string[],
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-8">Edit Product</h1>
      <ProductForm initial={initial} isEdit />
    </div>
  );
}
