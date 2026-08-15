import type { Metadata } from "next";
import Link from "next/link";
import { BANK, BUSINESS, formatRand, PRICES } from "@/lib/config";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: `Common questions about ordering personalised learning books from ${BUSINESS.name}.`,
};

const faqs = [
  {
    q: "How does the ordering process work?",
    a: "You choose a book, complete the details, and pay by EFT into our Standard Bank business account using your order number as the reference. Once payment reflects, you send us your child's photos on WhatsApp and we start making the book. We'll email you as it moves from review to print and then WhatsApp you the courier details when it's ready.",
  },
  {
    q: "How long does it take to receive my book?",
    a: "Usually 7–10 working days from the day your EFT payment reflects and we have all your photos. During busy periods (Mother's Day, Father's Day, December) it can take up to 14 working days — we'll always let you know upfront if it's longer.",
  },
  {
    q: "How do I pay?",
    a: `Payment is by EFT (bank transfer) only. Our details are ${BANK.bankName} · ${BANK.accountName} · Account ${BANK.accountNumber} · Branch code ${BANK.branchCode}. Use your order number as the payment reference so we can match it quickly.`,
  },
  {
    q: "What are the courier options?",
    a: "PUDO locker collection is +R60 (great value, nationwide). Postnet-to-Postnet or door-to-door delivery is +R110. We handle all courier communication on WhatsApp once your book is ready.",
  },
  {
    q: "What photos should I send?",
    a: "Clear, well-lit face photos work best — smiling, looking at the camera, no sunglasses or hats. 3–5 photos are usually enough. Send them on WhatsApp and we'll ask if we need anything more.",
  },
  {
    q: "Can I cancel or change my order after paying?",
    a: "Because every book is made to order by hand, we can only make changes before we start production. If you need to change something (spelling, focus, courier option), please WhatsApp us as soon as possible. Once we've started illustrating we can't refund the book — but we'll always do our best to help.",
  },
  {
    q: "What if I don't like the book when I get it?",
    a: "If there's a printing defect or a mistake on our side, we'll reprint or refund immediately — no questions asked. For quality feedback we're always keen to hear it so we can improve.",
  },
  {
    q: "Do you ship outside South Africa?",
    a: "Not yet — for now we ship anywhere in South Africa via PUDO or Postnet. International shipping is on our roadmap.",
  },
  {
    q: "What languages do you support?",
    a: "English, Afrikaans, isiZulu, isiXhosa, Sesotho, and bilingual English & Afrikaans. If you need another South African language, WhatsApp us and we'll see what we can do.",
  },
  {
    q: "How old should my child be for these books?",
    a: "We make adventure books for ages 1–12. Each age has its own learning focuses — from brushing teeth for a 2-year-old to healthy screen time for a 10-year-old. Occasion books are keepsakes suitable for any age.",
  },
  {
    q: "Can I order in bulk for a preschool or party?",
    a: "Yes! For 10+ books we offer a discount and dedicated support. WhatsApp us on " + BUSINESS.phoneDisplay + " for a bulk quote.",
  },
  {
    q: "Is my child's information safe?",
    a: "Absolutely. We only use your child's name and photos to make their book — nothing is shared, sold, or used for marketing. Photos are deleted from our systems after your order is completed if you'd like (just ask on WhatsApp).",
  },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a07868]">Help</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-[#3d2c29]">
          Frequently asked questions
        </h1>
        <p className="mt-3 text-[#7a5f56]">
          Can&apos;t find your answer? WhatsApp us on{" "}
          <span className="font-medium text-[#5c3d36]">{BUSINESS.phoneDisplay}</span> — a real
          person will reply.
        </p>
      </div>

      <div className="mt-10 space-y-3">
        {faqs.map((item, i) => (
          <details
            key={i}
            className="group rounded-2xl border border-[#ead9cd] bg-white p-5 open:shadow-sm"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-3 text-left font-semibold text-[#3d2c29]">
              <span>{item.q}</span>
              <span className="ml-auto text-[#c4785a] transition group-open:rotate-45">＋</span>
            </summary>
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-[#7a5f56]">
              {item.a}
            </p>
          </details>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-[#f7efe8] p-6 text-center">
        <p className="font-display text-xl font-semibold text-[#3d2c29]">
          Still have questions?
        </p>
        <p className="mt-2 text-sm text-[#7a5f56]">
          We&apos;re happy to help you choose the right book, focus and language.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-[#c4785a] px-5 py-3 text-sm font-semibold text-white"
          >
            Send us a message
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-[#e0c9bb] bg-white px-5 py-3 text-sm font-semibold text-[#5c3d36]"
          >
            Browse books from {formatRand(PRICES.occasionBook)}
          </Link>
        </div>
      </div>
    </div>
  );
}
