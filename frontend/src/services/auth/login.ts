import { API_END_POINTS } from '@/utils/constants/ApiEndPoints';
import HTTPService from '../api';
import { IApiRes } from '../ActionType';

export const loginAPI = (body: {
  email: string;
  password: string;
}): Promise<ILoginAPI> => {
  return HTTPService.post(API_END_POINTS.USER.LOGIN, body);
};

interface ILoginAPI extends IApiRes {
  data: ILoginData;
}

interface ILoginData {
  userId: string;
  name: string;
  email: string;
  role: string;
  token: string;
}
