"use server";
import { cookies } from "next/headers";
import { AxiosError } from "axios";
import axiosInstance from "../../axiosInstance";
import { generateQuizUrl } from "@/constants/api";

export const generateQuiz = async (data: any) => {
  const token = cookies().get("AccessToken")?.value;

  try {
    const response = await axiosInstance.post(generateQuizUrl, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.details);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
