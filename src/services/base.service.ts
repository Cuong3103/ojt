import { HTTP_CODE } from "@/utils/constants";
import { AxiosResponse } from "axios";

export const handleResponse = (response: AxiosResponse) => {
  const handlers = {
    [HTTP_CODE.OK]: () => response.data,
    [HTTP_CODE.CREATED]: () => response.data,
    [HTTP_CODE.ACCEPTED]: () => response.data,
    [HTTP_CODE.BAD_REQUEST]: () => { throw new Error(response.data.details[0]); },
    [HTTP_CODE.NOT_FOUND]: () => { throw new Error('Requested resource is currently not found') },
    [HTTP_CODE.FORBIDDEN]: () => { throw new Error('There is something wrong with the response'); },
  };

  const handler = handlers[response.status] || (() => { throw new Error('Invalid HTTP code'); });
  return handler();
};
