import { getStats } from "@/lib/strapi";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export async function Stats() {
  const stats = await getStats();

  return (
    <section
      aria-label="Статистика команды"
      className="relative border-b border-line bg-ink py-24 md:py-32"
    >
      <Container>
        <Reveal>
          <p className="kicker">
            <span className="num-mono mr-3 text-mute/70">N°02</span>
            Цифры, не обещания
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-2 gap-px bg-line md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.05}>
              <div className="group relative flex h-full flex-col justify-between bg-ink p-6 transition-colors hover:bg-ink-2 md:p-8">
                <div className="flex items-baseline justify-between">
                  <span className="num-mono text-xs text-mute">
                    / 0{i + 1}
                  </span>
                  <span aria-hidden className="h-px w-6 bg-line-2 group-hover:w-10 transition-[width] duration-500" />
                </div>
                <div className="mt-8">
                  <span className="display-italic block text-[clamp(3.5rem,9vw,6rem)] leading-[0.9] text-paper">
                    {s.value}
                  </span>
                  <p className="mt-4 text-sm text-paper-2 md:text-base">
                    {s.label}
                  </p>
                  {s.hint ? (
                    <p className="mt-2 text-xs text-mute">{s.hint}</p>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
