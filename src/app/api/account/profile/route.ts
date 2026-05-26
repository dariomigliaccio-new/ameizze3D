import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCustomerSession } from "@/lib/customer-auth";

export async function GET() {
  const session = await getCustomerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const customer = await db.customer.findUnique({
    where: { id: session.id },
    select: { id: true, name: true, email: true, phone: true, createdAt: true },
  });
  return NextResponse.json(customer);
}

export async function PUT(req: NextRequest) {
  const session = await getCustomerSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name, phone } = await req.json();
  const customer = await db.customer.update({
    where: { id: session.id },
    data: { name, phone },
    select: { id: true, name: true, email: true, phone: true },
  });
  return NextResponse.json(customer);
}
