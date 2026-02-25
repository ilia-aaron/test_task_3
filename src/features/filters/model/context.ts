import { createContext, useContext } from "react";
import type { SearchProjectsParams } from "entities/project";

export interface FiltersContextType {
  filters: SearchProjectsParams;
  onChange: (key: keyof SearchProjectsParams, value: string) => void;
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
