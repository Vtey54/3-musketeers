/**
  * You can find further informations about libraries here :
  * axios: https://github.com/axios/axios
  * money: http://openexchangerates.github.io/money.js/
  */
const axios = require('axios');
const money = require('money');


/**
  *RATES_URL and BLOCKCHAIN_URL get informations about exchange rates of various currencies.
  */
const RATES_URL = 'https://api.exchangeratesapi.io/latest';
const BLOCKCHAIN_URL = 'https://blockchain.info/ticker';
const CURRENCY_BITCOIN = 'BTC';

const isAnyBTC = (from, to) => [from, to].includes(CURRENCY_BITCOIN);

/**
  *If the user just call "node cli.js" the default value is to give the conversion of 1USD to BTC.to
  *If not, the exports function send requests to get informations about the exchange rates of the currency 
  *that the user specified and its exchanges rates.
  *If the currency code is not specified on both RATES_UTL or BLOCKCHAIN_URL, it returns an error to 
  *specify an other value. 
  */
module.exports = async opts => {
  const {amount = 1, from = 'USD', to = CURRENCY_BITCOIN} = opts;
  const promises = [];
  let base = from;

  const anyBTC = isAnyBTC(from, to);

  if (anyBTC) {
    base = from === CURRENCY_BITCOIN ? to : from;
    promises.push(axios(BLOCKCHAIN_URL));
  }

  promises.unshift(axios(`${RATES_URL}?base=${base}`));

  try {
    const responses = await Promise.all(promises);
    const [rates] = responses;

    money.base = rates.data.base;
    money.rates = rates.data.rates;

    const conversionOpts = {
      from,
      to
    };

    if (anyBTC) {
      const blockchain = responses.find(response =>
        response.data.hasOwnProperty(base)
      );

      Object.assign(money.rates, {
        'BTC': blockchain.data[base].last
      });
    }

    /**
      *Change the conversion to BTC if mentionned in second
      */
    if (anyBTC) {
      Object.assign(conversionOpts, {
        'from': to,
        'to': from
      });
    }

    return money.convert(amount, conversionOpts);
  } catch (error) {
    throw new Error (
      '💵 Please specify a valid `from` and/or `to` currency value!'
    );
  }
};
