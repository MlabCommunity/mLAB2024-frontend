"use server";
import { cookies } from "next/headers";
import { AxiosError } from "axios";
import axiosInstance from "../../axiosInstance";
import { registerParticipationUrl } from "@/constants/api";

export const registerParticipation = async (data: { urlId: string }) => {
  const token = cookies().get("AccessToken")?.value;
  const url = `${registerParticipationUrl}${data.urlId}`;

  try {
    const response = await axiosInstance.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.detail);
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
