import axiosInstance from "@/lib/axios";
import { handleResponse } from "../base.service";
import { API_LIST, getRoute, getRouteWithId } from "@/utils/constants";
import axios from "axios";

export const programService = {
  getProgram(query = "") {
    return axiosInstance.get(`/trainingProgram${query}`);
  },
  getProgramBySlug(slug = "") {
    return axiosInstance.get(`/trainingProgram/${slug}`);
  },
  postTrainingProgram(payload = {}) {
    return axiosInstance.post(`/trainingProgram`, payload);
  },
  getProgramBySearch(query = "") {
    return axiosInstance.get(`/trainingProgram/search/${query}`);
  },
};

export const uploadProgramsService = async (formData: FormData) => {
  return handleResponse(
    await axiosInstance.post(getRoute(API_LIST.UPLOAD_PROGRAMS_CSV), formData)
  );
};

export const uploadSyllabusService = async (formData: FormData) => {
  return handleResponse(
    await axiosInstance.post(getRoute(API_LIST.UPLOAD_SYLLABUS_CSV), formData)
  );
};

export const getProgramById = async (id: number) => {
  return handleResponse(
    await axiosInstance.get(getRouteWithId(API_LIST.TRAINING_PROGRAM, id))
  );
};

export const createProgramService = async (payload: any) => {
  return handleResponse(
    await axiosInstance.post(
      getRoute(API_LIST.TRAINING_PROGRAM),
      JSON.stringify(payload)
    )
  );
};
