import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../api/userApi';
import { STORAGE_KEYS } from '../../constants/storage';
import { storageService } from '../../services/storageService';

const defaultSettings = {
  appearance: 'system',
  notifications: true,
  projectUpdates: true,
  expenseReminders: true,
  reportReminders: true,
};

async function persistSettings(settings) {
  await storageService.setJSON(STORAGE_KEYS.SETTINGS, settings);
}

export const updateSettings = createAsyncThunk(
  'settings/updateSettings',
  async (payload, { getState, rejectWithValue }) => {
    try {
      const next = { ...getState().settings, ...payload };
      delete next.loading;
      delete next.error;
      await persistSettings(next);
      await userApi.updateSettings(next).catch(() => next);
      return next;
    } catch (error) {
      return rejectWithValue(error.message || 'Unable to update settings.');
    }
  },
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    ...defaultSettings,
    loading: false,
    error: null,
  },
  reducers: {
    hydrateSettings(state, action) {
      const incoming = action.payload || {};
      state.appearance = incoming.appearance || state.appearance;
      state.notifications = incoming.notifications ?? state.notifications;
      state.projectUpdates = incoming.projectUpdates ?? state.projectUpdates;
      state.expenseReminders = incoming.expenseReminders ?? state.expenseReminders;
      state.reportReminders = incoming.reportReminders ?? state.reportReminders;
    },
    setAppearanceLocal(state, action) {
      state.appearance = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.appearance = action.payload.appearance;
        state.notifications = action.payload.notifications;
        state.projectUpdates = action.payload.projectUpdates;
        state.expenseReminders = action.payload.expenseReminders;
        state.reportReminders = action.payload.reportReminders;
      })
      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { hydrateSettings, setAppearanceLocal } = settingsSlice.actions;
export default settingsSlice.reducer;
export { defaultSettings };
