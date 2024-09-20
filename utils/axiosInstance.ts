import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL, refreshTokenUrl } from "@/constants/api";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

const getDomain = () => {
  const hostname = window.location.hostname;
  return hostname.substring(
    hostname.indexOf(".") >= 0 ? hostname.indexOf(".") + 1 : 0
  );
};

// Cookie options
const cookieOptions: Cookies.CookieAttributes = {
  domain: getDomain(),
  path: "/",
  secure: true,
  sameSite: "strict" as const,
};

axiosInstance.interceptors.request.use(
  (request) => {
    const accessToken = Cookies.get("AccessToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = Cookies.get("RefreshToken");

    try {
      const response = await axios.post(refreshTokenUrl, { refreshToken });
      const { accessToken, refreshToken: newRefreshToken } = response.data;

      Cookies.remove("AccessToken", cookieOptions);
      Cookies.remove("RefreshToken", cookieOptions);

      Cookies.set("AccessToken", accessToken, {
        ...cookieOptions,
        expires: new Date(Date.now() + 5 * 60 * 1000),
      });

      Cookies.set("RefreshToken", newRefreshToken, {
        ...cookieOptions,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      Cookies.remove("AccessToken", cookieOptions);
      Cookies.remove("RefreshToken", cookieOptions);
      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;
