import type { PaginationData } from "shared/types";
import { DEFAULT_QUERY_LIMIT, DEFAULT_QUERY_PAGE } from "shared/api";

// Создание объекта с пагинацией
type PaginationDataParams<T> = {
  page?: number;
  limit?: number;
  total: number;
  data: T[];
};

export const createPaginationData = <T>({
  page = DEFAULT_QUERY_PAGE,
  limit = DEFAULT_QUERY_LIMIT,
  total,
  data,
}: PaginationDataParams<T>): PaginationData<T> => ({
  data,
  total,
  page,
  limit,
  hasNextPage: page * limit < total,
  hasPrevPage: page > 1,
});
