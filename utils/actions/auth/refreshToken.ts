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

// Funkcja do określania bieżącej domeny
const getCurrentDomain = (): string | undefined => {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    // Nie ustawiamy domeny dla localhost, co pozwoli ciasteczkom działać na localhost i subdomenach
    if (hostname === "localhost" || hostname === "127.0.0.1") {
      return undefined;
    }
    // Dla innych środowisk, użyj pełnej nazwy domeny
    return hostname;
  }
  // Zwróć undefined dla SSR, co pozwoli przeglądarce użyć domyślnego zachowania
  return undefined;
};

const getCookieOptions = () => {
  const domain = getCurrentDomain();
  return {
    expires: new Date(Date.now() + 5 * 60 * 1000),
    secure:
      typeof window !== "undefined"
        ? window.location.protocol === "https:"
        : true,
    sameSite: "strict" as const,
    path: "/",
    ...(domain ? { domain } : {}), // Dodaj domenę tylko jeśli jest zdefiniowana
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
      const cookieOptions = getCookieOptions();

      // Remove old cookies
      Cookies.remove("AccessToken", cookieOptions);
      Cookies.remove("RefreshToken", cookieOptions);

      // Set new cookies
      Cookies.set("AccessToken", accessToken, cookieOptions);
      Cookies.set("RefreshToken", newRefreshToken, cookieOptions);

      onRefreshed(accessToken, newRefreshToken);
      return { accessToken, newRefreshToken };
    }
  } catch (error) {
    console.error("Failed to refresh token:", error);
    const cookieOptions = getCookieOptions();
    // Clear cookies by setting them to expire in the past
    Cookies.set("AccessToken", "", { ...cookieOptions, expires: new Date(0) });
    Cookies.set("RefreshToken", "", { ...cookieOptions, expires: new Date(0) });
    throw new Error("Could not refresh token");
  } finally {
    isRefreshing = false;
  }
};
