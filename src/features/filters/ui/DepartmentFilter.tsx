import { Combobox } from "@consta/uikit/Combobox";
import { SearchFilterKeyEnum } from "shared/api";
import { useSimpleFilterCombobox } from "../hooks/useSimpleFilterCombobox";
import styles from "./ProjectsFilters.module.css";

interface Props {
  items: string[];
}

export const DepartmentFilter = ({ items }: Props) => {
  const { isSelected, renderValue, onChange } = useSimpleFilterCombobox(
    SearchFilterKeyEnum.Department,
  );

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
      onChange={onChange}
    />
  );
};
