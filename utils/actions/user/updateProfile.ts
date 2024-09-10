"use server";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { currentProfileUrl, signInUrl } from "@/constants/api";
import { revalidatePath } from "next/cache";
import axiosInstance from "../../axiosInstance";

export const updateProfile = async (values: { userName: string }) => {
  const token = cookies().get("AccessToken")?.value;
  try {
    const response = await axiosInstance.put(currentProfileUrl, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    revalidatePath("/profile");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.detail);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
