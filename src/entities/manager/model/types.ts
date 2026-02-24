import type { Department, PaginationData } from "shared/types";

export interface Manager {
  id: number;
  name: string;
  department: Department;
}

export interface SearchManagersParams {
  page?: number;
  limit?: number;
  name?: string;
}

export type SearchManagersResponse = PaginationData<Manager>;
