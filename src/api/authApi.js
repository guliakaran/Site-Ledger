import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export const authApi = {
  login(credentials) {
    return axiosInstance.post(ENDPOINTS.LOGIN, credentials).then((res) => res.data);
  },
  forgotPassword(payload) {
    return axiosInstance.post(ENDPOINTS.FORGOT_PASSWORD, payload).then((res) => res.data);
  },
  logout() {
    return axiosInstance.post(ENDPOINTS.LOGOUT).then((res) => res.data);
  },
};
