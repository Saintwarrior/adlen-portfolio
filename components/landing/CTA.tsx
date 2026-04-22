"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";

type Budget = "до 5М ₸" | "5–15М ₸" | "15М+ ₸" | "обсудим";
type Service =
  | "CRM/ERP"
  | "E-commerce"
  | "Миграция"
  | "Интеграции"
  | "Дизайн"
  | "Сопровождение";

export function CTA() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [budget, setBudget] = useState<Budget | null>(null);
  const [service, setService] = useState<Service | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      contact: form.get("contact"),
      message: form.get("message"),
      budget,
      service,
    };
    try {
      const endpoint = process.env.NEXT_PUBLIC_BRIEF_ENDPOINT;
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("bad status");
      } else {
        // Dev fallback: just wait so the UX is real
        await new Promise((r) => setTimeout(r, 800));
        if (typeof window !== "undefined") {
          console.info("[ADLEN brief]", payload);
        }
      }
      setState("sent");
    } catch {
      setState("error");
    }
  }

  const budgets: Budget[] = ["до 5М ₸", "5–15М ₸", "15М+ ₸", "обсудим"];
  const services: Service[] = [
    "CRM/ERP",
    "E-commerce",
    "Миграция",
    "Интеграции",
    "Дизайн",
    "Сопровождение",
  ];

  return (
    <section
      id="brief"
      aria-label="Форма брифа"
      className="relative overflow-hidden bg-paper py-24 text-ink md:py-40"
    >
      {/* subtle acid ribbon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-acid"
      />
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 text-ink/60">
              <span className="num-mono text-xs tracking-[0.2em]">N°09</span>
              <span className="h-px w-10 bg-ink/30" />
              <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                Бриф
              </span>
            </div>
            <h2 className="mt-6 display-sans text-[clamp(2.5rem,6vw,5rem)] leading-[0.95]">
              Расскажите{" "}
              <span className="display-italic">о&nbsp;проекте.</span>
            </h2>
            <p className="mt-6 max-w-md text-ink/70 md:text-lg">
              Мы ответим в&nbsp;течение 24&nbsp;часов. Подпишем NDA до&nbsp;обсуждения
              деталей. Если задача не&nbsp;подходит —&nbsp;прямо скажем и&nbsp;порекомендуем,
              к&nbsp;кому обратиться.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-ink/20 pt-8">
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
                  Ответ
                </dt>
                <dd className="display-italic mt-2 text-4xl">24ч</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
                  NDA
                </dt>
                <dd className="display-italic mt-2 text-4xl">да</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
                  Формат
                </dt>
                <dd className="mt-2">Telegram · Email · Zoom</dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
                  Языки
                </dt>
                <dd className="mt-2">RU · EN · KZ</dd>
              </div>
            </dl>
          </div>

          <div className="md:col-span-7">
            {state === "sent" ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex h-full min-h-[420px] flex-col items-start justify-center border border-ink/20 bg-white p-8 md:p-12"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
                  Бриф получен
                </span>
                <h3 className="mt-6 display-sans text-5xl leading-[0.95]">
                  Спасибо.{" "}
                  <span className="display-italic">Ответим в течение 24 часов.</span>
                </h3>
                <p className="mt-6 max-w-md text-ink/70">
                  Если это срочно — напишите{" "}
                  <a
                    className="underline decoration-acid decoration-2 underline-offset-4"
                    href="https://t.me/adlen_studio"
                  >
                    в Telegram
                  </a>
                  .
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="flex flex-col gap-6 border border-ink/20 bg-white p-6 md:p-10"
              >
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
                    Формат работы
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {services.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setService(s)}
                        className={`border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                          service === s
                            ? "border-ink bg-ink text-paper"
                            : "border-ink/20 hover:border-ink"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
                    Бюджет
                  </label>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {budgets.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setBudget(b)}
                        className={`border px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                          budget === b
                            ? "border-ink bg-ink text-paper"
                            : "border-ink/20 hover:border-ink"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
                      Имя
                    </span>
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Как к вам обращаться"
                      className="border-b border-ink/30 bg-transparent py-3 text-lg outline-none transition-colors focus:border-ink"
                    />
                  </label>
                  <label className="flex flex-col gap-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
                      Контакт
                    </span>
                    <input
                      required
                      name="contact"
                      type="text"
                      placeholder="Email или @telegram"
                      className="border-b border-ink/30 bg-transparent py-3 text-lg outline-none transition-colors focus:border-ink"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/60">
                    О&nbsp;проекте
                  </span>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="Что делаете, какая задача, какой срок, есть ли существующая система"
                    className="border-b border-ink/30 bg-transparent py-3 text-lg outline-none transition-colors focus:border-ink resize-none"
                  />
                </label>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
                  <p className="max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ink/60">
                    Отправляя форму, вы соглашаетесь на обработку контактных данных
                  </p>
                  <button
                    type="submit"
                    disabled={state === "sending"}
                    className="group inline-flex items-center gap-3 border border-ink bg-ink px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-paper transition-colors hover:bg-acid hover:text-black hover:border-acid font-mono disabled:opacity-50"
                  >
                    {state === "sending" ? "Отправляем…" : "Отправить бриф"}
                    <span aria-hidden className="arrow-ne text-base leading-none">
                      ↗
                    </span>
                  </button>
                </div>

                {state === "error" ? (
                  <p className="font-mono text-xs text-red-600">
                    Что-то пошло не так. Напишите нам в Telegram:{" "}
                    <a className="underline" href="https://t.me/adlen_studio">
                      @adlen_studio
                    </a>
                  </p>
                ) : null}
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
