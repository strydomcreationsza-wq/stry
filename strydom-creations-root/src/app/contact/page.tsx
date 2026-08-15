import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { BUSINESS } from "@/lib/config";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${BUSINESS.name} about personalised children's books.`,
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#a07868]">Contact</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-[#3d2c29]">
            We&apos;d love to hear from you
          </h1>
          <p className="mt-3 text-[#7a5f56]">
            Questions about themes, languages, photos or courier options? Send a note or message us on
            WhatsApp — a real person will reply.
          </p>

          <div className="mt-8 space-y-4 text-sm text-[#5c3d36]">
            <p>
              <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#a07868]">
                Email
              </span>
              <a href={`mailto:${BUSINESS.email}`} className="mt-1 inline-block hover:text-[#c4785a]">
                {BUSINESS.email}
              </a>
            </p>
            <p>
              <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#a07868]">
                WhatsApp
              </span>
              <span className="mt-1 block">{BUSINESS.phoneDisplay}</span>
            </p>
            <p>
              <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-[#a07868]">
                Studio
              </span>
              <span className="mt-1 block">{BUSINESS.location}</span>
            </p>
          </div>

          <div className="mt-8">
            <WhatsAppButton message={generalEnquiryMessage()} label="Chat on WhatsApp" />
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
