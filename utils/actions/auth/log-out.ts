"use server";

import { AxiosError } from "axios";
import { cookies } from "next/headers";
import { logOutUrl } from "@/constants/api";
import axiosInstance from "../../axiosInstance";

export const logOutUser = async () => {
  try {
    axiosInstance.post(
      logOutUrl,
      {},
      {
        withCredentials: true,
      }
    );

    cookies().delete("AccessToken");
    cookies().delete("RefreshToken");
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.detail);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
