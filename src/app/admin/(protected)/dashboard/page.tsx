import { db } from "@/lib/db";
import { formatPrice } from "@/lib/products";

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B6866] mb-2">{label}</p>
      <p className="text-3xl font-bold text-[#1A1A1A]">{value}</p>
      {sub && <p className="text-xs text-[#6B6866] mt-1">{sub}</p>}
    </div>
  );
}

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-green-100 text-green-700",
  delivered: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-700",
};

export default async function DashboardPage() {
  const [orders, activeProducts] = await Promise.all([
    db.order.findMany({ orderBy: { createdAt: "desc" } }),
    db.product.count({ where: { active: true } }),
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayOrders = orders.filter((o) => new Date(o.createdAt) >= today);
  const pending = orders.filter((o) => o.status === "pending").length;
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const recentOrders = orders.slice(0, 8);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Dashboard</h1>
        <p className="text-sm text-[#6B6866] mt-1">Overview of your store</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Revenue" value={formatPrice(revenue)} />
        <StatCard label="Total Orders" value={String(orders.length)} sub={`${todayOrders.length} today`} />
        <StatCard label="Pending Labels" value={String(pending)} sub="need to ship" />
        <StatCard label="Active Products" value={String(activeProducts)} />
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E1D8]">
        <div className="px-6 py-4 border-b border-[#E5E1D8]">
          <h2 className="font-semibold text-[#1A1A1A]">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#E5E1D8] bg-[#F9F8F6]">
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6866]">Customer</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6866]">Address</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6866]">Total</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6866]">Status</th>
                <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#6B6866]">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id} className="border-b border-[#E5E1D8] last:border-0 hover:bg-[#F9F8F6]">
                  <td className="px-6 py-4">
                    <p className="font-medium text-[#1A1A1A]">{o.customerName}</p>
                    <p className="text-xs text-[#6B6866]">{o.customerEmail}</p>
                  </td>
                  <td className="px-6 py-4 text-[#6B6866]">
                    {o.addressCity}, {o.addressState}
                  </td>
                  <td className="px-6 py-4 font-semibold">{formatPrice(o.total)}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_COLOR[o.status] ?? "bg-gray-100 text-gray-600"}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#6B6866]">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[#6B6866]">
                    No orders yet
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
