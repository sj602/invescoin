import {
  changeFixedDecimalPoints,
  addComma3letters
} from './helpers';

const Coinmarketcap_URL = `https://api.coinmarketcap.com/v1/`;
const Bithumb_URL = `https://api.bithumb.com/public/ticker`;
const Upbit_URL = `https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-`;
const Bittrex_URL = `https://bittrex.com/api/v1.1/public/getmarketsummary`;
const Bitfinex_URL = `https://api.cryptowat.ch/markets/bitfinex`;
const Dollar_URL = `http://api.fixer.io/latest?base=USD`;
const Transactions_URL = `https://api.blockchain.info/stats`;
const Inflation_URL = `https://inflation-api.herokuapp.com/api/?`;
const GoogleTrends_URL = `https://invescoin-52d55.appspot.com/interestOverTime`; // Google Cloud Server
const BitcoinPriceIndex_URL = `https://api.coindesk.com/v1/bpi/historical/close.json`;
const Twitter_URL = `http://192.168.108.2:3000/twitter`;

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
  .then(data => changeFixedDecimalPoints(data))
  .then(data => addComma3letters(data))
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
  .then(data => changeFixedDecimalPoints(data))
  .then(data => addComma3letters(data))
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
  .then(data => changeFixedDecimalPoints(data))
  .then(data => addComma3letters(data))
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
  .then(data => changeFixedDecimalPoints(data))
  .then(data => addComma3letters(data))
  .catch(e => console.log('Error occurred : ', e))
}

export const getGlobalMarketCap = () => {
  return fetch(
    `${Coinmarketcap_URL}global/`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json())
  .then(data => data['total_market_cap_usd'])
  .then(data => addComma3letters(data))
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


///////////////////////////////// Bubble APIs ///////////////////////////////

export const getTransactions = () => {
  return fetch(
    `${Transactions_URL}`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json())
  .then(data => data['estimated_transaction_volume_usd'].toFixed(2))
}

export const getInflation = (value, year) => {
  return fetch(
    `${Inflation_URL}value=${value}&year=${year}`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json())
  .then(data => data.response.adjustedValue)
}

export const getGoogleTrendsData = (keyword, startDate, endDate) => {
  startDate = '20' + startDate.substring(0,2) + '-' + startDate.substring(2,4) + '-' + startDate.substring(4,6);
  endDate = '20' + endDate.substring(0,2) + '-' + endDate.substring(2,4) + '-' + endDate.substring(4,6);

  return fetch(
    `${GoogleTrends_URL}/${keyword}/${startDate}/${endDate}`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json())
  .then(data => data)
}

export const getBitcoinPriceIndex = (startDate, endDate) => {
  startDate = '20' + startDate.substring(0,2) + '-' + startDate.substring(2,4) + '-' + startDate.substring(4,6);
  endDate = '20' + endDate.substring(0,2) + '-' + endDate.substring(2,4) + '-' + endDate.substring(4,6);

  return fetch(
    `${BitcoinPriceIndex_URL}?start=${startDate}&end=${endDate}`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => res.json())
  .then(data => data['bpi'])
}

///////////////////////////// Communites APIs ///////////////////////
export async function loadDCB() {
  const searchUrl = `http://gall.dcinside.com/board/lists/?id=bitcoins`;
  const searchUrlByRec = `http://gall.dcinside.com/board/lists/?id=bitcoins&page=1&exception_mode=recommend`;
  const response = await fetch(searchUrlByRec);

  const htmlString = await response.text();
  const cheerio = require('cheerio-without-node-native');
  const $ = cheerio.load(htmlString);
  return console.log(response._bodyText);
  // response의 bodyText가 ""임. 다른 사이트는 내용이 있는 반면.
    // .map((_, e) => console.log(e))
    // ({
    //   timestamp: $('td.t_date', e).attr('title'),
    //   hits: $('td:nth-chiild(5)', e).text(),
    //   score: $('td:nth-chiild(6)', e).text(),
    //   comments: $("td.t_subject a:nth-child(2) em", e).text(),
    //   title: $("td.t_subject a", e).text(),
    //   data: $("td.t_subject a", e).attr('href'),
    // })
  // );
}

export async function loadDdengle() {
  const searchUrl = `https://www.ddengle.com/board_vote_all`;
  const response = await fetch(searchUrl);

  const htmlString = await response.text();
  const cheerio = require('cheerio-without-node-native');
  const $ = cheerio.load(htmlString);

  let data = $("tbody")[0]['children'];
  data.pop();
  data.shift();

  return data.map(k => ({
    data: k.children[3]['children'][1]['attribs']['href'],
    title: k.children[3]['children'][1]['children'][0]['data'].trim(),
    comments: k.children[3]['children'][3]['children'][0]['data'],
    likes: k.children[5]['children'][0]['data'],
    hits: k.children[7]['children'][0]['data'],
    timestamp: k.children[11]['children'][0]['data'],
  }));
}


export async function loadCoinpan() {
  const searchUrl = `https://coinpan.com/best`;
  const response = await fetch(searchUrl);

  const htmlString = await response.text();
  const cheerio = require('cheerio-without-node-native');
  const $ = cheerio.load(htmlString);
  return $("div[data-rank]")
}

export async function loadClien() {
  const searchUrl = `https://www.clien.net/service/board/cm_vcoin?&od=T33`;
  const response = await fetch(searchUrl);

  const htmlString = await response.text();
  const cheerio = require('cheerio-without-node-native');
  const $ = cheerio.load(htmlString);
  return $("div[class='list_item symph_row']")
    .map((_, e) => ({
      timestamp: $("span.timestamp", e).text(),
      hits: $("span.hit", e).text(),
      score: $("div[data-role='list-like-count'] span", e).text(),
      comments: $("div[data-role='list-title'] a:nth-child(2) span", e).text(),
      title: $("span[data-role='list-title-text']", e).text(),
      data: $("a.list_subject", e).attr('href'),
    }));
}


export async function loadReddit() {
  const searchUrl = `https://www.reddit.com/r/Bitcoin/`;
  const response = await fetch(searchUrl);

  const htmlString = await response.text();
  const cheerio = require('cheerio-without-node-native');
  const $ = cheerio.load(htmlString);
  return $("div[data-rank]")
    .map((_, e) => ({
      timestamp: $(e).attr('data-timestamp'),
      rank: $(e).attr('data-rank'),
      score: $(e).attr('data-score'),
      comments: $(e).attr('data-comments-count'),
      title: $("a[data-event-action='title']", e).text(),
      data: $(e).attr('data-url'),
      thumbnail: $("a[data-event-action='thumbnail'] img", e).attr('src')
    }));
}

//////////////// Twitter API /////////////////

export const getTweets = () => {
  return fetch(
    `${Twitter_URL}`,
    {
      method: `GET`,
      headers
    }
  )
  .then(res => res.json())
  .then(data => data['statuses'])
  .catch(e => console.log('Error occurred : ', e))
};
