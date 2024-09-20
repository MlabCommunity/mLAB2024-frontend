"use server";
import { QuizHistoryType } from "@/types";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
export const showStats = async (
  participantId: string
): Promise<QuizHistoryType[] | undefined> => {
  const accessToken = cookies().get("AccessToken")?.value;
  try {
    const response = await axios.get(
      `https://mlab2024-backend.yellowocean-31330507.westeurope.azurecontainerapps.io/api/participations/${participantId}/history`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error(
        "Axios error:",
        error.response?.data?.details || error.message
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
