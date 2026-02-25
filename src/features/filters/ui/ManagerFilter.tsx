import { type MouseEvent, useState, useRef, useEffect } from "react";
import { SearchFilterKey, withModifier } from "shared/api";
import { useFiltersContext } from "../model/context";
import { useFilterManager } from "../hooks/useFilterManager";
import { Virtuoso } from "react-virtuoso";

import { TextField } from "@consta/uikit/TextField";
import { Modal } from "@consta/uikit/Modal";
import { Text } from "@consta/uikit/Text";
import { Button } from "@consta/uikit/Button";
import { Checkbox } from "@consta/uikit/Checkbox";
import { ChoiceGroup } from "@consta/uikit/ChoiceGroup";

import styles from "./ManagerFilter.module.css";
import { ManagerFilterSelectedInfo } from "./ManagerFilterSelectedInfo";

type FilterType = "include" | "exclude";
type FilterTypeOption = {
  label: string;
  value: FilterType;
};

// дадим возможность выбирать либо выбирать исключать
const typeOptions: FilterTypeOption[] = [
  { label: "Выбрать", value: "include" },
  { label: "Исключить", value: "exclude" },
];
const MANAGER_ID_NE = withModifier(SearchFilterKey.ManagerId, "ne");

export const ManagerFilter = () => {
  const { onChange, resetKey } = useFiltersContext();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<FilterTypeOption>(
    typeOptions[0],
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const [checkedManagers, setCheckedManagers] = useState<Set<string>>(
    new Set([]),
  );
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [excludeManagers, setExcludeManagers] = useState<Set<string>>(
    new Set([]),
  );

  const {
    managers,
    searchQuery,
    isFetching,
    totalManagersCount,
    handleSearch,
    loadMore,
  } = useFilterManager();

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

  const openModal = () => {
    setIsModalOpen(true);
    inputRef.current?.blur();
  };

  const getIsChecked = (id: string): boolean => {
    if (isAllChecked) {
      return !excludeManagers.has(id);
    }

    return checkedManagers.has(id);
  };

  const checkAllButtonLabel = isAllChecked
    ? "Снять выделение"
    : filterType.value === "include"
      ? "Выбрать всех"
      : "Исключить всех";

  const selectedCount = isAllChecked
    ? totalManagersCount - excludeManagers.size
    : checkedManagers.size;

  const handleReset = (e: MouseEvent): void => {
    e.stopPropagation();
    setCheckedManagers(new Set());
    setExcludeManagers(new Set());
    setIsAllChecked(false);
  };

  const applyFilter = (): void => {
    const halfCountManagers = Math.floor(totalManagersCount / 2);
    const isInclude = filterType.value === "include";

    if (isAllChecked && !excludeManagers.size) {
      onChange(SearchFilterKey.ManagerId, []);
      setIsModalOpen(false);
      return;
    }

    if (isAllChecked && excludeManagers.size < halfCountManagers) {
      onChange(isInclude ? SearchFilterKey.ManagerId : MANAGER_ID_NE, []);
      onChange(
        isInclude ? MANAGER_ID_NE : SearchFilterKey.ManagerId,
        Array.from(excludeManagers),
      );
      setIsModalOpen(false);
      return;
    }

    if (checkedManagers.size > halfCountManagers) {
      onChange(isInclude ? SearchFilterKey.ManagerId : MANAGER_ID_NE, []);
      onChange(
        isInclude ? MANAGER_ID_NE : SearchFilterKey.ManagerId,
        Array.from(checkedManagers),
      );
      setIsModalOpen(false);
      return;
    }

    onChange(
      isInclude ? SearchFilterKey.ManagerId : MANAGER_ID_NE,
      Array.from(checkedManagers),
    );
    onChange(isInclude ? MANAGER_ID_NE : SearchFilterKey.ManagerId, []);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.fieldContainer}>
      <div className={styles.selectionOverlay} onClick={openModal}>
        <TextField label="Менеджеры" />
        <div className={styles.selectInfoContainer}>
          <ManagerFilterSelectedInfo
            selectedCount={selectedCount}
            totalCount={totalManagersCount}
            onReset={handleReset}
          />
        </div>
      </div>
      <Modal
        className={styles.modal}
        isOpen={isModalOpen}
        hasOverlay
        style={{ zIndex: 10000 }}
        onClickOutside={() => setIsModalOpen(false)}
        onEsc={() => setIsModalOpen(false)}
      >
        <div className={styles.modalHeader}>
          <Text size="xl" weight="bold" className={styles.modalTitle}>
            Выбор менеджеров
          </Text>
          <TextField
            placeholder="Поиск менеджера..."
            value={searchQuery}
            onChange={(val) => handleSearch(val || "")}
            style={{ width: "100%" }}
          />
          <div className={styles.filterControls}>
            <ChoiceGroup
              name="managerFilterType"
              value={filterType}
              onChange={setFilterType}
              items={typeOptions}
              getItemLabel={(item) => item.label}
              multiple={false}
              size="s"
            />
            <Button
              size="s"
              view="ghost"
              label={checkAllButtonLabel}
              onClick={handleSelectAll}
            />
          </div>
          <ManagerFilterSelectedInfo
            selectedCount={selectedCount}
            totalCount={totalManagersCount}
          />
        </div>

        <div className={styles.virtuosoContainer}>
          {managers.length === 0 && !isFetching ? (
            <div className={styles.emptyState}>
              <Text view="secondary" size="m">
                Ничего не найдено
              </Text>
            </div>
          ) : (
            <Virtuoso
              style={{ height: "100%" }}
              data={managers}
              endReached={loadMore}
              itemContent={(_, manager) => {
                return (
                  <div className={styles.managerItem}>
                    <Checkbox
                      checked={getIsChecked(String(manager.id))}
                      label={manager.name}
                      onChange={() => handleToggleManager(String(manager.id))}
                    />
                  </div>
                );
              }}
            />
          )}
        </div>

        <div className={styles.modalFooter}>
          <Button
            size="m"
            view="primary"
            label="Применить"
            onClick={applyFilter}
          />
        </div>
      </Modal>
    </div>
  );
};
