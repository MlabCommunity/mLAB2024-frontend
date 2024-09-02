import { useQuery } from "@tanstack/react-query";
import { getCurrentProfile, getQuizList } from "../api";
export const useGetCurrentProfile = () => {
  return useQuery({
    queryKey: ["currentProfile"],
    queryFn: () => getCurrentProfile(),
  });
};
