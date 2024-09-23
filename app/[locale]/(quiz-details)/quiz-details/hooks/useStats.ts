import { useQuery } from "@tanstack/react-query";
import { useGetCurrentProfile } from "@/utils/hooks/useGetCurrentProfile";
import { showStats } from "@/utils/actions/quiz/showStatistics";
import { usePathname } from "next/navigation";

export const useStats = () => {
  const {
    data: statsData,
    isLoading: isLoadingStats,
    isError: isErrorStats,
    error: statsError,
  } = useQuery({
    queryKey: ["stats"],
    queryFn: showStats,
  });
  return {
    stats: statsData, //
    isLoading: isLoadingStats,
    isError: isErrorStats,
    error: statsError,
  };
};
