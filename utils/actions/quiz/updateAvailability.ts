"use server";

import {
  createQuizUrl,
  updateAvailabilityUrl,
  updateQuizQuestionsUrl,
} from "@/constants/api";
import axiosInstance from "../../axiosInstance";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export const updateAvailability = async (data: any) => {
  const token = cookies().get("AccessToken")?.value;
  try {
    const response = await axiosInstance.patch(updateAvailabilityUrl, data, {
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
