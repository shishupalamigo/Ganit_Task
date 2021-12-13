var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var currentExchangeSchema = new Schema({
    amount: {type: Number},
    base: { type: String },
    date: { type: String },
    current_date: { type: String },
    rates: {}
}, { timestamps: true });

var CurrentExchange = mongoose.model('CurrentExchange', currentExchangeSchema);

module.exports = CurrentExchange;