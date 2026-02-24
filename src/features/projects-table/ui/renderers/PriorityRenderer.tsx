import { type Project, type Priority, PRIORITY_ENUM } from "entities/project";
import type { GpnCustomCellRendererProps } from "shared/ui/gpn-table";

import { Text } from "@consta/uikit/Text";

const PRIORITY_STYLE: Record<Priority, string> = {
  [PRIORITY_ENUM.HIGH]: "var(--color-typo-alert)",
  [PRIORITY_ENUM.MEDIUM]: "var(--color-typo-warning)",
  [PRIORITY_ENUM.LOW]: "var(--color-typo-success)",
};

export const PriorityRenderer = (
  props: GpnCustomCellRendererProps<Project, Priority>,
) => {
  const priority = props.value;
  if (!priority) return null;

  const color = PRIORITY_STYLE[priority] ?? "var(--color-typo-primary)";

  return (
    <Text
      style={{
        fontWeight: 500,
        color,
      }}
    >
      {priority}
    </Text>
  );
};
