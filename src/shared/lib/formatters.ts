import { CURRENT_LOCALE } from "shared/constants";
// Утилиты форматирования

// Форматирование бюджета
export const formatBudget = (
  value: number | string,
  currency: string = "RUB",
): string => {
  if (typeof value !== "number" || isNaN(value)) return "—";

  return new Intl.NumberFormat(CURRENT_LOCALE, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
};

// вывод даты в нужном формате для локали
export const formatDate = (value: string | Date): string => {
  if (!value) return "—";
  return new Date(value).toLocaleDateString(CURRENT_LOCALE);
};
