import type { Metadata } from "next";
import { Suspense } from "react";
import { ThankYouClient } from "@/components/ThankYouClient";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your order is confirmed. Send photos on WhatsApp to continue.",
};

// This page is fully static — the order number is read client-side from the
// URL. That means it's served instantly from the CDN and can even be
// prefetched by the checkout page, so the post-payment navigation never
// depends on a fresh server round-trip (important on flaky mobile networks).
export default function ThankYouPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Suspense fallback={null}>
        <ThankYouClient />
      </Suspense>
    </div>
  );
}
