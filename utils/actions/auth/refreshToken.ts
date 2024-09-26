import { refreshTokenUrl } from "@/constants/api";
import axiosInstance from "@/utils/axiosInstance";
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

const getCurrentDomain = (): string | undefined => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return undefined;
    }
    return hostname;
  }
  return undefined;
};

const getCookieOptions = (isRefreshToken: boolean = false) => {
  const domain = getCurrentDomain();
  return {
    expires: new Date(
      Date.now() + (isRefreshToken ? 7 * 24 * 60 * 60 * 1000 : 30 * 60 * 1000)
    ),
    secure:
      typeof window !== "undefined"
        ? window.location.protocol === "https:"
        : true,
    sameSite: "strict" as const,
    path: "/",
    ...(domain ? { domain } : {}),
  };
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
      const accessTokenOptions = getCookieOptions();
      const refreshTokenOptions = getCookieOptions(true);

      Cookies.remove("AccessToken", accessTokenOptions);
      Cookies.remove("RefreshToken", refreshTokenOptions);

      Cookies.set("AccessToken", accessToken, accessTokenOptions);
      Cookies.set("RefreshToken", newRefreshToken, refreshTokenOptions);

      onRefreshed(accessToken, newRefreshToken);
      return { accessToken, newRefreshToken };
    }
  } catch (error) {
    console.error("Failed to refresh token:", error);
    const accessTokenOptions = getCookieOptions();
    const refreshTokenOptions = getCookieOptions(true);
    Cookies.set("AccessToken", "", {
      ...accessTokenOptions,
      expires: new Date(0),
    });
    Cookies.set("RefreshToken", "", {
      ...refreshTokenOptions,
      expires: new Date(0),
    });
    throw new Error("Could not refresh token");
  } finally {
    isRefreshing = false;
  }
};
