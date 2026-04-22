import { Icon } from "./Icon";
import type { Kpi } from "../_data/types";

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const isUp = kpi.trend === "up";
  const isDown = kpi.trend === "down";
  const color = isUp
    ? "text-[var(--color-kzt-green)]"
    : isDown
    ? "text-[var(--color-kzt-danger)]"
    : "text-[var(--color-kzt-mute)]";

  return (
    <div className="kzt-card flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between">
        <span className="kzt-kicker">{kpi.label}</span>
        <span className={`flex items-center gap-1 text-xs font-semibold ${color}`}>
          {isUp ? (
            <Icon name="arrowUp" width={12} height={12} />
          ) : isDown ? (
            <Icon name="arrowDown" width={12} height={12} />
          ) : null}
          {kpi.delta}
        </span>
      </div>
      <div className="kzt-mono text-[28px] font-semibold leading-none tracking-tight text-[var(--color-kzt-ink)]">
        {kpi.value}
      </div>
      <div className="text-[12px] text-[var(--color-kzt-mute)]">{kpi.hint}</div>
    </div>
  );
}
