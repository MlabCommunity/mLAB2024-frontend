import { useQuery } from "@tanstack/react-query";
import { useGetCurrentProfile } from "@/utils/hooks/useGetCurrentProfile";
import { showStats } from "@/utils/actions/quiz/showStatistics";

export type QuizHistoryType = {
  quizId: string;
  quizTitle: string;
  quizDescription: string;
  participtionDateUtc: string;
  status: string;
  questions: Array<{
    id: string;
    title: string;
    answers: Array<{ id: string; content: string; isCorrect: boolean }>;
  }>;
  userAnswers: any[]; // Consider defining a more specific type for userAnswers
  quizResult: {
    totalQuestions: number;
    correctAnswers: number;
    scorePercentage: number;
  };
};

type User = {
  id: string;
};

type StatsQueryResult = {
  data: QuizHistoryType[];
};

export const useStats = () => {
  const userQuery = useQuery<User, Error>({
    queryKey: ["currentProfile"],
    queryFn: useGetCurrentProfile,
  });

  const statsQuery = useQuery<StatsQueryResult, Error>({
    queryKey: ["stats", userQuery.data?.id],
    queryFn: () => {
      if (!userQuery.data?.id) {
        throw new Error("User ID is not available");
      }
      return showStats(userQuery.data.id);
    },
    enabled: !!userQuery.data?.id,
    retry: (failureCount, error) => {
      if (error.message.includes("No stats found")) {
        return false; // Don't retry for "no stats" scenarios
      }
      return failureCount < 3; // Retry up to 3 times for other errors
    },
  });

  return {
    user: userQuery.data,
    stats: statsQuery.data?.data,
    isLoading: userQuery.isLoading || statsQuery.isLoading,
    isFetching: userQuery.isFetching || statsQuery.isFetching,
    isSuccess: userQuery.isSuccess && statsQuery.isSuccess,
    isError: userQuery.isError || statsQuery.isError,
    error: userQuery.error || statsQuery.error,
  };
};
