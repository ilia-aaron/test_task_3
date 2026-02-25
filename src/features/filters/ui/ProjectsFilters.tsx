import { useState, useCallback } from "react";
import { DEPARTMENTS } from "shared/constants";

import {
  type SearchProjectsParams,
  STATUSES,
  PRIORITIES,
} from "entities/project";
import { FiltersContext } from "../model/context";

import { FieldGroup } from "@consta/uikit/FieldGroup";
import { Button } from "@consta/uikit/Button";
import { DepartmentFilter } from "./DepartmentFilter";
import { StatusFilter } from "./StatusFilter";
import { PriorityFilter } from "./PriorityFilter";

import styles from "./ProjectsFilters.module.css";

interface Props {
  onApply: (filters: SearchProjectsParams) => void;
}

export const ProjectsFilters = ({ onApply }: Props) => {
  const [localFilters, setLocalFilters] = useState<SearchProjectsParams>({
    department: "",
    status: "",
    manager: "",
    priority: "",
  });

  const isFiltersEmpty = Object.values(localFilters).every(
    (value) => value === "",
  );

  const handleFilterChange = useCallback(
    (key: keyof SearchProjectsParams, value: string): void => {
      setLocalFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleApply = () => {
    onApply(localFilters);
  };

  const handleReset = () => {
    setLocalFilters({
      department: "",
      status: "",
      manager: "",
      priority: "",
    });
    onApply({});
  };

  return (
    <FiltersContext.Provider
      value={{ filters: localFilters, onChange: handleFilterChange }}
    >
      <FieldGroup form="round" size="m" className={styles.projectsFilters}>
        <DepartmentFilter items={DEPARTMENTS} />
        <StatusFilter items={STATUSES} />
        <PriorityFilter items={PRIORITIES} />
        <Button
          view="ghost"
          label="Сбросить"
          onClick={handleReset}
          disabled={isFiltersEmpty}
        />
        <Button label="Применить" onClick={handleApply} />
      </FieldGroup>
    </FiltersContext.Provider>
  );
};
