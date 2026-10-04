import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export const partnerApi = {
  fetchPartners() {
    return axiosInstance.get(ENDPOINTS.PARTNERS).then((res) => res.data);
  },
  fetchPartner(id) {
    return axiosInstance.get(ENDPOINTS.PARTNER(id)).then((res) => res.data);
  },
  createPartner(payload) {
    return axiosInstance.post(ENDPOINTS.PARTNERS, payload).then((res) => res.data);
  },
  updatePartner(id, payload) {
    return axiosInstance.put(ENDPOINTS.PARTNER(id), payload).then((res) => res.data);
  },
  deletePartner(id) {
    return axiosInstance.delete(ENDPOINTS.PARTNER(id)).then((res) => res.data);
  },
  fetchProjectPartners(params) {
    return axiosInstance.get(ENDPOINTS.PROJECT_PARTNERS, { params }).then((res) => res.data);
  },
  assignPartner(payload) {
    return axiosInstance.post(ENDPOINTS.PROJECT_PARTNERS, payload).then((res) => res.data);
  },
  updateAssignment(id, payload) {
    return axiosInstance.put(ENDPOINTS.PROJECT_PARTNER(id), payload).then((res) => res.data);
  },
  removeAssignment(id) {
    return axiosInstance.delete(ENDPOINTS.PROJECT_PARTNER(id)).then((res) => res.data);
  },
};
