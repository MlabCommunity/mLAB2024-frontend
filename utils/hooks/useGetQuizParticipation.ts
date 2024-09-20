import { useQuery } from "@tanstack/react-query";
import { getQuizParticipation } from "../actions/quiz/getQuizParticipation";
export const useGetQuizParticipation = (quizId: string) => {
  return useQuery({
    queryKey: ["currentQuizParticipation"],
    queryFn: () => getQuizParticipation(quizId),
  });
};
