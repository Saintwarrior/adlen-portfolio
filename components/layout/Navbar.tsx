"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";

const NAV_LINKS = [
  { href: "#cases", label: "Кейсы" },
  { href: "#services", label: "Услуги" },
  { href: "#process", label: "Процесс" },
  { href: "#team", label: "Команда" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-ink/80 backdrop-blur-xl border-b border-line"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="mx-auto flex w-full max-w-[1680px] items-center justify-between px-5 py-4 md:px-8 md:py-5 lg:px-12">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="ADLEN — на главную"
          >
            <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full rounded-full bg-acid opacity-70 dot-live" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acid" />
            </span>
            <span className="display-italic text-2xl leading-none">ADLEN</span>
            <span className="hidden md:inline num-mono text-[10px] text-mute tracking-[0.2em]">
              / STUDIO · KZ
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="u-rise kicker text-paper-2 hover:text-paper"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#brief"
              className="hidden md:inline-flex group items-center gap-2 border border-acid bg-acid px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-acid-2 font-mono"
            >
              Обсудить проект
              <span aria-hidden className="arrow-ne">↗</span>
            </Link>
            <button
              type="button"
              aria-label="Меню"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex h-10 w-10 items-center justify-center border border-line-2 text-paper"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={clsx(
                    "absolute inset-x-0 h-px bg-current transition-transform",
                    open ? "top-1/2 rotate-45" : "top-0"
                  )}
                />
                <span
                  className={clsx(
                    "absolute inset-x-0 h-px bg-current transition-transform",
                    open ? "top-1/2 -rotate-45" : "bottom-0"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile sheet */}
      <div
        className={clsx(
          "fixed inset-0 z-40 transition-opacity duration-500 md:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div
          className="absolute inset-0 bg-ink/90 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-12 pt-28">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline justify-between border-b border-line py-6"
              >
                <span className="display-italic text-4xl">{l.label}</span>
                <span className="num-mono text-xs text-mute">
                  0{i + 1}
                </span>
              </Link>
            ))}
          </nav>
          <Link
            href="#brief"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between bg-acid px-6 py-5 text-black font-mono text-xs font-semibold uppercase tracking-[0.18em]"
          >
            Обсудить проект
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </>
  );
}
