
import { refreshTokenUrl } from "@/constants/api";
import axiosInstance from "@/utils/axiosInstance";
import Cookies from "js-cookie";

let isRefreshing = false;
let subscribers: ((accessToken: string, refreshToken: string) => void)[] = [];


const onRefreshed = (accessToken: string, refreshToken: string) => {
  subscribers.forEach((callback) => callback(accessToken, refreshToken));
  subscribers = [];
};


const subscribeTokenRefresh = (callback: (accessToken: string, refreshToken: string) => void) => {
  subscribers.push(callback);
};


export const refreshToken = async (): Promise<{ accessToken: string, refreshToken: string }> => {
  if (isRefreshing) {
    return new Promise((resolve) => {
      subscribeTokenRefresh((accessToken: string, refreshToken: string) => {
        resolve({ accessToken, refreshToken });
      });
    });
  }

  isRefreshing = true;

  try {
    const refreshToken = Cookies.get("RefreshToken");

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

 
    const response = await axiosInstance.post(refreshTokenUrl, { refreshToken });

    if (response.status === 200 && response.data) {
      const { accessToken, refreshToken: newRefreshToken } = response.data;

    
      Cookies.set("AccessToken", accessToken, {
        expires: new Date(Date.now() + 5 * 60 * 1000), 
      });

      Cookies.set("RefreshToken", newRefreshToken, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), 
      });

      
      onRefreshed(accessToken, newRefreshToken);
      return { accessToken, refreshToken: newRefreshToken };
    } else {
      throw new Error("Failed to refresh token: Invalid response");
    }
  } catch (error) {
    console.error("Failed to refresh token:", error);
    Cookies.remove("AccessToken");
    Cookies.remove("RefreshToken");
    throw new Error("Could not refresh token");
  } finally {
    isRefreshing = false;
  }
};
