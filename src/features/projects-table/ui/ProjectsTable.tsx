import { useEffect, useMemo, useRef } from "react";
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

  // Пересоздаём datasource когда меняются фильтры
  const datasource = useMemo(
    () => createServerSideDatasource(filters),
    [filters],
  );

  // GpnTable перезапрашивает данные с новым datasource
  useEffect(() => {
    gridApiRef.current?.setGridOption("serverSideDatasource", datasource);
  }, [datasource]);

  return (
    <div className={styles.container}>
      <GpnTable<Project>
        rowModelType="serverSide"
        onGridReady={(e) => {
          gridApiRef.current = e.api;
          e.api.setGridOption("serverSideDatasource", datasource);
        }}
        columnDefs={columnDefs}
      />
    </div>
  );
};
