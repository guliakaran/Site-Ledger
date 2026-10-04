import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export const userApi = {
  fetchProfile() {
    return axiosInstance.get(ENDPOINTS.PROFILE).then((res) => res.data);
  },
  updateProfile(payload) {
    return axiosInstance.put(ENDPOINTS.PROFILE, payload).then((res) => res.data);
  },
  updateSettings(payload) {
    return axiosInstance.put(ENDPOINTS.SETTINGS, payload).then((res) => res.data);
  },
  fetchNotifications() {
    return axiosInstance.get(ENDPOINTS.NOTIFICATIONS).then((res) => res.data);
  },
};
