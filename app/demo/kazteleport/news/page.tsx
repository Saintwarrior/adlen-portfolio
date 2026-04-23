import Link from "next/link";
import type { Metadata } from "next";
import { news } from "../_data/news";
import { PageHeader } from "../_components/PageHeader";
import { Icon } from "../_components/Icon";
import { formatDate } from "../_components/formatters";

export const metadata: Metadata = {
  title: "Новости",
};

export default function NewsListPage() {
  const pinned = news.find((n) => n.pinned) ?? news[0];
  const rest = news.filter((n) => n.slug !== pinned.slug);

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6">
      <PageHeader
        kicker="Корпоративная лента"
        title="Новости Halyk Kazteleport"
        description="Обновления о компании, инфраструктуре, продуктах и людях. Сохраняется всё, что касается жизни коллектива."
        actions={
          <>
            <button
              type="button"
              className="kzt-focus inline-flex items-center gap-2 rounded-lg border border-[var(--color-kzt-line)] bg-white px-3.5 py-2 text-[13px] font-medium text-[var(--color-kzt-ink-2)] hover:border-[var(--color-kzt-green)] hover:text-[var(--color-kzt-green)]"
            >
              <Icon name="filter" width={14} height={14} />
              Все рубрики
              <Icon name="chevronDown" width={14} height={14} />
            </button>
            <button
              type="button"
              className="kzt-focus inline-flex items-center gap-2 rounded-lg bg-[var(--color-kzt-green)] px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-[var(--color-kzt-green-2)]"
            >
              <Icon name="plus" width={14} height={14} />
              Новый пост
            </button>
          </>
        }
      />

      {/* Hero article */}
      <Link
        href={`/demo/kazteleport/news/${pinned.slug}`}
        className="group kzt-card grid overflow-hidden lg:grid-cols-[1.1fr_1fr]"
      >
        <div
          aria-hidden
          className={`relative min-h-[220px] overflow-hidden ${
            pinned.heroTone === "ochre"
              ? "bg-gradient-to-br from-[var(--color-kzt-ochre)] to-[#c57c00]"
              : "bg-gradient-to-br from-[var(--color-kzt-green)] to-[#04624A]"
          }`}
        >
          <div className="absolute -right-16 -top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10.5px] uppercase tracking-[0.2em] text-white/80">
            <span className="kzt-pill kzt-pill--ochre">Закреплено</span>
            <span>{pinned.kicker}</span>
          </div>
          <div className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/10 text-white backdrop-blur">
            <Icon name="news" width={24} height={24} />
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6 md:p-8">
          <div className="kzt-kicker">{formatDate(pinned.publishedAt)}</div>
          <h2 className="text-[26px] font-semibold leading-[1.15] tracking-tight group-hover:text-[var(--color-kzt-green)]">
            {pinned.title}
          </h2>
          <p className="text-[14.5px] text-[var(--color-kzt-mute)]">
            {pinned.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-[12px] text-[var(--color-kzt-mute)]">
              {pinned.author}
            </span>
            <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-[var(--color-kzt-green)]">
              Читать
              <Icon name="arrowRight" width={13} height={13} />
            </span>
          </div>
        </div>
      </Link>

      {/* Grid of rest */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rest.map((n) => (
          <Link
            key={n.slug}
            href={`/demo/kazteleport/news/${n.slug}`}
            className="group kzt-card flex flex-col overflow-hidden transition-shadow hover:shadow-[0_4px_20px_rgba(15,29,24,0.08)]"
          >
            <div
              aria-hidden
              className={`relative h-[120px] ${
                n.heroTone === "ochre"
                  ? "bg-gradient-to-br from-[#fde2a3] to-[var(--color-kzt-ochre)]"
                  : "bg-gradient-to-br from-[#c2eadb] to-[var(--color-kzt-green)]"
              }`}
            >
              <div className="absolute bottom-3 left-4 text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/90">
                {n.kicker}
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <div className="kzt-kicker">{formatDate(n.publishedAt)}</div>
              <h3 className="line-clamp-2 text-[16px] font-semibold leading-snug tracking-tight group-hover:text-[var(--color-kzt-green)]">
                {n.title}
              </h3>
              <p className="line-clamp-3 text-[13px] text-[var(--color-kzt-mute)]">
                {n.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-between pt-1 text-[11.5px] text-[var(--color-kzt-mute)]">
                <span>{n.author}</span>
                <span className="inline-flex items-center gap-1 font-medium text-[var(--color-kzt-green)]">
                  Открыть
                  <Icon name="arrowRight" width={11} height={11} />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
