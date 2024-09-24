"use server";
import { getQuizParticipationsHistory } from "@/constants/api";
import { QuizHistoryType } from "@/types";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
export const showStats = async (): Promise<QuizHistoryType[] | undefined> => {
  const accessToken = cookies().get("AccessToken")?.value;
  try {
    const response = await axios.get(getQuizParticipationsHistory, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data?.detail);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
