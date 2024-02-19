export const LOGIN_FLAG = "login";

export const BASE_API_URL = "http://localhost:300/api/v1";
export enum API_LIST {
  LOGIN = "/login",
  REFRESH_TOKEN = "/refresh",
}

export const getRoute = (route: API_LIST) => BASE_API_URL + route;

export const minutesToMiliseconds = (minute: number) => minute * 60 * 1000;
