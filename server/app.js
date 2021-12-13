var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
var fetch = require('node-fetch');
var CurrentExchange = require('./models/currentExchange');
var Dates = require('./models/date');
var { filterData } = require('./Utils/filterData');


var indexRouter = require('./routes/index');
var currentExchangeRouter = require('./routes/currentExchange');
var datesRouter = require('./routes/date');

mongoose.connect(
  'mongodb://localhost/currencyData',
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log(err ? err : 'Connected to Database');
  }
);

const url = ['https://api.frankfurter.app/latest'];
let currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 1);
// console.log(currentDate, 'currentDay');
let inputDate = currentDate
  .toLocaleString()
  .slice(0, 10)
  .replaceAll('/', '-')
  .split('-')
  .reverse()
  .join('-');
// console.log(inputDate, 'inputDate');
const datesUrl = [`https://api.frankfurter.app/2015-01-01..${inputDate}`];

datesUrl.map(async (url) => {
  try {
    const response = await fetch(url);
    const resultData = await response.json();
    resultData.current_date = inputDate;
    // console.log(resultData, "Result");
    const filteredData = filterData(resultData);
    // console.log(filteredData, "Filtered");
    Dates.find({"current_date" : inputDate}, (err, data) => {
      if (err) {
        console.log(err);
      } else if (data.length === 0) {
        Dates.create(filteredData, (err, dates) => {
          if (err) return err;
          console.log('Dates Created');
        });
      } else {
        // console.log(data, 'from data');
        console.log('Date Data already exist');
      }
    });
  } catch (error) {
    console.log(error);
  }
});
url.map(async (url) => {
  try {
    const response = await fetch(url);
    const resultData = await response.json();
    resultData.current_date = inputDate;
    // console.log(resultData, 'results');
    CurrentExchange.find({ "current_date": inputDate }, (err, data) => {
      if (err) {
        console.log(err);
      } else if (data.length === 0) {
        CurrentExchange.create(resultData, (err, currentExchange) => {
          if (err) return err;
          console.log('currentExchange created');
        });
      } else {
        console.log('Current Exchange Data already exist');
      }
    });
  } catch (error) {
    console.log(error);
  }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use('/api', indexRouter);
app.use('/api/currentExchange', currentExchangeRouter);
app.use('/api/dates', datesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
