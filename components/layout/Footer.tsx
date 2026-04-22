import Link from "next/link";
import { getSiteSettings } from "@/lib/strapi";
import { Container } from "@/components/ui/Container";

export async function Footer() {
  const s = await getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer
      id="contacts"
      className="relative mt-24 border-t border-line bg-ink pt-20"
    >
      <Container>
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="kicker mb-6">
              <span className="relative mr-2 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-acid" />
              Приём заявок открыт
            </p>
            <h3 className="display-sans text-4xl md:text-5xl">
              Следующий кейс в&nbsp;нашем&nbsp;портфолио —{" "}
              <span className="display-italic text-acid">ваш&nbsp;проект.</span>
            </h3>
            <p className="mt-6 max-w-md text-paper-2">
              Отправьте короткое описание задачи. Мы ответим в&nbsp;течение 24&nbsp;часов,
              подпишем NDA и&nbsp;назначим первый разговор.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="#brief"
                className="group inline-flex items-center gap-3 border border-acid bg-acid px-6 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-black transition-colors hover:bg-acid-2 font-mono"
              >
                Оставить бриф
                <span aria-hidden className="arrow-ne">↗</span>
              </Link>
              <Link
                href={`mailto:${s.email}`}
                className="u-rise text-paper font-mono text-sm"
              >
                {s.email}
              </Link>
            </div>
          </div>

          <div className="grid gap-10 md:col-span-7 md:grid-cols-3">
            <div>
              <p className="kicker mb-4">Связаться</p>
              <ul className="space-y-2 text-paper-2">
                <li>
                  <a
                    href={`mailto:${s.email}`}
                    className="u-rise hover:text-paper"
                  >
                    {s.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${s.phone.replace(/[^+\d]/g, "")}`} className="u-rise hover:text-paper">
                    {s.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://t.me/${s.telegram.replace(/^@/, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="u-rise hover:text-paper"
                  >
                    Telegram {s.telegram}
                  </a>
                </li>
                {s.whatsapp ? (
                  <li>
                    <a
                      href={`https://wa.me/${s.whatsapp.replace(/[^\d]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="u-rise hover:text-paper"
                    >
                      WhatsApp
                    </a>
                  </li>
                ) : null}
              </ul>
            </div>

            <div>
              <p className="kicker mb-4">Разделы</p>
              <ul className="space-y-2 text-paper-2">
                <li>
                  <Link href="#cases" className="u-rise hover:text-paper">
                    Кейсы
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="u-rise hover:text-paper">
                    Услуги
                  </Link>
                </li>
                <li>
                  <Link href="#process" className="u-rise hover:text-paper">
                    Процесс
                  </Link>
                </li>
                <li>
                  <Link href="#team" className="u-rise hover:text-paper">
                    Команда
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="u-rise hover:text-paper">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="kicker mb-4">Юридически</p>
              <ul className="space-y-2 text-paper-2">
                <li>{s.legalName}</li>
                <li>{s.address}</li>
                <li>
                  С&nbsp;{s.foundedYear} года в&nbsp;{s.city}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* Giant wordmark */}
      <div className="relative mt-20 overflow-hidden border-t border-line">
        <div className="mx-auto max-w-[1680px] px-5 pt-8 md:px-8 lg:px-12">
          <div className="flex items-end justify-between gap-6">
            <span className="num-mono text-xs text-mute">
              © {year} / ADLEN Studio / ALMATY
            </span>
            <span className="num-mono text-xs text-mute">
              Made with craft, not templates
            </span>
          </div>
          <p
            aria-hidden
            className="display-italic select-none whitespace-nowrap pb-[2vw] text-[26vw] leading-[0.82] tracking-[-0.045em] text-paper mt-4 md:mt-2"
          >
            ADLEN
          </p>
        </div>
      </div>
    </footer>
  );
}
