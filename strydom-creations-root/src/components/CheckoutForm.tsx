"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { COURIER_OPTIONS, formatRand, formatRandExact } from "@/lib/config";
import { CourierPicker } from "./CourierPicker";
import { BankDetails } from "./BankDetails";
import { Landmark, Loader2 } from "lucide-react";

export type CheckoutPayload = {
  category: string;
  productName: string;
  bookPrice: number;
  childName?: string;
  ageGroup?: string;
  theme?: string;
  problem?: string;
  language?: string;
  companion?: string;
  customerEmail?: string;
  customerName?: string;
  customerPhone?: string;
  occasion?: string;
  configSnapshot?: unknown;
};

const STORAGE_KEY = "lsn_checkout";

export function CheckoutForm() {
  const router = useRouter();
  const [payload, setPayload] = useState<CheckoutPayload | null>(null);
  const [courierId, setCourierId] = useState("pudo");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Preload the thank-you page while the customer fills in the form, so the
    // post-payment navigation is instant and doesn't depend on the network.
    router.prefetch("/thank-you");
  }, [router]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw) as CheckoutPayload;
      setPayload(data);
      if (data.customerEmail) setCustomerEmail(data.customerEmail);
      if (data.customerName) setCustomerName(data.customerName);
    } catch {
      setPayload(null);
    }
  }, []);

  const courier = COURIER_OPTIONS.find((c) => c.id === courierId) || COURIER_OPTIONS[0];
  const totals = useMemo(() => {
    if (!payload) return { book: 0, courier: 0, total: 0 };
    return {
      book: payload.bookPrice,
      courier: courier.price,
      total: payload.bookPrice + courier.price,
    };
  }, [payload, courier]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!payload) return;
    setError("");

    if (customerName.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail.trim())) {
      setError("Please enter a valid email.");
      return;
    }
    if (!agreed) {
      setError("Please confirm you'll pay by EFT so we can start your book.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim().toLowerCase(),
          customerPhone: customerPhone.trim() || undefined,
          notes: notes.trim() || undefined,
          courierOption: courier.name,
          courierPrice: courier.price,
          bookPrice: payload.bookPrice,
          totalPrice: totals.total,
          paymentMethod: "eft",
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not place order");
      }
      sessionStorage.removeItem(STORAGE_KEY);
      sessionStorage.setItem(
        "lsn_thankyou",
        JSON.stringify({
          orderNumber: data.order.orderNumber,
          email: data.order.customerEmail,
          total: data.order.totalPrice,
          productName: data.order.productName,
          category: data.order.category,
          childName: data.order.childName,
          theme: data.order.theme,
          problem: data.order.problem,
          language: data.order.language,
          companion: data.order.companion,
          courier: data.order.courierOption,
          ageGroup: data.order.ageGroup,
          format: (payload.configSnapshot as { formatLabel?: string } | null | undefined)
            ?.formatLabel,
          occasion: payload.occasion,
          emailSent:
            data.receipts?.customerEmail?.provider === "formsubmit",
        }),
      );
      router.push(`/thank-you?order=${encodeURIComponent(data.order.orderNumber)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  if (!payload) {
    return (
      <div className="rounded-3xl border border-[#ead9cd] bg-white p-8 text-center">
        <h1 className="font-display text-2xl font-semibold text-[#3d2c29]">Your cart is empty</h1>
        <p className="mt-2 text-sm text-[#7a5f56]">
          Choose a book first, then you&apos;ll land here to pick courier and see EFT details.
        </p>
        <a
          href="/shop"
          className="mt-6 inline-flex rounded-full bg-[#c4785a] px-5 py-3 text-sm font-semibold text-white"
        >
          Browse books
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="space-y-6">
        <section className="rounded-3xl border border-[#ead9cd] bg-white p-5 sm:p-6">
          <h2 className="font-display text-xl font-semibold text-[#3d2c29]">Your details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-[#5c3d36]">Full name</span>
              <input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full rounded-xl border border-[#ead9cd] px-3 py-3 outline-none focus:border-[#c4785a]"
                required
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-[#5c3d36]">Email</span>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full rounded-xl border border-[#ead9cd] px-3 py-3 outline-none focus:border-[#c4785a]"
                required
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-[#5c3d36]">
                Phone <span className="font-normal text-[#9a7f74]">(optional)</span>
              </span>
              <input
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full rounded-xl border border-[#ead9cd] px-3 py-3 outline-none focus:border-[#c4785a]"
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-medium text-[#5c3d36]">
                Notes for us <span className="font-normal text-[#9a7f74]">(optional)</span>
              </span>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-[#ead9cd] px-3 py-3 outline-none focus:border-[#c4785a]"
                placeholder="Anything we should know?"
              />
            </label>
          </div>
        </section>

        <section className="rounded-3xl border border-[#ead9cd] bg-white p-5 sm:p-6">
          <h2 className="font-display text-xl font-semibold text-[#3d2c29]">Courier</h2>
          <p className="mt-1 text-sm text-[#7a5f56]">
            Choose how you&apos;d like to receive the finished book.
          </p>
          <div className="mt-4">
            <CourierPicker value={courierId} onChange={setCourierId} />
          </div>
        </section>

        <section className="rounded-3xl border border-[#ead9cd] bg-white p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Landmark className="h-4 w-4 text-[#8b5a4a]" />
            <h2 className="font-display text-xl font-semibold text-[#3d2c29]">
              Payment method — EFT (Bank transfer)
            </h2>
          </div>
          <p className="mt-1 text-sm text-[#7a5f56]">
            We accept payment via EFT into our Standard Bank business account. When you place your
            order you&apos;ll receive an order number to use as your payment reference. As soon as the
            payment reflects, we start your book.
          </p>

          <div className="mt-4">
            <BankDetails />
          </div>

          <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-2xl bg-[#fffaf5] p-3 text-sm text-[#5c3d36]">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-[#d9b9a8] text-[#c4785a] focus:ring-[#c4785a]"
            />
            <span>
              I&apos;ll pay the total by EFT within 24–48 hours using my order number as the reference.
              Strydom Creations will begin the book once payment reflects.
            </span>
          </label>
        </section>
      </div>

      <aside className="h-fit rounded-3xl border border-[#ead9cd] bg-[#fffaf5] p-5 sm:p-6 lg:sticky lg:top-24">
        <h2 className="font-display text-xl font-semibold text-[#3d2c29]">Order summary</h2>
        <div className="mt-4 space-y-2 border-b border-[#ead9cd] pb-4 text-sm">
          <div className="flex justify-between gap-3">
            <span className="text-[#5c3d36]">{payload.productName}</span>
            <span className="font-medium">{formatRand(payload.bookPrice)}</span>
          </div>
          {payload.childName && <p className="text-[#7a5f56]">For {payload.childName}</p>}
          {payload.ageGroup && <p className="text-[#7a5f56]">{payload.ageGroup}</p>}
          {payload.theme && <p className="text-[#7a5f56]">Theme: {payload.theme}</p>}
          {payload.problem && <p className="text-[#7a5f56]">Focus: {payload.problem}</p>}
          {payload.language && <p className="text-[#7a5f56]">Language: {payload.language}</p>}
          {payload.companion && <p className="text-[#7a5f56]">Companion: {payload.companion}</p>}
          {payload.occasion && <p className="text-[#7a5f56]">Occasion: {payload.occasion}</p>}
        </div>
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-[#7a5f56]">Book</span>
            <span>{formatRandExact(totals.book)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#7a5f56]">{courier.name}</span>
            <span>{formatRandExact(totals.courier)}</span>
          </div>
          <div className="flex justify-between border-t border-[#ead9cd] pt-3 text-base font-semibold text-[#3d2c29]">
            <span>Total (EFT)</span>
            <span>{formatRandExact(totals.total)}</span>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-xl bg-[#fdecea] px-3 py-2 text-sm text-[#9b3b2e]">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#c4785a] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b0654a] disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Placing order…
            </>
          ) : (
            <>Place order · {formatRand(totals.total)}</>
          )}
        </button>
        <p className="mt-3 text-center text-xs text-[#9a7f74]">
          You&apos;ll receive an EFT invoice by email and an order number to use as the reference.
        </p>
      </aside>
    </form>
  );
}
