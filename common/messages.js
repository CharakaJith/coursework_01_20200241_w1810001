module.exports = {
  // database initialization messages
  DATABASE: {
    SYNC: {
      SUCCESS: 'Database synced!',
      FAILED: (error) => `Failed to sync database: ${error.message}`,
    },
  },

  // response payload messages
  RESPONSE: {
    USER: {
      EXISTS: 'User already registered!',
      INVALID_CRED: 'Invalid user credentials!',
      INACTIVE: 'User is not active!',
    },
  },

  // validation error messages
  VALIDATE: {
    PARAM: {
      EMPTY: (field) => `Field ${field} is empty!`,
      INVALID: (field) => `Invalid ${field} format!`,
    },
  },

  // dao layer error messages
  DAO: {
    FAILED: {
      INSERT: (entity, error) => `Failed to create new ${entity}: ${error.message}`,
      DELETE: (entity, error) => `Failed to destroy ${entity}: ${error.message}`,
      GET: {
        BY_ID: (entity, error) => `Failed to get ${entity} by id: ${error.message}`,
        BY_EMAIL: (entity, error) => `Failed to get ${entity} by email: ${error.message}`,
        BY_CODE: (entity, error) => `Failed to get ${entity} by code: ${error.message}`,
        RECENT: (entity, error) => `Failed to get recent ${entity}: ${error}`,
      },
    },
  },

  // jwt service messages
  JWT: {
    GENERATE: {
      FAILED: (token, error) => `Failed to generate ${token} token: ${error.message}`,
    },
    REFRESH: {
      SUCCESS: 'JWT refreshed!',
      FAILED: (error) => `Failed to refresh access token: ${error.message}`,
    },
    AUTH: {
      FAILED: 'Authentication failed!',
      FORBIDDEN: 'Permission denied!',
    },
  },
};
