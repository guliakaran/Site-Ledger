import { STORAGE_KEYS } from '../constants/storage';
import { storageService } from './storageService';
import { authApi } from '../api/authApi';
import { setAuthToken } from '../api/axiosInstance';

export const authService = {
  async persistSession(session) {
    await storageService.setJSON(STORAGE_KEYS.SESSION, session);
    if (session?.user) {
      await storageService.setJSON(STORAGE_KEYS.USER_PROFILE, session.user);
    }
    setAuthToken(session?.token || null);
  },

  async restoreSession() {
    const session = await storageService.getJSON(STORAGE_KEYS.SESSION, null);
    if (session?.token) {
      setAuthToken(session.token);
    }
    return session;
  },

  async clearSession() {
    await storageService.removeItem(STORAGE_KEYS.SESSION);
    setAuthToken(null);
  },

  login(credentials) {
    return authApi.login(credentials);
  },

  forgotPassword(payload) {
    return authApi.forgotPassword(payload);
  },

  logout() {
    return authApi.logout().catch(() => ({ success: true }));
  },
};
