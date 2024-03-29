import axiosInstance from "@/lib/axios";

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
