import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userApi } from '../../api/userApi';
import { STORAGE_KEYS } from '../../constants/storage';
import { storageService } from '../../services/storageService';
import { login, logout, restoreSession, forceLogout } from './authSlice';

export const fetchProfile = createAsyncThunk('user/fetchProfile', async (_, { rejectWithValue }) => {
  try {
    const profile = await userApi.fetchProfile();
    await storageService.setJSON(STORAGE_KEYS.USER_PROFILE, profile);
    return profile;
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to load profile.');
  }
});

export const updateProfile = createAsyncThunk('user/updateProfile', async (payload, { rejectWithValue }) => {
  try {
    const profile = await userApi.updateProfile(payload);
    await storageService.setJSON(STORAGE_KEYS.USER_PROFILE, profile);
    return profile;
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to update profile.');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: null,
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    hydrateProfile(state, action) {
      state.profile = action.payload;
    },
    clearUserStatus(state) {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(restoreSession, (state, action) => {
        if (action.payload?.user) {
          state.profile = action.payload.user;
        }
      })
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.user;
      })
      .addCase(logout.fulfilled, (state) => {
        state.profile = null;
        state.error = null;
        state.success = null;
      })
      .addCase(forceLogout, (state) => {
        state.profile = null;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.success = 'Profile updated.';
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { hydrateProfile, clearUserStatus } = userSlice.actions;
export default userSlice.reducer;
