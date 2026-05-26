"use client";

import { useEffect, useState } from "react";
import { X, Tag } from "lucide-react";

interface Props {
  title: string;
  body: string;
  code: string;
}

const STORAGE_KEY = "ameizze_promo_dismissed";

export default function DiscountModal({ title, body, code }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const t = setTimeout(() => setOpen(true), 2000);
      return () => clearTimeout(t);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative bg-[#F9F8F6] rounded-2xl border border-[#E5E1D8] shadow-2xl max-w-sm w-full p-8 text-center">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-[#6B6866] hover:text-[#1A1A1A] transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#B8976A]/15 mb-5">
          <Tag className="h-6 w-6 text-[#B8976A]" />
        </div>

        <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">{title}</h2>
        <p className="text-sm text-[#6B6866] mb-6">{body}</p>

        {code && (
          <button
            onClick={copyCode}
            className="inline-flex items-center gap-2 bg-[#1A1A1A] hover:bg-[#333330] text-white rounded-xl px-6 py-3 text-sm font-mono font-semibold tracking-widest transition-colors"
          >
            {copied ? "Copied!" : code}
          </button>
        )}

        <p className="text-xs text-[#6B6866] mt-4">
          {copied ? "Paste it at checkout" : "Click to copy"}
        </p>

        <button
          onClick={dismiss}
          className="block w-full mt-6 text-xs text-[#6B6866] hover:text-[#1A1A1A] transition-colors"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
