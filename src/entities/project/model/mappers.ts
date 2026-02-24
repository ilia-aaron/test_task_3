// тут могуть быть мапперы на создание и отпарвку на сервер под формат DTO

import type { GetProjectsParamsDto, ProjectDto } from "shared/api";
import type { SearchProjectsParams, Project } from "./types";

export const projectDtoToProjectMapper = (projectDto: ProjectDto): Project => {
  return {
    id: projectDto.id,
    projectName: projectDto.projectName,
    department: projectDto.department,
    status: projectDto.status,
    budget: projectDto.budget,
    spent: projectDto.spent,
    progress: projectDto.progress,
    startDate: projectDto.startDate,
    managerId: projectDto.managerId,
    manager: projectDto.manager,
    priority: projectDto.priority,
  };
};

export const projectSearchParamsToDto = (
  params: SearchProjectsParams,
): GetProjectsParamsDto => ({
  _page: params.page,
  _limit: params.limit,
  _sort: params.sort,
  _order: params.order,
  department: params.department,
  status: params.status,
  manager: params.manager,
});
