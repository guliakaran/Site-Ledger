import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { transactionApi } from '../../api/transactionApi';
import { STORAGE_KEYS } from '../../constants/storage';
import { storageService } from '../../services/storageService';

async function cacheTransactions(items) {
  await storageService.setJSON(STORAGE_KEYS.TRANSACTIONS, items);
}

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (params, { rejectWithValue }) => {
    try {
      const items = await transactionApi.fetchTransactions(params);
      await cacheTransactions(items);
      return items;
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to load transactions.');
    }
  },
);

export const addRevenue = createAsyncThunk('transactions/addRevenue', async (payload, { getState, rejectWithValue }) => {
  try {
    const item = await transactionApi.addRevenue(payload);
    await cacheTransactions([item, ...getState().transactions.items]);
    return item;
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to add revenue.');
  }
});

export const addExpense = createAsyncThunk('transactions/addExpense', async (payload, { getState, rejectWithValue }) => {
  try {
    const item = await transactionApi.addExpense(payload);
    await cacheTransactions([item, ...getState().transactions.items]);
    return item;
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to add expense.');
  }
});

export const deleteTransaction = createAsyncThunk(
  'transactions/deleteTransaction',
  async (id, { rejectWithValue }) => {
    try {
      await transactionApi.deleteTransaction(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to delete transaction.');
    }
  },
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: {
    items: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    hydrateTransactions(state, action) {
      state.items = action.payload || [];
    },
    clearTransactionStatus(state) {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addRevenue.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
        state.success = 'Revenue added.';
      })
      .addCase(addRevenue.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
        state.success = 'Expense added.';
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { hydrateTransactions, clearTransactionStatus } = transactionSlice.actions;
export default transactionSlice.reducer;
