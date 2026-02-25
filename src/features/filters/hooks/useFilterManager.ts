import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchManagers } from "entities/manager";
import type { Manager } from "entities/manager";
import { DEFAULT_QUERY_LIMIT } from "shared/api";

export const useFilterManager = () => {
  const [managers, setManagers] = useState<Manager[]>([]);
  const [totalManagersCount, setTotalManagersCount] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);

  const { data, isFetching } = useQuery({
    queryKey: ["managers", searchQuery, page],
    queryFn: async () => {
      return await searchManagers({
        name: searchQuery,
        page,
        limit: DEFAULT_QUERY_LIMIT,
      });
    },
  });

  // Дебаунс: обновляем запрос к API только после прекращения ввода
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500);

    return () => clearTimeout(timeout);
  }, [inputValue]);

  // 3) поддержка строки ввода поиска при изменении которой все будет сбрасываться
  useEffect(() => {
    setManagers([]);
    setPage(1);
    setHasNextPage(true);
  }, [searchQuery]);

  // 2) сохранение их в state
  useEffect(() => {
    if (data) {
      setManagers((prev) => {
        const prevIds = new Set(prev.map((m) => m.id));
        const newManagers = data.data.filter((m) => !prevIds.has(m.id));
        return [...prev, ...newManagers];
      });
      setHasNextPage(data.hasNextPage);
      if (!totalManagersCount) {
        setTotalManagersCount(data.total);
      }
    }
  }, [data, page]);

  const handleSearch = (query: string) => {
    setInputValue(query);
  };

  // 1) Метод постраничной загрузки менеджеров
  const loadMore = () => {
    if (!(hasNextPage && !isFetching)) {
      return;
    }

    setPage((prev) => prev + 1);
  };

  return {
    managers,
    searchQuery: inputValue,
    handleSearch,
    loadMore,
    isFetching,
    hasNextPage,
    totalManagersCount,
  };
};
