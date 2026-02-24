import { type DepartmentDto } from "../types";

export interface ManagerDto {
  id: number;
  name: string;
  department: DepartmentDto;
}

export interface GetManagersParamsDto {
  _page?: number;
  _limit?: number;
  name_like?: string;
}

export interface GetManagersResponseDto {
  data: ManagerDto[];
  totalCount: number;
}
