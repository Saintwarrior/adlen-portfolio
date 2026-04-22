import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Chip } from "@/components/ui/Chip";
import { getProjects } from "@/lib/strapi";
import type { Project } from "@/lib/types";

function CaseRow({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal>
      <Link
        href={`/cases/${project.slug}`}
        className="group block border-b border-line py-12 transition-colors hover:bg-ink-2 md:py-16"
      >
        <div className="grid grid-cols-12 gap-6">
          {/* Serial + meta */}
          <div className="col-span-12 flex items-start justify-between md:col-span-2 md:flex-col md:items-start md:gap-2">
            <span className="num-mono text-xs text-mute">
              CASE / 0{index + 1}
            </span>
            <span className="num-mono text-xs text-paper-2">
              {project.year}
            </span>
          </div>

          {/* Main */}
          <div className="col-span-12 md:col-span-8">
            <p className="kicker mb-3">
              {project.client} · {project.industry}
            </p>
            <h3 className="display-sans text-[clamp(2rem,5vw,4.25rem)] leading-[0.95] text-paper">
              {project.title.split("—")[1]?.trim() ?? project.title}
            </h3>
            <p className="mt-6 max-w-2xl text-paper-2 md:text-lg">
              {project.summary}
            </p>

            {/* Outcomes */}
            <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line py-6 md:grid-cols-4">
              {project.outcomes.map((o) => (
                <div key={o.label}>
                  <dt className="kicker">{o.label}</dt>
                  <dd className="display-italic mt-2 text-3xl text-paper md:text-4xl">
                    {o.metric}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </div>

          {/* Read more */}
          <div className="col-span-12 flex items-start justify-end md:col-span-2">
            <span className="inline-flex flex-col items-end gap-2 font-mono text-xs uppercase tracking-[0.18em] text-paper-2 transition-colors group-hover:text-acid">
              <span
                aria-hidden
                className="text-3xl leading-none transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                ↗
              </span>
              <span>Читать кейс</span>
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export async function Cases() {
  const projects = await getProjects();

  return (
    <section
      id="cases"
      aria-label="Кейсы"
      className="relative border-b border-line bg-ink py-24 md:py-40"
    >
      <Container>
        <SectionHeader
          serial="05"
          label="Кейсы"
          title={
            <>
              Проекты в продакшене.{" "}
              <span className="display-italic text-paper-3">
                Не презентации.
              </span>
            </>
          }
          lede="Показываем то, что живёт под реальной нагрузкой: их используют кладовщики, кассиры, покупатели и интеграторы. У нас нет кейсов, которые не дошли до релиза."
          kicker="02 из 14 — те, что публично можно показать"
        />

        <div className="mt-16 border-t border-line md:mt-24">
          {projects.map((p, i) => (
            <CaseRow key={p.slug} project={p} index={i} />
          ))}
        </div>

        <Reveal>
          <p className="mt-12 text-center text-paper-2">
            Ещё 12 проектов под NDA.{" "}
            <Link
              href="#brief"
              className="u-rise text-paper"
            >
              Запросите PDF-портфолио
            </Link>
            .
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
