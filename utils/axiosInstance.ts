import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL, refreshTokenUrl } from "@/constants/api";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

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

// Response Interceptor
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

      Cookies.set("AccessToken", "", { maxAge: 0 });

      Cookies.set("AccessToken", accessToken, { expires: 1 });
      Cookies.set("RefreshToken", newRefreshToken, { expires: 7 });

      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      // console.error("Token refresh failed:", refreshError);
      Cookies.set("AccessToken", "", { maxAge: 0 });
      Cookies.set("RefreshToken", "", { maxAge: 0 });
      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;
