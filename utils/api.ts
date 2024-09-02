import { currentProfileUrl, QuizListUrl } from "@/constants/api";
import axiosInstance from "./axiosInstance";
import { QuizzList } from "@/types";
import { cookies } from "next/headers";

export const getCurrentProfile = async () => {
  const response = await axiosInstance.get(currentProfileUrl);
  return response.data;
};
