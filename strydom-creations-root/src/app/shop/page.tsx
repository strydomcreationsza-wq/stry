import type { Metadata } from "next";
import { CategoryCard } from "@/components/CategoryCard";
import { formatRand, PRICES } from "@/lib/config";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse personalised learning adventure books and occasion storybooks.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a07868]">Shop</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-[#3d2c29]">Choose a category</h1>
        <p className="mt-3 text-[#7a5f56]">
          Adventure books use a guided configurator. Occasion books are simple pick-and-pay gifts.
          Category 3 is waiting in the wings.
        </p>
        <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#f7efe8] px-4 py-1.5 text-xs font-medium text-[#8b5a4a]">
          📦 Delivery in 7–10 working days after payment reflects
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <CategoryCard
          href="/shop/adventure"
          title="Customised Learning Adventure Books"
          description="Age → theme → learning focus → language → name → companion. Perfect for everyday milestones."
          image="/images/safari-theme.jpg"
          badge={`From ${formatRand(PRICES.adventureBook)}`}
        />
        <CategoryCard
          href="/shop/occasions"
          title="Straight-forward Occasion Books"
          description="Mother's Day, Father's Day, birthdays and welcome-baby keepsakes with ready templates."
          image="/images/occasion-fathers-day.jpg"
          badge={`From ${formatRand(PRICES.occasionBook)}`}
        />
        <CategoryCard
          href="/shop"
          title="Category 3"
          description="This collection is empty for now — we'll add it later in the year."
          image="/images/ocean-theme.jpg"
          comingSoon
        />
      </div>
    </div>
  );
}
