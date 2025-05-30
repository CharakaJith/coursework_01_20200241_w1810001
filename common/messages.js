module.exports = {
  // database initialization messages
  DATABASE: {
    SYNC: {
      SUCCESS: 'Database synced successfully.',
      FAILED: (error) => `Failed to sync database: ${error.message}`,
    },
  },

  // response payload messages
  RESPONSE: {
    USER: {
      EXISTS: 'User is already registered.',
      INVALID_CRED: 'Invalid user credentials.',
      INVALID_PASSWORD: 'Current password is incorrect.',
      INACTIVE: 'User account is inactive.',
      NOT_FOUND: 'User not found.',
      DEACTIVATED: 'User profile has been permanently deleted.',
      PWD_UPDATED: 'Password updated successfully.',
    },
    COUNTRY: {
      INVALID: 'Country not found.',
    },
    KEY: {
      LIMIT_FULL: 'Maximum number of API keys reached.',
      NOT_FOUND: 'No API keys found.',
      INVALID_ID: 'Invalid API key ID.',
      CANNOT_REVOKE: 'Unable to revoke this API key.',
      REVOKED: 'API key revoked successfully.',
    },
  },

  // validation error messages
  VALIDATE: {
    PARAM: {
      EMPTY: (field) => `The '${field}' field is required.`,
      INVALID: (field) => `Invalid format for '${field}'.`,
    },
  },

  // dao layer error messages
  DAO: {
    FAILED: {
      INSERT: (entity, error) => `Failed to create ${entity}: ${error.message}`,
      UPDATE: (entity, error) => `Failed to update ${entity}: ${error.message}`,
      DELETE: (entity, error) => `Failed to delete ${entity}: ${error.message}`,
      GET: {
        BY_ID: (entity, error) => `Failed to retrieve ${entity} by ID: ${error.message}`,
        BY_EMAIL: (entity, error) => `Failed to retrieve ${entity} by email: ${error.message}`,
        BY_CODE: (entity, error) => `Failed to retrieve ${entity} by code: ${error.message}`,
        RECENT: (entity, error) => `Failed to retrieve recent ${entity}: ${error}`,
        BY_USER: (entity, error) => `Failed to retrieve ${entity} by user: ${error.message}`,
        BY_KEY: (entity, error) => `Failed to retrieve ${entity} by key: ${error.message}`,
      },
    },
  },

  // jwt service messages
  JWT: {
    GENERATE: {
      FAILED: (token, error) => `Failed to generate ${token} token: ${error.message}`,
    },
    REFRESH: {
      SUCCESS: 'JWT refreshed successfully.',
      FAILED: (error) => `Failed to refresh access token: ${error.message}`,
    },
    AUTH: {
      FAILED: 'Authentication failed.',
      FORBIDDEN: 'Access denied.',
    },
  },

  // api key service messages
  API_KEY: {
    MISSING: 'API key missing in x-api-key header.',
    INVALID: 'API key is invalid or does not exist.',
    NOT_ACTIVE: 'API key is not active. It may be expired, revoked, or blocked.',
  },

  // uuid service messages
  UUID: {
    GENERATE: {
      FAILED: (error) => `Failed to generate UUID: ${error.message}`,
      TIMEOUT: 'Unable to generate a unique UUID after multiple attempts.',
    },
  },

  // cron job messages
  CRON: {
    SUCCESS: 'Cron job executed successfully.',
    FAILED: (error) => `Cron job execution failed: ${error.message}`,
  },
};
