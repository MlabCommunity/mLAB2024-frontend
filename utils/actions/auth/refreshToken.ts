import { refreshTokenUrl } from "@/constants/api";
import axiosInstance from "../../axiosInstance";
import Cookies from "js-cookie";

let isRefreshing = false;
type TokenType = string;

type SubscriberCallback = (
  accessToken: TokenType,
  refreshToken: TokenType
) => void;
let subscribers: SubscriberCallback[] = [];
const onRefreshed = (accessToken: TokenType, refreshToken: TokenType): void => {
  subscribers.forEach((callback) => callback(accessToken, refreshToken));
  subscribers = [];
};

const subscribeTokenRefresh = (callback: SubscriberCallback): void => {
  subscribers.push(callback);
};

export const refreshToken = async () => {
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

    const response = await axiosInstance.post(refreshTokenUrl, {
      refreshToken,
    });

    if (response.status === 200) {
      const { accessToken, refreshToken: newRefreshToken } = response.data;

      Cookies.remove("AccessToken");
      Cookies.remove("RefreshToken");

      Cookies.set("AccessToken", accessToken, { expires: 1 });
      Cookies.set("RefreshToken", newRefreshToken, { expires: 7 });

      onRefreshed(accessToken, newRefreshToken);
      return { accessToken, newRefreshToken };
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
