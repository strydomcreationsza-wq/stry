import type { Metadata } from "next";
import { ThankYouClient } from "@/components/ThankYouClient";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your order is confirmed. Send photos on WhatsApp to continue.",
};

type Props = {
  searchParams: Promise<{ order?: string }>;
};

export default async function ThankYouPage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <ThankYouClient orderNumber={params.order} />
    </div>
  );
}
