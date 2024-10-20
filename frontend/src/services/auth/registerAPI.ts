import { API_END_POINTS } from '@/utils/constants/ApiEndPoints';
import HTTPService from '../api';
import { IApiRes } from '../ActionType';

export const registerAPI = (body: {
  name: string;
  email: string;
  password: string;
}): Promise<IApiRes> => {
  return HTTPService.post(API_END_POINTS.USER.REGISTER, body);
};
