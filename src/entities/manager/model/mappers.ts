import type { GetManagersParamsDto, ManagerDto } from "shared/api";
import type { SearchManagersParams, Manager } from "./types";

export const managerDtoToManagerMapper = (managerDto: ManagerDto): Manager => {
  return {
    id: managerDto.id,
    name: managerDto.name,
    department: managerDto.department,
  };
};

export const managerSearchParamsToDto = (
  params: SearchManagersParams,
): GetManagersParamsDto => ({
  _page: params.page,
  _limit: params.limit,
  name_like: params.name,
});
