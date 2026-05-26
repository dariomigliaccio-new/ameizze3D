"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  text: string;
}

export default function AnnouncementBar({ text }: Props) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative bg-[#1A1A1A] text-white text-center text-sm py-2.5 px-10">
      <span>{text}</span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
