import axios, { AxiosError, AxiosInstance } from 'axios';
import { dropToken, getToken } from './token';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;
const AUTH_HEADER = 'X-Token';
const UNAUTHORIZED_STATUS = 401;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers[AUTH_HEADER] = token;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === UNAUTHORIZED_STATUS) {
        dropToken();
      }
      return Promise.reject(error);
    }
  );

  return api;
};
