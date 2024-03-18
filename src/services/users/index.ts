import axiosInstance from "@/lib/axios";
import {
  API_LIST,
  getRoute,
  getRoutePagination,
  getRouteWithId,
} from "@/utils/constants";
import { handleResponse } from "../base.service";

export const fetchUserList = async (page?: number, limit?: number) => {
  return handleResponse(
    await axiosInstance.get(
      getRoutePagination(API_LIST.ADMIN_USER_LIST, page, limit)
    )
  );
};

export const updateAvatar = async (file: File, id: number) => {
  return handleResponse(
    await axiosInstance.put(getRouteWithId(API_LIST.UPDATE_AVATAR, id), {
      image: file,
    })
  );
};

export const deleteUser = async (userId: number) => {
  const deleteUrl = API_LIST.ADMIN_MODIFY_USER + `/${userId}`;
  return handleResponse(await axiosInstance.delete(getRoute(deleteUrl)));
};
