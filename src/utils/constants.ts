export const LOGIN_FLAG = "login";

export const BASE_API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/api/v1"
    : "http://34.101.243.11:8081/api/v1";

export enum API_LIST {
  LOGIN = "/auth/signin",
  REFRESH_TOKEN = "/auth/refresh",
  ADMIN_USER_LIST = "/user/hidden",
  ADMIN_MODIFY_USER = "/user",
  UPDATE_AVATAR = "/user/updateImage",
  CREATE_CLASS = "/class",
}

export enum USER_ROLE {
  ADMIN = "ADMIN",
  TRAINER = "TRAINER",
  USER = "USER",
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

export const getRoute = (route: string) => BASE_API_URL + route;
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
