import { Tag } from "@consta/uikit/Tag";
import type { ReactElement } from "react";

const MAX_VISIBLE_TAGS = 2;

type RenderValueProps<T> = {
  item: T;
  handleRemove?: (e: React.SyntheticEvent) => void;
};

export function createRenderValue<T>(
  getLabel: (item: T) => string,
  selectedItems: T[],
): (props: RenderValueProps<T>) => ReactElement | null {
  return ({ item, handleRemove }: RenderValueProps<T>): ReactElement | null => {
    const index = selectedItems.indexOf(item);

    if (index >= MAX_VISIBLE_TAGS) {
      // показываем "+N" тег только для третьего элемента, остальные скрываем
      if (index === MAX_VISIBLE_TAGS) {
        const remaining = selectedItems.length - MAX_VISIBLE_TAGS;
        return <Tag mode="info" label={`+${remaining}`} size="s" />;
      }
      return null;
    }

    if (handleRemove) {
      return (
        <Tag
          mode="cancel"
          label={getLabel(item)}
          size="s"
          onCancel={handleRemove}
        />
      );
    }

    return <Tag mode="info" label={getLabel(item)} size="s" />;
  };
}
