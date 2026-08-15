import { cn } from "@/lib/utils";

type Props = {
  steps: string[];
  current: number;
};

export function StepIndicator({ steps, current }: Props) {
  return (
    <div className="w-full overflow-x-auto pb-1">
      <ol className="flex min-w-max items-center gap-2 sm:min-w-0 sm:flex-wrap">
        {steps.map((label, index) => {
          const n = index + 1;
          const active = n === current;
          const done = n < current;
          return (
            <li key={label} className="flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
                  done && "bg-[#c4785a] text-white",
                  active && "bg-[#5c3d36] text-white",
                  !done && !active && "bg-[#f0e2d8] text-[#9a7f74]",
                )}
              >
                {n}
              </span>
              <span
                className={cn(
                  "hidden text-xs font-medium sm:inline",
                  active ? "text-[#3d2c29]" : "text-[#9a7f74]",
                )}
              >
                {label}
              </span>
              {index < steps.length - 1 && (
                <span className="mx-1 hidden h-px w-4 bg-[#e8d5c8] sm:block" />
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-3 text-sm font-medium text-[#5c3d36] sm:hidden">
        Step {current}: {steps[current - 1]}
      </p>
    </div>
  );
}
