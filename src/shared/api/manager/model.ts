import { type BaseRequestParams, fetchService } from "../fetch-service";
import type {
  ManagerDto,
  GetManagersParamsDto,
  GetManagersResponseDto,
} from "./types";
import { createBasePaginationRequestData } from "shared/lib";

export class ManagerApi {
  apiBaseUrl: string;

  constructor(apiBaseUrl: string) {
    this.apiBaseUrl = apiBaseUrl;
  }

  async searchManagers(
    params?: GetManagersParamsDto,
  ): Promise<GetManagersResponseDto> {
    const { data, response } = await fetchService.get<ManagerDto[]>(
      `${this.apiBaseUrl}/managers`,
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
