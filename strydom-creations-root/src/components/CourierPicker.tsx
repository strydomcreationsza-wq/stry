"use client";

import { COURIER_OPTIONS, formatRand } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

type Props = {
  value: string;
  onChange: (id: string) => void;
};

export function CourierPicker({ value, onChange }: Props) {
  return (
    <div className="space-y-3">
      {COURIER_OPTIONS.map((option) => {
        const selected = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition",
              selected
                ? "border-[#c4785a] bg-[#fff5ef] shadow-sm"
                : "border-[#ead9cd] bg-white hover:border-[#d9b9a8]",
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
                selected ? "border-[#c4785a] bg-[#c4785a] text-white" : "border-[#d9b9a8]",
              )}
            >
              {selected && <Check className="h-3 w-3" />}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-[#3d2c29]">{option.name}</span>
                <span className="text-sm font-semibold text-[#c4785a]">
                  + {formatRand(option.price)}
                </span>
              </span>
              <span className="mt-1 block text-sm text-[#7a5f56]">{option.description}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
