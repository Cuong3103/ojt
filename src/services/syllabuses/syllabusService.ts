import axiosInstance from "@/lib/axios";
import {
  API_LIST,
  getRoute,
  getRoutePagination,
  getRouteWithId,
} from "@/utils/constants";
import { handleResponse } from "../base.service";

export const syllabusService = {
  getSyllabus(query = "") {
    return axiosInstance.get(`/syllabus${query}`);
  },
  getSyllabusBySlug(slug = "") {
    return axiosInstance.get(`/syllabus/${slug}`);
  },
};

export const getSyllabusByID = async (id: number) => {
  return handleResponse(
    await axiosInstance.get(getRouteWithId(API_LIST.VIEW_SYLLABUS_DETAIL, id))
  );
};

export const getUnitByID = async (id: number) => {
  return handleResponse(
    await axiosInstance.get(getRouteWithId(API_LIST.VIEW_UNIT_DETAIL, id))
  );
};
export const getContentByID = async (id: number) => {
  return handleResponse(
    await axiosInstance.get(getRouteWithId(API_LIST.VIEW_CONTENT_DETAIL, id))
  );
};
