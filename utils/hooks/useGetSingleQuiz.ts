import { useQuery } from "@tanstack/react-query";
import { getQuizList } from "../actions/quiz/getQuizList";
import { getSingleQuiz } from "../actions/quiz/getSingleQuiz";
export const useGetSingleQuiz = (quizId: string) => {
  console.log(quizId);
  return useQuery({
    queryKey: ["singleQuiz"],
    queryFn: () => getSingleQuiz(quizId),
  });
};
