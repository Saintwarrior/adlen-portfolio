export type Department =
  | "ЦОД"
  | "B2B-решения"
  | "Сетевая инфраструктура"
  | "Эксплуатация"
  | "HR"
  | "Финансы"
  | "Информационная безопасность"
  | "Юридический департамент"
  | "Маркетинг и PR";

export type City = "Алматы" | "Астана" | "Шымкент" | "Актобе" | "Атырау";

export interface Employee {
  id: string;
  fullName: string;
  position: string;
  department: Department;
  city: City;
  email: string;
  phone: string;
  tgUsername?: string;
  startedAt: string;
  manager?: string;
  skills: string[];
  bio: string;
  avatarTone: string;
}

export interface NewsItem {
  slug: string;
  title: string;
  kicker: string;
  excerpt: string;
  body: string[];
  publishedAt: string;
  author: string;
  heroTone: string;
  pinned?: boolean;
}

export interface DocCategory {
  id: string;
  title: string;
  icon: "book" | "shield" | "scale" | "graph" | "people" | "lock";
  count: number;
  updatedAt: string;
  description: string;
}

export type RequestStatus =
  | "Новая"
  | "В работе"
  | "На согласовании"
  | "Одобрена"
  | "Отклонена"
  | "Выполнена";

export type RequestType =
  | "Отпуск"
  | "IT-заявка"
  | "Командировка"
  | "Справка"
  | "Доступ";

export interface RequestItem {
  id: string;
  type: RequestType;
  author: string;
  department: Department;
  subject: string;
  status: RequestStatus;
  submittedAt: string;
  dueAt?: string;
  priority: "Низкий" | "Средний" | "Высокий";
}

export type EventKind =
  | "совещание"
  | "корпоратив"
  | "релиз"
  | "встреча с клиентом"
  | "обучение"
  | "дедлайн";

export interface CalendarEvent {
  id: string;
  title: string;
  kind: EventKind;
  date: string;
  time?: string;
  location?: string;
  participants?: number;
}

export interface Kpi {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down" | "flat";
  hint: string;
}
