const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.db');
const database = new sqlite3.Database(dbPath, (error) => {
  if (error) {
    console.log(`Failed to connect to the database: ${error.message}`);
  } else {
    console.log('Connected to the database successfully!');
  }
});

module.exports = database;
