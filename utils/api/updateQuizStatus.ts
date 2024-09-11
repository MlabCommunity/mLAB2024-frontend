"use server";
import axios, { AxiosError } from "axios";
import { API_BASE_URL, updateQuizStatusUrl } from "@/constants/api";
import { cookies } from "next/headers"; // For handling cookies in Next.js

type updateQuizStatusType = {
  quizId: string;
  newStatus: "Active" | "Inactive";
};
export const updateQuizStatus = async (
  id: string,
  newStatus: string
): Promise<updateQuizStatusType> => {
  try {
    const access = cookies().get("AccessToken")?.value;
    console.log(id);
    console.log("AccessToken:", access);

    if (!access) {
      throw new Error("Access token is missing");
    }

    const payload = newStatus;
<<<<<<< HEAD:utils/actions/api/updateQuizStatus.ts
    console.log(payload);
=======

    console.log("Payload:", JSON.stringify(payload));

>>>>>>> e0830aed1a4dc35017ec103059754e1bddef3606:utils/api/updateQuizStatus.ts
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
<<<<<<< HEAD:utils/actions/api/updateQuizStatus.ts
    console.log(result.data);
=======

    
    return result.data;

    // Return the response data
>>>>>>> e0830aed1a4dc35017ec103059754e1bddef3606:utils/api/updateQuizStatus.ts
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
