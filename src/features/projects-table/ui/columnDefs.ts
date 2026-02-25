import type { Project } from "entities/project";
import type { GpnColDef } from "shared/ui/gpn-table";
import { formatBudget, formatDate } from "shared/lib/formatters";
import { PriorityRenderer } from "./renderers/PriorityRenderer";
import { ProgressRenderer } from "./renderers/ProgressRenderer";
import { StatusRenderer } from "./renderers/StatusRenderer";

// конфигурация столбцов таблицы проектов
export const columnDefs: GpnColDef<Project>[] = [
  {
    field: "projectName",
    headerName: "Название проекта",
    minWidth: 200,
    flex: 2,
  },
  {
    field: "department",
    headerName: "Департамент",
    width: 150,
  },
  {
    field: "status",
    headerName: "Статус",
    width: 150,
    cellRenderer: StatusRenderer,
  },
  {
    field: "priority",
    headerName: "Приоритет",
    width: 130,
    cellRenderer: PriorityRenderer,
  },
  {
    field: "manager",
    headerName: "Менеджер",
    width: 180,
  },
  {
    field: "budget",
    headerName: "Бюджет",
    type: "numericColumn",
    width: 160,
    valueFormatter: ({ value }) => formatBudget(value),
  },
  {
    field: "spent",
    headerName: "Потрачено",
    type: "numericColumn",
    width: 160,
    valueFormatter: ({ value }) => formatBudget(value),
  },
  {
    field: "progress",
    headerName: "Прогресс",
    type: "numericColumn",
    width: 100,
    cellRenderer: ProgressRenderer,
  },
  {
    field: "startDate",
    headerName: "Дата начала",
    width: 140,
    type: "numericColumn",
    valueFormatter: ({ value }) => formatDate(value),
  },
];
