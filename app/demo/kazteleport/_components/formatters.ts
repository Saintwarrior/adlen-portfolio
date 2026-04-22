const RU = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const RU_SHORT = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "short",
});

const RU_WEEKDAY = new Intl.DateTimeFormat("ru-RU", {
  weekday: "short",
});

export function formatDate(iso: string): string {
  try {
    return RU.format(new Date(iso));
  } catch {
    return iso;
  }
}

export function formatDateShort(iso: string): string {
  try {
    return RU_SHORT.format(new Date(iso));
  } catch {
    return iso;
  }
}

export function formatWeekday(iso: string): string {
  try {
    return RU_WEEKDAY.format(new Date(iso));
  } catch {
    return iso;
  }
}

export function daysUntil(iso: string): number {
  const target = new Date(iso).getTime();
  const now = Date.now();
  return Math.round((target - now) / (1000 * 60 * 60 * 24));
}

export function relativeDays(iso: string): string {
  const d = daysUntil(iso);
  if (d === 0) return "сегодня";
  if (d === 1) return "завтра";
  if (d === -1) return "вчера";
  if (d > 1 && d < 7) return `через ${d} дн.`;
  if (d < -1 && d > -7) return `${-d} дн. назад`;
  return formatDateShort(iso);
}
