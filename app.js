require('dotenv').config({ path: './config/config.env' });
const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');

const db = require('./config/db');

db();

const app = express();

app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(expressLayouts);
app.use(express.static('public'));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/', require('./routes'));

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(
    `server is running in ${process.env.NODE_ENV} environment on port ${port}`
  )
);
