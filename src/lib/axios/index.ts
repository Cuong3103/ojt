import { toast } from "react-toastify";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_API_URL,
  headers: {
    "X-API-KEY": process.env.API_KEY || undefined,
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token"); //FIXME: Modify localStorage.getItem after NextAuth implemented
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }

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
