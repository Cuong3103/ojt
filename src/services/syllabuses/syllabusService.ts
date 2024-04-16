import axiosInstance from "@/lib/axios";
import {
  API_LIST,
  getRoute,
  getRoutePagination,
  getRouteWithId,
} from "@/utils/constants";
import { handleResponse } from "../base.service";
import { Syllabus } from "@/types/syllabus.type";
import { Unit } from "@/types/models/unit.model.type";
import { Content } from "@/types/models/user.model.type";

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
export const createSyllabusAPI = async (syllabus: Syllabus) => {
  return handleResponse(
    await axiosInstance.post(getRoute(API_LIST.CREATE_SYLLABUS), syllabus)
  );
};

export const createUnitAPI = async (unit: Unit) => {
  return handleResponse(
    await axiosInstance.post(getRoute(API_LIST.CREATE_UNIT), unit)
  );
};
export const createContentAPI = async (content: Content) => {
  return handleResponse(
    await axiosInstance.post(getRoute(API_LIST.CREATE_CONTENT), content)
  );
};
export const deleteSyllabus = async (syllabusId: number) => {
  const deleteUrl = API_LIST.DELETE_SYLLABUS + `/${syllabusId}`;
  return handleResponse(await axiosInstance.delete(getRoute(deleteUrl)));
};
