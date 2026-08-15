"use client";

import { useSyncExternalStore, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { generalEnquiryMessage } from "@/lib/whatsapp";
import { BUSINESS } from "@/lib/config";
import { WhatsAppButton } from "./WhatsAppButton";

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export function WhatsAppFloat() {
  const [open, setOpen] = useState(false);
  const mounted = useMounted();

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div className="w-[min(320px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-[#ead9cd] bg-white shadow-[0_20px_50px_rgba(92,61,54,0.2)]">
          <div className="flex items-start justify-between gap-2 bg-[#25D366] px-4 py-3 text-white">
            <div>
              <p className="text-sm font-semibold">Chat with {BUSINESS.name}</p>
              <p className="text-xs opacity-90">Usually replies within an hour</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-white/90 hover:bg-white/10"
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-[#5c3d36]">
              Hi! 👋 Ask us anything about our personalised learning books — themes, ages,
              turnaround times, or your order.
            </p>
            <div className="mt-4">
              <WhatsAppButton
                message={generalEnquiryMessage()}
                label="Start WhatsApp chat"
                className="w-full"
              />
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] transition hover:scale-105 hover:bg-[#1ebe57]"
        aria-label="Open WhatsApp chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
