import { configureStore } from '@reduxjs/toolkit';
import { ENV } from '../config/env';
import { initMockStore } from '../api/mockStore';
import { setUnauthorizedHandler } from '../api/axiosInstance';
import { STORAGE_KEYS } from '../constants/storage';
import { authService } from '../services/authService';
import { storageService } from '../services/storageService';
import authReducer, { forceLogout, markBootstrapped, restoreSession } from './slices/authSlice';
import userReducer, { hydrateProfile } from './slices/userSlice';
import projectReducer, { fetchProjects, hydrateProjects } from './slices/projectSlice';
import partnerReducer, {
  fetchPartners,
  fetchProjectPartners,
  hydratePartners,
  hydrateProjectPartners,
} from './slices/partnerSlice';
import transactionReducer, { fetchTransactions, hydrateTransactions } from './slices/transactionSlice';
import reportReducer, { hydrateReports } from './slices/reportSlice';
import notificationReducer, { fetchNotifications, hydrateNotifications } from './slices/notificationSlice';
import settingsReducer, { hydrateSettings } from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    projects: projectReducer,
    partners: partnerReducer,
    transactions: transactionReducer,
    reports: reportReducer,
    notifications: notificationReducer,
    settings: settingsReducer,
  },
});

setUnauthorizedHandler(async () => {
  await authService.clearSession();
  store.dispatch(forceLogout());
});

export async function bootstrapApp() {
  try {
    if (ENV.USE_MOCK) {
      await initMockStore();
    }

    const [session, settings, profile, projects, partners, projectPartners, transactions, reports, notifications] =
      await Promise.all([
        authService.restoreSession(),
        storageService.getJSON(STORAGE_KEYS.SETTINGS, null),
        storageService.getJSON(STORAGE_KEYS.USER_PROFILE, null),
        storageService.getJSON(STORAGE_KEYS.PROJECTS, null),
        storageService.getJSON(STORAGE_KEYS.PARTNERS, null),
        storageService.getJSON(STORAGE_KEYS.PROJECT_PARTNERS, null),
        storageService.getJSON(STORAGE_KEYS.TRANSACTIONS, null),
        storageService.getJSON(STORAGE_KEYS.REPORTS, null),
        storageService.getJSON(STORAGE_KEYS.NOTIFICATIONS, null),
      ]);

    if (settings) {
      store.dispatch(hydrateSettings(settings));
    }
    if (profile) {
      store.dispatch(hydrateProfile(profile));
    }
    if (projects) {
      store.dispatch(hydrateProjects(projects));
    }
    if (partners) {
      store.dispatch(hydratePartners(partners));
    }
    if (projectPartners) {
      store.dispatch(hydrateProjectPartners(projectPartners));
    }
    if (transactions) {
      store.dispatch(hydrateTransactions(transactions));
    }
    if (reports) {
      store.dispatch(hydrateReports(reports));
    }
    if (notifications) {
      store.dispatch(hydrateNotifications(notifications));
    }

    if (session?.token) {
      store.dispatch(restoreSession(session));
      store.dispatch(fetchProjects());
      store.dispatch(fetchPartners());
      store.dispatch(fetchProjectPartners());
      store.dispatch(fetchTransactions());
      store.dispatch(fetchNotifications());
    } else {
      store.dispatch(markBootstrapped());
    }
  } catch (error) {
    store.dispatch(markBootstrapped());
  }
}
