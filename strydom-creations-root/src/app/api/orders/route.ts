import { NextResponse } from "next/server";
import { getOrderByNumber } from "@/lib/orders";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderNumber = searchParams.get("orderNumber");
  if (!orderNumber) {
    return NextResponse.json({ error: "orderNumber required" }, { status: 400 });
  }
  try {
    const order = await getOrderByNumber(orderNumber);
    if (!order) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({
      order: {
        orderNumber: order.orderNumber,
        productName: order.productName,
        status: order.status,
        totalPrice: order.totalPrice,
        customerEmail: order.customerEmail,
        courierOption: order.courierOption,
      },
    });
  } catch (error) {
    console.error("[orders GET]", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
