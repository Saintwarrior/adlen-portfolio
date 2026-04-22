import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { getProcess } from "@/lib/strapi";

export async function Process() {
  const steps = await getProcess();

  return (
    <section
      id="process"
      aria-label="Процесс работы"
      className="relative border-b border-line bg-ink-2 py-24 md:py-40"
    >
      <Container>
        <SectionHeader
          serial="04"
          label="Как мы работаем"
          title={
            <>
              Четыре этапа.{" "}
              <span className="display-italic text-paper-3">
                Без лишних слоёв.
              </span>
            </>
          }
          lede="Мы работаем напрямую — без прослойки из продажников и менеджеров. Бриф снимает аналитик, на звонках участвуют те, кто будет проектировать и писать код."
          kicker="От брифа до прода · 2–5 месяцев"
        />

        <div className="mt-16 grid grid-cols-1 gap-px bg-line md:mt-24 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <article className="flex h-full flex-col justify-between bg-ink-2 p-8 transition-colors hover:bg-ink md:p-10">
                <header>
                  <div className="flex items-baseline justify-between">
                    <span className="display-italic text-6xl text-acid md:text-7xl">
                      {step.num}
                    </span>
                    <span className="kicker text-right">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="mt-6 display-sans text-2xl text-paper md:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-paper-2">{step.body}</p>
                </header>
                <ul className="mt-8 space-y-2 border-t border-line pt-6">
                  {step.artifacts.map((a) => (
                    <li
                      key={a}
                      className="flex items-center gap-3 text-sm text-mute-2"
                    >
                      <span
                        aria-hidden
                        className="h-1 w-1 rounded-full bg-acid"
                      />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
