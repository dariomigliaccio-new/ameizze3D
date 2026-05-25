import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const [orders, products] = await Promise.all([
    db.order.findMany({ orderBy: { createdAt: "desc" } }),
    db.product.count({ where: { active: true } }),
  ]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayOrders = orders.filter((o) => new Date(o.createdAt) >= today);
  const pending = orders.filter((o) => o.status === "pending").length;
  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const todayRevenue = todayOrders.reduce((sum, o) => sum + o.total, 0);

  return NextResponse.json({
    totalOrders: orders.length,
    todayOrders: todayOrders.length,
    pending,
    revenue,
    todayRevenue,
    activeProducts: products,
    recentOrders: orders.slice(0, 5),
  });
}
