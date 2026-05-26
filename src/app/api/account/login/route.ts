import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, signCustomerToken, customerCookieName, customerCookieOptions } from "@/lib/customer-auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const customer = await db.customer.findUnique({ where: { email } });
  if (!customer || customer.passwordHash !== hashPassword(password)) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = await signCustomerToken({ id: customer.id, email: customer.email });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(customerCookieName, token, customerCookieOptions());
  return res;
}
