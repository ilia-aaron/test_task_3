import { useState, useEffect, useMemo, useRef } from "react";
import type {
  IServerSideDatasource,
  IServerSideGetRowsParams,
} from "ag-grid-community";
import type { Project, SearchProjectsParams } from "entities/project";
import { GpnTable, type GpnTableRef } from "shared/ui/gpn-table";
import { createServerSideDatasource } from "../model/createDatasource";
import styles from "./ProjectsTable.module.css";
import { columnDefs } from "./columnDefs";

interface Props {
  filters: SearchProjectsParams;
}

export const ProjectsTable = ({ filters }: Props) => {
  const gridApiRef = useRef<GpnTableRef["gridApi"] | null>(null);
  const isFirstLoadRef = useRef<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  const baseDatasource = useMemo(
    () => createServerSideDatasource(filters),
    [filters],
  );

  // Оборачиваем datasource, чтобы отслеживать загрузку
  const datasource: IServerSideDatasource = useMemo(
    () => ({
      getRows(params: IServerSideGetRowsParams): void {
        setLoading(true);

        const originalSuccess = params.success.bind(params);
        const originalFail = params.fail.bind(params);

        params.success = (...args) => {
          isFirstLoadRef.current = false;
          setLoading(false);
          originalSuccess(...args);
        };
        params.fail = (...args) => {
          setLoading(false);
          originalFail(...args);
        };

        baseDatasource.getRows(params);
      },
    }),
    [baseDatasource],
  );

  useEffect(() => {
    gridApiRef.current?.setGridOption("serverSideDatasource", datasource);
  }, [datasource]);

  return (
    <div className={styles.container}>
      <GpnTable<Project>
        rowModelType="serverSide"
        loading={isFirstLoadRef.current && loading}
        onGridReady={(e) => {
          gridApiRef.current = e.api;
          e.api.setGridOption("serverSideDatasource", datasource);
        }}
        columnDefs={columnDefs}
      />
    </div>
  );
};
