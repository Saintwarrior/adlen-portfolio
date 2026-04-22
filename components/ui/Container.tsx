import clsx from "clsx";
import type { PropsWithChildren } from "react";

type ContainerProps = PropsWithChildren<{
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
  wide?: boolean;
}>;

export function Container({
  children,
  className,
  as = "div",
  wide = false,
}: ContainerProps) {
  const Tag = as;
  return (
    <Tag
      className={clsx(
        "mx-auto w-full px-5 md:px-8 lg:px-12",
        wide ? "max-w-[1680px]" : "max-w-[1440px]",
        className
      )}
    >
      {children}
    </Tag>
  );
}
