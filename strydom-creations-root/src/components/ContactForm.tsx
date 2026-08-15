"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<null | {
    emailDelivered: boolean;
  }>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(null);
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not send");
      setSuccess({
        emailDelivered: data?.delivery?.businessEmail?.provider === "formsubmit",
      });
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-[#ead9cd] bg-white p-5 sm:p-6">
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[#5c3d36]">Name</span>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full rounded-xl border border-[#ead9cd] px-3 py-3 outline-none focus:border-[#c4785a]"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[#5c3d36]">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-xl border border-[#ead9cd] px-3 py-3 outline-none focus:border-[#c4785a]"
        />
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-[#5c3d36]">Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className="w-full rounded-xl border border-[#ead9cd] px-3 py-3 outline-none focus:border-[#c4785a]"
          placeholder="Tell us about your child or the book you have in mind…"
        />
      </label>
      {error && (
        <p className="rounded-xl bg-[#fdecea] px-3 py-2 text-sm text-[#9b3b2e]">{error}</p>
      )}
      {success && (
        <div className="space-y-2">
          <p className="rounded-xl bg-[#e8f8ee] px-3 py-2 text-sm text-[#128C4A]">
            ✅ Your message has been saved — we&apos;ll be in touch soon.
          </p>
          {!success.emailDelivered && (
            <p className="rounded-xl bg-[#fff4e6] px-3 py-2 text-xs text-[#8a5a10]">
              Note: real email sending isn&apos;t configured yet. Your message is safe in our
              database, but you may want to WhatsApp us too using the button opposite.
            </p>
          )}
        </div>
      )}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c4785a] px-6 py-3 text-sm font-semibold text-white hover:bg-[#b0654a] disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </button>
    </form>
  );
}
