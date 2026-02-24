import { type BaseRequestParams, fetchService } from "../fetch-service";
import type {
  GetProjectsParamsDto,
  GetProjectsResponseDto,
  ProjectDto,
} from "./types";
import { createBasePaginationRequestData } from "shared/lib";

// Создаем независимый слой для работы с API, в котором инкапсулируем логику работы с API (например X-Total-Count и пр)
// чтобы не зависеть от конкретной реализации
// и легко можно будет изменить реализацию
// без изменения кода бизнес-логики

export class ProjectApi {
  apiBaseUrl: string;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async searchProjects(
    params?: GetProjectsParamsDto,
  ): Promise<GetProjectsResponseDto> {
    const { data, response } = await fetchService.get<ProjectDto[]>(
      `${this.apiBaseUrl}/projects`,
      {
        params: {
          ...params,
          ...createBasePaginationRequestData(params),
        } as BaseRequestParams,
      },
    );

    const totalCount = Number(
      response.headers.get("X-Total-Count") ?? data.length,
    );

    return { data, totalCount };
  }
}
