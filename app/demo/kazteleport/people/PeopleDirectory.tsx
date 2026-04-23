"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Department, Employee, City } from "../_data/types";
import { Icon } from "../_components/Icon";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

interface Props {
  employees: Employee[];
  departments: Department[];
  cities: City[];
}

export function PeopleDirectory({ employees, departments, cities }: Props) {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState<Department | "all">("all");
  const [city, setCity] = useState<City | "all">("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return employees.filter((e) => {
      if (dept !== "all" && e.department !== dept) return false;
      if (city !== "all" && e.city !== city) return false;
      if (!query) return true;
      return (
        e.fullName.toLowerCase().includes(query) ||
        e.position.toLowerCase().includes(query) ||
        e.department.toLowerCase().includes(query) ||
        e.email.toLowerCase().includes(query)
      );
    });
  }, [employees, q, dept, city]);

  return (
    <div className="flex flex-col gap-5">
      {/* Controls */}
      <div className="kzt-card flex flex-col gap-4 p-4 md:flex-row md:items-center md:gap-3 md:p-3">
        <label className="relative flex flex-1 items-center">
          <span className="pointer-events-none absolute left-3 text-[var(--color-kzt-mute)]">
            <Icon name="search" width={16} height={16} />
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            type="search"
            placeholder="Поиск по имени, должности или e-mail"
            className="kzt-focus h-10 w-full rounded-lg border border-[var(--color-kzt-line)] bg-white pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-[var(--color-kzt-mute)] focus:border-[var(--color-kzt-green)]"
          />
        </label>

        <select
          value={dept}
          onChange={(e) => setDept(e.target.value as Department | "all")}
          className="kzt-focus h-10 rounded-lg border border-[var(--color-kzt-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-kzt-green)]"
        >
          <option value="all">Все отделы</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <select
          value={city}
          onChange={(e) => setCity(e.target.value as City | "all")}
          className="kzt-focus h-10 rounded-lg border border-[var(--color-kzt-line)] bg-white px-3 text-sm outline-none focus:border-[var(--color-kzt-green)]"
        >
          <option value="all">Все города</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1 rounded-lg border border-[var(--color-kzt-line)] bg-white p-1">
          <button
            type="button"
            onClick={() => setView("grid")}
            aria-pressed={view === "grid"}
            className={`rounded-md px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider transition-colors ${
              view === "grid"
                ? "bg-[var(--color-kzt-green-soft)] text-[var(--color-kzt-green)]"
                : "text-[var(--color-kzt-mute)] hover:text-[var(--color-kzt-ink)]"
            }`}
          >
            Сетка
          </button>
          <button
            type="button"
            onClick={() => setView("list")}
            aria-pressed={view === "list"}
            className={`rounded-md px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider transition-colors ${
              view === "list"
                ? "bg-[var(--color-kzt-green-soft)] text-[var(--color-kzt-green)]"
                : "text-[var(--color-kzt-mute)] hover:text-[var(--color-kzt-ink)]"
            }`}
          >
            Список
          </button>
        </div>
      </div>

      {/* Active filters */}
      {dept !== "all" || city !== "all" || q ? (
        <div className="flex flex-wrap items-center gap-2 text-[12.5px]">
          <span className="text-[var(--color-kzt-mute)]">Фильтры:</span>
          {dept !== "all" ? (
            <FilterChip label={dept} onClear={() => setDept("all")} />
          ) : null}
          {city !== "all" ? (
            <FilterChip label={city} onClear={() => setCity("all")} />
          ) : null}
          {q ? <FilterChip label={`«${q}»`} onClear={() => setQ("")} /> : null}
          <button
            type="button"
            onClick={() => {
              setDept("all");
              setCity("all");
              setQ("");
            }}
            className="kzt-link text-[12px] font-medium"
          >
            Сбросить
          </button>
        </div>
      ) : null}

      {/* Results */}
      <div className="text-[12.5px] text-[var(--color-kzt-mute)]">
        Найдено:{" "}
        <span className="font-semibold text-[var(--color-kzt-ink)]">
          {filtered.length}
        </span>{" "}
        из {employees.length}
      </div>

      {filtered.length === 0 ? (
        <div className="kzt-card flex flex-col items-center gap-3 py-16 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-kzt-bg)] text-[var(--color-kzt-mute)]">
            <Icon name="people" width={24} height={24} />
          </div>
          <div className="text-[15px] font-semibold">Никого не нашли</div>
          <div className="max-w-sm text-[13px] text-[var(--color-kzt-mute)]">
            Попробуйте изменить параметры поиска или сбросить фильтры.
          </div>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((e) => (
            <Link
              key={e.id}
              href={`/demo/kazteleport/people/${e.id}`}
              className="kzt-card group flex flex-col gap-4 p-5 transition-shadow hover:shadow-[0_4px_20px_rgba(15,29,24,0.08)]"
            >
              <div className="flex items-start gap-3">
                <span
                  aria-hidden
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[14px] font-semibold text-white"
                  style={{ background: e.avatarTone }}
                >
                  {initials(e.fullName)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[15px] font-semibold group-hover:text-[var(--color-kzt-green)]">
                    {e.fullName}
                  </div>
                  <div className="line-clamp-2 text-[12.5px] text-[var(--color-kzt-mute)]">
                    {e.position}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="kzt-pill">{e.department}</span>
                <span className="kzt-pill kzt-pill--mute">{e.city}</span>
              </div>

              <div className="mt-1 flex flex-col gap-1 border-t border-[var(--color-kzt-line)] pt-3 text-[12.5px] text-[var(--color-kzt-mute)]">
                <span className="inline-flex items-center gap-2 truncate">
                  <Icon name="mail" width={12} height={12} />
                  {e.email}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Icon name="phone" width={12} height={12} />
                  {e.phone}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="kzt-card overflow-hidden">
          <div className="grid grid-cols-[1.7fr_1.5fr_1fr_1fr_auto] items-center gap-4 border-b border-[var(--color-kzt-line)] bg-[var(--color-kzt-bg)] px-5 py-3 text-[10.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-kzt-mute)]">
            <span>Сотрудник</span>
            <span>Должность</span>
            <span>Отдел</span>
            <span>Город</span>
            <span />
          </div>
          <ul className="divide-y divide-[var(--color-kzt-line)]">
            {filtered.map((e) => (
              <li key={e.id}>
                <Link
                  href={`/demo/kazteleport/people/${e.id}`}
                  className="group grid grid-cols-[1.7fr_1.5fr_1fr_1fr_auto] items-center gap-4 px-5 py-3 transition-colors hover:bg-[var(--color-kzt-bg)]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      aria-hidden
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white"
                      style={{ background: e.avatarTone }}
                    >
                      {initials(e.fullName)}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[13.5px] font-medium group-hover:text-[var(--color-kzt-green)]">
                        {e.fullName}
                      </div>
                      <div className="truncate text-[11.5px] text-[var(--color-kzt-mute)]">
                        {e.email}
                      </div>
                    </div>
                  </div>
                  <span className="truncate text-[13px]">{e.position}</span>
                  <span className="truncate text-[12.5px] text-[var(--color-kzt-mute)]">
                    {e.department}
                  </span>
                  <span className="truncate text-[12.5px] text-[var(--color-kzt-mute)]">
                    {e.city}
                  </span>
                  <Icon
                    name="chevronRight"
                    width={14}
                    height={14}
                    className="text-[var(--color-kzt-mute)] group-hover:text-[var(--color-kzt-green)]"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  onClear,
}: {
  label: string;
  onClear: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-kzt-line)] bg-white px-2.5 py-1 text-[12px]">
      {label}
      <button
        type="button"
        onClick={onClear}
        aria-label={`Убрать ${label}`}
        className="flex h-4 w-4 items-center justify-center rounded-full text-[var(--color-kzt-mute)] hover:bg-[var(--color-kzt-bg)] hover:text-[var(--color-kzt-danger)]"
      >
        ×
      </button>
    </span>
  );
}
