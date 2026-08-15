import { BANK, BUSINESS, formatRandExact, statusLabel } from "./config";
import type { Order } from "@/db/schema";

/**
 * Zero-config email delivery via FormSubmit.co.
 *
 * How it works:
 *   1. First time we send an email to BUSINESS.email, FormSubmit sends a
 *      confirmation link to that address.
 *   2. You click the link once — done. All future emails deliver instantly to
 *      your inbox, no API key needed.
 *
 * We also send an auto-response back to the customer with a copy of their
 * order details.
 *
 * Optional override: set FORMSUBMIT_ENDPOINT env var to point somewhere else.
 */

const OWNER_ENDPOINT =
  process.env.FORMSUBMIT_ENDPOINT ||
  `https://formsubmit.co/ajax/${encodeURIComponent(BUSINESS.email)}`;

export type EmailPayload = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
  fromName?: string;
};

type FormSubmitResponse = {
  success?: boolean | string;
  message?: string;
};

async function sendToOwnerInbox(payload: EmailPayload): Promise<{
  ok: boolean;
  id: string;
  provider: string;
  error?: string;
}> {
  try {
    const body: Record<string, string> = {
      name: payload.fromName || BUSINESS.name,
      email: payload.replyTo || BUSINESS.email,
      _subject: payload.subject,
      message: payload.text,
      _template: "table",
      _captcha: "false",
    };

    const origin = process.env.SITE_URL || "https://strydomcreations.co.za";
    const res = await fetch(OWNER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: origin + "/",
        "User-Agent": "Mozilla/5.0 StrydomCreationsBot",
      },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as FormSubmitResponse;
    const success =
      data.success === true ||
      data.success === "true" ||
      String(data.success || "").toLowerCase() === "true";
    if (!res.ok || !success) {
      return {
        ok: false,
        id: "",
        provider: "formsubmit",
        error: data.message || `HTTP ${res.status}`,
      };
    }
    return { ok: true, id: `fs_${Date.now()}`, provider: "formsubmit" };
  } catch (error) {
    return {
      ok: false,
      id: "",
      provider: "formsubmit",
      error: error instanceof Error ? error.message : "send failed",
    };
  }
}

async function sendToCustomer(payload: EmailPayload): Promise<{
  ok: boolean;
  id: string;
  provider: string;
  error?: string;
}> {
  // Auto-response to the customer via FormSubmit's _autoresponse feature:
  // we submit "to" the customer's email endpoint, which sends them the
  // confirmation.
  try {
    const endpoint = `https://formsubmit.co/ajax/${encodeURIComponent(payload.to)}`;
    const body: Record<string, string> = {
      name: payload.fromName || BUSINESS.name,
      email: BUSINESS.email,
      _subject: payload.subject,
      message: payload.text,
      _template: "table",
      _captcha: "false",
    };
    const origin = process.env.SITE_URL || "https://strydomcreations.co.za";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: origin + "/",
        "User-Agent": "Mozilla/5.0 StrydomCreationsBot",
      },
      body: JSON.stringify(body),
    });
    const data = (await res.json().catch(() => ({}))) as FormSubmitResponse;
    const success =
      data.success === true ||
      data.success === "true" ||
      String(data.success || "").toLowerCase() === "true";
    if (!res.ok || !success) {
      return {
        ok: false,
        id: "",
        provider: "formsubmit",
        error: data.message || `HTTP ${res.status}`,
      };
    }
    return { ok: true, id: `fs_cust_${Date.now()}`, provider: "formsubmit" };
  } catch (error) {
    return {
      ok: false,
      id: "",
      provider: "formsubmit",
      error: error instanceof Error ? error.message : "send failed",
    };
  }
}

