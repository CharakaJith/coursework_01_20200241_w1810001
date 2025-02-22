module.exports = {
  // database connection and initialization messages
  DATABASE: {
    CONNECTION: {
      SUCCESS: 'Connected to the database successfully!',
      FAILED: (error) => `Failed to connect to the database: ${error.message}`,
    },

    TABLE: {
      CREATED: (table) => `Table '${table}' created successfully or already exists!`,
      FAILED: (table, error) => `Failed to create database table '${table}': ${error.message}`,
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
      GET: {
        BY_ID: (entity, error) => `Failed to get ${entity} by id: ${error.message}`,
        BY_EMAIL: (entity, error) => `Failed to get ${entity} by email: ${error.message}`,
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
  },
};
