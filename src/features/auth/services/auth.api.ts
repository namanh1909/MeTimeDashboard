import {
  loginRequestType,
  LoginResponseType,
  logoutRequestType,
  LogoutResponseType,
} from './type';
import axiosClient from '@/apis/axios-client';

const baseUrl = 'auth';

const authApi = {
  login: (params: loginRequestType): Promise<LoginResponseType> =>
    axiosClient.post(`${baseUrl}/login`, params),
  logout: (params: logoutRequestType): Promise<LogoutResponseType> =>
    axiosClient.post(`${baseUrl}/logout`, params),
};

export default authApi;
