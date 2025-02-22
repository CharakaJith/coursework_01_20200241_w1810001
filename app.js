const express = require('express');
const cors = require('cors');
require('dotenv').config();

// initialize the express app
const app = express();
app.use(cors());
app.use(express.json());

// start the server
const ENV = process.env.ENV || 'development';
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`${ENV} | ${PORT}`);
});
