import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { reportApi } from '../../api/reportApi';
import { STORAGE_KEYS } from '../../constants/storage';
import { storageService } from '../../services/storageService';
import { getDateRange } from '../../utils/date';
import {
  calculateMonthlyFinancials,
  calculateRangeFinancials,
  calculateYearlyExpenses,
  calculateYearlyProfit,
  calculateYearlyRevenue,
} from '../../utils/financial';

export const fetchReports = createAsyncThunk('reports/fetchReports', async (params, { getState, rejectWithValue }) => {
  try {
    const apiMeta = await reportApi.fetchReports(params);
    const state = getState();
    const transactions = state.transactions.items;
    const projects = state.projects.items;
    const partners = state.partners.items;
    const projectPartners = state.partners.projectPartners;
    const preset = params?.preset || 'this_year';
    const range = getDateRange(preset, params?.startDate, params?.endDate);
    const rangeTotals = calculateRangeFinancials(transactions, range.start, range.end);
    const year = range.start.year();

    const yearly = {
      year,
      revenue: calculateYearlyRevenue(transactions, year),
      expenses: calculateYearlyExpenses(transactions, year),
      profit: calculateYearlyProfit(transactions, year),
      monthly: calculateMonthlyFinancials(transactions, year),
    };

    const projectWise = projects.map((project) => {
      const scoped = rangeTotals.transactions.filter((tx) => tx.projectId === project.id);
      const revenue = scoped.filter((tx) => tx.type === 'revenue').reduce((sum, tx) => sum + Number(tx.amount), 0);
      const expenses = scoped.filter((tx) => tx.type === 'expense').reduce((sum, tx) => sum + Number(tx.amount), 0);
      return {
        projectId: project.id,
        name: project.name,
        revenue,
        expenses,
        profit: revenue - expenses,
      };
    });

    const partnerWise = partners.map((partner) => {
      const assignments = projectPartners.filter((item) => item.partnerId === partner.id);
      const investment = assignments.reduce((sum, item) => sum + Number(item.investment || 0), 0);
      const share = assignments.reduce((sum, assignment) => {
        const project = projectWise.find((item) => item.projectId === assignment.projectId);
        return sum + (project ? project.profit * (Number(assignment.profitSharePercentage) / 100) : 0);
      }, 0);
      return {
        partnerId: partner.id,
        name: partner.name,
        investment,
        profit: Math.max(0, share),
        loss: Math.abs(Math.min(0, share)),
        net: share,
      };
    });

    const payload = {
      preset,
      range: { start: range.start.toISOString(), end: range.end.toISOString() },
      yearly,
      partnerWise,
      projectWise,
      totals: rangeTotals,
      meta: apiMeta,
    };
    await storageService.setJSON(STORAGE_KEYS.REPORTS, payload);
    return payload;
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to load reports.');
  }
});

const reportSlice = createSlice({
  name: 'reports',
  initialState: {
    yearly: {},
    partnerWise: {},
    projectWise: {},
    totals: {},
    preset: 'this_year',
    range: null,
    loading: false,
    error: null,
  },
  reducers: {
    hydrateReports(state, action) {
      if (!action.payload) {
        return;
      }
      state.yearly = action.payload.yearly || {};
      state.partnerWise = action.payload.partnerWise || {};
      state.projectWise = action.payload.projectWise || {};
      state.totals = action.payload.totals || {};
      state.preset = action.payload.preset || 'this_year';
      state.range = action.payload.range || null;
    },
    setReportPreset(state, action) {
      state.preset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReports.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.loading = false;
        state.yearly = action.payload.yearly;
        state.partnerWise = action.payload.partnerWise;
        state.projectWise = action.payload.projectWise;
        state.totals = action.payload.totals;
        state.preset = action.payload.preset;
        state.range = action.payload.range;
      })
      .addCase(fetchReports.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { hydrateReports, setReportPreset } = reportSlice.actions;
export default reportSlice.reducer;
