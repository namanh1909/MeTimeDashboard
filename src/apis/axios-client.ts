/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'react-hot-toast';

import { LOGIN_PATH } from '@/data';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string | null) => void;
  reject: (error: null | undefined) => void;
}[] = [];

const processQueue = (error: null | undefined, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // Cast config to InternalAxiosRequestConfig
    const internalConfig = config as InternalAxiosRequestConfig;
    // Do something before request is sent
    const token = localStorage.getItem('token');
    if (token && internalConfig.headers) {
      internalConfig.headers['Authorization'] = 'Bearer ' + token;
    }

    return internalConfig;
  },
  function (error: AxiosError) {
    // Do something with request error
    toast.error('Request error: ' + error.message);
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Return the response data as is

    // Return the modified response
    return response?.data;
  },
  function (error: AxiosError) {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<string | null>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
            }
            return axiosClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');
      return new Promise((resolve, reject) => {
        axios
          .post(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
            token: refreshToken,
          })
          .then(({ data }) => {
            localStorage.setItem('token', data?.token as string);
            axiosClient.defaults.headers.common['Authorization'] =
              'Bearer ' + data.token;
            processQueue(null, data.token as string);
            resolve(axiosClient(originalRequest));
          })
          .catch((err) => {
            processQueue(err as null, null);
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            window.location.replace(LOGIN_PATH);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    toast.error('Response error: ' + error.message);
    return Promise.reject({
      success: false,
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
    });
  },
);

export default axiosClient;
