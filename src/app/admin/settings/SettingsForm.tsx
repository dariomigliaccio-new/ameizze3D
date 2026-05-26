"use client";

import { useState } from "react";

const ADDRESS_FIELDS = [
  { key: "from_name", label: "Name", placeholder: "Your Name" },
  { key: "from_company", label: "Company", placeholder: "Ameizze" },
  { key: "from_street1", label: "Address Line 1", placeholder: "123 Main St" },
  { key: "from_street2", label: "Address Line 2", placeholder: "Suite 100 (optional)" },
  { key: "from_city", label: "City", placeholder: "Los Angeles" },
  { key: "from_state", label: "State", placeholder: "CA" },
  { key: "from_zip", label: "ZIP Code", placeholder: "90001" },
  { key: "from_email", label: "Email", placeholder: "hello@ameizze.com" },
  { key: "from_phone", label: "Phone", placeholder: "+1 555 000 0000" },
];

export default function SettingsForm({ settings }: { settings: Record<string, string> }) {
  const [form, setForm] = useState(settings);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  function set(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaved(true);
    setLoading(false);
    setTimeout(() => setSaved(false), 2000);
  }

  const inputClass = "w-full rounded-lg border border-[#E5E1D8] px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#B8976A]/30 focus:border-[#B8976A]";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Sender Address */}
      <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B6866] mb-2">Sender Address (USPS Labels)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ADDRESS_FIELDS.map(({ key, label, placeholder }) => (
            <div key={key} className={key === "from_street1" || key === "from_street2" ? "sm:col-span-2" : ""}>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">{label}</label>
              <input
                className={inputClass}
                value={form[key] ?? ""}
                onChange={(e) => set(key, e.target.value)}
                placeholder={placeholder}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Announcement Bar */}
      <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B6866]">Announcement Bar</h2>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs text-[#6B6866]">Active</span>
            <input
              type="checkbox"
              checked={form.promo_bar_active === "true"}
              onChange={(e) => set("promo_bar_active", e.target.checked ? "true" : "false")}
              className="w-4 h-4 accent-[#1A1A1A]"
            />
          </label>
        </div>
        <p className="text-xs text-[#6B6866]">Shows a dismissible bar at the top of every page.</p>
        <div>
          <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Message</label>
          <input
            className={inputClass}
            value={form.promo_bar_text ?? ""}
            onChange={(e) => set("promo_bar_text", e.target.value)}
            placeholder="Use code SAVE10 for 10% off all orders!"
          />
        </div>
      </div>

      {/* Discount Modal */}
      <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B6866]">Discount Modal</h2>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs text-[#6B6866]">Active</span>
            <input
              type="checkbox"
              checked={form.promo_modal_active === "true"}
              onChange={(e) => set("promo_modal_active", e.target.checked ? "true" : "false")}
              className="w-4 h-4 accent-[#1A1A1A]"
            />
          </label>
        </div>
        <p className="text-xs text-[#6B6866]">
          Popup shown 2 seconds after the first visit. Once dismissed, it won&apos;t appear again for that browser.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Title</label>
            <input
              className={inputClass}
              value={form.promo_modal_title ?? ""}
              onChange={(e) => set("promo_modal_title", e.target.value)}
              placeholder="Welcome! Get 10% Off Your First Order"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Body Text</label>
            <input
              className={inputClass}
              value={form.promo_modal_body ?? ""}
              onChange={(e) => set("promo_modal_body", e.target.value)}
              placeholder="Use the code below at checkout. Limited time offer."
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">Discount Code</label>
            <input
              className={inputClass + " font-mono uppercase"}
              value={form.promo_modal_code ?? ""}
              onChange={(e) => set("promo_modal_code", e.target.value.toUpperCase())}
              placeholder="SAVE10"
            />
          </div>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#1A1A1A] hover:bg-[#333330] text-white rounded-xl px-8 py-3 text-sm font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
        >
          {saved ? "Saved!" : loading ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
