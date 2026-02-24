import {
  type Project,
  type ProjectStatus,
  STATUS_ENUM,
} from "entities/project";
import type { GpnCustomCellRendererProps } from "shared/ui/gpn-table";

// Маппинг статус → цвет (Consta токены)
const STATUS_COLOR: Record<ProjectStatus, string> = {
  [STATUS_ENUM.ACTIVE]: "var(--color-bg-success)",
  [STATUS_ENUM.COMPLETED]: "var(--color-bg-ghost)",
  [STATUS_ENUM.PAUSED]: "var(--color-bg-warning)",
  [STATUS_ENUM.PLANNING]: "var(--color-bg-normal)",
};

export const StatusRenderer = (
  props: GpnCustomCellRendererProps<Project, ProjectStatus>,
) => {
  const status = props.value;
  if (!status) return null;

  const color = STATUS_COLOR[status] ?? "var(--color-bg-ghost)";

  return (
    <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: color,
          flexShrink: 0,
        }}
      />
      {status}
    </span>
  );
};
