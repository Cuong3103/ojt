import axiosInstance from "@/lib/axios";
import {
  API_LIST,
  getRoute,
  getRoutePagination,
  getRouteWithId,
} from "@/utils/constants";
import { handleResponse } from "../base.service";
import { User } from "@/types/models/user.model.type";

export const fetchUserList = async (page?: number, limit?: number) => {
  return handleResponse(
    await axiosInstance.get(
      getRoutePagination(API_LIST.ADMIN_USER_LIST, page, limit)
    )
  );
};

export const getUserByUUID = async (uuid: number) => {
  return handleResponse(
    await axiosInstance.get(getRouteWithId(API_LIST.ADMIN_MODIFY_USER, uuid))
  );
};

export const addUser = async (user: User) => {
  return handleResponse(
    await axiosInstance.post(getRoute(API_LIST.ADMIN_MODIFY_USER), user)
  );
};

export const updateAvatar = async (file: File, id: number) => {
  return handleResponse(
    await axiosInstance.put(getRouteWithId(API_LIST.UPDATE_AVATAR, id), {
      image: file,
    })
  );
};

export const updateProfile = async (user: User, id: number) => {
  return handleResponse(
    await axiosInstance.put(getRouteWithId(API_LIST.ADMIN_MODIFY_USER, id), {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      dob: user.dob,
      email: user.email,
      status: user.status,
      gender: user.gender,
      avatarUrl: user.avatarUrl,
      userRoleId: user.userRoleId,
    })
  );
};

export const deleteUser = async (userId: number) => {
  const deleteUrl = API_LIST.ADMIN_MODIFY_USER + `/${userId}`;
  return handleResponse(await axiosInstance.delete(getRoute(deleteUrl)));
};
