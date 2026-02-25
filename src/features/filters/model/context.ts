import { createContext, useContext } from "react";
import type { SearchProjectsParams } from "entities/project";
// Контекст для хранения фильтров и их изменений для того чтобы избавится от props / emit hell

export interface FiltersContextType {
  filters: SearchProjectsParams;
  onChange: <K extends keyof SearchProjectsParams>(
    key: K,
    value: SearchProjectsParams[K],
  ) => void;
  resetKey: number;
}

export const FiltersContext = createContext<FiltersContextType | null>(null);

export const useFiltersContext = (): FiltersContextType => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error(
      "useFiltersContext должен быть использован внутри FiltersProvider",
    );
  }
  return context;
};
