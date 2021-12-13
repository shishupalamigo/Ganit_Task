function filterData(payload) {
  const { amount, rates, base, start_date, end_date, current_date } = payload;

  const currencyArr = [
    'AUD',
    'BGN',
    'BRL',
    'CAD',
    'CHF',
    'CNY',
    'CZK',
    'DKK',
    'GBP',
    'HKD',
    'HRK',
    'HUF',
    'IDR',
    'ILS',
    'INR',
    'ISK',
    'JPY',
    'KRW',
    'MXN',
    'MYR',
    'NOK',
    'NZD',
    'PHP',
    'PLN',
    'RON',
    'RUB',
    'SEK',
    'SGD',
    'THB',
    'TRY',
    'USD',
    'ZAR',
  ];
  const obj = {};

  Object.keys(rates).forEach((date) => {
    obj[date] = {};

    Object.keys(rates[date]).forEach((currency) => {
      if (currencyArr.includes(currency)) {
        obj[date][currency] = rates[date][currency];
      }
    });
  });

  // console.log("newRatesObj", obj);

  return { amount, rates: [obj], base, start_date, end_date, current_date };
}
module.exports = { filterData };
