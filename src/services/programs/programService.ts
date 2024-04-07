import axiosInstance from "@/lib/axios";
import { handleResponse } from "../base.service";
import { API_LIST, getRoute } from "@/utils/constants";

export const programService = {
  getProgram(query = "") {
    return axiosInstance.get(`/trainingProgram${query}`);
  },
  getProgramBySlug(slug = "") {
    return axiosInstance.get(`/trainingProgram/${slug}`);
  },
  postTrainingProgram(payload = {}){
    return axiosInstance.post(`/trainingProgram`, payload);
  },
  getProgramBySearch(query =''){
    return axiosInstance.get(`/trainingProgram/search/${query}`);
  }
};

export const uploadProgramsService = async (formData: FormData) => {
  return handleResponse(
    await axiosInstance.post(getRoute(API_LIST.UPLOAD_PROGRAMS_CSV), formData)
  )  
}