import clsx from "clsx";
import type { ReactNode } from "react";

type MarqueeProps = {
  items: ReactNode[];
  speed?: "normal" | "fast";
  separator?: ReactNode;
  className?: string;
  itemClassName?: string;
};

export function Marquee({
  items,
  speed = "normal",
  separator,
  className,
  itemClassName,
}: MarqueeProps) {
  const sep = separator ?? (
    <span aria-hidden className="mx-6 text-acid">
      ◆
    </span>
  );

  const row = (key: string) => (
    <div
      key={key}
      aria-hidden={key === "b"}
      className={clsx(
        "flex shrink-0 items-center",
        speed === "fast" ? "marquee-fast" : "marquee-track"
      )}
    >
      {items.map((item, i) => (
        <span
          key={i}
          className={clsx("flex shrink-0 items-center", itemClassName)}
        >
          {item}
          {sep}
        </span>
      ))}
    </div>
  );

  return (
    <div className={clsx("relative flex w-full overflow-hidden", className)}>
      {row("a")}
      {row("b")}
    </div>
  );
}
