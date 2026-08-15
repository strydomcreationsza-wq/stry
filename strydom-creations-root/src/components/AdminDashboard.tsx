"use client";

import { useEffect, useState } from "react";
import { formatRandExact, statusLabel, ORDER_STATUSES } from "@/lib/config";
import { Loader2, LogOut, RefreshCw } from "lucide-react";

type OrderRow = {
  id: number;
  orderNumber: string;
  category: string;
  productName: string;
  customerName: string | null;
  customerEmail: string;
  childName: string | null;
  ageGroup: string | null;
  theme: string | null;
  problem: string | null;
  language: string | null;
  companion: string | null;
  courierOption: string;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  paymentReference: string | null;
  createdAt: string;
};

export function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("lsn_admin");
    if (saved) {
      setToken(saved);
    }
  }, []);

  useEffect(() => {
    if (token) {
      void loadOrders(token);
    }
  }, [token]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        headers: { "x-admin-password": password },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      sessionStorage.setItem("lsn_admin", password);
      setToken(password);
      setOrders(data.orders || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  async function loadOrders(pwd: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/orders", {
        headers: { "x-admin-password": pwd },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load orders");
      setOrders(data.orders || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load orders");
      if (String(err).includes("Unauthorized") || String(err).toLowerCase().includes("password")) {
        sessionStorage.removeItem("lsn_admin");
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(orderNumber: string, status: string) {
    if (!token) return;
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": token,
        },
        body: JSON.stringify({ orderNumber, status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Update failed");
      setOrders((prev) =>
        prev.map((o) => (o.orderNumber === orderNumber ? { ...o, status } : o)),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
    }
  }

  function logout() {
    sessionStorage.removeItem("lsn_admin");
    setToken(null);
    setOrders([]);
  }

  if (!token) {
    return (
      <form
        onSubmit={login}
        className="mx-auto max-w-md rounded-3xl border border-[#ead9cd] bg-white p-6 shadow-sm sm:p-8"
      >
        <h1 className="font-display text-2xl font-semibold text-[#3d2c29]">Studio orders</h1>
        <p className="mt-2 text-sm text-[#7a5f56]">Sign in to view and update customer orders.</p>
        <label className="mt-6 block">
          <span className="mb-1.5 block text-sm font-medium text-[#5c3d36]">Admin password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[#ead9cd] px-3 py-3 outline-none focus:border-[#c4785a]"
            required
          />
        </label>
        {error && (
          <p className="mt-3 rounded-xl bg-[#fdecea] px-3 py-2 text-sm text-[#9b3b2e]">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-full bg-[#5c3d36] px-5 py-3 text-sm font-semibold text-white"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    );
  }

  return (
    <div>
      <div className="mb-6 rounded-2xl border border-[#c8e6d0] bg-[#f0faf3] p-4 text-sm text-[#1e6b3a]">
        <p className="font-semibold">📮 Email delivery active</p>
        <p className="mt-1">
          Orders and enquiries are being sent to <strong>strydomcreations.za@gmail.com</strong>.
          If this is the first send, check that Gmail inbox (and spam folder) for a one-time
          activation link from FormSubmit — click it once and all future emails will land
          straight in your inbox. Orders always save here as a backup.
        </p>
      </div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-semibold text-[#3d2c29]">Orders</h1>
          <p className="mt-1 text-sm text-[#7a5f56]">{orders.length} order(s)</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => token && loadOrders(token)}
            className="inline-flex items-center gap-2 rounded-full border border-[#ead9cd] bg-white px-4 py-2 text-sm font-medium text-[#5c3d36]"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full border border-[#ead9cd] bg-white px-4 py-2 text-sm font-medium text-[#5c3d36]"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </div>

      {error && (
        <p className="mb-4 rounded-xl bg-[#fdecea] px-3 py-2 text-sm text-[#9b3b2e]">{error}</p>
      )}

      {loading && orders.length === 0 ? (
        <div className="flex items-center justify-center gap-2 py-16 text-[#7a5f56]">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading orders…
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#ead9cd] bg-white p-10 text-center text-[#7a5f56]">
          No orders yet.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <article
              key={order.id}
              className="rounded-3xl border border-[#ead9cd] bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#a07868]">
                    {order.orderNumber}
                  </p>
                  <h2 className="mt-1 font-display text-xl font-semibold text-[#3d2c29]">
                    {order.productName}
                  </h2>
                  <p className="mt-1 text-sm text-[#7a5f56]">
                    {new Date(order.createdAt).toLocaleString("en-ZA")} · {formatRandExact(order.totalPrice)}
                  </p>
                </div>
                <span className="rounded-full bg-[#f3e0d4] px-3 py-1 text-xs font-semibold text-[#8b5a4a]">
                  {statusLabel(order.status)}
                </span>
              </div>

              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-[#9a7f74]">Customer</dt>
                  <dd className="text-[#3d2c29]">
                    {order.customerName || "—"} · {order.customerEmail}
                  </dd>
                </div>
                <div>
                  <dt className="text-[#9a7f74]">Courier</dt>
                  <dd className="text-[#3d2c29]">{order.courierOption}</dd>
                </div>
                {order.childName && (
                  <div>
                    <dt className="text-[#9a7f74]">Child</dt>
                    <dd className="text-[#3d2c29]">
                      {order.childName}
                      {order.ageGroup ? ` · ${order.ageGroup}` : ""}
                    </dd>
                  </div>
                )}
                {order.theme && (
                  <div>
                    <dt className="text-[#9a7f74]">Theme / focus</dt>
                    <dd className="text-[#3d2c29]">
                      {order.theme}
                      {order.problem ? ` · ${order.problem}` : ""}
                    </dd>
                  </div>
                )}
                {order.language && (
                  <div>
                    <dt className="text-[#9a7f74]">Language</dt>
                    <dd className="text-[#3d2c29]">{order.language}</dd>
                  </div>
                )}
                {order.companion && (
                  <div>
                    <dt className="text-[#9a7f74]">Companion</dt>
                    <dd className="text-[#3d2c29]">{order.companion}</dd>
                  </div>
                )}
                {order.paymentReference && (
                  <div>
                    <dt className="text-[#9a7f74]">Payment ref</dt>
                    <dd className="text-[#3d2c29]">{order.paymentReference}</dd>
                  </div>
                )}
              </dl>

              <label className="mt-5 block max-w-sm">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-[#a07868]">
                  Update status
                </span>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.orderNumber, e.target.value)}
                  className="w-full rounded-xl border border-[#ead9cd] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#c4785a]"
                >
                  {ORDER_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {statusLabel(s)}
                    </option>
                  ))}
                </select>
              </label>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
