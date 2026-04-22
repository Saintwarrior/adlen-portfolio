import Link from "next/link";
import { employees } from "../_data/employees";
import { Icon } from "./Icon";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

export function PeopleWidget({ limit = 5 }: { limit?: number }) {
  const list = employees.slice(0, limit);

  return (
    <div className="kzt-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--color-kzt-line)] px-5 py-4">
        <div>
          <div className="kzt-kicker">Команда</div>
          <div className="mt-1 text-[15px] font-semibold">
            Руководители направлений
          </div>
        </div>
        <Link
          href="/demo/kazteleport/people"
          className="kzt-link inline-flex items-center gap-1 text-xs font-medium"
        >
          Справочник
          <Icon name="arrowRight" width={13} height={13} />
        </Link>
      </div>

      <ul className="divide-y divide-[var(--color-kzt-line)]">
        {list.map((p) => (
          <li key={p.id}>
            <Link
              href={`/demo/kazteleport/people/${p.id}`}
              className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-[var(--color-kzt-bg)]"
            >
              <span
                aria-hidden
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                style={{ background: p.avatarTone }}
              >
                {initials(p.fullName)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[13.5px] font-medium">
                  {p.fullName}
                </div>
                <div className="truncate text-[11.5px] text-[var(--color-kzt-mute)]">
                  {p.position}
                </div>
              </div>
              <span className="kzt-pill kzt-pill--mute">{p.city}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
