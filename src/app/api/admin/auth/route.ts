import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken, cookieName, cookieOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminHash) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
  }

  if (email !== adminEmail || !(await bcrypt.compare(password, adminHash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await signToken({ email });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookieName(), token, cookieOptions());
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(cookieName(), "", { maxAge: 0, path: "/" });
  return res;
}
