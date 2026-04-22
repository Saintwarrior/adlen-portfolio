import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { getServices } from "@/lib/strapi";

export async function Services() {
  const services = await getServices();

  return (
    <section
      id="services"
      aria-label="Услуги"
      className="relative border-b border-line bg-ink py-24 md:py-40"
    >
      <Container>
        <SectionHeader
          serial="03"
          label="Услуги"
          title={
            <>
              Шесть направлений.{" "}
              <span className="display-italic text-paper-3">
                Один коллектив.
              </span>
            </>
          }
          lede="Мы не агентство на аутсорс-бирже. У нас узкий, выверенный каталог — только то, что мы делаем на уровне, за который не стыдно."
          kicker="06 направлений · доступны в любой комбинации"
        />

        <ul className="mt-16 md:mt-24 border-t border-line">
          {services.map((service, i) => (
            <Reveal key={service.id} as="li" delay={i * 0.04}>
              <div className="group grid grid-cols-12 gap-4 border-b border-line py-8 transition-colors hover:bg-ink-2 md:py-10">
                <div className="col-span-12 flex items-baseline gap-4 md:col-span-1">
                  <span className="num-mono text-xs text-mute">
                    0{i + 1}
                  </span>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <h3 className="display-sans text-3xl text-paper md:text-4xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md text-paper-2">
                    {service.tagline}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <p className="text-paper-2">{service.description}</p>
                  <ul className="mt-4 space-y-1.5 text-sm text-mute-2">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span
                          aria-hidden
                          className="mt-[0.6em] h-px w-3 shrink-0 bg-mute"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-12 flex items-start justify-end md:col-span-1">
                  <span
                    aria-hidden
                    className="text-xl text-mute transition-all duration-500 group-hover:text-acid group-hover:translate-x-1 group-hover:-translate-y-1"
                  >
                    ↗
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
