import Link from "next/link";
import { requests } from "../_data/requests";
import type { RequestStatus } from "../_data/types";
import { formatDateShort } from "./formatters";
import { Icon } from "./Icon";

const STATUS_STYLE: Record<RequestStatus, string> = {
  Новая: "kzt-pill kzt-pill--info",
  "В работе": "kzt-pill kzt-pill--info",
  "На согласовании": "kzt-pill kzt-pill--ochre",
  Одобрена: "kzt-pill",
  Отклонена: "kzt-pill kzt-pill--danger",
  Выполнена: "kzt-pill kzt-pill--mute",
};

export function RequestsWidget({ limit = 5 }: { limit?: number }) {
  const needsAction = requests
    .filter((r) => r.status === "На согласовании")
    .slice(0, limit);

  return (
    <div className="kzt-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--color-kzt-line)] px-5 py-4">
        <div>
          <div className="kzt-kicker">Требуют решения</div>
          <div className="mt-1 flex items-baseline gap-2 text-[15px] font-semibold">
            Заявки на согласовании
            <span className="kzt-pill kzt-pill--ochre">{needsAction.length}</span>
          </div>
        </div>
        <Link
          href="/demo/kazteleport/requests"
          className="kzt-link inline-flex items-center gap-1 text-xs font-medium"
        >
          Все заявки
          <Icon name="arrowRight" width={13} height={13} />
        </Link>
      </div>

      <ul className="divide-y divide-[var(--color-kzt-line)]">
        {needsAction.map((r) => (
          <li key={r.id} className="px-5 py-3.5">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="kzt-mono text-[11.5px] font-semibold tracking-wider text-[var(--color-kzt-mute)]">
                    {r.id}
                  </span>
                  <span className={STATUS_STYLE[r.status]}>{r.status}</span>
                </div>
                <div className="mt-1 truncate text-[14px] font-medium text-[var(--color-kzt-ink)]">
                  {r.subject}
                </div>
                <div className="mt-1 text-[11.5px] text-[var(--color-kzt-mute)]">
                  {r.type} · {r.author} · {formatDateShort(r.submittedAt)}
                </div>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  className="kzt-focus rounded-md border border-[var(--color-kzt-line)] px-3 py-1.5 text-[12px] font-medium text-[var(--color-kzt-ink-2)] transition-colors hover:border-[var(--color-kzt-green)] hover:text-[var(--color-kzt-green)]"
                >
                  Открыть
                </button>
                <button
                  type="button"
                  className="kzt-focus inline-flex items-center gap-1 rounded-md bg-[var(--color-kzt-green)] px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-[var(--color-kzt-green-2)]"
                >
                  <Icon name="check" width={12} height={12} />
                  Одобрить
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
