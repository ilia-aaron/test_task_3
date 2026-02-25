import { useState } from "react";
import { Text } from "@consta/uikit/Text";
import type { SearchProjectsParams } from "entities/project";
import { ProjectsTable } from "features/projects-table/ui/ProjectsTable";
import { ProjectsFilters } from "features/filters/ui/ProjectsFilters";

export const ProjectsPage = (): JSX.Element => {
  const [filters, setFilters] = useState<SearchProjectsParams>({
    department: "",
    status: "",
    manager: "",
    priority: "",
  });

  return (
    <div>
      <Text size="2xl" weight="bold" as="h1">
        Аналитическая таблица проектов
      </Text>
      <ProjectsFilters onApply={setFilters} />
      <ProjectsTable filters={filters} />
    </div>
  );
};
