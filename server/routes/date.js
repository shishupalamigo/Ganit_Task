var express = require('express');
var router = express.Router();
var Dates = require("../models/date");

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

router.get('/', async (req, res, next) => {

  try {
    let datesData = await Dates.findOne({"current_date": inputDate});
    if (!datesData) {
      return res.status(400).json({ error: 'something went wrong' });
    }
    res.json({ datesData });
  } catch (error) {
    next(error);
  }
});

module.exports = router;