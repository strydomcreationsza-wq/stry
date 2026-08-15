import Link from "next/link";
import { BUSINESS } from "@/lib/config";
import { generalEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const wa = buildWhatsAppUrl(generalEnquiryMessage());

  return (
    <footer className="mt-auto border-t border-[#ead9cd] bg-[#f7efe8]">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-xl font-semibold text-[#5c3d36]">{BUSINESS.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#7a5f56]">
            {BUSINESS.tagline}. Made with care in {BUSINESS.location}.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a07868]">Explore</p>
          <ul className="mt-3 space-y-2 text-sm text-[#5c3d36]">
            <li>
              <Link href="/shop" className="hover:text-[#c4785a]">
                Shop books
              </Link>
            </li>
            <li>
              <Link href="/shop/adventure" className="hover:text-[#c4785a]">
                Adventure books
              </Link>
            </li>
            <li>
              <Link href="/shop/occasions" className="hover:text-[#c4785a]">
                Occasion books
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#c4785a]">
                Our story
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-[#c4785a]">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#c4785a]">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a07868]">Say hello</p>
          <ul className="mt-3 space-y-2 text-sm text-[#5c3d36]">
            <li>
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-[#c4785a]">
                {BUSINESS.email}
              </a>
            </li>
            <li>
              <a href={wa} target="_blank" rel="noreferrer" className="hover:text-[#c4785a]">
                WhatsApp {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li className="text-[#7a5f56]">{BUSINESS.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#ead9cd] px-4 py-4 text-center text-xs text-[#9a7f74]">
        © {new Date().getFullYear()} {BUSINESS.name}. Handmade books for growing hearts.
      </div>
    </footer>
  );
}
