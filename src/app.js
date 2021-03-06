const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

const index = require('./routes/index');

const app = express();

// Database connection
const sequelize = new Sequelize(
  process.env.HABIT_API_DATABASE,
  process.env.HABIT_API_USER,
  process.env.HABIT_API_PASSWORD, {
    dialect: 'mysql',
    host: process.env.HABIT_API_HOST,
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection successful!');
  }).catch((err) => {
    console.log('Failed to connect: ', err);
  });

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

module.exports = app;
