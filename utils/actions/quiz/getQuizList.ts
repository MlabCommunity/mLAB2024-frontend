"use server";

import { quizListUrl } from "@/constants/api";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
export const getQuizList = async () => {
  const token = cookies().get("AccessToken")?.value;
  try {
    const response = await axiosInstance.get(quizListUrl, {
      params: {
        Page: 1,
        PageSize: 6,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/dashboard");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.detail);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
