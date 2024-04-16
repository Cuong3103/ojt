export const LOGIN_FLAG = "login";

export const BASE_API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api/v1"
    : "http://35.185.188.103:8081/api/v1";

export enum API_LIST {
  LOGIN = "/auth/signin",
  REFRESH_TOKEN = "/auth/refresh",
  ADMIN_USER_LIST = "/user/hidden",
  ADMIN_USER_FILTER = "/user/search/hidden",
  ADMIN_MODIFY_USER = "/user",
  UPDATE_AVATAR = "/user/updateImage",
  VIEW_CLASS = "/class",
  CREATE_CLASS = "/class",
  SREACH_CLASS_FOR_USER = "/class/search",
  UPLOAD_PROGRAMS_CSV = "/trainingProgram/updatecsv",
  UPLOAD_SYLLABUS_CSV = "/syllabus/updatecsv",
  TRAINING_PROGRAM = "/trainingProgram",
  VIEW_SYLLABUS_DETAIL = "/syllabus",
  VIEW_UNIT_DETAIL = "/unit",
  VIEW_CONTENT_DETAIL = "/content",
  CREATE_SYLLABUS = "/syllabus",
  CREATE_UNIT = "/unit",
  CREATE_CONTENT = "/content",
  DELETE_SYLLABUS = "/syllabus",
}

export enum USER_ROLE {
  ADMIN = 1,
  TRAINER = 3,
  CLASS_ADMIN = 2,
}

export enum TRAINING_STATUS {
  draft = 0,
  inactive = 1,
  active = 2,
}

export const HTTP_CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export const SUCCESS_HTTP_CODES = [
  HTTP_CODE.OK,
  HTTP_CODE.CREATED,
  HTTP_CODE.ACCEPTED,
];

export const getRoute = (route: string, query?: string) => {
  return !query ? BASE_API_URL + route : BASE_API_URL + route + `?${query}`;
};

export const getRoutePagination = (
  route: API_LIST,
  page?: number,
  limit?: number
): string => {
  let queryParams = "";
  if (page !== undefined && limit !== undefined) {
    queryParams = `?page=${page}&limit=${limit}`;
  }
  return `${BASE_API_URL}${route}${queryParams}`;
};
export const getRouteWithId = (route: string, id: number | string) =>
  getRoute(route) + `/${id}`;

export const minutesToMiliseconds = (minute: number) => minute * 60 * 1000;
