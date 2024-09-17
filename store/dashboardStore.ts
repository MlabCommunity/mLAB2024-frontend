"use client";
import { DashboardQuizItemT } from "@/app/[locale]/(dashboard)/types";
import { PaginatedResponse } from "@/types";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";
import usePaginator, { UserPaginatorOptions } from "@/app/hooks/usePaginator";
import { getQuizList } from "@/utils/actions/quiz/getQuizList";
import { UseQueryResult, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

interface DashboardQuizStore {
  quizzes: DashboardQuizItemT[];
  setQuizzes: (quizzes: DashboardQuizItemT[]) => void;
  updateQuizUrl: (quizId: string, newUrl: string) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
}
const localStorageKey = "dashboardQuizUrls";

const getStoredQuizUrls = () => {
  const storedData = localStorage.getItem(localStorageKey);
  return storedData ? JSON.parse(storedData) : {};
};

const saveQuizUrlToLocalStorage = (quizId: string, newUrl: string) => {
  const storedUrls = getStoredQuizUrls();
  storedUrls[quizId] = newUrl;
  localStorage.setItem(localStorageKey, JSON.stringify(storedUrls));
};
export const useDashboardStore = create(
  persist<DashboardQuizStore>(
    (set) => ({
      quizzes: [],
      setQuizzes: (quizzes) => {
        set({ quizzes });
      },
      pageSize: 4,
      updateQuizUrl: (quizId, newUrl) => {
        console.log(`Updating URL for quiz ${quizId} to ${newUrl}`);
        set((state) => {
          const updatedQuizzes = state.quizzes.map((quiz) =>
            quiz.id === quizId ? { ...quiz, url: newUrl } : quiz
          );
          console.log("Updated quizzes:", updatedQuizzes);
          return { quizzes: updatedQuizzes };
        });
        saveQuizUrlToLocalStorage(quizId, newUrl);
      },
      setPageSize: (size) => {
        console.log(`Setting page size to ${size}`);
        set({ pageSize: size });
      },
    }),
    {
      name: "dashboard-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

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
  const { pageSize, setQuizzes } = useDashboardStore();
  const queryClient = useQueryClient();

  const paginatorOptions: UserPaginatorOptions<DashboardQuizItemT> = {
    fetch: async (page, pageSize) => {
      try {
        const response = await getQuizList(page, pageSize);
        if (!response.items || response.items.length === 0) {
          console.warn("Received empty items array from API");
          return { items: [], count: 0, page, pages: 0 }; // Return default values if the API fails
        }
        setQuizzes(response.items || []);
        return response;
      } catch (error) {
        console.error("Error fetching quizzes:", error);
        throw error;
      }
    },
    queryKey: ["quizzes"],
    pageSize,
  };

  const result = usePaginator<DashboardQuizItemT>(paginatorOptions);

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries({ queryKey: ["quizzes"] });
    };
  }, [queryClient]);

  return result;
};

export const useDashboardQuizzes = () => {
  const pagination = useDashboardPagination();
  const { quizzes, updateQuizUrl } = useDashboardStore();

  return {
    ...pagination,
    quizzes,
    updateQuizUrl,
  };
};
