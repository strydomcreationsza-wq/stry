"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatRandExact } from "@/lib/config";
import { adventureOrderMessage, occasionOrderMessage } from "@/lib/whatsapp";
import { WhatsAppButton } from "./WhatsAppButton";
import { BankDetails } from "./BankDetails";
import { CheckCircle2, Landmark, AlertCircle } from "lucide-react";

type ThankYouData = {
  orderNumber: string;
  email: string;
  total: number;
  productName: string;
  category: string;
  childName?: string;
  theme?: string;
  problem?: string;
  language?: string;
  companion?: string;
  courier?: string;
  ageGroup?: string;
  format?: string;
  occasion?: string;
  emailSent?: boolean;
};

function readThankYouData(): ThankYouData | null {
  try {
    const raw = sessionStorage.getItem("lsn_thankyou");
    return raw ? (JSON.parse(raw) as ThankYouData) : null;
  } catch {
    return null;
  }
}

export function ThankYouClient() {
  // The order number comes from the URL (?order=...) read client-side, which
  // keeps this whole page statically rendered and CDN-cacheable.
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || undefined;
  // Read sessionStorage ONCE after mount. (Previously this used
  // useSyncExternalStore with a getSnapshot that returned a fresh object on
  // every call — that caused an infinite re-render loop that crashed the
  // browser tab right after placing an order.)
  const [data, setData] = useState<ThankYouData | null>(null);
  useEffect(() => {
    setData(readThankYouData());
  }, []);

  const ref = data?.orderNumber || orderNumber;

  const message = useMemo(() => {
    if (!data) {
      return `Hi Strydom Creations! I've just placed order ${ref || ""} and will EFT the payment. I'll send proof of payment and photos here next.`;
    }
    if (data.category === "adventure") {
      return adventureOrderMessage({
        orderNumber: data.orderNumber,
        age: data.ageGroup,
        format: data.format,
        theme: data.theme,
        problem: data.problem,
        language: data.language,
        childName: data.childName,
        companion: data.companion,
        email: data.email,
        courier: data.courier,
        total: formatRandExact(data.total),
      });
    }
    return occasionOrderMessage({
      orderNumber: data.orderNumber,
      productName: data.productName,
      occasion: data.occasion,
      childName: data.childName,
      email: data.email,
      courier: data.courier,
      total: formatRandExact(data.total),
    });
  }, [data, ref]);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-3xl border border-[#ead9cd] bg-white p-6 text-center shadow-[0_12px_40px_rgba(92,61,54,0.06)] sm:p-10">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e8f8ee] text-[#128C4A]">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h1 className="mt-5 font-display text-3xl font-semibold text-[#3d2c29]">
          Order placed — thank you!
        </h1>
        <p className="mt-3 text-[#7a5f56]">
          Your order
          {ref ? (
            <>
              {" "}
              <strong className="text-[#3d2c29]">{ref}</strong>
            </>
          ) : null}{" "}
          is confirmed and awaiting EFT payment. An invoice with EFT details has been sent to{" "}
          {data?.email ? <strong>{data.email}</strong> : "your email"} and to our studio inbox.
        </p>

        {data && (
          <div className="mt-6 rounded-2xl bg-[#f7efe8] p-4 text-left text-sm text-[#5c3d36]">
            <p className="font-semibold">{data.productName}</p>
            <p className="mt-1 text-[#7a5f56]">
              Total due (EFT): <strong>{formatRandExact(data.total)}</strong> · {data.courier}
            </p>
          </div>
        )}

        {data && data.emailSent === false && (
          <div className="mt-4 flex items-start gap-2 rounded-2xl bg-[#fff4e6] p-4 text-left text-sm text-[#8a5a10]">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              <strong>Heads up:</strong> your order is saved, but the confirmation email
              hasn&apos;t been sent yet (Resend API key isn&apos;t configured). Your EFT details are
              below — please screenshot them.
            </p>
          </div>
        )}
      </div>

      <div className="rounded-3xl border border-[#ead9cd] bg-white p-5 shadow-[0_12px_40px_rgba(92,61,54,0.06)] sm:p-8">
        <div className="flex items-center gap-2">
          <Landmark className="h-5 w-5 text-[#8b5a4a]" />
          <h2 className="font-display text-xl font-semibold text-[#3d2c29]">
            Step 1: Pay by EFT
          </h2>
        </div>
        <p className="mt-2 text-sm text-[#7a5f56]">
          Please transfer the total into our Standard Bank business account. Use your order number as
          the payment reference so we can match it quickly.
        </p>
        <div className="mt-4">
          <BankDetails reference={ref} />
        </div>
      </div>

      <div className="rounded-3xl border border-dashed border-[#d9b9a8] bg-[#fffaf5] p-5 sm:p-8">
        <h2 className="font-display text-xl font-semibold text-[#3d2c29]">
          Step 2: Send proof of payment & photos
        </h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[#7a5f56]">
          <li>Open WhatsApp with the button below (your order details are pre-filled).</li>
          <li>Send us proof of payment plus clear photos of your child for the book.</li>
          <li>
            Once payment reflects, we&apos;ll email you as the book moves: payment received → in
            review → for print → shipped.
          </li>
          <li>PUDO locker or tracking details will come via WhatsApp when ready.</li>
        </ol>
        <div className="mt-5">
          <WhatsAppButton
            message={message}
            label="Send proof & photos on WhatsApp"
            className="w-full sm:w-auto"
          />
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/shop"
          className="inline-flex text-sm font-semibold text-[#c4785a] hover:text-[#b0654a]"
        >
          Back to shop
        </Link>
      </div>
    </div>
  );
}
