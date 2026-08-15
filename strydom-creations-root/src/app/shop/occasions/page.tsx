import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { OCCASION_PRODUCTS, formatRand } from "@/lib/config";

export const metadata: Metadata = {
  title: "Occasion Books",
  description: "Personalised Mother's Day, Father's Day, birthday and welcome-baby storybooks.",
};

export default function OccasionsShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="max-w-2xl">
        <Link href="/shop" className="text-sm font-medium text-[#a07868] hover:text-[#c4785a]">
          ← All categories
        </Link>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#a07868]">
          Category 2 · Occasion books
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-[#3d2c29] sm:text-4xl">
          Straight-forward occasion books
        </h1>
        <p className="mt-3 text-[#7a5f56]">
          No long configurator — pick a book, pay, then send photos and details on WhatsApp. Perfect
          when you already know the occasion.
        </p>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {OCCASION_PRODUCTS.map((product) => (
          <Link
            key={product.id}
            href={`/shop/occasions/${product.id}`}
            className="group overflow-hidden rounded-3xl border border-[#ead9cd] bg-white shadow-[0_10px_30px_rgba(92,61,54,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(92,61,54,0.1)]"
          >
            <div className="relative aspect-[5/4] bg-[#f7ebe3]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#a07868]">
                {product.occasion}
              </p>
              <h2 className="mt-1 font-display text-xl font-semibold text-[#3d2c29]">
                {product.name}
              </h2>
              <p className="mt-2 line-clamp-2 text-sm text-[#7a5f56]">{product.description}</p>
              <p className="mt-4 text-base font-semibold text-[#c4785a]">
                {formatRand(product.price)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
