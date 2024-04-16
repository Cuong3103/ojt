import axiosInstance from "@/lib/axios";
import {
  API_LIST,
  getRoute,
  getRoutePagination,
  getRouteWithId,
} from "@/utils/constants";
import { handleResponse } from "../base.service";
import { Class, ClassBody } from "@/types/class.type";


export const fetClassList = async (page?: number, limit?: number) => {
    return handleResponse(
      await axiosInstance.get(
        getRoutePagination(API_LIST.VIEW_CLASS, page, limit)
      )
    );
  };

  export const createClass = async (body: ClassBody) => {
    return handleResponse(
      await axiosInstance.post(getRoute(API_LIST.CREATE_CLASS), body)
    );
  };

  export const getClassByID =  async (id: number) => {
    return handleResponse(
      await axiosInstance.get(getRouteWithId(API_LIST.VIEW_CLASS, id))
    );
  };

  export const deleteClass = async (classId: number) => {
    const deleteUrl = API_LIST.VIEW_CLASS + `/${classId}`;
    return handleResponse(await axiosInstance.delete(getRoute(deleteUrl)));
  };

  export const sreachClassByUser = async (name: string, limit?: number) => {
    return handleResponse(
      await axiosInstance.post(getRoutePagination(API_LIST.SREACH_CLASS_FOR_USER, limit), name)
    );
  };
