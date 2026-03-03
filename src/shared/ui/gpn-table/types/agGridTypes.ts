import type { AgGridReactProps, CustomCellRendererProps } from "ag-grid-react";
import type {
  GridApi,
  GridReadyEvent,
  IServerSideDatasource,
  IServerSideGetRowsParams,
} from "ag-grid-community";
import type { ColDef } from "ag-grid-enterprise";

// Берём все пропсы AG Grid, но тему и локаль мы задаём сами — снаружи их не трогают
type OmittedProps = "theme" | "localeText";

export interface GpnTableProps<TData> extends Omit<
  AgGridReactProps<TData>,
  OmittedProps
> {
  // Можно добавить свои пропсы поверх AG Grid
  loading?: boolean;
  emptyText?: string;
}

export interface GpnTableRef {
  gridApi: GridApi | null;
}

export interface GpnColDef<TData = any, TValue = any> extends ColDef<
  TData,
  TValue
> {}

export type GpnCustomCellRendererProps<TData, TValue> = CustomCellRendererProps<
  TData,
  TValue
>;

export type GpnServerSideDatasource = IServerSideDatasource;
export type GpnServerSideGetRowsParams = IServerSideGetRowsParams;
export type GpnGridReadyEvent = GridReadyEvent;
