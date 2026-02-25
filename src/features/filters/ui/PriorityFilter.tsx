import { Select } from "@consta/uikit/Select";
import { useFiltersContext } from "../model/context";
import styles from "./ProjectsFilters.module.css";

interface Props {
  items: string[];
}

export const PriorityFilter = ({ items }: Props): JSX.Element => {
  const { filters, onChange } = useFiltersContext();
  return (
    <Select
      label="Приоритет"
      placeholder="Выберите приоритет"
      value={filters.priority || null}
      items={items}
      getItemLabel={(item) => item}
      getItemKey={(item) => item}
      dropdownClassName={styles.dropdown}
      onChange={(item) => {
        onChange("priority", item || "");
      }}
    />
  );
};
