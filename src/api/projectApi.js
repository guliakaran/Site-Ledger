import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export const projectApi = {
  fetchProjects() {
    return axiosInstance.get(ENDPOINTS.PROJECTS).then((res) => res.data);
  },
  fetchProject(id) {
    return axiosInstance.get(ENDPOINTS.PROJECT(id)).then((res) => res.data);
  },
  createProject(payload) {
    return axiosInstance.post(ENDPOINTS.PROJECTS, payload).then((res) => res.data);
  },
  updateProject(id, payload) {
    return axiosInstance.put(ENDPOINTS.PROJECT(id), payload).then((res) => res.data);
  },
  deleteProject(id) {
    return axiosInstance.delete(ENDPOINTS.PROJECT(id)).then((res) => res.data);
  },
};
