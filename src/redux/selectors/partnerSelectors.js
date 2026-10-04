import { createSelector } from '@reduxjs/toolkit';
import {
  calculatePartnerInvestment,
  calculatePartnerLoss,
  calculatePartnerProfit,
  calculatePartnerShare,
} from '../../utils/financial';

export const selectPartners = (state) => state.partners.items;
export const selectProjectPartners = (state) => state.partners.projectPartners;
export const selectSelectedPartner = (state) => state.partners.selectedPartner;

export const selectPartnerById = (partnerId) =>
  createSelector([selectPartners], (partners) => partners.find((partner) => partner.id === partnerId) || null);

export const selectAssignmentsForProject = (projectId) =>
  createSelector([selectProjectPartners], (items) => items.filter((item) => item.projectId === projectId));

export const selectAssignmentsForPartner = (partnerId) =>
  createSelector([selectProjectPartners], (items) => items.filter((item) => item.partnerId === partnerId));

export const selectPartnerFinancials = (partnerId) =>
  createSelector(
    [(state) => state.transactions.items, selectProjectPartners],
    (transactions, projectPartners) => ({
      investment: calculatePartnerInvestment(projectPartners, partnerId),
      profit: calculatePartnerProfit(transactions, projectPartners, partnerId),
      loss: calculatePartnerLoss(transactions, projectPartners, partnerId),
      net: calculatePartnerShare(transactions, projectPartners, partnerId),
    }),
  );
