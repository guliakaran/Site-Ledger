import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../api/userApi';
import { STORAGE_KEYS } from '../../constants/storage';
import { storageService } from '../../services/storageService';

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const items = await userApi.fetchNotifications();
      await storageService.setJSON(STORAGE_KEYS.NOTIFICATIONS, items);
      return items;
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to load notifications.');
    }
  },
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    hydrateNotifications(state, action) {
      state.items = action.payload || [];
    },
    markNotificationRead(state, action) {
      state.items = state.items.map((item) => (item.id === action.payload ? { ...item, read: true } : item));
    },
    addLocalNotification(state, action) {
      state.items = [action.payload, ...state.items];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { hydrateNotifications, markNotificationRead, addLocalNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
