import { Combobox } from "@consta/uikit/Combobox";
import { SearchFilterKeyEnum } from "shared/api";
import styles from "./ProjectsFilters.module.css";
import { useSimpleFilterCombobox } from "../hooks/useSimpleFilterCombobox";

interface Props {
  items: string[];
}

export const PriorityFilter = ({ items }: Props) => {
  const { isSelected, renderValue, onChange } = useSimpleFilterCombobox(
    SearchFilterKeyEnum.Priority,
  );

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
      onChange={onChange}
    />
  );
};
