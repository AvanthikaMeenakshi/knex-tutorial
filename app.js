var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var knex = require('knex');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const db = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "",
    database: "knex-test"
  }
});

app.set("db", db);

app.use('/', indexRouter);

app.listen(3000, () => {
  console.log(`Server listening at http://localhost:3000`);
});

module.exports = app;
