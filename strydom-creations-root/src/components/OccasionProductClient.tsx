"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatRand, PRICES } from "@/lib/config";
import { WhatsAppButton } from "./WhatsAppButton";
import { occasionOrderMessage } from "@/lib/whatsapp";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  occasion: string;
};

const STORAGE_KEY = "lsn_checkout";

export function OccasionProductClient({ product }: { product: Product }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [childName, setChildName] = useState("");
  const [error, setError] = useState("");

  const waMessage = occasionOrderMessage({
    productName: product.name,
    occasion: product.occasion,
    childName: childName || undefined,
    email: email || undefined,
  });

  function goToCheckout() {
    setError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter your email so we can send your receipt.");
      return;
    }
    const payload = {
      category: "occasion",
      productName: product.name,
      bookPrice: product.price || PRICES.occasionBook,
      childName: childName.trim() || undefined,
      customerEmail: email.trim().toLowerCase(),
      occasion: product.occasion,
      configSnapshot: {
        productId: product.id,
        occasion: product.occasion,
        childName: childName.trim() || null,
      },
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    router.push("/checkout");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-[#f7ebe3] sm:aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width:1024px) 100vw, 50vw"
          priority
        />
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a07868]">
          Occasion book
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-[#3d2c29] sm:text-4xl">
          {product.name}
        </h1>
        <p className="mt-2 text-2xl font-semibold text-[#c4785a]">{formatRand(product.price)}</p>
        <p className="mt-4 text-base leading-relaxed text-[#7a5f56]">{product.description}</p>

        <div className="mt-8 space-y-4 rounded-3xl border border-[#ead9cd] bg-white p-5">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[#5c3d36]">
              Child&apos;s name <span className="font-normal text-[#9a7f74]">(optional for now)</span>
            </span>
            <input
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="w-full rounded-xl border border-[#ead9cd] px-3 py-3 outline-none focus:border-[#c4785a]"
              placeholder="Who is the book for?"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-[#5c3d36]">Your email *</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-[#ead9cd] px-3 py-3 outline-none focus:border-[#c4785a]"
              placeholder="you@email.com"
              required
            />
          </label>

          {error && (
            <p className="rounded-xl bg-[#fdecea] px-3 py-2 text-sm text-[#9b3b2e]">{error}</p>
          )}

          <button
            type="button"
            onClick={goToCheckout}
            className="w-full rounded-full bg-[#c4785a] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b0654a]"
          >
            Continue to price & courier
          </button>

          <div className="rounded-2xl border border-dashed border-[#d9b9a8] bg-[#fffaf5] p-4">
            <p className="text-sm font-medium text-[#5c3d36]">After you pay</p>
            <p className="mt-1 text-sm text-[#7a5f56]">
              Send photos and personal details via WhatsApp so we can finish your book.
            </p>
            <div className="mt-3">
              <WhatsAppButton message={waMessage} label="WhatsApp us" variant="soft" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
