"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, BookHeart } from "lucide-react";
import { BUSINESS } from "@/lib/config";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-cream-200/80 bg-[#fffaf5]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2 text-[#5c3d36]">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f3e0d4] text-[#8b5a4a]">
            <BookHeart className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-semibold tracking-tight sm:text-xl">
              {BUSINESS.name}
            </span>
            <span className="hidden text-[11px] text-[#8a6f66] sm:block">
              Personalised learning books
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#5c3d36] transition hover:bg-[#f7ebe3] hover:text-[#3d2c29]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/shop/adventure"
            className="ml-2 rounded-full bg-[#c4785a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#b0654a]"
          >
            Create a book
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e8d5c8] text-[#5c3d36] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#f0e2d8] bg-[#fffaf5] px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-[#5c3d36] hover:bg-[#f7ebe3]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/shop/adventure"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-xl bg-[#c4785a] px-3 py-3 text-center text-base font-semibold text-white"
            >
              Create a book
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
