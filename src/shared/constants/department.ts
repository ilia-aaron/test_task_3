import type { Department } from "shared/types";

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
