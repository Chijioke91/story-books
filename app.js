require('dotenv').config({ path: './config/config.env' });
const express = require('express');
const morgan = require('morgan');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const { formatDate, truncate, stripTags, editIcon } = require('./helpers/ejs');

const db = require('./config/db');

require('./config/passport')(passport);

db();

const app = express();

app.locals.formatDate = formatDate;
app.locals.truncate = truncate;
app.locals.stripTags = stripTags;
app.locals.editIcon = editIcon;

// bodyparser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set global user
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/', require('./routes'));
app.use('/auth', require('./routes/auth'));
app.use('/stories', require('./routes/stories'));

app.use((req, res) => {
  res.render('error/404');
});

const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(
    `server is running in ${process.env.NODE_ENV} environment on port ${port}`
  )
);
