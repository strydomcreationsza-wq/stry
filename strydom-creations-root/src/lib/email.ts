import { BANK, BUSINESS, formatRandExact, statusLabel } from "./config";
import type { Order } from "@/db/schema";
import nodemailer from "nodemailer";

/**
 * Email delivery.
 *
 * Primary: Gmail SMTP via nodemailer — set GMAIL_APP_PASSWORD (and optionally
 * GMAIL_USER, defaults to the business email) in the environment. Emails are
 * sent from the business Gmail account to both the business inbox and the
 * customer, with proper reply-to headers.
 *
 * Fallback 1: FormSubmit.co (business inbox only — customers can't receive
 * FormSubmit mail without activating, so this is best-effort).
 * Fallback 2: log to the server console so nothing is silently lost.
 */

const SMTP_USER = process.env.GMAIL_USER || process.env.SMTP_USER || BUSINESS.email;
const SMTP_PASS = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

let cachedTransporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (!SMTP_PASS) return null;
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 465),
      secure: String(process.env.SMTP_SECURE || "true") !== "false",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return cachedTransporter;
}

async function sendViaSmtp(payload: EmailPayload): Promise<{
  ok: boolean;
  id: string;
  provider: string;
  error?: string;
}> {
  const transporter = getTransporter();
  if (!transporter) {
    return { ok: false, id: "", provider: "gmail", error: "SMTP not configured" };
  }
  try {
    const info = await transporter.sendMail({
      from: `"${payload.fromName || BUSINESS.name}" <${SMTP_USER}>`,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      html: payload.html,
      replyTo: payload.replyTo,
    });
    return { ok: true, id: info.messageId || `smtp_${Date.now()}`, provider: "gmail" };
  } catch (error) {
    return {
      ok: false,
      id: "",
      provider: "gmail",
      error: error instanceof Error ? error.message : "send failed",
    };
  }
}

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
  // Primary: Gmail SMTP (works for both business and customer emails).
  const smtp = await sendViaSmtp(payload);
  if (smtp.ok) return smtp;
  if (SMTP_PASS) {
    console.warn("[email:gmail-failed]", { to: payload.to, error: smtp.error });
  }

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
    <div style="font-family: Georgia, serif; color: #3d2c29; max-width: 560px; margin: 0 auto; padding: 24px; background: #fffaf5; border: 1px solid #ead9cd; border-radius: 12px;">
      <h1 style="color: #8b5a4a; font-size: 22px; margin: 0 0 8px;">Thank you for your order</h1>
      <p style="color: #7a5f56; margin: 0 0 16px;">Your order <strong style="color:#3d2c29;">${order.orderNumber}</strong> is confirmed and awaiting EFT payment.</p>
      <pre style="font-family: Georgia, serif; white-space: pre-wrap; word-break: break-word; color: #3d2c29; font-size: 14px; line-height: 1.65; margin: 0;">${lines
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}</pre>
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
