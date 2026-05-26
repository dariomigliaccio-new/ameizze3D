import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, signCustomerToken, customerCookieName, customerCookieOptions } from "@/lib/customer-auth";

export async function POST(req: NextRequest) {
  const { name, email, phone, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 });
  }

  const existing = await db.customer.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Email already registered" }, { status: 409 });
  }

  const customer = await db.customer.create({
    data: { name, email, phone: phone ?? "", passwordHash: hashPassword(password) },
  });

  const token = await signCustomerToken({ id: customer.id, email: customer.email });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(customerCookieName, token, customerCookieOptions());
  return res;
}
