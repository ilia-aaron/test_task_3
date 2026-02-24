import type { Project } from "entities/project";
import type { GpnCustomCellRendererProps } from "shared/ui/gpn-table";
import { ProgressSpin } from "@consta/uikit/ProgressSpin";

export const ProgressRenderer = (
  props: GpnCustomCellRendererProps<Project, number>,
) => {
  const value = props.value ?? 0;

  const color =
    value >= 80
      ? "var(--color-bg-success)"
      : value >= 40
        ? "var(--color-bg-warning)"
        : "var(--color-bg-alert)";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
        width: "100%",
      }}
    >
      <ProgressSpin value={value} size="s" style={{ color }} />
      <span>{value}%</span>
    </div>
  );
};
