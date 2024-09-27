import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useState } from "react";
import { PaginatedResponse } from "@/types";

interface UsePaginatedStatisticsOptions<T> {
  queryKey: any[];
  fetch: (
    quizId: string,
    page: number,
    pageSize: number
  ) => Promise<PaginatedResponse<T>>; // PaginatedResponse that holds the generic type `T`
  quizId: string;
  pageSize: number;
}

function usePaginatedStatistics<T>(
  options: UsePaginatedStatisticsOptions<T>,
  queryOptions?: Omit<
    UseQueryOptions<PaginatedResponse<T>, Error>,
    "queryKey" | "queryFn"
  >
) {
  const [page, setPage] = useState(1);
  const { queryKey, fetch, quizId, pageSize } = options;

  const query = useQuery<PaginatedResponse<T>, Error>({
    queryKey: [...queryKey, quizId, page],
    queryFn: () => fetch(quizId, page, pageSize),
    ...queryOptions,
  });
  const paginatedData = query.data?.items;
  const count = query.data?.totalItemsCount ?? 0;
  const pages = Math.ceil(count / pageSize);

  return {
    paginatedData,
    page,
    setPage,
    pages,
    count,
    ...query,
  };
}

export default usePaginatedStatistics;
