import Image from "next/image";
import Link from "next/link";
import { CategoryCard } from "@/components/CategoryCard";
import { BUSINESS, formatRand, PRICES } from "@/lib/config";
import {
  Heart,
  Sparkles,
  Truck,
  ShoppingBag,
  Camera,
  Package,
  Quote,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f3e0d4,transparent_55%),radial-gradient(circle_at_bottom_left,#e8f0e9,transparent_45%)]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-16">
          <div>
            <p className="inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#a07868] shadow-sm">
              Handmade in South Africa
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.1rem,6vw,3.6rem)] font-semibold leading-[1.08] text-[#3d2c29]">
              Books that grow with your child — written just for them
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#7a5f56] sm:text-lg">
              {BUSINESS.name} creates personalised learning adventure books and occasion keepsakes.
              Your child is the hero. Real photos, gentle lessons, and stories you&apos;ll read again
              and again.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shop/adventure"
                className="rounded-full bg-[#c4785a] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b0654a]"
              >
                Create an adventure book
              </Link>
              <Link
                href="/shop"
                className="rounded-full border border-[#e0c9bb] bg-white px-6 py-3.5 text-sm font-semibold text-[#5c3d36] transition hover:bg-[#fff5ef]"
              >
                Browse all books
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-3 text-center sm:max-w-md sm:text-left">
              <div className="rounded-2xl bg-white/70 p-3">
                <dt className="text-xs text-[#9a7f74]">From</dt>
                <dd className="font-display text-lg font-semibold text-[#3d2c29]">
                  {formatRand(PRICES.occasionBook)}
                </dd>
              </div>
              <div className="rounded-2xl bg-white/70 p-3">
                <dt className="text-xs text-[#9a7f74]">Ages</dt>
                <dd className="font-display text-lg font-semibold text-[#3d2c29]">1–12</dd>
              </div>
              <div className="rounded-2xl bg-white/70 p-3">
                <dt className="text-xs text-[#9a7f74]">Courier</dt>
                <dd className="font-display text-lg font-semibold text-[#3d2c29]">SA-wide</dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_24px_60px_rgba(92,61,54,0.15)] sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/hero-family.jpg"
                alt="Parent reading a personalised children's book with their little one"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="absolute -bottom-4 left-4 right-4 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-lg backdrop-blur sm:left-auto sm:right-6 sm:max-w-xs">
              <p className="text-sm font-semibold text-[#3d2c29]">Made after you pay</p>
              <p className="mt-1 text-xs leading-relaxed text-[#7a5f56]">
                Every book is crafted to order. Send photos on WhatsApp and we&apos;ll keep you updated
                by email.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a07868]">
            Choose your book
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[#3d2c29]">
            Three ways to start — one warm studio
          </h2>
          <p className="mt-3 text-[#7a5f56]">
            Pick a learning adventure, a simple occasion gift, or watch this space for what&apos;s next.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <CategoryCard
            href="/shop/adventure"
            title="Learning Adventure Books"
            description="Step-by-step personalisation: age, theme, learning focus, language, name & companion animal."
            image="/images/adventure-book.jpg"
            badge={`From ${formatRand(PRICES.adventureBook)}`}
          />
          <CategoryCard
            href="/shop/occasions"
            title="Occasion Books"
            description="Father's Day, Mother's Day, birthdays and more — simple order, personalised by hand."
            image="/images/occasion-mothers-day.jpg"
            badge={`From ${formatRand(PRICES.occasionBook)}`}
          />
          <CategoryCard
            href="/shop"
            title="Coming later"
            description="A third collection is on the way later this year. Join us as we grow the nest."
            image="/images/about-workspace.jpg"
            comingSoon
          />
        </div>
      </section>

      <section className="border-y border-[#ead9cd] bg-[#f7efe8]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-3">
          {[
            {
              icon: Sparkles,
              title: "Truly personal",
              text: "Your child's name, photos, language and a gentle learning focus woven into one story.",
            },
            {
              icon: Heart,
              title: "Parent-first process",
              text: "Clear steps, honest pricing, and WhatsApp support when you need a human — not a chatbot.",
            },
            {
              icon: Truck,
              title: "Pay, then we make",
              text: "Secure checkout first. PUDO, Postnet or door delivery. We handle courier updates on WhatsApp.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl bg-white/80 p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f3e0d4] text-[#8b5a4a]">
                <item.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-[#3d2c29]">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#7a5f56]">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a07868]">
            How it works
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[#3d2c29]">
            From order to bedtime story in 4 easy steps
          </h2>
        </div>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: ShoppingBag,
              title: "1. Choose your book",
              text: "Pick an adventure or occasion book and complete your details in a few minutes.",
            },
            {
              icon: Heart,
              title: "2. Pay by EFT",
              text: "You'll receive an invoice with our Standard Bank details and your order number as reference.",
            },
            {
              icon: Camera,
              title: "3. Send photos on WhatsApp",
              text: "Once payment reflects, WhatsApp us clear photos of your little one — we'll guide you.",
            },
            {
              icon: Package,
              title: "4. We deliver",
              text: "Your book arrives via PUDO, Postnet or door delivery in 7–10 working days.",
            },
          ].map((step) => (
            <li
              key={step.title}
              className="rounded-3xl border border-[#ead9cd] bg-white p-5"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f3e0d4] text-[#8b5a4a]">
                <step.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-[#3d2c29]">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#7a5f56]">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-[#ead9cd] bg-[#f7efe8]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a07868]">
              Parents love their books
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-[#3d2c29]">
              Little readers, big smiles
            </h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                quote:
                  "My daughter asks for her Safari book every night — she even started brushing her teeth without a fight!",
                name: "Lerato",
                city: "Pretoria",
              },
              {
                quote:
                  "Beautifully made and so personal. My son couldn't believe he was in a real book. Worth every rand.",
                name: "Michelle",
                city: "Durban",
              },
              {
                quote:
                  "Gave the Mother's Day book to my mom and she cried. Fast delivery and gorgeous quality.",
                name: "Thandi",
                city: "Johannesburg",
              },
            ].map((t) => (
              <figure
                key={t.name}
                className="rounded-3xl bg-white/90 p-6 shadow-[0_10px_30px_rgba(92,61,54,0.05)]"
              >
                <Quote className="h-6 w-6 text-[#c4785a]" />
                <blockquote className="mt-3 text-sm leading-relaxed text-[#5c3d36]">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#a07868]">
                  {t.name} · {t.city}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-[#5c3d36] text-white lg:grid-cols-2">
          <div className="p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-white/70">
              Ready when you are
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight">
              Ready to see your child in their own story?
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Start with an adventure book — choose age, theme and the little skill you&apos;re
              working on at home. Delivered in 7–10 working days.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/shop/adventure"
                className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#5c3d36]"
              >
                Start creating
              </Link>
              <Link
                href="/faq"
                className="inline-flex rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Read the FAQ
              </Link>
            </div>
          </div>
          <div className="relative min-h-[240px] lg:min-h-full">
            <Image
              src="/images/brushing-teeth.jpg"
              alt="Soft illustration from a learning storybook"
              fill
              className="object-cover opacity-90"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
