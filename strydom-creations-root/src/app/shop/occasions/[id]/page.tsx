import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OCCASION_PRODUCTS } from "@/lib/config";
import { OccasionProductClient } from "@/components/OccasionProductClient";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return OCCASION_PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = OCCASION_PRODUCTS.find((p) => p.id === id);
  if (!product) return { title: "Book not found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function OccasionProductPage({ params }: Props) {
  const { id } = await params;
  const product = OCCASION_PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        href="/shop/occasions"
        className="text-sm font-medium text-[#a07868] hover:text-[#c4785a]"
      >
        ← All occasion books
      </Link>
      <div className="mt-6">
        <OccasionProductClient product={{ ...product }} />
      </div>
    </div>
  );
}
