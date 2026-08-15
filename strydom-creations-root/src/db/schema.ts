import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: varchar("order_number", { length: 32 }).notNull().unique(),
  category: varchar("category", { length: 64 }).notNull(),
  productName: varchar("product_name", { length: 255 }).notNull(),
  customerName: varchar("customer_name", { length: 255 }),
  customerEmail: varchar("customer_email", { length: 255 }).notNull(),
  customerPhone: varchar("customer_phone", { length: 64 }),
  childName: varchar("child_name", { length: 255 }),
  ageGroup: varchar("age_group", { length: 32 }),
  theme: varchar("theme", { length: 128 }),
  problem: varchar("problem", { length: 128 }),
  language: varchar("language", { length: 64 }),
  companion: varchar("companion", { length: 64 }),
  courierOption: varchar("courier_option", { length: 64 }).notNull(),
  bookPrice: integer("book_price").notNull(),
  courierPrice: integer("courier_price").notNull(),
  totalPrice: integer("total_price").notNull(),
  status: varchar("status", { length: 64 }).notNull().default("paid"),
  paymentStatus: varchar("payment_status", { length: 64 }).notNull().default("paid"),
  paymentReference: varchar("payment_reference", { length: 128 }),
  notes: text("notes"),
  configSnapshot: jsonb("config_snapshot"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type ContactMessage = typeof contactMessages.$inferSelect;
