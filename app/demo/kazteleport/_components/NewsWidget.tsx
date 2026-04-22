import Link from "next/link";
import { news } from "../_data/news";
import { formatDate } from "./formatters";
import { Icon } from "./Icon";

export function NewsWidget({ limit = 4 }: { limit?: number }) {
  const items = news.slice(0, limit);

  return (
    <div className="kzt-card overflow-hidden">
      <div className="flex items-center justify-between border-b border-[var(--color-kzt-line)] px-5 py-4">
        <div>
          <div className="kzt-kicker">Лента компании</div>
          <div className="mt-1 text-[15px] font-semibold">Последние новости</div>
        </div>
        <Link
          href="/demo/kazteleport/news"
          className="kzt-link inline-flex items-center gap-1 text-xs font-medium"
        >
          Все новости
          <Icon name="arrowRight" width={13} height={13} />
        </Link>
      </div>

      <ul className="divide-y divide-[var(--color-kzt-line)]">
        {items.map((n) => (
          <li key={n.slug}>
            <Link
              href={`/demo/kazteleport/news/${n.slug}`}
              className="group flex items-start gap-4 px-5 py-4 transition-colors hover:bg-[var(--color-kzt-bg)]"
            >
              <span
                aria-hidden
                className={`mt-1 h-10 w-[3px] shrink-0 rounded-full ${
                  n.heroTone === "ochre"
                    ? "bg-[var(--color-kzt-ochre)]"
                    : "bg-[var(--color-kzt-green)]"
                }`}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  {n.pinned ? (
                    <span className="kzt-pill kzt-pill--ochre">
                      <Icon name="pin" width={11} height={11} />
                      Закреплено
                    </span>
                  ) : null}
                  <span className="kzt-kicker">{n.kicker}</span>
                </div>
                <div className="mt-1.5 line-clamp-2 text-[14.5px] font-semibold leading-snug text-[var(--color-kzt-ink)] group-hover:text-[var(--color-kzt-green)]">
                  {n.title}
                </div>
                <div className="mt-1.5 line-clamp-1 text-[13px] text-[var(--color-kzt-mute)]">
                  {n.excerpt}
                </div>
                <div className="mt-2 text-[11.5px] text-[var(--color-kzt-mute)]">
                  {formatDate(n.publishedAt)} · {n.author}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
