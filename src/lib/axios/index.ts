import { getSession } from "@/utils/authenticationHelper";
import { BASE_API_URL } from "@/utils/constants";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "X-API-KEY": "RkFNU19CQUNLRU5EX0FQSV9LRVk=",
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use(async (config) => {
  const bypassEndpoints = ["refresh", "signin"];
  if (
    config.url &&
    bypassEndpoints.some((endpoint) => config.url?.includes(endpoint))
  ) {
    return config;
  }

  if (config.url?.match(/updateImage/) || config.url?.match(/csv/)) {
    config.headers["Content-Type"] = "multipart/form-data";
  }

  const session = await getSession();
  if (session?.accessToken) {
    config.headers["Authorization"] = `Bearer ${session?.accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    if (error.response) {
      return Promise.resolve(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
