module.exports = {
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
};
