"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Profile { id: string; name: string; email: string; phone: string; createdAt: string; }

export default function AccountPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState({ name: "", phone: "" });
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/account/profile")
      .then(r => { if (r.status === 401) router.push("/account/login"); return r.json(); })
      .then(data => { setProfile(data); setForm({ name: data.name, phone: data.phone ?? "" }); });
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/account/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaved(true);
    setLoading(false);
    setTimeout(() => setSaved(false), 2000);
  }

  async function handleLogout() {
    await fetch("/api/account/logout", { method: "DELETE" });
    router.push("/");
  }

  const inputClass = "w-full rounded-lg border border-[#E5E1D8] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8976A]/30 focus:border-[#B8976A] bg-white";

  if (!profile) return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center">
        <p className="text-sm text-[#6B6866]">Loading...</p>
      </main>
      <Footer />
    </>
  );

  return (
    <>
      <Header />
      <main className="flex-1 py-16 px-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#1A1A1A]">My Account</h1>
              <p className="text-sm text-[#6B6866] mt-1">{profile.email}</p>
            </div>
            <button onClick={handleLogout} className="text-xs text-[#6B6866] hover:text-[#1A1A1A] underline transition-colors">
              Sign out
            </button>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E5E1D8] p-8 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B6866]">Profile</h2>

            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Full Name</label>
              <input className={inputClass} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Email</label>
              <input className={inputClass + " opacity-60 cursor-not-allowed"} value={profile.email} disabled />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Phone</label>
              <input className={inputClass} value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+1 555 000 0000" />
            </div>

            <button type="submit" disabled={loading} className="bg-[#1A1A1A] hover:bg-[#333330] text-white rounded-xl px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-colors disabled:opacity-50">
              {saved ? "Saved!" : loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
