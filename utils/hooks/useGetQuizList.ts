import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getQuizList } from "../actions/quiz/getQuizList";
export const useGetQuizList = (page: number) => {
  return useQuery({
    queryKey: ["quizList", page],
    queryFn: () => getQuizList(page, 4),
    staleTime: 0,
    placeholderData: keepPreviousData,
  });
};
