import { useQuery } from "@tanstack/react-query";

import { showStats } from "@/utils/actions/quiz/showStatistics";

export const useStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => showStats(),
  });
};
