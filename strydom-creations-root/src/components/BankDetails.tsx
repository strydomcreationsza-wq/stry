"use client";

import { useState } from "react";
import { Copy, Check, Landmark } from "lucide-react";
import { BANK } from "@/lib/config";

type Row = { label: string; value: string; mono?: boolean };

export function BankDetails({ reference }: { reference?: string }) {
  const rows: Row[] = [
    { label: "Bank", value: BANK.bankName },
    { label: "Account name", value: BANK.accountName },
    { label: "Account number", value: BANK.accountNumber, mono: true },
    { label: "Branch", value: BANK.branch },
    { label: "Branch code (EFT)", value: BANK.branchCode, mono: true },
    { label: "Account type", value: BANK.accountType },
    { label: "SWIFT", value: BANK.swift, mono: true },
    ...(reference
      ? [{ label: "Payment reference", value: reference, mono: true }]
      : []),
  ];

  return (
    <div className="rounded-2xl border border-[#ead9cd] bg-white">
      <div className="flex items-center gap-2 border-b border-[#f0e2d8] px-4 py-3 sm:px-5">
        <Landmark className="h-4 w-4 text-[#8b5a4a]" />
        <p className="font-semibold text-[#3d2c29]">Standard Bank — EFT details</p>
      </div>
      <dl className="divide-y divide-[#f5e8de]">
        {rows.map((row) => (
          <BankRow key={row.label} row={row} />
        ))}
      </dl>
      {reference && (
        <p className="border-t border-[#f0e2d8] bg-[#fffaf5] px-4 py-3 text-xs text-[#7a5f56] sm:px-5">
          Please use your order number as the payment reference so we can match your payment quickly.
        </p>
      )}
    </div>
  );
}

function BankRow({ row }: { row: Row }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(row.value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
      <div className="min-w-0">
        <dt className="text-xs uppercase tracking-[0.1em] text-[#a07868]">{row.label}</dt>
        <dd
          className={`mt-0.5 truncate text-sm text-[#3d2c29] ${row.mono ? "font-mono tracking-wide" : ""}`}
        >
          {row.value}
        </dd>
      </div>
      <button
        type="button"
        onClick={copy}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#ead9cd] px-3 py-1.5 text-xs font-medium text-[#5c3d36] transition hover:bg-[#fff5ef]"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-[#128C4A]" /> Copied
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" /> Copy
          </>
        )}
      </button>
    </div>
  );
}
