import clsx from "clsx";
import type { PropsWithChildren } from "react";

type ChipProps = PropsWithChildren<{
  tone?: "default" | "acid" | "paper";
  className?: string;
}>;

export function Chip({ children, tone = "default", className }: ChipProps) {
  const tones: Record<NonNullable<ChipProps["tone"]>, string> = {
    default: "border-line-2 text-paper-2",
    acid: "border-acid text-acid",
    paper: "border-paper text-paper",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-2 border px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] font-mono",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
