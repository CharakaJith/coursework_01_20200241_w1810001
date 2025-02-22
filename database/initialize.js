const { query } = require('express');
const db = require('./connection');
const { DATABASE } = require('../common/messages');
const { SETUP_QUERIES } = require('../common/queries/setup.queries');
require('dotenv').config();

const initialize = {
  createTables: async () => {
    // create tables
    for (const { table, query } of SETUP_QUERIES) {
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
