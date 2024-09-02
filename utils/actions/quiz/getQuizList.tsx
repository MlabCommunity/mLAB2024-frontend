import { QuizListUrl } from "@/constants/api";
import { QuizzList } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
export const getQuizList = async (): Promise<QuizzList> => {
  const response = await axiosInstance.get(QuizListUrl, {
    params: {
      Page: 1,
      PageSize: 6,
    },
  });
  return response.data;
};
