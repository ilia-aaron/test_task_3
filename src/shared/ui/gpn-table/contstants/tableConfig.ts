import { AgGridReactProps } from "ag-grid-react";

// Дефолтные настройки колонок — применяются ко всем колонкам если не переопределены
export const DEFAULT_COL_DEF = {
  sortable: true,
  resizable: true,
  minWidth: 80,
  suppressMovable: false,
} satisfies AgGridReactProps["defaultColDef"];

// Дефолтные настройки самого грида
export const GRID_DEFAULTS = {
  animateRows: true,
  rowHeight: 48,
  headerHeight: 48,
  suppressCellFocus: false,
  enableCellTextSelection: true,
  suppressRowClickSelection: true,
} satisfies Partial<AgGridReactProps>;
