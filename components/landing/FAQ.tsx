"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { FAQItem } from "@/lib/types";

type Props = {
  items: FAQItem[];
};

export function FAQ({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-label="Часто задаваемые вопросы"
      className="relative border-b border-line bg-ink-2 py-24 md:py-40"
    >
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
          <Reveal className="md:col-span-4">
            <div>
              <div className="flex items-center gap-4">
                <span className="num-mono text-xs text-mute tracking-[0.2em]">
                  N°08
                </span>
                <span className="h-px w-10 bg-line" />
                <span className="kicker">FAQ</span>
              </div>
              <h2 className="mt-6 display-sans text-[clamp(2.25rem,5vw,4rem)] leading-[0.95]">
                Что{" "}
                <span className="display-italic text-paper-3">обычно</span>{" "}
                спрашивают.
              </h2>
              <p className="mt-6 text-paper-2">
                Не нашли ответ — напишите нам напрямую. Мы отвечаем честно, даже
                если ваш запрос нам не подходит.
              </p>
            </div>
          </Reveal>

          <div className="md:col-span-8">
            <ul className="border-t border-line">
              {items.map((item, i) => {
                const isOpen = open === i;
                return (
                  <li key={i} className="border-b border-line">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group flex w-full items-start justify-between gap-6 py-7 text-left"
                    >
                      <span className="flex items-start gap-6">
                        <span className="num-mono shrink-0 pt-1 text-xs text-mute">
                          / 0{i + 1}
                        </span>
                        <span className="display-sans text-xl text-paper md:text-2xl">
                          {item.q}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="pt-1 font-mono text-xl text-paper-2 transition-transform group-hover:text-acid"
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen ? (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-12 gap-6 pb-8 pr-10 md:pr-16">
                            <span className="col-span-2 md:col-span-1" />
                            <p className="col-span-10 max-w-2xl text-paper-2 md:col-span-11">
                              {item.a}
                            </p>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
