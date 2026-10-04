import { createSelector } from '@reduxjs/toolkit';
import { PROJECT_STATUS } from '../../constants/app';
import {
  calculateProjectExpenses,
  calculateProjectMargin,
  calculateProjectProfit,
  calculateProjectRevenue,
} from '../../utils/financial';

export const selectProjects = (state) => state.projects.items;
export const selectSelectedProject = (state) => state.projects.selectedProject;
export const selectProjectLoading = (state) => state.projects.loading;

export const selectActiveProjects = createSelector([selectProjects], (projects) =>
  projects.filter((project) => project.status === PROJECT_STATUS.ONGOING),
);

export const selectProjectById = (projectId) =>
  createSelector([selectProjects], (projects) => projects.find((project) => project.id === projectId) || null);

export const selectProjectFinancials = (projectId) =>
  createSelector(
    [(state) => state.transactions.items],
    (transactions) => ({
      revenue: calculateProjectRevenue(transactions, projectId),
      expenses: calculateProjectExpenses(transactions, projectId),
      profit: calculateProjectProfit(transactions, projectId),
      margin: calculateProjectMargin(transactions, projectId),
    }),
  );
