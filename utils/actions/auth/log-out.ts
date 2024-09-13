"use server";

import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { logOutUrl } from "@/constants/api";
import axiosInstance from "../../axiosInstance";

export const logOutUser = async () => {
  const refreshToken = cookies().get("RefreshToken")?.value;
  try {
    axiosInstance.post(
      logOutUrl,
      {},
      {
        withCredentials: true,
      }
    );
    if (refreshToken) {
      cookies().set("RefreshToken", "", { maxAge: 0 });
      cookies().set("AccessToken", "", { maxAge: 0 });
    } else {
      cookies().set("AccessToken", "", { maxAge: 0 });
    }

    // commented to check if it works on development
    // cookies().delete("AccessToken");
    // cookies().delete("RefreshToken");
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.detail);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
