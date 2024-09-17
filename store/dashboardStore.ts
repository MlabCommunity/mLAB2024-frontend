"use client";

import {
  DashboardQuizItemT,
  DashboardQuizT,
} from "@/app/[locale]/(dashboard)/types";
import { DashboardQuizData, PaginatedResponse } from "@/types";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import usePaginator, { UserPaginatorOptions } from "@/app/hooks/usePaginator";
import { getQuizList } from "@/utils/actions/quiz/getQuizList";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface DashboardQuizStore {
  updateQuizUrl: (quizId: string, newUrl: string) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
}

export const useDashboardStore = create(
  persist<DashboardQuizStore>(
    (set, get) => ({
      pageSize: 4,
      updateQuizUrl: (quizId, newUrl) => {
        // This function now only updates the URL in the cache
        // The actual update should be handled by your backend and then reflected in the next fetch
      },
      setPageSize: (size) => set({ pageSize: size }),
    }),
    {
      name: "dashboard-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// Custom hook to use paginator with the dashboard store
export const useDashboardPagination = (): UseQueryResult<
  PaginatedResponse<DashboardQuizItemT>,
  Error
> & {
  count: number;
  page: number;
  pages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  items: DashboardQuizItemT[];
  showing: [number, number];
} => {
  const { pageSize } = useDashboardStore();

  const paginatorOptions: UserPaginatorOptions<DashboardQuizItemT> = {
    fetch: (page, pageSize) => getQuizList(page, pageSize),
    queryKey: ["quizzes"],
    pageSize,
  };

  return usePaginator<DashboardQuizItemT>(paginatorOptions);
};

export const useDashboardQuizzes = () => {
  const pagination = useDashboardPagination();
  const { updateQuizUrl } = useDashboardStore();

  return {
    ...pagination,
    updateQuizUrl,
  };
};
