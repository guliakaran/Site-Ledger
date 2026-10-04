/**
 * SiteLedger API configuration.
 *
 * Change these values to point at a live backend.
 * See .env.example for the intended environment variables.
 */
export const API = {
  BASE_URL: 'https://api.siteledger.app/v1',
  TIMEOUT: 15000,
  USE_MOCK: true,
};

export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  SERVER_ERROR: 500,
};
