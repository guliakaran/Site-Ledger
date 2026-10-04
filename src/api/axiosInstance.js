import axios from 'axios';
import { ENV } from '../config/env';
import { HTTP_STATUS } from '../constants/api';
import { ENDPOINTS } from './endpoints';
import { handleMockRequest } from './mockHandler';

let authToken = null;
let unauthorizedHandler = null;

export function setAuthToken(token) {
  authToken = token || null;
}

export function getAuthToken() {
  return authToken;
}

export function setUnauthorizedHandler(handler) {
  unauthorizedHandler = handler;
}

export function getFriendlyApiError(error) {
  if (error?.isFriendly) {
    return error;
  }

  const status = error?.response?.status || error?.status;
  const serverMessage = error?.response?.data?.message;

  let message = 'Something went wrong. Please try again.';
  if (error?.code === 'ECONNABORTED' || /timeout/i.test(error?.message || '')) {
    message = 'The request timed out. Check your connection and try again.';
  } else if (!error?.response && error?.request) {
    message = 'Unable to reach the server. Check your internet connection.';
  } else if (status === HTTP_STATUS.BAD_REQUEST) {
    message = serverMessage || 'The request could not be processed.';
  } else if (status === HTTP_STATUS.UNAUTHORIZED) {
    message = serverMessage || 'Your session has expired. Please log in again.';
  } else if (status === HTTP_STATUS.FORBIDDEN) {
    message = serverMessage || 'You do not have permission to do that.';
  } else if (status === HTTP_STATUS.NOT_FOUND) {
    message = serverMessage || 'The requested record was not found.';
  } else if (status === HTTP_STATUS.UNPROCESSABLE) {
    message = serverMessage || 'Please check the form and try again.';
  } else if (status === HTTP_STATUS.SERVER_ERROR) {
    message = 'The server is unavailable right now. Try again shortly.';
  } else if (serverMessage) {
    message = serverMessage;
  }

  const friendly = new Error(message);
  friendly.isFriendly = true;
  friendly.status = status;
  return friendly;
}

const axiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: ENV.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

if (ENV.USE_MOCK) {
  axiosInstance.defaults.adapter = async (config) => {
    try {
      const result = await handleMockRequest(config);
      return {
        ...result,
        config,
        headers: result.headers || {},
        request: {},
      };
    } catch (error) {
      error.config = config;
      throw error;
    }
  };
}

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status || error?.status;
    const url = error?.config?.url || '';
    const isAuthRoute = url.includes(ENDPOINTS.LOGIN) || url.includes(ENDPOINTS.FORGOT_PASSWORD);

    if (status === HTTP_STATUS.UNAUTHORIZED && !isAuthRoute && unauthorizedHandler) {
      await unauthorizedHandler();
    }

    return Promise.reject(getFriendlyApiError(error));
  },
);

export default axiosInstance;
