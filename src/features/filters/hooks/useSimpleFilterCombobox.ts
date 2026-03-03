import { useMemo } from "react";
import { type SearchFilterKeyEnum } from "shared/api";
import { useFiltersContext } from "../model/context";
import { createRenderValue } from "../ui/renderSelectedValues";

const EMPTY_FILTER: string[] = [];

export const useSimpleFilterCombobox = (filterKey: SearchFilterKeyEnum) => {
  const { filters, onChange: onChangeFilter } = useFiltersContext();

  const selectedValues = filters[filterKey] ?? EMPTY_FILTER;

  const renderValue = useMemo(
    () => createRenderValue<string>((item) => item, selectedValues),
    [selectedValues],
  );

  const isSelected = selectedValues.length > 0 ? selectedValues : null;

  const onChange = (value: string[] | null) => {
    onChangeFilter(filterKey, value || []);
  };

  return {
    selectedValues,
    isSelected,
    renderValue,
    onChange,
  };
};
