import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { BUSINESS } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${BUSINESS.name} · Personalised children's learning books`,
    template: `%s · ${BUSINESS.name}`,
  },
  description: BUSINESS.tagline,
  openGraph: {
    title: BUSINESS.name,
    description: BUSINESS.tagline,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
