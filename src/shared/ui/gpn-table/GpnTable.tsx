import {
  type Ref,
  type ReactElement,
  forwardRef,
  useImperativeHandle,
  useRef,
  useMemo,
} from "react";
import { AgGridReact } from "ag-grid-react";
import {
  type GridReadyEvent,
  AllCommunityModule,
  ModuleRegistry,
  ClientSideRowModelModule,
} from "ag-grid-community";
import { ServerSideRowModelModule } from "ag-grid-enterprise";

import type { GpnTableProps, GpnTableRef } from "./types";
import {
  AG_GRID_LOCALE_RU as localeText,
  DEFAULT_COL_DEF,
  GRID_DEFAULTS,
  gpnTheme as tableTheme,
} from "./contstants";

import { Loader } from "@consta/uikit/Loader";

ModuleRegistry.registerModules([
  AllCommunityModule,
  ClientSideRowModelModule,
  ServerSideRowModelModule,
]);

function AppTableInner<TData>(
  props: GpnTableProps<TData>,
  ref: Ref<GpnTableRef>,
) {
  const {
    // кастомные пропсы
    loading,
    emptyText = localeText.noRowsToShow,

    // AG Grid пропсы, которые можно дополнять
    defaultColDef,
    onGridReady,

    ...restProps
  } = props;

  const gridApiRef = useRef<GpnTableRef["gridApi"] | null>(null);

  // Экспозируем API наружу через ref
  useImperativeHandle(ref, () => ({
    get gridApi() {
      return gridApiRef.current;
    },
  }));

  // дефолты + пропсы снаружи
  const mergedDefaultColDef = useMemo(
    () => ({ ...DEFAULT_COL_DEF, ...defaultColDef }),
    [defaultColDef],
  );

  const handleGridReady = (event: GridReadyEvent<TData>) => {
    gridApiRef.current = event.api;
    onGridReady?.(event); // прокидываем дальше если передали
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <AgGridReact<TData>
        theme={tableTheme}
        localeText={localeText}
        {...GRID_DEFAULTS}
        defaultColDef={mergedDefaultColDef}
        onGridReady={handleGridReady}
        {...restProps}
        loadingOverlayComponent={() => <Loader />}
        noRowsOverlayComponent={() => <span>{emptyText}</span>}
        loading={loading}
      />
    </div>
  );
}

// forwardRef не дружит с дженериками напрямую — нужен этот трюк
export const GpnTable = forwardRef(AppTableInner) as <TData>(
  props: GpnTableProps<TData> & { ref?: Ref<GpnTableRef> },
) => ReactElement;
