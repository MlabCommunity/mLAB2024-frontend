"use server";

import { showStatsUrl } from "@/constants/api";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";

export const showStats = async (participantId: string) => {
  try {
    const response = await axiosInstance.get(
      `${showStatsUrl}/${participantId}/history`,
      {
        params: {
          participantId,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error?.response?.data);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
