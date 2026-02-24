import type { ProjectStatusDto, PriorityDto } from "shared/api";
import type { Department, PaginationData } from "shared/types";

export type ProjectStatus = ProjectStatusDto;
export type Priority = PriorityDto;

export interface Project {
  id: number;
  projectName: string;
  department: Department;
  status: ProjectStatus;
  budget: number;
  spent: number;
  progress: number;
  startDate: string;
  managerId: number;
  manager: string;
  priority: Priority;
}

export interface SearchProjectsParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
  department?: string;
  status?: string;
  manager?: string;
}

export type SearchProjectsResponse = PaginationData<Project>;
