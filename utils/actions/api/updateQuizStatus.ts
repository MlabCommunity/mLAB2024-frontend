"use server";
import axios, { AxiosError } from "axios";
import { API_BASE_URL, updateQuizStatusUrl } from "@/constants/api";
import { cookies } from "next/headers"; // For handling cookies in Next.js

export const updateQuizStatus = async (
  id: string,
  newStatus: "Active" | "Inactive"
) => {
  try {
    const access = cookies().get("AccessToken")?.value;

    if (!access) {
      throw new Error("Access token is missing");
    }

    const payload = newStatus;

    const result = await axios.patch(
      `${updateQuizStatusUrl}/${id}/status`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json", // Ensure content type is set correctly
        },
      }
    );

    return result.data;

    // Return the response data
    return result.data;
  } catch (error) {
    // Handle Axios errors
    if (error instanceof AxiosError) {
      console.error("Axios error:", error.response?.data || error.message);
      throw error || new Error("Failed to update quiz status");
    } else {
      // Handle any other unexpected errors
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  }
};
