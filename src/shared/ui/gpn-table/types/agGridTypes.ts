import type { AgGridReactProps } from "ag-grid-react";
import type { GridApi } from "ag-grid-community";

// Берём все пропсы AG Grid, но тему и локаль мы задаём сами — снаружи их не трогают
type OmittedProps = "theme" | "localeText" | "rowModelType";

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
