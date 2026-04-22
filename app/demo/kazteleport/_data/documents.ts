import type { DocCategory } from "./types";

export const docCategories: DocCategory[] = [
  {
    id: "policies",
    title: "Политики и регламенты",
    icon: "book",
    count: 64,
    updatedAt: "2026-04-15",
    description: "Корпоративные политики, положения, должностные инструкции.",
  },
  {
    id: "security",
    title: "Информационная безопасность",
    icon: "shield",
    count: 38,
    updatedAt: "2026-04-20",
    description: "Требования ИБ, классификация данных, инструкции для сотрудников.",
  },
  {
    id: "legal",
    title: "Юридические документы",
    icon: "scale",
    count: 21,
    updatedAt: "2026-04-10",
    description: "Шаблоны договоров, доверенностей, согласий.",
  },
  {
    id: "finance",
    title: "Финансы и отчётность",
    icon: "graph",
    count: 45,
    updatedAt: "2026-04-19",
    description: "Бюджетные регламенты, формы заявок, управленческая отчётность.",
  },
  {
    id: "hr",
    title: "HR-документы",
    icon: "people",
    count: 53,
    updatedAt: "2026-04-16",
    description: "Кадровые формы, оценки, программы обучения.",
  },
  {
    id: "operations",
    title: "Эксплуатация и SLA",
    icon: "lock",
    count: 72,
    updatedAt: "2026-04-22",
    description: "Операционные процедуры, runbook'и, SLA-матрицы.",
  },
];
