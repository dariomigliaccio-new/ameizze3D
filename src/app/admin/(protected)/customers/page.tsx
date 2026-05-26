import { db } from "@/lib/db";

export default async function CustomersPage() {
  const customers = await db.customer.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A1A]">Customers</h1>
          <p className="text-sm text-[#6B6866] mt-1">{customers.length} registered</p>
        </div>
        <a
          href={`data:text/csv;charset=utf-8,Name,Email,Phone,Joined\n${customers.map(c => `${c.name},${c.email},${c.phone},${c.createdAt.toISOString().split("T")[0]}`).join("\n")}`}
          download="customers.csv"
          className="bg-[#1A1A1A] hover:bg-[#333330] text-white rounded-xl px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors"
        >
          Export CSV
        </a>
      </div>

      <div className="bg-white rounded-2xl border border-[#E5E1D8] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#E5E1D8] bg-[#F9F8F6]">
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#6B6866]">Name</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#6B6866]">Email</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#6B6866]">Phone</th>
              <th className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-[#6B6866]">Joined</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-12 text-[#6B6866]">No customers yet</td>
              </tr>
            ) : (
              customers.map(c => (
                <tr key={c.id} className="border-b border-[#E5E1D8] last:border-0 hover:bg-[#F9F8F6] transition-colors">
                  <td className="px-6 py-4 font-medium text-[#1A1A1A]">{c.name}</td>
                  <td className="px-6 py-4">
                    <a href={`mailto:${c.email}`} className="text-[#B8976A] hover:underline">{c.email}</a>
                  </td>
                  <td className="px-6 py-4 text-[#6B6866]">{c.phone || "—"}</td>
                  <td className="px-6 py-4 text-[#6B6866]">{c.createdAt.toISOString().split("T")[0]}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
