import { useQuery } from "@tanstack/react-query";
import { useGetCurrentProfile } from "@/utils/hooks/useGetCurrentProfile";
import { showStats } from "@/utils/actions/quiz/showStatistics";
import { usePathname } from "next/navigation";

export const useStats = () => {
  const path = usePathname();
  const quizId = path.split("/")[2];

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useGetCurrentProfile();
  const {
    data: statsData,
    isLoading: isLoadingStats,
    isError: isErrorStats,
    error: statsError,
  } = useQuery({
    queryKey: ["stats", user?.id],
    queryFn: async () => {
      if (!user.id) {
        throw new Error("User ID is not available");
      }

      try {
        const result = await showStats(user?.id);
        return result;
      } catch (error) {
        throw error;
      }
    },
    enabled: !!user?.id,
    retry: (failureCount, error) => {
      if (error.message) {
        return false;
      }
      return failureCount < 3;
    },
  });

  const filteredStats =
    statsData?.filter((stat) => {
      const statQuizId = stat.quizId.trim();
      const extractedQuizId = quizId.trim();
      return statQuizId === extractedQuizId;
    }) || [];
  return {
    stats: filteredStats, //
    isLoading: isUserLoading || isLoadingStats,
    isError: isUserError || isErrorStats,
    error: userError || statsError,
  };
};
