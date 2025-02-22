const express = require('express');
const cors = require('cors');
const initialize = require('./database/initialize');
require('dotenv').config();

// initialize the express app
const app = express();
app.use(cors());
app.use(express.json());

// initialize database
const initialization = async () => {
  // create tables
  await initialize.createTables();
};
initialization();

// start the server
const ENV = process.env.ENV || 'development';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`${ENV} | ${PORT}`);
});
