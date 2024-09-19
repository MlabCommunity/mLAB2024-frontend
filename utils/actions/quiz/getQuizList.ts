"use server";

import { DashboardQuizItemT } from "@/app/[locale]/(dashboard)/types";
import { quizListUrl } from "@/constants/api";
import { PaginatedResponse } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export type DashboardQuizResponse = PaginatedResponse<DashboardQuizItemT>;
export const getQuizList = async (
  page: number,
  pageSize: number
): Promise<DashboardQuizResponse> => {
  const token = cookies().get("AccessToken")?.value;
  try {
    const response = await axiosInstance.get(quizListUrl, {
      params: {
        page: page,
        pageSize: pageSize,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/dashboard");
    const { totalItemsCount, items } = response.data;
    const data = {
      count: totalItemsCount,
      items,
    };
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.detail);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
