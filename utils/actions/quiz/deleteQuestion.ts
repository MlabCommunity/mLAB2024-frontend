"use server";

import { deleteQuestionUrl, deleteQuizUrl } from "@/constants/api";
import axiosInstance from "@/utils/axiosInstance";
import { cookies } from "next/headers";

export const deleteQuestion = async (id: string) => {
  const token = cookies().get("AccessToken")?.value;
  const response = await axiosInstance.delete(deleteQuestionUrl + id, {
    params: {
      id: id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    return response.data;
  }
};