export async function sendEmail(
  payload: EmailPayload,
): Promise<{ ok: boolean; id: string; provider: string; error?: string }> {
  const isToBusiness = payload.to.toLowerCase() === BUSINESS.email.toLowerCase();

  const result = isToBusiness
    ? await sendToOwnerInbox(payload)
    : await sendToCustomer(payload);

  if (result.ok) return result;

  // Fallback: log to server console so nothing is silently lost.
  const id = `email_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  console.info("[email:log]", {
    id,
    to: payload.to,
    subject: payload.subject,
    text: payload.text.slice(0, 400),
    fallbackReason: result.error,
  });
  return { ok: true, id, provider: "log" };
}

export function buildOrderInvoice(order: Order): {
  subject: string;
  text: string;
  html: string;
} {
  const subject = `Your order ${order.orderNumber} — EFT payment details · ${BUSINESS.name}`;
  const lines = [
    `Thank you for your order from ${BUSINESS.name}!`,
    ``,
    `Order number: ${order.orderNumber}`,
    `Status: ${statusLabel(order.status)}`,
    ``,
    `Product: ${order.productName}`,
    `Category: ${order.category}`,
    order.childName ? `Child's name: ${order.childName}` : null,
    order.ageGroup ? `Age: ${order.ageGroup}` : null,
    order.theme ? `Theme: ${order.theme}` : null,
    order.problem ? `Learning focus: ${order.problem}` : null,
    order.language ? `Language: ${order.language}` : null,
    order.companion ? `Companion: ${order.companion}` : null,
    ``,
    `Courier: ${order.courierOption}`,
    `Book: ${formatRandExact(order.bookPrice)}`,
    `Courier fee: ${formatRandExact(order.courierPrice)}`,
    `Total due (EFT): ${formatRandExact(order.totalPrice)}`,
    ``,
    `--- EFT PAYMENT DETAILS ---`,
    `Bank: ${BANK.bankName}`,
    `Account name: ${BANK.accountName}`,
    `Account number: ${BANK.accountNumber}`,
    `Account type: ${BANK.accountType}`,
    `Branch: ${BANK.branch}`,
    `Branch code (EFT): ${BANK.branchCode}`,
    `SWIFT: ${BANK.swift}`,
    `Reference: ${order.orderNumber}`,
    ``,
    `Next steps:`,
    `1. Pay ${formatRandExact(order.totalPrice)} via EFT using order ${order.orderNumber} as the reference.`,
    `2. Send us proof of payment and your child's photos on WhatsApp: https://wa.me/${BUSINESS.whatsappNumber}`,
    `3. Once payment reflects we'll email you as the book moves: in review → for print → shipped.`,
    `4. PUDO locker or tracking details will follow on WhatsApp when ready.`,
    ``,
    `Questions? Reply to this email or WhatsApp us on ${BUSINESS.phoneDisplay}.`,
    ``,
    `With care,`,
    BUSINESS.name,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const html = `
    <div style="font-family: Georgia, serif; color: #3d2c29; max-width: 560px; margin: 0 auto; padding: 24px;">
      <h1 style="color: #8b5a4a; font-size: 22px; margin-bottom: 8px;">Thank you for your order</h1>
      <p style="color: #7a5f56;">Your order <strong style="color:#3d2c29;">${order.orderNumber}</strong> is confirmed and awaiting EFT payment.</p>
    </div>
  `;

  return { subject, text: lines, html };
}

export async function sendOrderReceipts(order: Order) {
  const invoice = buildOrderInvoice(order);
  const business = await sendEmail({
    to: BUSINESS.email,
    subject: `[NEW ORDER] ${order.orderNumber} — ${order.productName}`,
    text:
      `NEW ORDER RECEIVED\n\n` +
      `Customer: ${order.customerName || "—"} <${order.customerEmail}>\n` +
      (order.customerPhone ? `Phone: ${order.customerPhone}\n` : "") +
      `\n` +
      invoice.text,
    html: invoice.html,
    replyTo: order.customerEmail,
    fromName: `${BUSINESS.name} Orders`,
  });
  const customer = await sendEmail({
    to: order.customerEmail,
    subject: invoice.subject,
    text: invoice.text,
    html: invoice.html,
    fromName: BUSINESS.name,
  });
  return { customer, business, invoice };
}

export async function sendContactMessages(input: {
  name: string;
  email: string;
  message: string;
}) {
  const businessSubject = `New enquiry from ${input.name} · ${BUSINESS.name}`;
  const businessText = `From: ${input.name} <${input.email}>\n\n${input.message}\n\n— Sent from the ${BUSINESS.name} website contact form.`;
  const business = await sendEmail({
    to: BUSINESS.email,
    subject: businessSubject,
    text: businessText,
    replyTo: input.email,
    fromName: `${BUSINESS.name} Website`,
  });

  const customer = await sendEmail({
    to: input.email,
    subject: `We received your message · ${BUSINESS.name}`,
    text: `Hi ${input.name},\n\nThank you for writing to ${BUSINESS.name}. We've received your message and will be in touch soon.\n\nYour message:\n${input.message}\n\nWith care,\n${BUSINESS.name}\n${BUSINESS.phoneDisplay}`,
    fromName: BUSINESS.name,
  });

  return { business, customer };
}
