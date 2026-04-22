import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = BaseProps &
  Omit<ComponentProps<typeof Link>, "className" | "children"> & {
    href: string;
  };

const variants: Record<Variant, string> = {
  primary:
    "bg-acid text-black font-semibold hover:bg-acid-2 border border-acid hover:border-acid-2",
  secondary:
    "bg-transparent text-paper border border-line-2 hover:border-paper hover:bg-ink-2",
  ghost:
    "bg-transparent text-paper border border-transparent hover:border-line-2",
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  href,
  ...rest
}: ButtonAsLink) {
  return (
    <Link
      href={href}
      className={clsx(
        "group inline-flex items-center gap-3 px-6 py-4 text-[13px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 font-mono",
        variants[variant],
        className
      )}
      {...rest}
    >
      <span>{children}</span>
      <span
        aria-hidden
        className="arrow-ne inline-block text-[15px] leading-none"
      >
        ↗
      </span>
    </Link>
  );
}
