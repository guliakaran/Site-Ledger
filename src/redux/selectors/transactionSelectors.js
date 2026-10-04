import { createSelector } from '@reduxjs/toolkit';
import moment from 'moment';
import {
  calculateTotalExpenses,
  calculateTotalProfit,
  calculateTotalRevenue,
} from '../../utils/financial';

export const selectTransactions = (state) => state.transactions.items;
export const selectTransactionLoading = (state) => state.transactions.loading;

export const selectTransactionsByProject = (projectId) =>
  createSelector([selectTransactions], (items) =>
    items.filter((item) => item.projectId === projectId).sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()),
  );

export const selectRecentTransactions = createSelector([selectTransactions], (items) =>
  [...items].sort((a, b) => moment(b.date).valueOf() - moment(a.date).valueOf()).slice(0, 8),
);

export const selectTotals = createSelector([selectTransactions], (items) => ({
  revenue: calculateTotalRevenue(items),
  expenses: calculateTotalExpenses(items),
  profit: calculateTotalProfit(items),
}));
