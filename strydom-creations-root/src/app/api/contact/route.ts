import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/db";
import { contactMessages } from "@/db/schema";
import { sendContactMessages } from "@/lib/email";
import { contactWhatsAppMessage, sendOwnerWhatsApp } from "@/lib/whatsappNotify";

const schema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  message: z.string().min(10).max(4000),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const parsed = schema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Please check your details" }, { status: 400 });
    }
    const { name, email, message } = parsed.data;

    await getDb().insert(contactMessages).values({ name, email, message });

    const [emails, whatsapp] = await Promise.all([
      sendContactMessages({ name, email, message }),
      sendOwnerWhatsApp(contactWhatsAppMessage({ name, email, message })),
    ]);

    return NextResponse.json({
      ok: true,
      delivery: {
        businessEmail: { ok: emails.business.ok, provider: emails.business.provider },
        customerEmail: { ok: emails.customer.ok, provider: emails.customer.provider },
        whatsapp: { ok: whatsapp.ok, provider: whatsapp.provider },
      },
    });
  } catch (error) {
    console.error("[contact]", error);
    return NextResponse.json({ error: "Could not send message" }, { status: 500 });
  }
}
