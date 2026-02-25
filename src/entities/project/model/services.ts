// Сервис для инкапсуляции бизнес логики общения с моделью
// Здесь мы можем обрабатывать данные, которые приходят с сервера
// и отправлять данные на сервер
// Тут же мы можем инкапсулировать логику работы с API
// например объединять запросы, фильтровать или преобразовывать данные как нужно модели
// и не зависеть от конкретной реализации
// и не вносить изменения в код в компонентах или страницах

import { API_URL } from "shared/constants";
import { ProjectApi } from "shared/api";
import { createPaginationData } from "shared/lib";
import type { SearchProjectsParams, SearchProjectsResponse } from "./types";
import { projectDtoToProjectMapper, projectSearchParamsToDto } from "./mappers";

const projectApi = new ProjectApi(API_URL);

export const searchProjects = async (
  params: SearchProjectsParams,
): Promise<SearchProjectsResponse> => {
  const dtoSearchParams = projectSearchParamsToDto(params);

  const { data, totalCount } = await projectApi.searchProjects(dtoSearchParams);

  const mappedData = data.map(projectDtoToProjectMapper);

  return createPaginationData({
    page: params.page,
    limit: params.limit,
    total: totalCount,
    data: mappedData,
  });
};
