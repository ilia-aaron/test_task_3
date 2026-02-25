import type {
  IServerSideDatasource,
  IServerSideGetRowsParams,
} from "ag-grid-enterprise";
import { type SearchProjectsParams, searchProjects } from "entities/project";

// Создание datasource для ag-grid
export const createServerSideDatasource = (
  filters: SearchProjectsParams,
): IServerSideDatasource => ({
  getRows: async (params: IServerSideGetRowsParams) => {
    const { startRow = 0, endRow = 50, sortModel } = params.request;

    const page = Math.floor(startRow / (endRow - startRow)) + 1;
    const limit = endRow - startRow;

    const sortModelItem = sortModel?.[0];
    const sortParams = sortModelItem
      ? { sort: sortModelItem.colId, order: sortModelItem.sort }
      : {};

    try {
      const { data, total } = await searchProjects({
        page,
        limit,
        ...sortParams,
        ...filters,
      });

      params.success({ rowData: data, rowCount: total });
    } catch (ex: unknown) {
      console.error(ex);
      params.fail();
    }
  },
});
