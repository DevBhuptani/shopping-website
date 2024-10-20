import store from '@/store';
import { setLogin } from '@/store/slices/authSlice';
import { cookieKeys } from '@/utils/constants/constants';
import { environment } from '@/utils/constants/environment';
import { STATUS_CODE } from '@/utils/constants/StatusCode';
import {
  getDecryptedCookie,
  removedCookie,
} from '@/utils/functions/commonFunctions';
import axios, { AxiosResponse } from 'axios';
import toast from 'react-hot-toast';

const handleBaseUrl = () => {
  const url = environment.domainUrl;
  return url;
};

const checkInternetConnectivity = () => {
  return typeof navigator !== 'undefined' && navigator.onLine;
};

export const axiosInstance = axios.create({
  baseURL: handleBaseUrl(),
});

const errorInterceptor = (errorResponse: any) => {
  if (errorResponse) {
    const { status, message } = errorResponse.data;
    if (
      status === STATUS_CODE.unauthorized ||
      status === STATUS_CODE.not_acceptable
    ) {
      toast.error(message);
      store.dispatch(setLogin(false));
      removedCookie(cookieKeys.cookieUser);
      removedCookie(cookieKeys.publicKey);
      localStorage.clear();
    }
  }
};

axiosInstance.interceptors.request.use(
  (request) => {
    if (!checkInternetConnectivity) {
      return Promise.reject(new Error('No Internet Connection'));
    }
    const cookie = getDecryptedCookie(cookieKeys.cookieUser);
    if (cookie?.token) {
      request.headers.Authorization = `Bearer ${cookie.token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (request) => {
    return request;
  },
  (error) => {
    errorInterceptor(error.response);
    return Promise.reject(error);
  }
);

export default class HTTPService {
  static get<T = never, R = AxiosResponse<T>>(
    url: string,
    params?: any
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get(url, { params })
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response || error));
    });
  }

  static put<T = never, R = AxiosResponse<T>>(
    url: string,
    body: any
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .put(url, body)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response || error));
    });
  }

  static patch<T = never, R = AxiosResponse<T>>(
    url: string,
    body: any
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .patch(url, body)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response || error));
    });
  }

  static post<T = never, R = AxiosResponse<T>>(
    url: string,
    body: any
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post(url, body)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response || error));
    });
  }

  static delete<T = never, R = AxiosResponse<T>>(
    url: string,
    body: any
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .delete(url, body)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response || error));
    });
  }
}
