import clsx from "clsx";
import { Reveal } from "./Reveal";

type SectionHeaderProps = {
  serial: string;
  label: string;
  title: React.ReactNode;
  kicker?: string;
  lede?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  serial,
  label,
  title,
  kicker,
  lede,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        "grid gap-6 md:grid-cols-[1fr_auto] md:items-end",
        align === "center" && "text-center md:grid-cols-1",
        className
      )}
    >
      <div>
        <Reveal>
          <div className="flex items-center gap-4 text-paper">
            <span className="num-mono text-xs text-mute tracking-[0.2em]">
              N°{serial}
            </span>
            <span className="h-px w-10 bg-line" />
            <span className="kicker">{label}</span>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 display-sans text-[clamp(2.5rem,6vw,5.25rem)]">
            {title}
          </h2>
        </Reveal>
        {lede ? (
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-base text-paper-2 md:text-lg">
              {lede}
            </p>
          </Reveal>
        ) : null}
      </div>
      {kicker ? (
        <Reveal delay={0.1}>
          <p className="kicker max-w-[18ch] text-right text-mute-2">{kicker}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
