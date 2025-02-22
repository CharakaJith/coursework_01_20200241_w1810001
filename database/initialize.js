const { query } = require('express');
const db = require('./connection');
const { DATABASE } = require('../common/messages');
const { QUERIES } = require('../common/queries/databaseSetup');
const { TABLES } = require('../constants/tables');
require('dotenv').config();

const initialize = {
  createTables: async () => {
    const tables = [
      {
        table: TABLES.USERS,
        query: QUERIES.CREATE_USERS,
      },
      {
        table: TABLES.KEYS,
        query: QUERIES.CREATE_API_KEYS,
      },
      {
        table: TABLES.REQUESTS,
        query: QUERIES.CREATE_API_REQUESTS,
      },
      {
        table: TABLES.COUNTRIES,
        query: QUERIES.CREATE_COUNTRIES,
      },
    ];

    // create tables
    for (const { table, query } of tables) {
      await new Promise((resolve, reject) => {
        db.run(query, (error) => {
          if (error) {
            console.log(DATABASE.TABLE.FAILED(table, error));
            return reject(error);
          }

          console.log(DATABASE.TABLE.CREATED(table));
          return resolve();
        });
      });
    }
  },
};

module.exports = initialize;
