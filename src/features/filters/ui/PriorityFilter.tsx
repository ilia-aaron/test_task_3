import { useMemo } from "react";
import { Combobox } from "@consta/uikit/Combobox";
import { SearchFilterKey } from "shared/api";
import { useFiltersContext } from "../model/context";
import { createRenderValue } from "./renderSelectedValues";
import styles from "./ProjectsFilters.module.css";

interface Props {
  items: string[];
}

export const PriorityFilter = ({ items }: Props) => {
  const { filters, onChange } = useFiltersContext();
  const selectedValues = useMemo(
    () => filters.priority || [],
    [filters.priority],
  );

  const renderValue = useMemo(
    () => createRenderValue<string>((item) => item, selectedValues),
    [selectedValues],
  );

  const isSelected = selectedValues.length > 0 ? selectedValues : null;

  return (
    <Combobox
      label="Приоритеты"
      placeholder="Выберите приоритеты"
      value={isSelected}
      items={items}
      getItemLabel={(item) => item}
      getItemKey={(item) => item}
      dropdownClassName={styles.dropdown}
      multiple
      renderValue={renderValue}
      onChange={(value) => {
        onChange(SearchFilterKey.Priority, value || []);
      }}
    />
  );
};
