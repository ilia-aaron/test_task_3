import { useState, useCallback } from "react";
import { DEPARTMENTS } from "shared/constants";

import {
  type SearchProjectsParams,
  STATUSES,
  PRIORITIES,
} from "entities/project";
import { SearchFilterKeyEnum, withModifier } from "shared/api";
import { FiltersContext } from "../model/context";

import { FieldGroup } from "@consta/uikit/FieldGroup";
import { Button } from "@consta/uikit/Button";
import { DepartmentFilter } from "./DepartmentFilter";
import { StatusFilter } from "./StatusFilter";
import { PriorityFilter } from "./PriorityFilter";
import { ManagerFilter } from "./ManagerFilter";

import styles from "./ProjectsFilters.module.css";

interface Props {
  onApply: (filters: SearchProjectsParams) => void;
}

export const ProjectsFilters = ({ onApply }: Props) => {
  const [localFilters, setLocalFilters] = useState<SearchProjectsParams>({
    [SearchFilterKeyEnum.Department]: [],
    [SearchFilterKeyEnum.Status]: [],
    [SearchFilterKeyEnum.ManagerId]: [],
    [withModifier(SearchFilterKeyEnum.ManagerId, "ne")]: [],
    [SearchFilterKeyEnum.Priority]: [],
  });
  const [resetKey, setResetKey] = useState<number>(0);

  const isFiltersEmpty = Object.values(localFilters).every(
    (value) => Array.isArray(value) && value.length === 0,
  );

  const handleFilterChange = useCallback(
    <K extends keyof SearchProjectsParams>(
      key: K,
      value: SearchProjectsParams[K],
    ): void => {
      setLocalFilters((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleApply = () => {
    onApply(localFilters);
  };

  const handleReset = (): void => {
    setLocalFilters({
      [SearchFilterKeyEnum.Department]: [],
      [SearchFilterKeyEnum.Status]: [],
      [SearchFilterKeyEnum.ManagerId]: [],
      [withModifier(SearchFilterKeyEnum.ManagerId, "ne")]: [],
      [SearchFilterKeyEnum.Priority]: [],
    });
    setResetKey((prev) => prev + 1);
    onApply({});
  };

  return (
    <FiltersContext.Provider
      value={{ filters: localFilters, onChange: handleFilterChange, resetKey }}
    >
      <FieldGroup form="round" size="m" className={styles.projectsFilters}>
        <DepartmentFilter items={DEPARTMENTS} />
        <StatusFilter items={STATUSES} />
        <PriorityFilter items={PRIORITIES} />
        <ManagerFilter />
        <div className={styles.actions}>
          <Button
            view="ghost"
            label="Сбросить"
            onClick={handleReset}
            disabled={isFiltersEmpty}
          />
          <Button label="Применить" onClick={handleApply} />
        </div>
      </FieldGroup>
    </FiltersContext.Provider>
  );
};
