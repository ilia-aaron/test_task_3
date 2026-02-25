import { Button } from "@consta/uikit/Button";
import { Text } from "@consta/uikit/Text";

import styles from "./ManagerFilterSelectedInfo.module.css";

type SelectionInfoProps = {
  selectedCount: number;
  totalCount: number;
  onReset?: (e: React.MouseEvent) => void;
};

export const ManagerFilterSelectedInfo = ({
  selectedCount,
  totalCount,
  onReset,
}: SelectionInfoProps) => {
  return (
    <div className={styles.selectionInfo}>
      {selectedCount === 0 ? (
        <Text
          size="m"
          view="ghost"
          className={[styles.selectionText, styles.emptySelectionText].join(
            " ",
          )}
        >
          Выберите менеджеров
        </Text>
      ) : (
        <>
          <Text size="m" className={styles.selectionText}>
            Выбрано: <strong>{selectedCount}</strong> из{" "}
            <strong>{totalCount}</strong>
          </Text>
          {onReset && (
            <Button size="xs" view="ghost" label="Очистить" onClick={onReset} />
          )}
        </>
      )}
    </div>
  );
};
