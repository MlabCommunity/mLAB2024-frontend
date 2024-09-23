"use server";

import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { getQuizParticipationResultUrl } from "@/constants/api";

export const getQuizParticipationResult = async (
  quizParticipationId: string
) => {
  const token = cookies().get("AccessToken")?.value;
  try {
    const response = await axiosInstance.get(
      getQuizParticipationResultUrl + `${quizParticipationId}/result`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.detail);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
