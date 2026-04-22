"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "./Icon";
import { CURRENT_USER } from "../_data/employees";

const BASE = "/demo/kazteleport";

const NAV = [
  { href: "", label: "Дашборд", icon: "dashboard" as const, exact: true },
  { href: "/news", label: "Новости", icon: "news" as const },
  { href: "/people", label: "Сотрудники", icon: "people" as const },
  { href: "/documents", label: "Документы", icon: "documents" as const },
  { href: "/requests", label: "Заявки", icon: "requests" as const, badge: 3 },
  { href: "/calendar", label: "Календарь", icon: "calendar" as const },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[260px] flex-col border-r border-[var(--color-kzt-line)] bg-white transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[68px] items-center gap-3 border-b border-[var(--color-kzt-line)] px-5">
          <Image
            src="/demo/kazteleport/logo.svg"
            alt="Halyk Kazteleport"
            width={130}
            height={40}
            className="h-9 w-auto"
            priority
          />
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <div className="mb-2 px-3 text-[10.5px] font-medium uppercase tracking-[0.18em] text-[var(--color-kzt-mute)]">
            Разделы
          </div>
          <ul className="space-y-1">
            {NAV.map((item) => {
              const href = `${BASE}${item.href}`;
              const active = item.exact
                ? pathname === href || pathname === `${href}/`
                : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`kzt-focus flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? "bg-[var(--color-kzt-green-soft)] text-[var(--color-kzt-green)]"
                        : "text-[var(--color-kzt-ink-2)] hover:bg-[var(--color-kzt-bg)]"
                    }`}
                  >
                    <Icon name={item.icon} width={18} height={18} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge ? (
                      <span className="rounded-full bg-[var(--color-kzt-ochre)] px-2 py-0.5 text-[10.5px] font-semibold text-[#2a1e00]">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 mb-2 px-3 text-[10.5px] font-medium uppercase tracking-[0.18em] text-[var(--color-kzt-mute)]">
            Быстрые действия
          </div>
          <ul className="space-y-1">
            <li>
              <button
                type="button"
                className="kzt-focus flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-kzt-ink-2)] transition-colors hover:bg-[var(--color-kzt-bg)]"
              >
                <Icon name="plus" width={18} height={18} />
                Новая заявка
              </button>
            </li>
            <li>
              <button
                type="button"
                className="kzt-focus flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-kzt-ink-2)] transition-colors hover:bg-[var(--color-kzt-bg)]"
              >
                <Icon name="mail" width={18} height={18} />
                Написать в HR
              </button>
            </li>
          </ul>
        </nav>

        <div className="border-t border-[var(--color-kzt-line)] px-4 py-4">
          <div className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
              style={{ background: CURRENT_USER.avatarTone }}
              aria-hidden
            >
              {initials(CURRENT_USER.fullName)}
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">
                {CURRENT_USER.fullName}
              </div>
              <div className="truncate text-[11px] text-[var(--color-kzt-mute)]">
                {CURRENT_USER.position}
              </div>
            </div>
            <button
              type="button"
              className="kzt-focus ml-auto rounded-md p-1.5 text-[var(--color-kzt-mute)] hover:bg-[var(--color-kzt-bg)] hover:text-[var(--color-kzt-ink)]"
              aria-label="Выйти"
              title="Выйти"
            >
              <Icon name="logout" width={16} height={16} />
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Закрыть меню"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
        />
      ) : null}

      {/* Main */}
      <div className="flex min-h-screen flex-1 flex-col lg:pl-[260px]">
        <header className="sticky top-0 z-20 flex h-[68px] items-center gap-4 border-b border-[var(--color-kzt-line)] bg-white/90 px-4 backdrop-blur md:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen((s) => !s)}
            className="kzt-focus flex h-9 w-9 items-center justify-center rounded-md border border-[var(--color-kzt-line)] text-[var(--color-kzt-ink-2)] lg:hidden"
            aria-label="Открыть меню"
          >
            <Icon name="dashboard" width={16} height={16} />
          </button>

          <label className="relative flex max-w-[520px] flex-1 items-center">
            <span className="pointer-events-none absolute left-3 text-[var(--color-kzt-mute)]">
              <Icon name="search" width={16} height={16} />
            </span>
            <input
              type="search"
              placeholder="Поиск по сотрудникам, документам и заявкам"
              className="kzt-focus h-10 w-full rounded-lg border border-[var(--color-kzt-line)] bg-[var(--color-kzt-bg)] pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-[var(--color-kzt-mute)] focus:border-[var(--color-kzt-green)] focus:bg-white"
            />
          </label>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="kzt-focus relative flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--color-kzt-line)] text-[var(--color-kzt-ink-2)] hover:bg-[var(--color-kzt-bg)]"
              aria-label="Уведомления"
            >
              <Icon name="bell" width={18} height={18} />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[var(--color-kzt-ochre)]" />
            </button>
            <div className="hidden items-center gap-2 rounded-lg border border-[var(--color-kzt-line)] px-3 py-1.5 text-sm sm:flex">
              <span
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold text-white"
                style={{ background: CURRENT_USER.avatarTone }}
              >
                {initials(CURRENT_USER.fullName)}
              </span>
              <span className="font-medium">{shortName(CURRENT_USER.fullName)}</span>
              <Icon
                name="chevronDown"
                width={14}
                height={14}
                className="text-[var(--color-kzt-mute)]"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 bg-[var(--color-kzt-bg)] px-4 py-6 md:px-8 md:py-8">
          {children}
        </main>

        <footer className="border-t border-[var(--color-kzt-line)] bg-white px-4 py-4 text-[11px] text-[var(--color-kzt-mute)] md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>
              © {new Date().getFullYear()} Halyk Kazteleport. Внутренний портал.
            </span>
            <span className="kzt-mono uppercase tracking-[0.12em]">
              версия 2.4.0 · демо-стенд
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

function shortName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return name;
  return `${parts[0]} ${parts[1][0]}.`;
}
