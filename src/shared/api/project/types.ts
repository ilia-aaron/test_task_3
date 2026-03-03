import { FilterType, type DepartmentDto } from "..";

export type ProjectStatusDto =
  | "Активный"
  | "Завершён"
  | "Приостановлен"
  | "Планирование";
export type PriorityDto = "Высокий" | "Средний" | "Низкий";

export interface ProjectDto {
  id: number;
  projectName: string;
  department: DepartmentDto;
  status: ProjectStatusDto;
  budget: number;
  spent: number;
  progress: number;
  startDate: string;
  managerId: number;
  manager: string;
  priority: PriorityDto;
}

export enum SearchFilterKeyEnum {
  Department = "department",
  Status = "status",
  ManagerId = "managerId",
  Priority = "priority",
}

export type SearchFilterWithModifier = `${SearchFilterKeyEnum}_${FilterType}`;
export type SearchFilters = SearchFilterKeyEnum | SearchFilterWithModifier;

// создаем модификаторы для фильтров
export const withModifier = <
  K extends SearchFilterKeyEnum,
  M extends FilterType,
>(
  key: K,
  modifier: M,
): `${K}_${M}` => `${key}_${modifier}` as `${K}_${M}`;

export type GetProjectsParamsDto = Partial<Record<SearchFilters, string[]>> & {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: "asc" | "desc";
};

export interface GetProjectsResponseDto {
  data: ProjectDto[];
  totalCount: number;
}
