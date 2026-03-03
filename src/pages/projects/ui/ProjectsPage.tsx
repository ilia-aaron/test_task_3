import { useState } from "react";
import { Text } from "@consta/uikit/Text";
import type { SearchProjectsParams } from "entities/project";
import { SearchFilterKeyEnum } from "shared/api";
import { ProjectsTable } from "features/projects-table/ui/ProjectsTable";
import { ProjectsFilters } from "features/filters/ui/ProjectsFilters";

export const ProjectsPage = () => {
  const [filters, setFilters] = useState<SearchProjectsParams>({
    [SearchFilterKeyEnum.Department]: [],
    [SearchFilterKeyEnum.Status]: [],
    [SearchFilterKeyEnum.ManagerId]: [],
    [SearchFilterKeyEnum.Priority]: [],
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
