import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const orders = await db.order.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
}
