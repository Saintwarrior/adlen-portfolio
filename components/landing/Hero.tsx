"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/Container";

const stats: Array<[string, string]> = [
  ["14", "проектов в проде"],
  ["8", "инженеров в команде"],
  ["6+", "лет один состав"],
  ["24ч", "ответ на бриф"],
];

function useClock() {
  // static label — avoids hydration mismatch
  return "ALMATY · UTC+5";
}

export function Hero() {
  const prefers = useReducedMotion();
  const base = prefers
    ? { duration: 0.01 }
    : { duration: 1.1, ease: [0.16, 1, 0.3, 1] as const };

  const location = useClock();

  return (
    <section
      id="top"
      aria-label="Главная"
      className="relative overflow-hidden bg-ink pt-32 md:pt-36 lg:pt-40"
    >
      {/* subtle top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] opacity-80"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,255,74,0.07), transparent 70%)",
        }}
      />

      {/* thin grid lines left/right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-5 right-5 hidden md:block md:left-8 md:right-8 lg:left-12 lg:right-12"
      >
        <div className="h-full border-l border-r border-line" />
      </div>

      <Container className="relative">
        {/* top row: status + meta */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...base, duration: 0.6 }}
          className="mb-16 flex flex-wrap items-center justify-between gap-4 md:mb-24"
        >
          <div className="flex items-center gap-3 kicker">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-acid opacity-70 dot-live" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
            </span>
            Приём заявок открыт
            <span className="text-mute/60">·</span>
            <span>Ответ в течение 24 часов</span>
          </div>
          <div className="kicker text-right">
            <span className="text-mute/60">◆ </span>
            {location} · EST 2019
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* big headline */}
          <div className="md:col-span-8">
            <h1
              className="display-sans text-[clamp(3rem,9.5vw,10.5rem)] tracking-[-0.04em] leading-[0.86] text-paper"
              aria-label="Делаем интернет-продукты, которые работают"
            >
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={base}
              >
                <span className="inline-block overflow-hidden align-baseline">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ ...base, delay: 0.05 }}
                  >
                    Делаем
                  </motion.span>
                </span>
              </motion.span>

              <span className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ ...base, delay: 0.15 }}
                >
                  интернет-продукты,
                </motion.span>
              </span>

              <span className="block overflow-hidden">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ ...base, delay: 0.25 }}
                >
                  которые{" "}
                  <span className="display-italic text-acid">работают.</span>
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...base, delay: 0.55 }}
              className="mt-10 max-w-xl text-balance text-lg leading-relaxed text-paper-2 md:text-xl"
            >
              Независимая студия из{" "}
              <span className="text-paper">
                8&nbsp;инженеров, дизайнеров и&nbsp;аналитика
              </span>
              . Полный цикл — от брифа до сопровождения. Работаем вместе
              с&nbsp;2019&nbsp;года. Без менеджеров-посредников, с&nbsp;доступом
              к&nbsp;людям, которые пишут код.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...base, delay: 0.7 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Link
                href="#brief"
                className="group inline-flex items-center gap-3 border border-acid bg-acid px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-acid-2 font-mono"
              >
                Обсудить проект
                <span aria-hidden className="arrow-ne text-base leading-none">
                  ↗
                </span>
              </Link>
              <Link
                href="#cases"
                className="group inline-flex items-center gap-3 border border-line-2 bg-transparent px-7 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-paper transition-colors hover:border-paper hover:bg-ink-2 font-mono"
              >
                Посмотреть кейсы
                <span aria-hidden className="arrow-ne text-base leading-none">
                  →
                </span>
              </Link>
            </motion.div>
          </div>

          {/* right column — stats dossier */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...base, delay: 0.45 }}
            className="md:col-span-4 md:border-l md:border-line md:pl-8"
          >
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="kicker">Dossier / 001</span>
              <span className="num-mono text-xs text-mute">ADLEN.STUDIO</span>
            </div>
            <ul className="divide-y divide-line">
              {stats.map(([value, label], i) => (
                <li
                  key={label}
                  className="flex items-baseline justify-between py-5"
                >
                  <span className="num-mono text-xs text-mute">/ 0{i + 1}</span>
                  <div className="flex items-baseline gap-4">
                    <span className="display-italic text-4xl text-paper md:text-5xl">
                      {value}
                    </span>
                    <span className="max-w-[12ch] text-right text-sm text-paper-2">
                      {label}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between text-mute">
              <span className="kicker">Next available slot</span>
              <span className="num-mono text-sm text-paper">Q1 / текущий</span>
            </div>
          </motion.aside>
        </div>

        {/* bottom row: scroll indicator + context */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...base, delay: 0.95 }}
          className="mt-20 flex flex-wrap items-end justify-between gap-8 border-t border-line pt-8 md:mt-28"
        >
          <div className="max-w-md">
            <p className="kicker mb-3">Что мы не делаем</p>
            <p className="text-paper-2">
              Не берёмся, если задача не решается. Не делаем шаблонных сайтов.
              Не исчезаем после релиза.
            </p>
          </div>
          <div className="flex items-center gap-4 text-mute">
            <span className="kicker">Прокрутите</span>
            <span aria-hidden className="h-px w-16 bg-line-2" />
            <span className="num-mono text-xs text-paper">↓</span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
