"use server";

import { singleQuizUrl } from "@/constants/api";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
export const getSingleQuiz = async (quizId: string) => {
  const token = cookies().get("AccessToken")?.value;
  try {
    const response = await axiosInstance.get(singleQuizUrl + quizId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.detail);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
