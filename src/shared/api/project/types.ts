import { type DepartmentDto } from "..";

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

export interface GetProjectsParamsDto {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: "asc" | "desc";
  department?: string;
  status?: string;
  manager?: string;
  priority?: string;
}

export interface GetProjectsResponseDto {
  data: ProjectDto[];
  totalCount: number;
}
