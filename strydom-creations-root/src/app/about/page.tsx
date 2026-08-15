import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BUSINESS } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: `Meet the studio behind ${BUSINESS.name} — handmade personalised learning books for little ones.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a07868]">Our story</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-[#3d2c29]">
            A small studio for big little milestones
          </h1>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-[#7a5f56]">
            <p>
              {BUSINESS.name} began with a simple wish: books that feel like they belong on your child&apos;s
              shelf — not mass-produced, not generic, but gently crafted around the skills you&apos;re
              practising at home.
            </p>
            <p>
              We make personalised learning adventures for ages 1–12 and keepsake occasion books for the
              people who love them. Each order is paid for first, then made by hand with your photos,
              your child&apos;s name, and the language your family speaks.
            </p>
            <p>
              There is no warehouse full of identical books. When you check out, we start. Payment is
              by EFT into our Standard Bank business account — once it reflects, we begin the book and
              email you at each stage. Delivery details for PUDO, Postnet or the door follow on
              WhatsApp when ready.
            </p>
          </div>
          <Link
            href="/shop/adventure"
            className="mt-8 inline-flex rounded-full bg-[#c4785a] px-6 py-3 text-sm font-semibold text-white"
          >
            Create a book
          </Link>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#f7ebe3] shadow-[0_20px_50px_rgba(92,61,54,0.12)]">
          <Image
            src="/images/about-workspace.jpg"
            alt="Handmade book workspace with personalised children's books"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </div>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Learning first",
            text: "Brushing teeth, potty training, manners, sharing — everyday skills told with kindness.",
          },
          {
            title: "Human support",
            text: "Questions? WhatsApp us. We help with photos, courier choices and progress updates.",
          },
          {
            title: "Local & careful",
            text: `Based in ${BUSINESS.location}. We ship across South Africa and keep you in the loop.`,
          },
        ].map((item) => (
          <div key={item.title} className="rounded-3xl border border-[#ead9cd] bg-white p-6">
            <h2 className="font-display text-xl font-semibold text-[#3d2c29]">{item.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#7a5f56]">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
