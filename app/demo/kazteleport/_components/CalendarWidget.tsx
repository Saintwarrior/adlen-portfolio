import Link from "next/link";
import { events } from "../_data/calendar";
import type { EventKind } from "../_data/types";
import { formatDateShort, formatWeekday, relativeDays } from "./formatters";
import { Icon } from "./Icon";

const KIND_STYLE: Record<EventKind, string> = {
  совещание: "kzt-pill",
  "встреча с клиентом": "kzt-pill kzt-pill--info",
  релиз: "kzt-pill kzt-pill--ochre",
  корпоратив: "kzt-pill kzt-pill--ochre",
  обучение: "kzt-pill kzt-pill--info",
  дедлайн: "kzt-pill kzt-pill--danger",
};

export function CalendarWidget({ limit = 5 }: { limit?: number }) {
  const upcoming = [...events]
    .filter((e) => new Date(e.date).getTime() >= Date.now() - 86400000)
    .slice(0, limit);

  return (
    <div className="kzt-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--color-kzt-line)] px-5 py-4">
        <div>
          <div className="kzt-kicker">Расписание</div>
          <div className="mt-1 text-[15px] font-semibold">Ближайшие события</div>
        </div>
        <Link
          href="/demo/kazteleport/calendar"
          className="kzt-link inline-flex items-center gap-1 text-xs font-medium"
        >
          Календарь
          <Icon name="arrowRight" width={13} height={13} />
        </Link>
      </div>

      <ul className="divide-y divide-[var(--color-kzt-line)]">
        {upcoming.map((e) => (
          <li key={e.id} className="flex items-center gap-4 px-5 py-3.5">
            <div className="flex w-12 shrink-0 flex-col items-center rounded-md bg-[var(--color-kzt-bg)] py-1.5">
              <span className="text-[10px] uppercase tracking-wider text-[var(--color-kzt-mute)]">
                {formatWeekday(e.date)}
              </span>
              <span className="kzt-mono text-[15px] font-semibold leading-none">
                {formatDateShort(e.date)}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-[14px] font-medium text-[var(--color-kzt-ink)]">
                {e.title}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-[11.5px] text-[var(--color-kzt-mute)]">
                <span className={KIND_STYLE[e.kind]}>{e.kind}</span>
                {e.time ? (
                  <span className="inline-flex items-center gap-1">
                    <Icon name="clock" width={11} height={11} />
                    {e.time}
                  </span>
                ) : null}
                {e.location ? <span>· {e.location}</span> : null}
                <span className="ml-auto">{relativeDays(e.date)}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
