import type { Department } from "shared/types";

// Добавлены Enums для удобства использования в коде дабы избежать ошибок при написании строк, и выбирать значения из списка
// Сделано через const as const потому что Enum в typescript нельзя расширять, объединять и там нет сравнения по строке

export const DEPARTMENT_ENUM = {
  RECONNAISSANCE: "Разведка",
  EXTRACTION: "Добыча",
  PROCESSING: "Переработка",
  LOGISTICS: "Логистика",
  SALES: "Сбыт",
} as const;

export const DEPARTMENTS: Department[] = [
  DEPARTMENT_ENUM.RECONNAISSANCE,
  DEPARTMENT_ENUM.EXTRACTION,
  DEPARTMENT_ENUM.PROCESSING,
  DEPARTMENT_ENUM.LOGISTICS,
  DEPARTMENT_ENUM.SALES,
];
