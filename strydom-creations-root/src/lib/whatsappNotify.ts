import { BUSINESS } from "./config";
import type { Order } from "@/db/schema";
import { formatRandExact } from "./config";

/**
 * Server-side WhatsApp notifications TO YOU (the business owner).
 *
 * Uses CallMeBot — a free service that sends WhatsApp messages to your own
 * number after a one-time activation. Setup takes 60 seconds:
 *
 *   1. Add +34 644 51 95 23 (CallMeBot) to your phone contacts.
 *   2. Send the WhatsApp message:  I allow callmebot to send me messages
 *   3. You'll get a reply with an API key. Copy that key.
 *   4. Set env vars:
 *        CALLMEBOT_PHONE=27832471399     (your number, no + or spaces)
 *        CALLMEBOT_APIKEY=1234567          (the key CallMeBot sent you)
 *
 * If those vars aren't set, the app falls back to logging so nothing breaks.
 * You'll still receive the customer's WhatsApp when THEY click the button on
 * the thank-you page — this is just for instant server-side alerts too.
 */

const CALLMEBOT_PHONE = process.env.CALLMEBOT_PHONE?.replace(/\D/g, "");
const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY;

export async function sendOwnerWhatsApp(
  message: string,
): Promise<{ ok: boolean; provider: string; error?: string }> {
  if (CALLMEBOT_PHONE && CALLMEBOT_APIKEY) {
    try {
      const url = new URL("https://api.callmebot.com/whatsapp.php");
      url.searchParams.set("phone", CALLMEBOT_PHONE);
      url.searchParams.set("text", message);
      url.searchParams.set("apikey", CALLMEBOT_APIKEY);
      const res = await fetch(url.toString(), { method: "GET" });
      const body = await res.text();
      if (!res.ok) {
        console.error("[whatsapp:callmebot]", res.status, body);
        return { ok: false, provider: "callmebot", error: body };
      }
      return { ok: true, provider: "callmebot" };
    } catch (error) {
      console.error("[whatsapp:callmebot]", error);
      return {
        ok: false,
        provider: "callmebot",
        error: error instanceof Error ? error.message : "send failed",
      };
    }
  }

  console.info("[whatsapp:log]", {
    to: BUSINESS.phoneDisplay,
    message,
  });
  return { ok: true, provider: "log" };
}

export function orderWhatsAppMessage(order: Order): string {
  const lines = [
    `🎉 NEW ORDER — ${BUSINESS.name}`,
    ``,
    `Order: ${order.orderNumber}`,
    `Total: ${formatRandExact(order.totalPrice)} (EFT)`,
    `Product: ${order.productName}`,
    order.childName ? `Child: ${order.childName}${order.ageGroup ? " (" + order.ageGroup + ")" : ""}` : null,
    order.theme ? `Theme: ${order.theme}` : null,
    order.problem ? `Focus: ${order.problem}` : null,
    order.language ? `Language: ${order.language}` : null,
    order.companion ? `Companion: ${order.companion}` : null,
    `Courier: ${order.courierOption}`,
    ``,
    `Customer: ${order.customerName || "—"}`,
    `Email: ${order.customerEmail}`,
    order.customerPhone ? `Phone: ${order.customerPhone}` : null,
    ``,
    `Status: awaiting EFT — waiting for photos on WhatsApp.`,
  ].filter((l) => l !== null);
  return lines.join("\n");
}

export function contactWhatsAppMessage(input: {
  name: string;
  email: string;
  message: string;
}): string {
  return [
    `💬 NEW ENQUIRY — ${BUSINESS.name}`,
    ``,
    `From: ${input.name}`,
    `Email: ${input.email}`,
    ``,
    input.message,
  ].join("\n");
}
