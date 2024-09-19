"use server";
import { signInSchema } from "@/lib/form-schemas";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { signInUrl } from "@/constants/api";
import axiosInstance from "../../axiosInstance";

export const signInUser = async (values: z.infer<typeof signInSchema>) => {
  const validatedFields = signInSchema.safeParse(values);
  const { rememberMe } = values;

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  try {
    const response = await axiosInstance.post(signInUrl, values, {
      withCredentials: true,
    });

    if (rememberMe) {
      cookies().set("AccessToken", response.data.accessToken, {
        secure: false,
      });
      cookies().set("RefreshToken", response.data.refreshToken, {
        secure: false,
      });
    } else {
      cookies().set("AccessToken", response.data.accessToken, {
        secure: false,
      });
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.detail);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
