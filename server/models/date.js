var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var datesSchema = new Schema({
  amount:{type: Number},
  start_date: {type: Date},
  end_date: {type: String}, 
  current_date: { type: String },
  rates: [],
}, { timestamps: true });

var Dates = mongoose.model('Dates', datesSchema);

module.exports = Dates;