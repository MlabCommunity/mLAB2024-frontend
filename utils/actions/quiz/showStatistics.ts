"use server";

import { showStatsUrl } from "@/constants/api";
import { QuizHistoryType } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";

export const showStats = async (
  participantId: string
): Promise<QuizHistoryType | undefined> => {
  if (!participantId) {
    throw new Error("Participant ID is required");
  }

  try {
    const response = await axiosInstance.get(
      `${showStatsUrl}/${participantId}/history`
    );

    if (!response.data) {
      throw new Error("No data received from the server");
    }

    console.log("Stats data:", response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const statusCode = error.response?.status;
      const errorMessage = error.response?.data?.message || error.message;

      console.error(`API Error (${statusCode}):`, errorMessage);

      if (statusCode === 404) {
        throw new Error("No stats found for this participant");
      } else {
        throw new Error(`API Error: ${errorMessage}`);
      }
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
