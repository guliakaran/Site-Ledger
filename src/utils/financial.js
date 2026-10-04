import moment from 'moment';
import { TRANSACTION_TYPE } from '../constants/app';

function isRevenue(tx) {
  return tx.type === TRANSACTION_TYPE.REVENUE;
}

function isExpense(tx) {
  return tx.type === TRANSACTION_TYPE.EXPENSE;
}

function sumBy(items, predicate) {
  return items.reduce((total, item) => (predicate(item) ? total + Number(item.amount || 0) : total), 0);
}

export function calculateProjectRevenue(transactions, projectId) {
  return sumBy(transactions, (tx) => isRevenue(tx) && tx.projectId === projectId);
}

export function calculateProjectExpenses(transactions, projectId) {
  return sumBy(transactions, (tx) => isExpense(tx) && tx.projectId === projectId);
}

export function calculateProjectProfit(transactions, projectId) {
  return calculateProjectRevenue(transactions, projectId) - calculateProjectExpenses(transactions, projectId);
}

export function calculateProjectMargin(transactions, projectId) {
  const revenue = calculateProjectRevenue(transactions, projectId);
  if (revenue <= 0) {
    return 0;
  }
  return (calculateProjectProfit(transactions, projectId) / revenue) * 100;
}

export function calculateTotalRevenue(transactions) {
  return sumBy(transactions, isRevenue);
}

export function calculateTotalExpenses(transactions) {
  return sumBy(transactions, isExpense);
}

export function calculateTotalProfit(transactions) {
  return calculateTotalRevenue(transactions) - calculateTotalExpenses(transactions);
}

export function calculatePartnerInvestment(projectPartners, partnerId) {
  return projectPartners
    .filter((item) => item.partnerId === partnerId)
    .reduce((total, item) => total + Number(item.investment || 0), 0);
}

export function calculatePartnerShare(transactions, projectPartners, partnerId) {
  return projectPartners
    .filter((item) => item.partnerId === partnerId)
    .reduce((total, assignment) => {
      const profit = calculateProjectProfit(transactions, assignment.projectId);
      return total + profit * (Number(assignment.profitSharePercentage || 0) / 100);
    }, 0);
}

export function calculatePartnerProfit(transactions, projectPartners, partnerId) {
  return Math.max(0, calculatePartnerShare(transactions, projectPartners, partnerId));
}

export function calculatePartnerLoss(transactions, projectPartners, partnerId) {
  return Math.abs(Math.min(0, calculatePartnerShare(transactions, projectPartners, partnerId)));
}

export function filterByYear(transactions, year) {
  return transactions.filter((tx) => moment(tx.date).year() === Number(year));
}

export function calculateYearlyRevenue(transactions, year) {
  return calculateTotalRevenue(filterByYear(transactions, year));
}

export function calculateYearlyExpenses(transactions, year) {
  return calculateTotalExpenses(filterByYear(transactions, year));
}

export function calculateYearlyProfit(transactions, year) {
  return calculateYearlyRevenue(transactions, year) - calculateYearlyExpenses(transactions, year);
}

export function calculateMonthlyFinancials(transactions, year) {
  const months = Array.from({ length: 12 }, (_, index) => ({
    month: index,
    revenue: 0,
    expenses: 0,
    profit: 0,
  }));

  transactions.forEach((tx) => {
    const date = moment(tx.date);
    if (date.year() !== Number(year)) {
      return;
    }
    const bucket = months[date.month()];
    const amount = Number(tx.amount || 0);
    if (isRevenue(tx)) {
      bucket.revenue += amount;
    } else if (isExpense(tx)) {
      bucket.expenses += amount;
    }
    bucket.profit = bucket.revenue - bucket.expenses;
  });

  return months;
}

export function calculateRangeFinancials(transactions, start, end) {
  const inRange = transactions.filter((tx) => moment(tx.date).isBetween(start, end, 'day', '[]'));
  const revenue = calculateTotalRevenue(inRange);
  const expenses = calculateTotalExpenses(inRange);
  return {
    revenue,
    expenses,
    profit: revenue - expenses,
    margin: revenue > 0 ? (revenue - expenses) / revenue * 100 : 0,
    transactions: inRange,
  };
}

export const financialService = {
  calculateProjectRevenue,
  calculateProjectExpenses,
  calculateProjectProfit,
  calculateProjectMargin,
  calculateTotalRevenue,
  calculateTotalExpenses,
  calculateTotalProfit,
  calculatePartnerInvestment,
  calculatePartnerProfit,
  calculatePartnerLoss,
  calculatePartnerShare,
  calculateYearlyRevenue,
  calculateYearlyExpenses,
  calculateYearlyProfit,
  calculateMonthlyFinancials,
  calculateRangeFinancials,
};
