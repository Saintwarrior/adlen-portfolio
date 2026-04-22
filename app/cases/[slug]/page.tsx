import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Chip } from "@/components/ui/Chip";
import { CTA } from "@/components/landing/CTA";
import { getProjectBySlug, getProjects } from "@/lib/strapi";

type Params = { slug: string };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Кейс не найден" };
  return {
    title: `${project.client} — кейс`,
    description: project.summary,
    openGraph: {
      title: `${project.client} — кейс ADLEN`,
      description: project.summary,
    },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const allProjects = await getProjects();
  const nextIndex =
    (allProjects.findIndex((p) => p.slug === project.slug) + 1) %
    allProjects.length;
  const nextProject = allProjects[nextIndex];

  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink pt-32 md:pt-40 lg:pt-48">
        <Container>
          <Reveal>
            <div className="flex items-center gap-4">
              <Link
                href="/#cases"
                className="kicker u-rise hover:text-paper"
              >
                ← Все кейсы
              </Link>
              <span className="h-px w-10 bg-line" />
              <span className="kicker">CASE / {project.slug.toUpperCase()}</span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-10 display-sans text-[clamp(2.5rem,7.5vw,7rem)] leading-[0.9] text-paper">
              {project.client}{" "}
              <span className="display-italic text-paper-3 block mt-2">
                — {project.industry.toLowerCase()}
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-lg text-paper-2 md:text-xl">
              {project.summary}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-16 grid grid-cols-2 gap-6 border-y border-line py-8 md:grid-cols-5">
              <div>
                <dt className="kicker">Клиент</dt>
                <dd className="mt-2 text-paper">{project.client}</dd>
              </div>
              <div>
                <dt className="kicker">Год</dt>
                <dd className="mt-2 text-paper num-mono">{project.year}</dd>
              </div>
              <div>
                <dt className="kicker">Срок</dt>
                <dd className="mt-2 text-paper">{project.duration ?? "—"}</dd>
              </div>
              <div className="col-span-2">
                <dt className="kicker">Наша роль</dt>
                <dd className="mt-2 text-paper">{project.role}</dd>
              </div>
            </dl>
          </Reveal>

          {project.url ? (
            <Reveal delay={0.2}>
              <div className="mt-8">
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="u-rise inline-flex items-center gap-2 font-mono text-sm text-acid"
                >
                  {project.url.replace(/^https?:\/\//, "")}
                  <span aria-hidden className="arrow-ne">↗</span>
                </Link>
              </div>
            </Reveal>
          ) : null}
        </Container>
      </section>

      {/* Problem */}
      <section className="relative border-t border-line bg-ink-2 py-24 md:py-32">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-4">
              <div className="flex items-center gap-4">
                <span className="num-mono text-xs text-mute tracking-[0.2em]">
                  01
                </span>
                <span className="h-px w-10 bg-line" />
                <span className="kicker">Задача</span>
              </div>
              <h2 className="mt-6 display-sans text-3xl text-paper md:text-4xl">
                Что было{" "}
                <span className="display-italic text-paper-3">до нас.</span>
              </h2>
            </Reveal>
            <Reveal className="md:col-span-8" delay={0.05}>
              <p className="text-lg leading-relaxed text-paper-2 md:text-xl">
                {project.problem}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Solution */}
      <section className="relative border-t border-line bg-ink py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="num-mono text-xs text-mute tracking-[0.2em]">
                02
              </span>
              <span className="h-px w-10 bg-line" />
              <span className="kicker">Решение</span>
            </div>
            <h2 className="mt-6 display-sans text-4xl leading-[0.95] text-paper md:text-6xl">
              Как мы{" "}
              <span className="display-italic text-paper-3">это собрали.</span>
            </h2>
          </Reveal>

          <ol className="mt-16 border-t border-line md:mt-20">
            {project.solution.map((block, i) => (
              <Reveal key={block.title} as="li" delay={i * 0.05}>
                <div className="grid grid-cols-12 gap-6 border-b border-line py-10 md:py-14">
                  <div className="col-span-12 md:col-span-2">
                    <span className="display-italic text-5xl text-acid">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="col-span-12 md:col-span-10">
                    <h3 className="display-sans text-2xl text-paper md:text-3xl">
                      {block.title}
                    </h3>
                    <p className="mt-4 max-w-3xl text-paper-2 md:text-lg">
                      {block.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Outcomes */}
      <section className="relative border-t border-line bg-ink-2 py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="num-mono text-xs text-mute tracking-[0.2em]">
                03
              </span>
              <span className="h-px w-10 bg-line" />
              <span className="kicker">Результат</span>
            </div>
            <h2 className="mt-6 display-sans text-4xl leading-[0.95] text-paper md:text-6xl">
              Что{" "}
              <span className="display-italic text-paper-3">получилось.</span>
            </h2>
          </Reveal>

          <dl className="mt-16 grid grid-cols-2 gap-px bg-line md:grid-cols-4">
            {project.outcomes.map((o, i) => (
              <Reveal key={o.label} delay={i * 0.05}>
                <div className="flex h-full flex-col justify-between bg-ink-2 p-6 md:p-10">
                  <span className="num-mono text-xs text-mute">
                    / 0{i + 1}
                  </span>
                  <div className="mt-10">
                    <dd className="display-italic text-[clamp(3rem,8vw,5.5rem)] leading-[0.9] text-paper">
                      {o.metric}
                    </dd>
                    <dt className="mt-4 text-paper-2">{o.label}</dt>
                  </div>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Stack */}
      <section className="relative border-t border-line bg-ink py-24 md:py-32">
        <Container>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="num-mono text-xs text-mute tracking-[0.2em]">
                04
              </span>
              <span className="h-px w-10 bg-line" />
              <span className="kicker">Стек и инфраструктура</span>
            </div>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-16">
            {[
              { label: "Backend", items: project.stack.backend },
              { label: "Frontend", items: project.stack.frontend },
              { label: "Инфраструктура", items: project.stack.infra },
            ].map((group, i) => (
              <Reveal key={group.label} delay={i * 0.06}>
                <div>
                  <p className="kicker">{group.label}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {group.items.map((s) => (
                      <li key={s}>
                        <Chip>{s}</Chip>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Next case */}
      <section className="relative border-t border-line bg-ink-2 py-24 md:py-32">
        <Container>
          <Link
            href={`/cases/${nextProject.slug}`}
            className="group block"
          >
            <div className="flex items-center gap-4">
              <span className="kicker">Следующий кейс</span>
              <span className="h-px w-10 bg-line" />
              <span className="num-mono text-xs text-mute">
                / {String(nextIndex + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-8 flex items-end justify-between gap-8">
              <div>
                <p className="kicker mb-3">
                  {nextProject.client} · {nextProject.industry}
                </p>
                <h3 className="display-sans text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] text-paper group-hover:text-acid transition-colors">
                  {nextProject.title.split("—")[1]?.trim() ?? nextProject.title}
                </h3>
              </div>
              <span
                aria-hidden
                className="shrink-0 text-5xl text-paper-2 transition-all duration-500 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:text-acid md:text-7xl"
              >
                ↗
              </span>
            </div>
          </Link>
        </Container>
      </section>

      <CTA />
    </>
  );
}
