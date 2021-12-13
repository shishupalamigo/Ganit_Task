var express = require('express');
var router = express.Router();
var CurrentExchange = require("../models/currentExchange");

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
    let exchangeData = await CurrentExchange.findOne({"current_date" : inputDate});
    if (!exchangeData) {
      return res.status(400).json({ error: 'something went wrong' });
    }
    res.json({ exchangeData });
  } catch (error) {
    next(error);
  }
});

module.exports = router;