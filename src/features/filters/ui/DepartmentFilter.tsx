import { useMemo } from "react";
import { Combobox } from "@consta/uikit/Combobox";
import { SearchFilterKey } from "shared/api";
import { useFiltersContext } from "../model/context";
import { createRenderValue } from "./renderSelectedValues";
import styles from "./ProjectsFilters.module.css";

interface Props {
  items: string[];
}

export const DepartmentFilter = ({ items }: Props) => {
  const { filters, onChange } = useFiltersContext();
  const selectedValues = useMemo(
    () => filters.department || [],
    [filters.department],
  );

  const renderValue = useMemo(
    () => createRenderValue<string>((item) => item, selectedValues),
    [selectedValues],
  );

  const isSelected = selectedValues.length > 0 ? selectedValues : null;

  return (
    <Combobox
      label="Департаменты"
      placeholder="Выберите департаменты"
      value={isSelected}
      items={items}
      getItemLabel={(item) => item}
      getItemKey={(item) => item}
      dropdownClassName={styles.dropdown}
      multiple
      renderValue={renderValue}
      onChange={(value) => {
        onChange(SearchFilterKey.Department, value || []);
      }}
    />
  );
};
