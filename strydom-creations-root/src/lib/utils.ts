import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function generateOrderNumber(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `LSN-${date}-${rand}`;
}

export function generatePaymentRef(): string {
  return `PAY-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}
