import { NextResponse } from "next/server";
import { BUSINESS, ORDER_STATUSES } from "@/lib/config";
import { listOrders, updateOrderStatus } from "@/lib/orders";
import { z } from "zod";

function authorize(request: Request): boolean {
  const password = request.headers.get("x-admin-password") || "";
  return password.length > 0 && password === BUSINESS.adminPassword;
}

export async function GET(request: Request) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const orders = await listOrders();
    return NextResponse.json({ orders });
  } catch (error) {
    console.error("[admin/orders GET]", error);
    return NextResponse.json({ error: "Failed to load orders" }, { status: 500 });
  }
}

const patchSchema = z.object({
  orderNumber: z.string().min(3),
  status: z.enum(ORDER_STATUSES),
});

export async function PATCH(request: Request) {
  if (!authorize(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const json = await request.json();
    const parsed = patchSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const updated = await updateOrderStatus(parsed.data.orderNumber, parsed.data.status);
    if (!updated) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ order: updated });
  } catch (error) {
    console.error("[admin/orders PATCH]", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
