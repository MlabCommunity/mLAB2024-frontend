import { useQuery } from "@tanstack/react-query";
import { getQuizParticipationResult } from "../actions/quiz/getQuizParticipationResult";
export const useQuizParticipationResult = (quizParticipationId: string) => {
  return useQuery({
    queryKey: ["quizParticipationResult"],
    queryFn: () => getQuizParticipationResult(quizParticipationId),
  });
};
