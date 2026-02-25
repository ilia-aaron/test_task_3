import type { ProjectStatus, Priority } from "./types";
// Добавлены Enums для удобства использования в коде дабы избежать ошибок при написании строк, и выбирать значения из списка
// Сделано через const as const потому что Enum в typescript нельзя расширять, объединять и там нет сравнения по строке

export const STATUS_ENUM = {
  ACTIVE: "Активный",
  COMPLETED: "Завершён",
  PAUSED: "Приостановлен",
  PLANNING: "Планирование",
} as const;

export const STATUSES: ProjectStatus[] = [
  STATUS_ENUM.ACTIVE,
  STATUS_ENUM.COMPLETED,
  STATUS_ENUM.PAUSED,
  STATUS_ENUM.PLANNING,
];

export const PRIORITY_ENUM = {
  HIGH: "Высокий",
  MEDIUM: "Средний",
  LOW: "Низкий",
} as const;

export const PRIORITIES: Priority[] = [
  PRIORITY_ENUM.HIGH,
  PRIORITY_ENUM.MEDIUM,
  PRIORITY_ENUM.LOW,
];
