import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const products = await db.product.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const product = await db.product.create({
    data: {
      ...data,
      features: JSON.stringify(data.features ?? []),
    },
  });
  return NextResponse.json(product, { status: 201 });
}
