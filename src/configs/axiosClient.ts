import axios, { AxiosInstance } from 'axios';
import { getCookie } from 'cookies-next';
import queryString from 'query-string';

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => {
    for (const key in params) {
      params[key] = JSON.stringify(params[key]);
    }
    return queryString.stringify(params);
  },
});

axiosClient.interceptors.request.use(async (config: any) => {
  const authCookie = getCookie('auth') || '';
  const authParse = JSON.parse(authCookie);
  const accessToken = authParse?.state?.auth?.accessToken;

  if (accessToken) {
    config.headers.Authorization = 'Bearer ' + accessToken;
    return config;
  }

  return config;
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: any) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error: any) {
    return Promise.reject(error);
  },
);

export default axiosClient;
