import type { Metadata } from "next";
import { employees } from "../_data/employees";
import type { City, Department } from "../_data/types";
import { PageHeader } from "../_components/PageHeader";
import { PeopleDirectory } from "./PeopleDirectory";
import { Icon } from "../_components/Icon";

export const metadata: Metadata = {
  title: "Сотрудники",
};

export default function PeoplePage() {
  const departments = Array.from(
    new Set(employees.map((e) => e.department))
  ).sort((a, b) => a.localeCompare(b, "ru")) as Department[];
  const cities = Array.from(new Set(employees.map((e) => e.city))).sort(
    (a, b) => a.localeCompare(b, "ru")
  ) as City[];

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-6">
      <PageHeader
        kicker="Справочник"
        title="Сотрудники Halyk Kazteleport"
        description="Контакты коллег, структура команд и зоны ответственности. Данные синхронизированы с 1С:ЗУП и HR-порталом."
        actions={
          <>
            <button
              type="button"
              className="kzt-focus inline-flex items-center gap-2 rounded-lg border border-[var(--color-kzt-line)] bg-white px-3.5 py-2 text-[13px] font-medium text-[var(--color-kzt-ink-2)] hover:border-[var(--color-kzt-green)] hover:text-[var(--color-kzt-green)]"
            >
              <Icon name="documents" width={14} height={14} />
              Экспорт в CSV
            </button>
            <button
              type="button"
              className="kzt-focus inline-flex items-center gap-2 rounded-lg bg-[var(--color-kzt-green)] px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-[var(--color-kzt-green-2)]"
            >
              <Icon name="plus" width={14} height={14} />
              Добавить сотрудника
            </button>
          </>
        }
      />

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <SummaryStat label="Сотрудников" value={employees.length.toString()} />
        <SummaryStat
          label="Отделов"
          value={departments.length.toString()}
        />
        <SummaryStat label="Городов" value={cities.length.toString()} />
        <SummaryStat label="Открытых вакансий" value="7" hintColor="ochre" />
      </div>

      <PeopleDirectory
        employees={employees}
        departments={departments}
        cities={cities}
      />
    </div>
  );
}

function SummaryStat({
  label,
  value,
  hintColor,
}: {
  label: string;
  value: string;
  hintColor?: "ochre";
}) {
  return (
    <div className="kzt-card flex items-center justify-between gap-3 px-5 py-4">
      <div>
        <div className="kzt-kicker">{label}</div>
        <div className="kzt-mono mt-1 text-[22px] font-semibold leading-none">
          {value}
        </div>
      </div>
      <div
        aria-hidden
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
          hintColor === "ochre"
            ? "bg-[var(--color-kzt-ochre-soft)] text-[#8a6203]"
            : "bg-[var(--color-kzt-green-soft)] text-[var(--color-kzt-green)]"
        }`}
      >
        <Icon name="people" width={16} height={16} />
      </div>
    </div>
  );
}
