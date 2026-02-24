import type { ProjectStatus, Priority } from "./types";

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
