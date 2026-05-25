import ProductForm from "../ProductForm";

export default function NewProductPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-[#1A1A1A] mb-8">New Product</h1>
      <ProductForm />
    </div>
  );
}
