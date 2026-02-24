import { useState } from "react";
import { Text } from "@consta/uikit/Text";
import { ProjectsTable } from "features/projects-table/ui/ProjectsTable";
import type { SearchProjectsParams } from "entities/project";

export const ProjectsPage = () => {
  const [filters] = useState<SearchProjectsParams>({
    department: "",
    status: "",
    manager: "",
  });

  return (
    <div>
      <Text size="2xl" weight="bold" as="h1">
        Аналитическая таблица проектов
      </Text>
      <ProjectsTable filters={filters} />
    </div>
  );
};
