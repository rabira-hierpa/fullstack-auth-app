import { User } from "../../../shared/lib/models";
import { httpService } from "../../../shared/lib/services";
import { accountEndpoint } from "./api.endpoint";

const handleResponse = (response: any) => response?.data;

const handleError = (error: any) => {
  console.error("API call failed. Error: ", error);
  throw error;
};

export const loginApi = (email: string, password: string) => {
  return httpService
    .post(accountEndpoint.login, { email, password })
    .then(handleResponse)
    .catch(handleError);
};

export const registerApi = async (user: User) => {
  try {
    const response = await httpService.post(accountEndpoint.register, user);
    return handleResponse(response);
  } catch (error) {
    handleError(error);
  }
};
