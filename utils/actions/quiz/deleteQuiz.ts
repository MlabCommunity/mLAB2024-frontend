"use server";

import { deleteQuizUrl } from "@/constants/api";
import axiosInstance from "@/utils/axiosInstance";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const deleteQuiz = async (id: string) => {
  const token = cookies().get("AccessToken")?.value;
  const response = await axiosInstance.delete(deleteQuizUrl + id, {
    params: {
      id: id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  revalidatePath("/dashboard");
  if (response.status === 200) {
    return response.data;
  }
};
