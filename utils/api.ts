import { currentProfileUrl } from "@/constants/api";
import axiosInstance from "./axiosInstance";

export const getCurrentProfile = async () => {
  const response = await axiosInstance.get(currentProfileUrl);
  return response.data;
};
