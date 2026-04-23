import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { employees, getEmployee } from "../../_data/employees";
import { requests } from "../../_data/requests";
import { PageHeader } from "../../_components/PageHeader";
import { Icon } from "../../_components/Icon";
import { formatDate } from "../../_components/formatters";

export function generateStaticParams() {
  return employees.map((e) => ({ id: e.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const e = getEmployee(id);
  if (!e) return { title: "Сотрудник не найден" };
  return { title: e.fullName };
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

export default async function EmployeePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const employee = getEmployee(id);
  if (!employee) notFound();

  const team = employees.filter(
    (e) => e.manager === employee.fullName && e.id !== employee.id
  );
  const colleagues = employees
    .filter(
      (e) =>
        e.department === employee.department &&
        e.id !== employee.id &&
        !team.some((t) => t.id === e.id)
    )
    .slice(0, 5);

  const manager = employees.find((e) => e.fullName === employee.manager);
  const tenureYears =
    (Date.now() - new Date(employee.startedAt).getTime()) /
    (1000 * 60 * 60 * 24 * 365);
  const tenureLabel =
    tenureYears < 1
      ? `${Math.round(tenureYears * 12)} мес.`
      : `${tenureYears.toFixed(1)} лет`;

  const recentRequests = requests
    .filter((r) => r.author === employee.fullName)
    .slice(0, 3);

  return (
    <div className="mx-auto flex max-w-[1280px] flex-col gap-6">
      {/* Breadcrumbs */}
      <nav
        aria-label="breadcrumbs"
        className="flex flex-wrap items-center gap-2 text-[12.5px] text-[var(--color-kzt-mute)]"
      >
        <Link href="/demo/kazteleport" className="kzt-link">
          Портал
        </Link>
        <Icon name="chevronRight" width={12} height={12} />
        <Link href="/demo/kazteleport/people" className="kzt-link">
          Сотрудники
        </Link>
        <Icon name="chevronRight" width={12} height={12} />
        <span className="truncate text-[var(--color-kzt-ink-2)]">
          {employee.fullName}
        </span>
      </nav>

      {/* Hero */}
      <section className="kzt-card relative overflow-hidden p-6 md:p-8">
        <div
          aria-hidden
          className="absolute -right-24 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl"
          style={{ background: employee.avatarTone }}
        />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <span
              aria-hidden
              className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-2xl text-[28px] font-semibold text-white"
              style={{ background: employee.avatarTone }}
            >
              {initials(employee.fullName)}
            </span>
            <div>
              <div className="kzt-kicker">{employee.department}</div>
              <h1 className="mt-1 text-[28px] font-semibold leading-tight tracking-tight md:text-[32px]">
                {employee.fullName}
              </h1>
              <div className="mt-1.5 text-[15px] text-[var(--color-kzt-mute)]">
                {employee.position}
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="kzt-pill">{employee.city}</span>
                <span className="kzt-pill kzt-pill--mute">
                  В компании {tenureLabel}
                </span>
                {employee.tgUsername ? (
                  <span className="kzt-pill kzt-pill--info">
                    <Icon name="telegram" width={11} height={11} />@
                    {employee.tgUsername}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={`mailto:${employee.email}`}
              className="kzt-focus inline-flex items-center gap-2 rounded-lg bg-[var(--color-kzt-green)] px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-[var(--color-kzt-green-2)]"
            >
              <Icon name="mail" width={14} height={14} />
              Написать письмо
            </a>
            <a
              href={`tel:${employee.phone.replace(/\s|\(|\)/g, "")}`}
              className="kzt-focus inline-flex items-center gap-2 rounded-lg border border-[var(--color-kzt-line)] bg-white px-4 py-2.5 text-[13px] font-medium text-[var(--color-kzt-ink-2)] hover:border-[var(--color-kzt-green)] hover:text-[var(--color-kzt-green)]"
            >
              <Icon name="phone" width={14} height={14} />
              Позвонить
            </a>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          {/* Bio */}
          <section className="kzt-card p-6">
            <div className="kzt-kicker">О&nbsp;сотруднике</div>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-kzt-ink-2)]">
              {employee.bio}
            </p>

            <div className="mt-5">
              <div className="kzt-kicker">Ключевые компетенции</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {employee.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-[var(--color-kzt-line)] bg-[var(--color-kzt-bg)] px-2.5 py-1 text-[12px] text-[var(--color-kzt-ink-2)]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Team */}
          {team.length > 0 ? (
            <section className="kzt-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-[var(--color-kzt-line)] px-6 py-4">
                <div>
                  <div className="kzt-kicker">Команда</div>
                  <div className="mt-1 text-[15px] font-semibold">
                    В прямом подчинении ({team.length})
                  </div>
                </div>
              </div>
              <ul className="divide-y divide-[var(--color-kzt-line)]">
                {team.map((t) => (
                  <li key={t.id}>
                    <Link
                      href={`/demo/kazteleport/people/${t.id}`}
                      className="flex items-center gap-3 px-6 py-3 transition-colors hover:bg-[var(--color-kzt-bg)]"
                    >
                      <span
                        aria-hidden
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                        style={{ background: t.avatarTone }}
                      >
                        {initials(t.fullName)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13.5px] font-medium">
                          {t.fullName}
                        </div>
                        <div className="truncate text-[11.5px] text-[var(--color-kzt-mute)]">
                          {t.position}
                        </div>
                      </div>
                      <span className="kzt-pill kzt-pill--mute">{t.city}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* Recent requests */}
          {recentRequests.length > 0 ? (
            <section className="kzt-card overflow-hidden">
              <div className="border-b border-[var(--color-kzt-line)] px-6 py-4">
                <div className="kzt-kicker">Активность</div>
                <div className="mt-1 text-[15px] font-semibold">
                  Недавние заявки
                </div>
              </div>
              <ul className="divide-y divide-[var(--color-kzt-line)]">
                {recentRequests.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-start gap-3 px-6 py-3.5"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="kzt-mono text-[11.5px] font-semibold tracking-wider text-[var(--color-kzt-mute)]">
                          {r.id}
                        </span>
                        <span className="kzt-pill kzt-pill--mute">{r.type}</span>
                      </div>
                      <div className="mt-1 text-[13.5px] font-medium">
                        {r.subject}
                      </div>
                      <div className="mt-1 text-[11.5px] text-[var(--color-kzt-mute)]">
                        {formatDate(r.submittedAt)} · статус: {r.status}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        {/* Right column */}
        <aside className="flex flex-col gap-6">
          <section className="kzt-card p-6">
            <div className="kzt-kicker">Контакты</div>
            <dl className="mt-4 flex flex-col gap-3 text-[13.5px]">
              <ContactRow icon="mail" label="E-mail" value={employee.email} href={`mailto:${employee.email}`} />
              <ContactRow icon="phone" label="Телефон" value={employee.phone} href={`tel:${employee.phone.replace(/\s|\(|\)/g, "")}`} />
              {employee.tgUsername ? (
                <ContactRow
                  icon="telegram"
                  label="Telegram"
                  value={`@${employee.tgUsername}`}
                  href={`https://t.me/${employee.tgUsername}`}
                />
              ) : null}
            </dl>
          </section>

          <section className="kzt-card p-6">
            <div className="kzt-kicker">Сведения</div>
            <dl className="mt-4 flex flex-col divide-y divide-[var(--color-kzt-line)] text-[13.5px]">
              <InfoRow label="Отдел" value={employee.department} />
              <InfoRow label="Город" value={employee.city} />
              <InfoRow label="В компании с" value={formatDate(employee.startedAt)} />
              {manager ? (
                <div className="flex items-center justify-between gap-3 py-2.5">
                  <dt className="text-[var(--color-kzt-mute)]">Руководитель</dt>
                  <dd className="text-right">
                    <Link
                      href={`/demo/kazteleport/people/${manager.id}`}
                      className="kzt-link font-medium"
                    >
                      {manager.fullName}
                    </Link>
                  </dd>
                </div>
              ) : employee.manager ? (
                <InfoRow label="Руководитель" value={employee.manager} />
              ) : null}
              <InfoRow
                label="Стаж в компании"
                value={tenureLabel}
              />
            </dl>
          </section>

          {colleagues.length > 0 ? (
            <section className="kzt-card overflow-hidden">
              <div className="border-b border-[var(--color-kzt-line)] px-6 py-4">
                <div className="kzt-kicker">В одном отделе</div>
                <div className="mt-1 text-[14px] font-semibold">
                  Коллеги по «{employee.department}»
                </div>
              </div>
              <ul className="divide-y divide-[var(--color-kzt-line)]">
                {colleagues.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/demo/kazteleport/people/${c.id}`}
                      className="flex items-center gap-3 px-6 py-3 transition-colors hover:bg-[var(--color-kzt-bg)]"
                    >
                      <span
                        aria-hidden
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10.5px] font-semibold text-white"
                        style={{ background: c.avatarTone }}
                      >
                        {initials(c.fullName)}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-[13px] font-medium">
                          {c.fullName}
                        </div>
                        <div className="truncate text-[11px] text-[var(--color-kzt-mute)]">
                          {c.position}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: "mail" | "phone" | "telegram";
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--color-kzt-bg)] text-[var(--color-kzt-green)]"
        aria-hidden
      >
        <Icon name={icon} width={14} height={14} />
      </span>
      <div className="min-w-0">
        <dt className="text-[10.5px] uppercase tracking-[0.16em] text-[var(--color-kzt-mute)]">
          {label}
        </dt>
        <dd className="mt-0.5 truncate font-medium">{value}</dd>
      </div>
    </>
  );
  return href ? (
    <a
      href={href}
      className="kzt-focus group flex items-center gap-3 rounded-lg px-1 -mx-1 py-1 transition-colors hover:bg-[var(--color-kzt-bg)]"
    >
      {inner}
    </a>
  ) : (
    <div className="flex items-center gap-3">{inner}</div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <dt className="text-[var(--color-kzt-mute)]">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
