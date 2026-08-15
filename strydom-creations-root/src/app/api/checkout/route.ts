import { NextResponse } from "next/server";
import { z } from "zod";
import { createOrder } from "@/lib/orders";
import { generateOrderNumber } from "@/lib/utils";
import { sendOrderReceipts } from "@/lib/email";
import { orderWhatsAppMessage, sendOwnerWhatsApp } from "@/lib/whatsappNotify";
import { COURIER_OPTIONS, PRICES } from "@/lib/config";

const bodySchema = z.object({
  category: z.enum(["adventure", "occasion"]),
  productName: z.string().min(2).max(255),
  bookPrice: z.number().int().positive(),
  courierOption: z.string().min(2),
  courierPrice: z.number().int().nonnegative(),
  totalPrice: z.number().int().positive(),
  customerName: z.string().min(2).max(255),
  customerEmail: z.string().email(),
  customerPhone: z.string().max(64).optional(),
  childName: z.string().max(255).optional(),
  ageGroup: z.string().max(32).optional(),
  theme: z.string().max(128).optional(),
  problem: z.string().max(128).optional(),
  language: z.string().max(64).optional(),
  companion: z.string().max(64).optional(),
  notes: z.string().max(2000).optional(),
  configSnapshot: z.unknown().optional(),
  paymentMethod: z.literal("eft"),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid checkout data", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const expectedBook =
      data.category === "adventure" ? PRICES.adventureBook : PRICES.occasionBook;
    if (data.bookPrice !== expectedBook) {
      return NextResponse.json({ error: "Unexpected book price" }, { status: 400 });
    }

    const courierMatch = COURIER_OPTIONS.find((c) => c.name === data.courierOption);
    if (!courierMatch || courierMatch.price !== data.courierPrice) {
      return NextResponse.json({ error: "Invalid courier option" }, { status: 400 });
    }

    if (data.totalPrice !== data.bookPrice + data.courierPrice) {
      return NextResponse.json({ error: "Total mismatch" }, { status: 400 });
    }

    const orderNumber = generateOrderNumber();

    const order = await createOrder({
      orderNumber,
      category: data.category,
      productName: data.productName,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      customerPhone: data.customerPhone,
      childName: data.childName,
      ageGroup: data.ageGroup,
      theme: data.theme,
      problem: data.problem,
      language: data.language,
      companion: data.companion,
      courierOption: data.courierOption,
      bookPrice: data.bookPrice,
      courierPrice: data.courierPrice,
      totalPrice: data.totalPrice,
      status: "awaiting_payment",
      paymentStatus: "awaiting_eft",
      paymentReference: orderNumber,
      notes: data.notes,
      configSnapshot: {
        ...(typeof data.configSnapshot === "object" && data.configSnapshot
          ? data.configSnapshot
          : {}),
        paymentMethod: "eft",
      },
    });

    const [receipts, whatsapp] = await Promise.all([
      sendOrderReceipts(order),
      sendOwnerWhatsApp(orderWhatsAppMessage(order)),
    ]);

    return NextResponse.json({
      ok: true,
      order,
      receipts: {
        customerEmail: {
          id: receipts.customer.id,
          provider: receipts.customer.provider,
          ok: receipts.customer.ok,
        },
        businessEmail: {
          id: receipts.business.id,
          provider: receipts.business.provider,
          ok: receipts.business.ok,
        },
        whatsapp: {
          provider: whatsapp.provider,
          ok: whatsapp.ok,
        },
      },
    });
  } catch (error) {
    console.error("[checkout]", error);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
