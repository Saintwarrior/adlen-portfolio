import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { news, getNews } from "../../_data/news";
import { Icon } from "../../_components/Icon";
import { formatDate } from "../../_components/formatters";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const n = getNews(slug);
  if (!n) return { title: "Новость не найдена" };
  return { title: n.title, description: n.excerpt };
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNews(slug);
  if (!article) notFound();

  const others = news.filter((n) => n.slug !== slug).slice(0, 3);
  const readingMinutes = Math.max(
    1,
    Math.round(article.body.join(" ").split(/\s+/).length / 180)
  );

  return (
    <article className="mx-auto flex max-w-[920px] flex-col gap-8">
      {/* Breadcrumbs */}
      <nav
        aria-label="breadcrumbs"
        className="flex flex-wrap items-center gap-2 text-[12.5px] text-[var(--color-kzt-mute)]"
      >
        <Link href="/demo/kazteleport" className="kzt-link">
          Портал
        </Link>
        <Icon name="chevronRight" width={12} height={12} />
        <Link href="/demo/kazteleport/news" className="kzt-link">
          Новости
        </Link>
        <Icon name="chevronRight" width={12} height={12} />
        <span className="truncate text-[var(--color-kzt-ink-2)]">{article.kicker}</span>
      </nav>

      {/* Hero */}
      <header className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={
              article.heroTone === "ochre" ? "kzt-pill kzt-pill--ochre" : "kzt-pill"
            }
          >
            {article.kicker}
          </span>
          {article.pinned ? (
            <span className="kzt-pill kzt-pill--ochre">
              <Icon name="pin" width={11} height={11} />
              Закреплено
            </span>
          ) : null}
          <span className="text-[12px] text-[var(--color-kzt-mute)]">
            {formatDate(article.publishedAt)} · {readingMinutes} мин чтения
          </span>
        </div>
        <h1 className="text-[36px] font-semibold leading-[1.1] tracking-tight md:text-[44px]">
          {article.title}
        </h1>
        <p className="max-w-3xl text-[17px] leading-relaxed text-[var(--color-kzt-ink-2)]">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-3 border-t border-[var(--color-kzt-line)] pt-5">
          <span
            aria-hidden
            className="flex h-11 w-11 items-center justify-center rounded-full text-[13px] font-semibold text-white"
            style={{
              background:
                article.heroTone === "ochre"
                  ? "var(--color-kzt-ochre)"
                  : "var(--color-kzt-green)",
            }}
          >
            {initials(article.author)}
          </span>
          <div>
            <div className="text-[14px] font-medium">{article.author}</div>
            <div className="text-[12px] text-[var(--color-kzt-mute)]">
              Автор публикации
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            <button
              type="button"
              className="kzt-focus inline-flex items-center gap-2 rounded-lg border border-[var(--color-kzt-line)] bg-white px-3 py-2 text-[12.5px] font-medium text-[var(--color-kzt-ink-2)] hover:border-[var(--color-kzt-green)] hover:text-[var(--color-kzt-green)]"
            >
              <Icon name="mail" width={13} height={13} />
              Поделиться
            </button>
            <button
              type="button"
              className="kzt-focus inline-flex items-center gap-2 rounded-lg border border-[var(--color-kzt-line)] bg-white px-3 py-2 text-[12.5px] font-medium text-[var(--color-kzt-ink-2)] hover:border-[var(--color-kzt-green)] hover:text-[var(--color-kzt-green)]"
            >
              <Icon name="pin" width={13} height={13} />
              Сохранить
            </button>
          </div>
        </div>
      </header>

      {/* Hero visual */}
      <div
        aria-hidden
        className={`relative h-[280px] overflow-hidden rounded-2xl ${
          article.heroTone === "ochre"
            ? "bg-gradient-to-br from-[var(--color-kzt-ochre)] to-[#b26800]"
            : "bg-gradient-to-br from-[var(--color-kzt-green)] to-[#04624A]"
        }`}
      >
        <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-8 top-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/25 bg-white/10 text-white backdrop-blur">
          <Icon name="news" width={28} height={28} />
        </div>
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white/90">
          <div className="kzt-mono text-[11px] uppercase tracking-[0.2em]">
            Halyk Kazteleport · Пресс-служба
          </div>
          <div className="kzt-mono text-[11px] uppercase tracking-[0.2em]">
            {article.publishedAt}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-5 text-[16.5px] leading-[1.7] text-[var(--color-kzt-ink-2)]">
        {article.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {/* Reactions */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--color-kzt-line)] bg-white px-5 py-4">
        <span className="text-[13px] text-[var(--color-kzt-mute)]">
          Реакция команды
        </span>
        <div className="flex flex-wrap gap-2">
          {[
            { e: "👍", c: 48 },
            { e: "🔥", c: 22 },
            { e: "🎉", c: 17 },
            { e: "💪", c: 9 },
          ].map((r) => (
            <button
              key={r.e}
              type="button"
              className="kzt-focus inline-flex items-center gap-2 rounded-lg border border-[var(--color-kzt-line)] bg-[var(--color-kzt-bg)] px-3 py-1.5 text-[13px] transition-colors hover:border-[var(--color-kzt-green)]"
            >
              <span>{r.e}</span>
              <span className="kzt-mono font-semibold">{r.c}</span>
            </button>
          ))}
        </div>
        <span className="ml-auto inline-flex items-center gap-1 text-[12.5px] text-[var(--color-kzt-mute)]">
          <Icon name="people" width={13} height={13} />
          94 прочтения
        </span>
      </div>

      {/* More */}
      <section className="border-t border-[var(--color-kzt-line)] pt-8">
        <div className="mb-4 flex items-end justify-between">
          <div>
            <div className="kzt-kicker">Ещё из ленты</div>
            <h2 className="mt-1 text-[20px] font-semibold">Читайте также</h2>
          </div>
          <Link
            href="/demo/kazteleport/news"
            className="kzt-link inline-flex items-center gap-1 text-[13px] font-medium"
          >
            Все новости
            <Icon name="arrowRight" width={13} height={13} />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {others.map((n) => (
            <Link
              key={n.slug}
              href={`/demo/kazteleport/news/${n.slug}`}
              className="kzt-card group flex flex-col gap-3 p-5 transition-shadow hover:shadow-[0_4px_20px_rgba(15,29,24,0.06)]"
            >
              <span
                className={
                  n.heroTone === "ochre"
                    ? "kzt-pill kzt-pill--ochre self-start"
                    : "kzt-pill self-start"
                }
              >
                {n.kicker}
              </span>
              <h3 className="line-clamp-2 text-[15px] font-semibold leading-snug group-hover:text-[var(--color-kzt-green)]">
                {n.title}
              </h3>
              <div className="mt-auto text-[11.5px] text-[var(--color-kzt-mute)]">
                {formatDate(n.publishedAt)}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}
