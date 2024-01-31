import { toast } from "react-toastify";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_API_URL,
  headers: {
    "x-api-key": process.env.API_KEY,
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); //FIXME: Modify localStorage.getItem after NextAuth implemented
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.warn("Response error", error.response);
      toast.error(error.response.statusText);
      return Promise.reject(error.response);
    } else {
      console.warn(error.message);
      toast.error(error.message);
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
