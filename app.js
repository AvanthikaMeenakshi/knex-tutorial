var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");

var indexRouter = require('./routes/index');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(logger('dev'));
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
