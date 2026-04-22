import { Marquee } from "@/components/ui/Marquee";
import { getMarquee } from "@/lib/strapi";

export async function Telemetry() {
  const items = await getMarquee();
  return (
    <section
      aria-label="Компетенции"
      className="relative border-y border-line bg-ink-2"
    >
      <Marquee
        speed="normal"
        className="py-6 text-paper"
        itemClassName="text-sm font-mono uppercase tracking-[0.18em]"
        items={items.map((item) => (
          <span key={item} className="whitespace-nowrap">
            {item}
          </span>
        ))}
      />
    </section>
  );
}
