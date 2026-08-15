import type { Metadata } from "next";
import { CheckoutForm } from "@/components/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Choose courier and pay by EFT for your personalised book.",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a07868]">Checkout</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-[#3d2c29] sm:text-4xl">
          Pay by EFT — then we make your book
        </h1>
        <p className="mt-3 text-[#7a5f56]">
          Choose PUDO (+R60) or Postnet / door delivery (+R110). You&apos;ll get an EFT invoice by email
          and an order number to use as your payment reference.
        </p>
      </div>
      <CheckoutForm />
    </div>
  );
}
