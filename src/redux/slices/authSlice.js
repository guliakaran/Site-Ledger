import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../../constants/storage';
import { authService } from '../../services/authService';
import { storageService } from '../../services/storageService';
import { setAuthToken } from '../../api/axiosInstance';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const data = await authService.login(credentials);
    await authService.persistSession({ token: data.token, user: data.user });
    return data;
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to log in.');
  }
});

export const forgotPassword = createAsyncThunk('auth/forgotPassword', async (payload, { rejectWithValue }) => {
  try {
    return await authService.forgotPassword(payload);
  } catch (error) {
    return rejectWithValue(error.message || 'Unable to send reset instructions.');
  }
});

export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
  await authService.clearSession();
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    bootstrapped: false,
    forgotMessage: null,
  },
  reducers: {
    restoreSession(state, action) {
      const session = action.payload;
      state.user = session?.user || null;
      state.token = session?.token || null;
      state.isAuthenticated = Boolean(session?.token);
      state.bootstrapped = true;
      state.loading = false;
      state.error = null;
      setAuthToken(session?.token || null);
    },
    clearAuthError(state) {
      state.error = null;
      state.forgotMessage = null;
    },
    markBootstrapped(state) {
      state.bootstrapped = true;
      state.loading = false;
    },
    forceLogout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      setAuthToken(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unable to log in.';
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.forgotMessage = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.forgotMessage = action.payload?.message || 'Reset instructions sent.';
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unable to send reset instructions.';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { restoreSession, clearAuthError, markBootstrapped, forceLogout } = authSlice.actions;
export default authSlice.reducer;

export async function handleUnauthorized() {
  await storageService.removeItem(STORAGE_KEYS.SESSION);
  setAuthToken(null);
}
