const Coinmarketcap_URL = `https://api.coinmarketcap.com/v1/`;
const Bithumb_URL = `https://api.bithumb.com/public/ticker`;
const Upbit_URL = `https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-`;
const Bittrex_URL = `https://bittrex.com/api/v1.1/public/getmarketsummary`;
const Bitfinex_URL = `https://api.cryptowat.ch/markets/bitfinex`;
const Dollar_URL = `http://api.fixer.io/latest?base=USD`;
const Balance_URL = `https://blockchain.info/ko/rawaddr/`;
const Transactions_URL = `https://api.blockchain.info/stats`;

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};


export const marketBithumb = (coin) => {
  return fetch(
    `${Bithumb_URL}/${coin}`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json())
  .then(data => data['data']['closing_price'])
  .catch(e => console.log('Error occurred : ', e))
}

export const marketUpbit = (coin) => {
  return fetch(
    `${Upbit_URL}${coin}`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json())
  .then(data => data[0].tradePrice)
  .catch(e => console.log('Error occurred : ', e))
}

export const marketBittrex = (coin) => {
  return fetch(
    `${Bittrex_URL}?market=usdt-${coin}`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json())
  .then(data => data.result[0].Last.toFixed(2))
  .catch(e => console.log('Error occurred : ', e))
}

export const marketBitfinex = (coin) => {
  return fetch(
    `${Bitfinex_URL}/${coin}usd/price`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json())
  .then(data => data.result['price'])
  .catch(e => console.log('Error occurred : ', e))
}

export const getMarketCap = (coin) => {
  return fetch(
    `${Coinmarketcap_URL}ticker/${coin}`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json())
  .then(data => data[0]['market_cap_usd'])
  .catch(e => console.log('Error occurred : ', e))
}

export const getBTCPercentile = () => {
  return fetch(
    `${Coinmarketcap_URL}global/`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json())
  .then(data => data['bitcoin_percentage_of_market_cap'])
  .catch(e => console.log('Error occurred : ', e))
}

export const getWonByDollar = () => {
  return fetch(
    `${Dollar_URL}`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json())
  .then(data => data.rates.KRW)
}


///////////////////////////////// Checking Balnce /////////////////////////

export const getBalance = (address) => {
  return fetch(
    `${Balance_URL}/${address}`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json())
  .then(data => data['final_balance'])
}

///////////////////////////////// Bubble APIs ///////////////////////////////

export const getTransactions = (coin) => {
  return fetch(
    `${Transactions_URL}`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json())
  .then(data => data['estimated_transaction_volume_usd'])
}
