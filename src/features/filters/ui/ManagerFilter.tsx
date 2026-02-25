import { useState, useRef } from "react";
import { SearchFilterKey, withModifier } from "shared/api";
import { useFiltersContext } from "../model/context";
import { useFilterManager } from "../hooks/useFilterManager";
import { useManagerSelection, typeOptions } from "../hooks/useManagerSelection";
import { Virtuoso } from "react-virtuoso";

import { TextField } from "@consta/uikit/TextField";
import { Modal } from "@consta/uikit/Modal";
import { Text } from "@consta/uikit/Text";
import { Button } from "@consta/uikit/Button";
import { Checkbox } from "@consta/uikit/Checkbox";
import { ChoiceGroup } from "@consta/uikit/ChoiceGroup";

import styles from "./ManagerFilter.module.css";
import { ManagerFilterSelectedInfo } from "./ManagerFilterSelectedInfo";

const MANAGER_ID_NE = withModifier(SearchFilterKey.ManagerId, "ne");

export const ManagerFilter = () => {
  const { onChange, resetKey } = useFiltersContext();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    managers,
    searchQuery,
    isFetching,
    totalManagersCount,
    handleSearch,
    loadMore,
  } = useFilterManager();

  const {
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
  } = useManagerSelection({
    managers,
    searchQuery,
    totalManagersCount,
    resetKey,
  });

  const openModal = () => {
    setIsModalOpen(true);
    inputRef.current?.blur();
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

  const handleReset = (e?: React.MouseEvent): void => {
    if (e) {
      e.stopPropagation();
    }
    handleResetInternal();
    onChange(SearchFilterKey.ManagerId, []);
    onChange(MANAGER_ID_NE, []);
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
