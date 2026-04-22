import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";
import { getTeam } from "@/lib/strapi";

export async function Team() {
  const team = await getTeam();

  return (
    <section
      id="team"
      aria-label="Команда"
      className="relative border-b border-line bg-ink-2 py-24 md:py-40"
    >
      <Container>
        <SectionHeader
          serial="06"
          label="Команда"
          title={
            <>
              Восемь человек.{" "}
              <span className="display-italic text-paper-3">
                Один состав с&nbsp;2019.
              </span>
            </>
          }
          lede="Мы не собираем команду под проект из фрилансеров с биржи. Это устоявшийся коллектив, где каждый знает сильные и слабые стороны друг друга. Отсюда — предсказуемые сроки и отлаженные процессы."
          kicker="2BE · 2FE · 2D · 1PA · 1QA"
        />

        <div className="mt-16 grid grid-cols-2 gap-px bg-line md:mt-24 md:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <article className="group relative flex h-full flex-col justify-between bg-ink-2 p-6 transition-colors hover:bg-ink md:p-8">
                <header className="flex items-start justify-between">
                  <span className="num-mono text-xs text-mute">
                    / 0{i + 1}
                  </span>
                  {m.lead ? (
                    <span className="border border-acid px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-acid">
                      lead
                    </span>
                  ) : null}
                </header>

                <div className="mt-8">
                  <span className="display-italic block text-[6rem] leading-[0.8] text-paper md:text-[7rem]">
                    {m.initials}
                  </span>
                </div>

                <div className="mt-8 border-t border-line pt-4">
                  <p className="text-paper">{m.role}</p>
                  <p className="mt-1 num-mono text-xs text-mute">
                    {m.yearsWithTeam}{" "}
                    {m.yearsWithTeam === 1
                      ? "год в команде"
                      : m.yearsWithTeam < 5
                        ? "года в команде"
                        : "лет в команде"}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {m.stack.map((s) => (
                      <li
                        key={s}
                        className="font-mono text-[10px] uppercase tracking-[0.12em] text-mute-2 border border-line px-2 py-1"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 grid gap-6 border-t border-line pt-10 md:grid-cols-3">
            <div>
              <p className="kicker">Полный цикл</p>
              <p className="mt-3 text-paper-2">
                Аналитика → дизайн → разработка → QA → сопровождение. Ни одного
                подрядчика третьей руки.
              </p>
            </div>
            <div>
              <p className="kicker">Прямой контакт</p>
              <p className="mt-3 text-paper-2">
                У заказчика — Telegram-чат с теми, кто пишет код. Никаких
                прокладок из аккаунт-менеджеров.
              </p>
            </div>
            <div>
              <p className="kicker">Код — ваш</p>
              <p className="mt-3 text-paper-2">
                Репозиторий и инфраструктура на вашей стороне. Вы можете забрать
                команду или проект в любой момент.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
