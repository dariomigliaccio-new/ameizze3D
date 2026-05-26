"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AccountLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/account/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push("/account");
    } else {
      setError("Invalid email or password");
      setLoading(false);
    }
  }

  const inputClass = "w-full rounded-lg border border-[#E5E1D8] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8976A]/30 focus:border-[#B8976A] bg-white";

  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1A1A1A]">Sign In</h1>
            <p className="text-sm text-[#6B6866] mt-1">Welcome back to Ameizze</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E5E1D8] p-8 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Email</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Password</label>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
            </div>

            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

            <button type="submit" disabled={loading} className="w-full bg-[#1A1A1A] hover:bg-[#333330] text-white rounded-xl py-3 text-sm font-semibold uppercase tracking-wider transition-colors disabled:opacity-50">
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-center text-xs text-[#6B6866]">
              Don&apos;t have an account?{" "}
              <Link href="/account/register" className="text-[#B8976A] hover:underline font-medium">Create one</Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
