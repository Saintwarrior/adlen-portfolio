import { kpis } from "./_data/kpi";
import { CURRENT_USER } from "./_data/employees";
import { KpiCard } from "./_components/KpiCard";
import { NewsWidget } from "./_components/NewsWidget";
import { CalendarWidget } from "./_components/CalendarWidget";
import { RequestsWidget } from "./_components/RequestsWidget";
import { PeopleWidget } from "./_components/PeopleWidget";
import { Icon } from "./_components/Icon";

export default function DashboardPage() {
  const hour = new Date().getHours();
  const greeting =
    hour < 6 ? "Доброй ночи" : hour < 12 ? "Доброе утро" : hour < 18 ? "Добрый день" : "Добрый вечер";
  const firstName = CURRENT_USER.fullName.split(" ")[0];

  const today = new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6">
      {/* Hero greeting */}
      <section className="relative overflow-hidden rounded-2xl border border-[var(--color-kzt-line)] bg-gradient-to-br from-[var(--color-kzt-green)] to-[#04624A] p-8 text-white md:p-10">
        <div
          aria-hidden
          className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--color-kzt-ochre)]/20 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute right-8 top-8 h-24 w-24 rotate-12 rounded-2xl border border-white/20"
        />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/70">
              {today}
            </div>
            <h1 className="mt-3 text-[34px] font-semibold leading-tight md:text-[40px]">
              {greeting}, {firstName}.
            </h1>
            <p className="mt-2 max-w-xl text-[15px] text-white/80">
              На сегодня запланировано 4 совещания, 3 заявки ждут вашего
              согласования. Сервисы компании работают штатно.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="kzt-focus inline-flex items-center gap-2 rounded-lg bg-[var(--color-kzt-ochre)] px-4 py-2.5 text-[13px] font-semibold text-[#2a1e00] shadow-sm transition-transform hover:scale-[1.01]"
            >
              <Icon name="plus" width={15} height={15} />
              Создать поручение
            </button>
            <button
              type="button"
              className="kzt-focus inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/10 px-4 py-2.5 text-[13px] font-medium backdrop-blur transition-colors hover:bg-white/20"
            >
              <Icon name="calendar" width={15} height={15} />
              Моё расписание
            </button>
          </div>
        </div>

        {/* Status strip */}
        <div className="relative mt-8 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-white/15 pt-5 text-[12.5px] md:grid-cols-4">
          <StatusItem label="Магистраль" value="99,983%" tone="up" />
          <StatusItem label="Halyk Cloud" value="Operational" tone="up" />
          <StatusItem label="ЦОД «Алматы-2»" value="Штатно" tone="up" />
          <StatusItem label="SOC" value="Без инцидентов" tone="up" />
        </div>
      </section>

      {/* KPI */}
      <section>
        <div className="mb-3 flex items-end justify-between">
          <div>
            <div className="kzt-kicker">KPI компании</div>
            <h2 className="mt-1 text-[20px] font-semibold">Ключевые метрики</h2>
          </div>
          <span className="kzt-mono text-[11.5px] text-[var(--color-kzt-mute)]">
            Обновлено · сегодня 08:15
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {kpis.map((k) => (
            <KpiCard key={k.id} kpi={k} />
          ))}
        </div>
      </section>

      {/* Main grid */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 xl:col-span-2">
          <NewsWidget limit={4} />
          <RequestsWidget />
        </div>
        <div className="flex flex-col gap-6">
          <CalendarWidget />
          <PeopleWidget />
        </div>
      </section>
    </div>
  );
}

function StatusItem({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "up" | "down";
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`kzt-dot-live inline-block h-2.5 w-2.5 rounded-full ${
          tone === "up" ? "bg-[#8be4c4]" : "bg-[#f7a399]"
        }`}
        aria-hidden
      />
      <div>
        <div className="text-[10.5px] uppercase tracking-[0.18em] text-white/60">
          {label}
        </div>
        <div className="mt-0.5 text-[13.5px] font-semibold">{value}</div>
      </div>
    </div>
  );
}
