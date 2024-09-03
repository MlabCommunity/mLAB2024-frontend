"use server";
import { signUpUrl } from "@/constants/api";
import { signUpSchema } from "@/lib/form-schemas";
import axiosInstance from "@/utils/axiosInstance";
import { AxiosError } from "axios";
import { z } from "zod";

export const signUp = async (values: z.infer<typeof signUpSchema>) => {
  const validatedFields = signUpSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: { errorDet: ["Invalid fields."] } };
  }
  try {
    const response = await axiosInstance.post(signUpUrl, values, {
      withCredentials: true,
    });
    if (response.data) {
      return { message: "Sign-up succesful" };
    }
    console.log(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.detail);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
