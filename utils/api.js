const Korbit_URL = `https://api.korbit.co.kr/v1/ticker`;
const Bithumb_URL = `https://api.bithumb.com/public/ticker`;
const Coinone_URL = `https://api.coinone.co.kr/ticker`;
const Upbit_URL = `https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-`;
const Coinmarketcap_URL = `https://api.coinmarketcap.com/v1/`;
const Bittrex_URL = `https://bittrex.com/api/v1.1/public/getmarketsummary`;
const Dollar_URL = `http://api.fixer.io/latest?base=USD`;
const Balance_URL = `https://blockchain.info/ko/rawaddr/`;
const Transactions_URL = `https://api.blockchain.info/stats`;

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Authentication': 'c23R30cm2jOOExyAsG6pf5Xxy4QwpndxaIMRs6aOZxIQoUlMVOv1tCQZL3jZz'
};

export const marketKorbit = () => {
  return fetch(
    `${Korbit_URL}/`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json)
  .catch(e => console.log('Error occurred : ', e))
}

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

export const marketCoinone = () => {
  return fetch(
    `${Coinone_URL}/btc`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json())
  // .then(data => data.replace(/\s/g, ""))
  // .then(data => JSON.parse(data))
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
  .then(data => data.result[0].Last)
  .catch(e => console.log('Error occurred : ', e))
}

export const getMarketCap = (coin, currency) => {
  return fetch(
    `${Coinmarketcap_URL}ticker/${coin}/?convert=${currency}`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json())
  .catch(e => console.log('Error occurred : ', e))
}

export const getGlobalInfo = () => {
  return fetch(
    `${Coinmarketcap_URL}global/`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json())
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
