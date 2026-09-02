import { BUSINESS } from "./config";

export type AdventureSelection = {
  age?: string;
  format?: string;
  theme?: string;
  problem?: string;
  language?: string;
  childName?: string;
  companion?: string;
  email?: string;
  customerName?: string;
  orderNumber?: string;
  courier?: string;
  total?: string;
};

export type OccasionSelection = {
  productName?: string;
  occasion?: string;
  childName?: string;
  email?: string;
  customerName?: string;
  orderNumber?: string;
  courier?: string;
  total?: string;
};

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  // wa.me is the official short link — works on mobile (opens WhatsApp app
  // directly). On desktop it redirects to api.whatsapp.com which Microsoft
  // Edge sometimes blocks, so the button component uses buildWhatsAppWebUrl
  // for desktop.
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encoded}`;
}

export function buildWhatsAppWebUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  // web.whatsapp.com opens WhatsApp Web directly, bypassing the
  // api.whatsapp.com redirect that Edge/some networks block.
  return `https://web.whatsapp.com/send?phone=${BUSINESS.whatsappNumber}&text=${encoded}`;
}

export function adventureOrderMessage(data: AdventureSelection): string {
  return [
    `Hi Strydom Creations! 📚`,
    ``,
    `I'd like to order a Customised Learning Adventure Book.`,
    data.orderNumber ? `Order: ${data.orderNumber}` : null,
    ``,
    `Child's name: ${data.childName || "—"}`,
    `Age: ${data.age || "—"}`,
    `Book format: ${data.format || "—"}`,
    `Theme: ${data.theme || "—"}`,
    `Learning focus: ${data.problem || "—"}`,
    `Language: ${data.language || "—"}`,
    `Companion animal: ${data.companion || "—"}`,
    `Email: ${data.email || "—"}`,
    data.customerName ? `Parent name: ${data.customerName}` : null,
    data.courier ? `Courier: ${data.courier}` : null,
    data.total ? `Total (EFT): ${data.total}` : null,
    ``,
    `I'll send proof of EFT payment and photos of my child here for the book.`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function occasionOrderMessage(data: OccasionSelection): string {
  return [
    `Hi Strydom Creations! 📚`,
    ``,
    `I'd like to order an Occasion Book.`,
    data.orderNumber ? `Order: ${data.orderNumber}` : null,
    ``,
    `Book: ${data.productName || "—"}`,
    data.occasion ? `Occasion: ${data.occasion}` : null,
    data.childName ? `Child's name: ${data.childName}` : null,
    `Email: ${data.email || "—"}`,
    data.customerName ? `Parent name: ${data.customerName}` : null,
    data.courier ? `Courier: ${data.courier}` : null,
    data.total ? `Total (EFT): ${data.total}` : null,
    ``,
    `I'll send proof of EFT payment, photos, and any personal details for the book here.`,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

export function generalEnquiryMessage(): string {
  return `Hi Strydom Creations! I'd love to ask about your personalised learning books.`;
}
