"use server";
import { AxiosError } from "axios";
import { cookies } from "next/headers";
import {
  convertGuestUrl,
  createGuestUserUrl,
  currentProfileUrl,
} from "@/constants/api";
import axiosInstance from "../../axiosInstance";
import { revalidatePath } from "next/cache";

export const convertGuest = async (data: {
  email: string;
  password: string;
  rememberMe: boolean;
}) => {
  const token = cookies().get("AccessToken")?.value;
  try {
    const response = await axiosInstance.put(
      convertGuestUrl,
      { email: data.email, password: data.password },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
