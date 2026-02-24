import { API_URL } from "shared/constants";
import { ManagerApi } from "shared/api";
import { createPaginationData } from "shared/lib";
import type { SearchManagersParams, SearchManagersResponse } from "./types";
import { managerDtoToManagerMapper, managerSearchParamsToDto } from "./mappers";

const managerApi = new ManagerApi(API_URL);

export const searchManagers = async (
  params: SearchManagersParams,
): Promise<SearchManagersResponse> => {
  const dtoSearchParams = managerSearchParamsToDto(params);
  const { data, totalCount } = await managerApi.searchManagers(dtoSearchParams);

  const mappedData = data.map(managerDtoToManagerMapper);

  return createPaginationData({
    page: params.page,
    limit: params.limit,
    total: totalCount,
    data: mappedData,
  });
};
