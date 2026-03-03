import { Combobox } from "@consta/uikit/Combobox";
import { SearchFilterKeyEnum } from "shared/api";
import styles from "./ProjectsFilters.module.css";
import { useSimpleFilterCombobox } from "../hooks/useSimpleFilterCombobox";

interface Props {
  items: string[];
}

export const StatusFilter = ({ items }: Props) => {
  const { isSelected, renderValue, onChange } = useSimpleFilterCombobox(
    SearchFilterKeyEnum.Status,
  );

  return (
    <Combobox
      label="Статусы"
      placeholder="Выберите статусы"
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
