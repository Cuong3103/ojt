import axiosInstance from "@/lib/axios";

export const syllabusService = {
  getSyllabus(query = "") {
    return axiosInstance.get(`/syllabus${query}`);
  },
  getSyllabusBySlug(slug = "") {
    return axiosInstance.get(`/syllabus/${slug}`);
  },
};
