export type DepartmentDto =
  | "Разведка"
  | "Добыча"
  | "Переработка"
  | "Логистика"
  | "Сбыт";

// Тип фильтра который можно примешивать в параметру фильтра managerId_ne
export type FilterType = "lt" | "lte" | "gt" | "gte" | "eq" | "ne" | "in";
