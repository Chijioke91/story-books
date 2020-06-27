require('dotenv').config({ path: './config/config.env' });
const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');

const db = require('./config/db');

require('./config/passport')(passport);

db();

const app = express();

app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');
app.use(expressLayouts);
app.use(express.static('public'));

// sessions
app.use(
  session({
    secret: 'relax cat',
    resave: false,
    saveUninitialized: false,
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/', require('./routes'));
app.use('/auth', require('./routes/auth'));

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(
    `server is running in ${process.env.NODE_ENV} environment on port ${port}`
  )
);
