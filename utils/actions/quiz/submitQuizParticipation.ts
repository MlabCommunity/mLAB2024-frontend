"use server";

import { cookies } from "next/headers";
import { createQuizUrl, submitQuizParticipationUrl } from "@/constants/api";
import axiosInstance from "../../axiosInstance";
import { AxiosError } from "axios";

export const submitQuizParticipation = async (data: any) => {
  const token = cookies().get("AccessToken")?.value;
  try {
    const response = await axiosInstance.post(
      submitQuizParticipationUrl,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error);
      throw new Error(error.response?.data?.detail);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
