"use server";

import { signInSchema } from "@/lib/form-schemas";
import { z } from "zod";

import { cookies } from "next/headers";
import { generateQuizUrl, signInUrl } from "@/constants/api";
import axiosInstance from "../../axiosInstance";
import { GenerateQuizT } from "@/types";
import { AxiosError } from "axios";

export const generateQuiz = async (data: GenerateQuizT) => {
  const token = cookies().get("AccessToken")?.value;
  try {
    const response = await axiosInstance.post(generateQuizUrl, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.detail);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
