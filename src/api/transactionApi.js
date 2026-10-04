import axiosInstance from './axiosInstance';
import { ENDPOINTS } from './endpoints';

export const transactionApi = {
  fetchTransactions(params) {
    return axiosInstance.get(ENDPOINTS.TRANSACTIONS, { params }).then((res) => res.data);
  },
  addRevenue(payload) {
    return axiosInstance.post(ENDPOINTS.TRANSACTIONS, { ...payload, type: 'revenue' }).then((res) => res.data);
  },
  addExpense(payload) {
    return axiosInstance.post(ENDPOINTS.TRANSACTIONS, { ...payload, type: 'expense' }).then((res) => res.data);
  },
  deleteTransaction(id) {
    return axiosInstance.delete(ENDPOINTS.TRANSACTION(id)).then((res) => res.data);
  },
};
