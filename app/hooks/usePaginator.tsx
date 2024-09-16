"use client";

import {
  keepPreviousData,
  useQuery,
  QueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useState } from "react";
import { PaginatedResponse } from "@/types";

export interface UserPaginatorOptions<T> {
  fetch: (page: number, pageSize: number) => Promise<PaginatedResponse<T>>;
  queryKey: any[];
  pageSize: number;
}

function usePaginator<T>(
  p: UserPaginatorOptions<T>,
  q: Omit<
    QueryOptions<PaginatedResponse<T>, Error>,
    "queryKey" | "queryFn"
  > = {}
): UseQueryResult<PaginatedResponse<T>, Error> & {
  count: number;
  page: number;
  pages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  items: T[];
  showing: [number, number];
} {
  const [page, setPage] = useState(1);

  const query = useQuery<PaginatedResponse<T>, Error>({
    queryKey: [...p.queryKey, page],
    queryFn: () => p.fetch(page, p.pageSize),
    staleTime: 0,
    ...q,
  });

  const { data } = query;
  const { count = 0, items = [] } = data || {};
  const pages = Math.ceil(count / p.pageSize);
  const showing = (page - 1) * p.pageSize + (items.length > 0 ? 1 : 0);
  const showingEnd = page * p.pageSize < count ? page * p.pageSize : count;

  return {
    count,
    page,
    pages,
    setPage,
    items,
    showing: [showing, showingEnd],
    ...query,
  };
}

export default usePaginator;
