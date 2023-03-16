import { AxiosError } from "axios"

export interface IResponseData {
  message: string;
}

export const prepareErrorResponseMessage = (error: AxiosError<IResponseData>) => {
  return error.response?.data.message || error.message || error.toString();
}