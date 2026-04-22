import type { Kpi } from "./types";

export const kpis: Kpi[] = [
  {
    id: "revenue",
    label: "Выручка, YTD",
    value: "18,4 млрд ₸",
    delta: "+14,2%",
    trend: "up",
    hint: "К аналогичному периоду прошлого года",
  },
  {
    id: "uptime",
    label: "Доступность сервисов",
    value: "99,983%",
    delta: "+0,02 п.п.",
    trend: "up",
    hint: "SLA по магистральной сети за 30 дней",
  },
  {
    id: "clients",
    label: "Корпоративные клиенты",
    value: "412",
    delta: "+18",
    trend: "up",
    hint: "Активные договоры B2B-сегмента",
  },
  {
    id: "headcount",
    label: "Численность",
    value: "684",
    delta: "+22",
    trend: "up",
    hint: "Штатные сотрудники, с начала года",
  },
  {
    id: "incidents",
    label: "Критичные инциденты",
    value: "3",
    delta: "−4",
    trend: "down",
    hint: "За квартал, все купированы в SLA",
  },
  {
    id: "nps",
    label: "NPS клиентов",
    value: "72",
    delta: "+5",
    trend: "up",
    hint: "Индекс лояльности B2B, замер за март",
  },
];
