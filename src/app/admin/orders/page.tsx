import { db } from "@/lib/db";
import { formatPrice } from "@/lib/products";
import Link from "next/link";
import { Printer } from "lucide-react";

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-green-100 text-green-700",
  delivered: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-700",
};

export default async function OrdersPage() {
  const orders = await db.order.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Orders</h1>
        <p className="text-sm text-[#6B6866] mt-1">{orders.length} total orders</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E1D8] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E1D8] bg-[#F9F8F6]">
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6866]">Customer</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6866]">Ship To</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6866]">Total</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6866]">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6866]">Tracking</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6866]">Date</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-[#E5E1D8] last:border-0 hover:bg-[#F9F8F6]">
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#1A1A1A]">{o.customerName}</p>
                    <p className="text-xs text-[#6B6866]">{o.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4 text-[#6B6866] text-xs">
                    <p>{o.addressLine1}</p>
                    <p>{o.addressCity}, {o.addressState} {o.addressZip}</p>
                  </td>
                  <td className="px-6 py-4 font-semibold">{formatPrice(o.total)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_COLOR[o.status] ?? ""}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-[#6B6866]">
                    {o.trackingNumber ?? "—"}
                  </td>
                  <td className="px-6 py-4 text-xs text-[#6B6866]">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/orders/${o.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#1A1A1A] text-white px-3 py-1.5 text-xs font-semibold hover:bg-[#333330] transition-colors"
                    >
                      <Printer className="h-3.5 w-3.5" />
                      {o.labelUrl ? "Reprint" : "Print Label"}
                    </Link>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-[#6B6866]">
                    No orders yet. They will appear here when customers check out.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
