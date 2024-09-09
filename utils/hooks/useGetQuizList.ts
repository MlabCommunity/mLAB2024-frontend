import { useQuery } from "@tanstack/react-query";
import { getQuizList } from "../actions/quiz/getQuizList";
export const useGetQuizList = () => {
  return useQuery({
    queryKey: ["quizList"],
    queryFn: () => getQuizList(),
  });
};
