"use server";

import { ItemsT } from "@/app/[locale]/(quiz-details)/types";
import { singleQuizUrl } from "@/constants/api";
import { PaginatedResponse } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { cookies } from "next/headers";

export const getPaginatedResults = async (
  quizId: string,
  page?: number,
  pageSize?: number
): Promise<PaginatedResponse<ItemsT>> => {
  const access = cookies().get("AccessToken")?.value;

  if (!access) {
    throw new Error("Access token not found in cookies");
  }

  try {
    const response = await axiosInstance.get(singleQuizUrl + quizId, {
      headers: {
        Authorization: `Bearer ${access}`,
      },
      params: {
        page: page,
        pageSize: pageSize,
      },
    });

    const data: PaginatedResponse<ItemsT> = {
      items: response.data.participants.items || [],
      totalItemsCount: response.data.participants?.totalItemsCount || 0,
      itemsFrom: response.data.participants.itemsFrom || 1,
      itemsTo: response.data.participants.itemsTo,
      totalPages: response.data.participants.totalPages,
    };

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.detail || "An unknown Axios error occurred"
      );
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
