"use server";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { createGuestUserUrl, currentProfileUrl } from "@/constants/api";
import axiosInstance from "../../axiosInstance";

export const createGuestUser = async (values: { displayName: string }) => {
  const token = cookies().get("AccessToken")?.value;
  try {
    const response = await axiosInstance.post(createGuestUserUrl, values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    cookies().set("AccessToken", response.data.accessToken, {
      secure: false,
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
