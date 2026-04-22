import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getTestimonials } from "@/lib/strapi";

export async function Testimonials() {
  const items = await getTestimonials();

  return (
    <section
      aria-label="Отзывы клиентов"
      className="relative border-b border-line bg-ink py-24 md:py-40"
    >
      <Container>
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="num-mono text-xs text-mute tracking-[0.2em]">
              N°07
            </span>
            <span className="h-px w-10 bg-line" />
            <span className="kicker">Что говорят клиенты</span>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 md:mt-24 md:grid-cols-12 md:gap-0">
          {items.map((t, i) => (
            <Reveal
              key={i}
              delay={i * 0.08}
              className={`md:col-span-6 ${i % 2 === 1 ? "md:border-l md:border-line md:pl-10 md:pt-24" : "md:pr-10"} ${i > 0 ? "md:pt-16" : ""} border-t border-line pt-10 md:border-t-0`}
            >
              <figure>
                <span
                  aria-hidden
                  className="display-italic block text-[8rem] leading-[0.6] text-acid"
                >
                  «
                </span>
                <blockquote className="mt-2 display-sans text-2xl leading-[1.2] text-paper md:text-3xl">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <span
                    aria-hidden
                    className="h-px w-10 bg-mute"
                  />
                  <div>
                    <p className="text-paper">{t.attribution}</p>
                    {t.project ? (
                      <p className="mt-0.5 kicker">{t.project}</p>
                    ) : null}
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
