import { useState, useEffect } from "react";
import type { Manager } from "entities/manager";

export type FilterType = "include" | "exclude";
export type FilterTypeOption = {
  label: string;
  value: FilterType;
};

export const typeOptions: FilterTypeOption[] = [
  { label: "Выбрать", value: "include" },
  { label: "Исключить", value: "exclude" },
];

interface UseManagerSelectionProps {
  managers: Manager[];
  searchQuery: string;
  totalManagersCount: number;
  resetKey: number;
}

// Кастомный хук для управления выбором менеджеров. Вынос логики в композиционнный хук для разгрузки компонента
export const useManagerSelection = ({
  managers,
  searchQuery,
  totalManagersCount,
  resetKey,
}: UseManagerSelectionProps) => {
  const [filterType, setFilterType] = useState<FilterTypeOption>(
    typeOptions[0],
  );
  const [checkedManagers, setCheckedManagers] = useState<Set<string>>(
    new Set(),
  );
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [excludeManagers, setExcludeManagers] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    if (resetKey === 0) return;
    setCheckedManagers(new Set());
    setExcludeManagers(new Set());
    setIsAllChecked(false);
    setFilterType(typeOptions[0]);
  }, [resetKey]);

  const handleToggleManager = (id: string): void => {
    if (isAllChecked) {
      const next = new Set(excludeManagers);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      setExcludeManagers(next);
    } else {
      const next = new Set(checkedManagers);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      setCheckedManagers(next);
    }
  };

  const handleSelectAll = (): void => {
    if (searchQuery) {
      const visibleIds = managers.map((m) => String(m.id));
      const allVisibleChecked = visibleIds.every((id) =>
        checkedManagers.has(id),
      );

      if (allVisibleChecked) {
        setCheckedManagers((prev) => {
          const next = new Set(prev);
          visibleIds.forEach((id) => next.delete(id));
          return next;
        });
      } else {
        setCheckedManagers((prev) => {
          const next = new Set(prev);
          visibleIds.forEach((id) => next.add(id));
          return next;
        });
      }
      return;
    }

    setCheckedManagers(new Set());
    setExcludeManagers(new Set());
    if (isAllChecked) {
      setIsAllChecked(false);
      return;
    }
    setIsAllChecked(true);
  };

  const getIsChecked = (id: string): boolean => {
    if (isAllChecked) {
      return !excludeManagers.has(id);
    }
    return checkedManagers.has(id);
  };

  const handleResetInternal = (): void => {
    setCheckedManagers(new Set());
    setExcludeManagers(new Set());
    setIsAllChecked(false);
  };

  const checkAllButtonLabel = isAllChecked
    ? "Снять выделение"
    : filterType.value === "include"
      ? "Выбрать всех"
      : "Исключить всех";

  const selectedCount = isAllChecked
    ? totalManagersCount - excludeManagers.size
    : checkedManagers.size;

  return {
    filterType,
    setFilterType,
    checkedManagers,
    excludeManagers,
    isAllChecked,
    handleToggleManager,
    handleSelectAll,
    getIsChecked,
    handleResetInternal,
    checkAllButtonLabel,
    selectedCount,
  };
};
