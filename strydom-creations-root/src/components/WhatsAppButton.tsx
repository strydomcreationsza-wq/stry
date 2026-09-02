"use client";

import { useState } from "react";
import { MessageCircle, Copy, Check, X, ExternalLink } from "lucide-react";
import { buildWhatsAppUrl, buildWhatsAppWebUrl } from "@/lib/whatsapp";
import { BUSINESS } from "@/lib/config";
import { cn } from "@/lib/utils";

type Props = {
  message: string;
  label?: string;
  className?: string;
  variant?: "primary" | "soft" | "outline";
  showFallback?: boolean;
};

function isMobileDevice(): boolean {
  if (typeof window === "undefined") return false;
  return /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent,
  );
}

export function WhatsAppButton({
  message,
  label = "Message us on WhatsApp",
  className,
  variant = "primary",
  showFallback = true,
}: Props) {
  const [copied, setCopied] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const mobileHref = buildWhatsAppUrl(message);

  const styles =
    variant === "primary"
      ? "bg-[#25D366] text-white hover:bg-[#1ebe57] shadow-sm"
      : variant === "soft"
        ? "bg-[#e8f8ee] text-[#128C4A] hover:bg-[#d8f3e4]"
        : "border border-[#25D366] text-[#128C4A] hover:bg-[#e8f8ee]";

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    const onMobile = isMobileDevice();

    if (onMobile) {
      // Mobile: let the link open in a NEW tab (anchor target="_blank").
      // Never navigate the current page away — if WhatsApp fails to open,
      // the user keeps their place on the site (e.g. the order confirmation).
      return;
    }

    // Desktop: show a friendly modal that lets the user pick WhatsApp Web,
    // copy the message, or copy the number — no api.whatsapp.com redirect.
    e.preventDefault();
    setShowModal(true);
  }

  async function copy(text: string, setter: (v: boolean) => void) {
    try {
      await navigator.clipboard.writeText(text);
      setter(true);
      setTimeout(() => setter(false), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <>
      <div className="inline-flex flex-col items-start gap-2">
        <a
          href={mobileHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition",
            styles,
            className,
          )}
        >
          <MessageCircle className="h-4 w-4" />
          {label}
        </a>
        {showFallback && (
          <div className="flex flex-wrap items-center gap-3 text-xs text-[#7a5f56]">
            <button
              type="button"
              onClick={() => copy(BUSINESS.phoneDisplay, setCopied)}
              className="inline-flex items-center gap-1.5 hover:text-[#5c3d36]"
            >
              {copied ? (
                <>
                  <Check className="h-3 w-3 text-[#128C4A]" />
                  <span className="text-[#128C4A]">Copied {BUSINESS.phoneDisplay}</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy number: {BUSINESS.phoneDisplay}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#f0e2d8] bg-[#25D366] px-5 py-4 text-white">
              <div>
                <p className="font-display text-lg font-semibold">Message us on WhatsApp</p>
                <p className="text-xs opacity-90">{BUSINESS.phoneDisplay}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="rounded-full p-1 hover:bg-white/10"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-5">
              <p className="text-sm text-[#5c3d36]">
                Choose the easiest way to reach us — all three work:
              </p>

              <a
                href={buildWhatsAppWebUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1ebe57]"
              >
                <ExternalLink className="h-4 w-4" />
                Open WhatsApp Web
              </a>

              <button
                type="button"
                onClick={() => copy(message, setCopiedMsg)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#ead9cd] bg-white px-5 py-3 text-sm font-semibold text-[#5c3d36] hover:bg-[#fff5ef]"
              >
                {copiedMsg ? (
                  <>
                    <Check className="h-4 w-4 text-[#128C4A]" />
                    <span className="text-[#128C4A]">Message copied — paste in WhatsApp</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy pre-filled message
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => copy(BUSINESS.phoneDisplay, setCopied)}
                className="flex w-full items-center justify-center gap-2 rounded-full border border-[#ead9cd] bg-white px-5 py-3 text-sm font-semibold text-[#5c3d36] hover:bg-[#fff5ef]"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-[#128C4A]" />
                    <span className="text-[#128C4A]">Number copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copy number: {BUSINESS.phoneDisplay}
                  </>
                )}
              </button>

              <div className="rounded-2xl bg-[#fffaf5] p-3 text-xs text-[#7a5f56]">
                <p className="font-medium text-[#5c3d36]">Message preview:</p>
                <pre className="mt-2 max-h-40 overflow-auto whitespace-pre-wrap break-words font-sans text-[11px] leading-relaxed">
{message}
                </pre>
              </div>

              <p className="text-center text-xs text-[#9a7f74]">
                Tip: on your phone, WhatsApp opens automatically — this popup only appears on
                desktop.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
