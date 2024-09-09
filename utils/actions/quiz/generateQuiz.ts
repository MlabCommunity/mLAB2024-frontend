"use server";
import { cookies } from "next/headers";
import { AxiosError } from "axios";
import axiosInstance from "../../axiosInstance";
import { GenerateQuizT } from "@/types";
import { generateQuizUrl } from "@/constants/api";

export const generateQuiz = async (data: GenerateQuizT) => {
  const token = cookies().get("AccessToken")?.value;
  const refreshToken = cookies().get("RefreshToken")?.value;

  if (!refreshToken) {
    throw new Error("RefreshToken is missing");
  }

  try {
    const response = await axiosInstance.post(generateQuizUrl, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log("Axios error:", error.response?.data); // Log server error response
      throw error;
    } else {
      console.log("Unexpected error:", error); // Log unexpected error
      throw new Error("An unexpected error occurred");
    }
  }
};
