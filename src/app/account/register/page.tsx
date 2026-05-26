"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function set(k: string, v: string) { setForm(f => ({ ...f, [k]: v })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/account/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      router.push("/account");
    } else {
      const data = await res.json();
      setError(data.error ?? "Something went wrong");
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
            <h1 className="text-2xl font-bold text-[#1A1A1A]">Create Account</h1>
            <p className="text-sm text-[#6B6866] mt-1">Join Ameizze for exclusive offers</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E5E1D8] p-8 space-y-4">
            {[
              { key: "name", label: "Full Name", type: "text", placeholder: "John Smith" },
              { key: "email", label: "Email", type: "email", placeholder: "you@example.com" },
              { key: "phone", label: "Phone (optional)", type: "tel", placeholder: "+1 555 000 0000" },
              { key: "password", label: "Password", type: "password", placeholder: "••••••••" },
            ].map(({ key, label, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">{label}</label>
                <input
                  type={type}
                  required={key !== "phone"}
                  value={form[key as keyof typeof form]}
                  onChange={e => set(key, e.target.value)}
                  placeholder={placeholder}
                  className={inputClass}
                />
              </div>
            ))}

            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A1A1A] hover:bg-[#333330] text-white rounded-xl py-3 text-sm font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-center text-xs text-[#6B6866]">
              Already have an account?{" "}
              <Link href="/account/login" className="text-[#B8976A] hover:underline font-medium">Sign in</Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
