export function PageHeader({
  kicker,
  title,
  description,
  actions,
}: {
  kicker: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-2xl">
        <div className="kzt-kicker">{kicker}</div>
        <h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-tight md:text-[32px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 text-[14.5px] text-[var(--color-kzt-mute)]">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
