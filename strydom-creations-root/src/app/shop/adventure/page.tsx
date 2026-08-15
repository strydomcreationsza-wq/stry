import type { Metadata } from "next";
import Link from "next/link";
import { AdventureConfigurator } from "@/components/AdventureConfigurator";
import { formatRand, PRICES } from "@/lib/config";

export const metadata: Metadata = {
  title: "Adventure Books",
  description:
    "Configure a personalised learning adventure book for ages 1–12 with theme, focus, language and companion.",
};

export default function AdventureShopPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8">
        <Link href="/shop" className="text-sm font-medium text-[#a07868] hover:text-[#c4785a]">
          ← All categories
        </Link>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#a07868]">
          Category 1 · Adventure Stories
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-[#3d2c29] sm:text-4xl">
          Customised Learning Adventure Books
        </h1>
        <p className="mt-3 text-[#7a5f56]">
          Follow each step in order. Books are {formatRand(PRICES.adventureBook)} plus courier. You&apos;ll
          pay at checkout, then send photos on WhatsApp.
        </p>
      </div>
      <AdventureConfigurator />
    </div>
  );
}
