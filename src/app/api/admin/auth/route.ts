import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken, cookieName, cookieOptions } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminHash) {
    return NextResponse.json({ error: "Admin not configured", emailSet: !!adminEmail, hashSet: !!adminHash }, { status: 500 });
  }

  const emailMatch = email === adminEmail;
  const passMatch = await bcrypt.compare(password, adminHash);
  if (!emailMatch || !passMatch) {
    return NextResponse.json({ error: "Invalid credentials", emailMatch, passMatch, gotEmail: email, envEmail: adminEmail }, { status: 401 });
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
