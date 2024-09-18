"use server";
import {
  quizParticipationUrl,
} from "@/constants/api";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
export const getQuizParticipation = async (quizId: string) => {
  const token = cookies().get("AccessToken")?.value;
  try {
    const response = await axiosInstance.get(quizParticipationUrl + quizId, {
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
