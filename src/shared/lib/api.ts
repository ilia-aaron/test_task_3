import { DEFAULT_QUERY_LIMIT, DEFAULT_QUERY_PAGE } from "../api";

export const createBasePaginationRequestData = <
  T extends { _page?: number; _limit?: number },
>(
  params?: T,
) => {
  const { _page = DEFAULT_QUERY_PAGE, _limit = DEFAULT_QUERY_LIMIT } =
    params ?? {};

  return {
    _page,
    _limit,
  };
};
