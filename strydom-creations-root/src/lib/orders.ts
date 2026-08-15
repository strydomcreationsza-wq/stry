import { getDb } from "@/db";
import { orders, type NewOrder, type Order } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function createOrder(data: NewOrder): Promise<Order> {
  const [row] = await getDb().insert(orders).values(data).returning();
  return row;
}

export async function getOrderByNumber(orderNumber: string): Promise<Order | undefined> {
  const [row] = await getDb()
    .select()
    .from(orders)
    .where(eq(orders.orderNumber, orderNumber))
    .limit(1);
  return row;
}

export async function listOrders(): Promise<Order[]> {
  return getDb().select().from(orders).orderBy(desc(orders.createdAt));
}

export async function updateOrderStatus(
  orderNumber: string,
  status: string,
): Promise<Order | undefined> {
  const [row] = await getDb()
    .update(orders)
    .set({ status, updatedAt: new Date() })
    .where(eq(orders.orderNumber, orderNumber))
    .returning();
  return row;
}
