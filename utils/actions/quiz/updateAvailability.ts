"use server";
import axios, { AxiosError } from "axios";
import {
  API_BASE_URL,
  updateAvailabilityUrl,
  updateQuizStatusUrl,
} from "@/constants/api";
import { cookies } from "next/headers"; // For handling cookies in Next.js
import axiosInstance from "@/utils/axiosInstance";

export const updateAvailability = async (
  id: string,
  newAvailability: "Public" | "Private"
) => {
  try {
    const access = cookies().get("AccessToken")?.value;

    if (!access) {
      throw new Error("Access token is missing");
    }

    const payload = newAvailability;

    const result = await axiosInstance.patch(
      `${updateAvailabilityUrl}/${id}/availability`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
      }
    );

    return result.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Axios error", error.response?.data || error.message);
      throw new Error(error.response?.data?.detail);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("An unexprected error occurred");
    }
  }
};
