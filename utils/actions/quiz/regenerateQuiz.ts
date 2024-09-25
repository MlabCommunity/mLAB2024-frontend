"use server";
import { cookies } from "next/headers";
import { AxiosError } from "axios";
import axiosInstance from "../../axiosInstance";
import { regenerateQuizUrl } from "@/constants/api";

export const regenerateQuiz = async () => {
  const token = cookies().get("AccessToken")?.value;

  try {
    const response = await axiosInstance.post(
      regenerateQuizUrl,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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
