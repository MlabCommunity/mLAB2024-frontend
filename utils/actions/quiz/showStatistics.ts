"use client";
import { QuizHistoryType } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";

export const showStats = async (
  participantId: string
): Promise<QuizHistoryType[] | undefined> => {
  console.log("showStats called with participantId:", participantId);

  if (!participantId) {
    console.error("Participant ID is missing");
    throw new Error("Participant ID is required");
  }

  try {
    console.log(
      "Making API request to:",
      `https://mlab2024-backend.yellowocean-31330507.westeurope.azurecontainerapps.io/api/participations/${participantId}/history`
    );

    const response = await axiosInstance.get(
      `https://mlab2024-backend.yellowocean-31330507.westeurope.azurecontainerapps.io/api/participations/${participantId}/history`
    );

    console.log("API Response status:", response.status);
    console.log("API Response headers:", response.headers);

    if (!response.data) {
      console.error("No data received from the server");
      throw new Error("No data received from the server");
    }

    console.log("Stats data:", response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const statusCode = error.response?.status;
      const errorMessage = error.response?.data?.message || error.message;
      console.error(`API Error (${statusCode}):`, errorMessage);
      console.error("Full error response:", error.response);

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
