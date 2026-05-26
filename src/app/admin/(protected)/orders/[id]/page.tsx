"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/products";
import { ArrowLeft, Printer, ExternalLink, Package } from "lucide-react";
import Link from "next/link";

type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  addressLine1: string;
  addressLine2: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  addressCountry: string;
  items: string;
  total: number;
  status: string;
  labelUrl: string | null;
  trackingNumber: string | null;
  createdAt: string;
};

type Rate = {
  object_id: string;
  provider: string;
  servicelevel: { name: string };
  amount: string;
  currency: string;
  estimated_days: number;
};

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  processing: "bg-blue-100 text-blue-700",
  shipped: "bg-green-100 text-green-700",
  delivered: "bg-gray-100 text-gray-600",
  cancelled: "bg-red-100 text-red-700",
};

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [weightOz, setWeightOz] = useState("16");
  const [rates, setRates] = useState<Rate[]>([]);
  const [step, setStep] = useState<"idle" | "rates" | "done">("idle");
  const [loading, setLoading] = useState(false);
  const [statusUpdate, setStatusUpdate] = useState("");

  useEffect(() => {
    fetch(`/api/admin/orders/${id}`)
      .then((r) => r.json())
      .then(setOrder);
  }, [id]);

  async function getRates() {
    setLoading(true);
    const res = await fetch(`/api/admin/orders/${id}/label`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weightOz: Number(weightOz) }),
    });
    const data = await res.json();
    setRates(data.rates ?? []);
    setStep("rates");
    setLoading(false);
  }

  async function purchaseRate(rateId: string) {
    setLoading(true);
    const res = await fetch(`/api/admin/orders/${id}/label`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weightOz: Number(weightOz), rateId }),
    });
    const updated = await res.json();
    setOrder(updated);
    setStep("done");
    setLoading(false);
    if (updated.labelUrl) {
      window.open(updated.labelUrl, "_blank");
    }
  }

  async function updateStatus(status: string) {
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const updated = await res.json();
    setOrder(updated);
    setStatusUpdate("");
  }

  if (!order) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <div className="w-6 h-6 rounded-full border-2 border-[#B8976A] border-t-transparent animate-spin" />
      </div>
    );
  }

  const items = JSON.parse(order.items) as Array<{ name: string; quantity: number; price: number }>;

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin/orders"
          className="flex items-center gap-1.5 text-sm text-[#6B6866] hover:text-[#1A1A1A] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <h1 className="text-2xl font-bold text-[#1A1A1A]">Order Detail</h1>
        <span className={`ml-auto inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_COLOR[order.status] ?? ""}`}>
          {order.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Customer */}
        <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B6866] mb-4">Customer</h2>
          <p className="font-semibold text-[#1A1A1A]">{order.customerName}</p>
          <p className="text-sm text-[#6B6866]">{order.customerEmail}</p>
          <div className="mt-4 pt-4 border-t border-[#E5E1D8]">
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B6866] mb-2">Ship To</h3>
            <p className="text-sm text-[#1A1A1A]">{order.customerName}</p>
            <p className="text-sm text-[#6B6866]">{order.addressLine1}</p>
            {order.addressLine2 && <p className="text-sm text-[#6B6866]">{order.addressLine2}</p>}
            <p className="text-sm text-[#6B6866]">{order.addressCity}, {order.addressState} {order.addressZip}</p>
            <p className="text-sm text-[#6B6866]">{order.addressCountry}</p>
          </div>
        </div>

        {/* Items */}
        <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6">
          <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B6866] mb-4">Items Ordered</h2>
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-[#1A1A1A]">{item.name} × {item.quantity}</span>
                <span className="font-semibold">{formatPrice(item.price)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#E5E1D8] flex justify-between font-bold">
            <span>Total</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>
      </div>

      {/* Shipping Label */}
      <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6 mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B6866] mb-4">
          Shipping Label
        </h2>

        {order.labelUrl ? (
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.open(order.labelUrl!, "_blank")}
              className="flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#333330] text-white rounded-xl px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors"
            >
              <Printer className="h-4 w-4" /> Print Label
            </button>
            {order.trackingNumber && (
              <div className="flex items-center gap-2 text-sm text-[#6B6866] px-4 py-3 bg-[#F0EDE6] rounded-xl">
                <Package className="h-4 w-4 text-[#B8976A]" />
                Tracking: <span className="font-mono font-semibold text-[#1A1A1A]">{order.trackingNumber}</span>
              </div>
            )}
          </div>
        ) : step === "idle" ? (
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div>
              <label className="block text-xs font-semibold text-[#1A1A1A] mb-1.5">
                Package Weight (oz)
              </label>
              <input
                type="number"
                value={weightOz}
                onChange={(e) => setWeightOz(e.target.value)}
                className="rounded-lg border border-[#E5E1D8] px-3 py-2.5 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-[#B8976A]/30 focus:border-[#B8976A]"
                min="1"
              />
            </div>
            <button
              onClick={getRates}
              disabled={loading}
              className="flex items-center gap-2 bg-[#B8976A] hover:bg-[#A07858] text-white rounded-xl px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
            >
              {loading ? "Loading..." : "Get USPS Rates"}
            </button>
          </div>
        ) : step === "rates" ? (
          <div>
            <p className="text-sm font-semibold text-[#1A1A1A] mb-3">Select a shipping rate:</p>
            <div className="space-y-2">
              {rates.map((rate) => (
                <button
                  key={rate.object_id}
                  onClick={() => purchaseRate(rate.object_id)}
                  disabled={loading}
                  className="w-full flex items-center justify-between rounded-xl border border-[#E5E1D8] px-4 py-3 hover:border-[#B8976A] hover:bg-[#F0EDE6] transition-colors text-left disabled:opacity-50"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A1A]">
                      {rate.provider} — {rate.servicelevel.name}
                    </p>
                    <p className="text-xs text-[#6B6866]">{rate.estimated_days} business days</p>
                  </div>
                  <p className="text-base font-bold text-[#1A1A1A]">
                    ${rate.amount}
                  </p>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep("idle")}
              className="mt-3 text-sm text-[#6B6866] hover:text-[#1A1A1A] transition-colors"
            >
              ← Change weight
            </button>
          </div>
        ) : null}
      </div>

      {/* Update Status */}
      <div className="bg-white rounded-2xl border border-[#E5E1D8] p-6">
        <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-[#6B6866] mb-4">Update Status</h2>
        <div className="flex gap-2 flex-wrap">
          {["pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold capitalize transition-colors ${
                order.status === s
                  ? "bg-[#1A1A1A] text-white"
                  : "border border-[#E5E1D8] text-[#6B6866] hover:border-[#1A1A1A] hover:text-[#1A1A1A]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
