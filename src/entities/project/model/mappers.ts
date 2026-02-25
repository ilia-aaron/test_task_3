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
): GetProjectsParamsDto => {
  const { page, limit, sort, order, ...filters } = params;

  return {
    _page: page,
    _limit: limit,
    _sort: sort,
    _order: order,
    ...filters,
  };
};
