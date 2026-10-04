import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export const reportApi = {
  fetchReports(params) {
    return axiosInstance.get(ENDPOINTS.REPORTS, { params }).then((res) => res.data);
  },
};
