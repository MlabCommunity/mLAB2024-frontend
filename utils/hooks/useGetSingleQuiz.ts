import { useQuery } from "@tanstack/react-query";
import { getSingleQuiz } from "../actions/quiz/getSingleQuiz";
export const useGetSingleQuiz = (quizId: string) => {
  return useQuery({
    queryKey: ["singleQuiz"],
    queryFn: () => getSingleQuiz(quizId),
  });
};
