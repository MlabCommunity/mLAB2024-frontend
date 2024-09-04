"use server";

import { signInSchema } from "@/lib/form-schemas";
import { z } from "zod";
import { GenerateQuizT } from "@/types";

import { cookies } from "next/headers";
import { createQuizUrl, generateQuizUrl, signInUrl } from "@/constants/api";
import axiosInstance from "../../axiosInstance";
import { AxiosError } from "axios";

export const createQuiz = async (data: any) => {
  const token = cookies().get("AccessToken")?.value;
  try {
    const response = await axiosInstance.post(createQuizUrl, data, {
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
