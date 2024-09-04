import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getQuizList } from "../actions/quiz/getQuizList";
import { DashboardQuizT } from "@/types";
export const useGetQuizList = (page: number) => {
  return useQuery({
    queryKey: ["quizList", page],
    queryFn: () => getQuizList(page),
    placeholderData: keepPreviousData,
  });
};
