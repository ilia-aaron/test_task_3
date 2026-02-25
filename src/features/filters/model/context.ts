import { createContext, useContext } from "react";
import type { SearchProjectsParams } from "entities/project";

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
