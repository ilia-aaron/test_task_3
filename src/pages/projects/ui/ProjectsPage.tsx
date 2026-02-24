import { Text } from "@consta/uikit/Text";
import { ProjectsTable } from "features/projects-table/ui/ProjectsTable";

export const ProjectsPage = () => {
  return (
    <div>
      <Text size="2xl" weight="bold" as="h1">
        Аналитическая таблица проектов
      </Text>
      <Text view="secondary">Начните реализацию здесь</Text>
      <ProjectsTable />
    </div>
  );
};
