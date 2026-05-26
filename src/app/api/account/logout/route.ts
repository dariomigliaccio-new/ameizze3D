import { NextResponse } from "next/server";
import { customerCookieName } from "@/lib/customer-auth";

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(customerCookieName, "", { maxAge: 0, path: "/" });
  return res;
}
