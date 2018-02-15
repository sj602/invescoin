const Coinmarketcap_URL = `https://api.coinmarketcap.com/v1/`;
const Bithumb_URL = `https://api.bithumb.com/public/ticker`;
const Upbit_URL = `https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-`;
const Bittrex_URL = `https://bittrex.com/api/v1.1/public/getmarketsummary`;
const Bitfinex_URL = `https://api.cryptowat.ch/markets/bitfinex`;
const Dollar_URL = `http://api.fixer.io/latest?base=USD`;
const Transactions_URL = `https://api.blockchain.info/stats`;
const Inflation_URL = `https://inflation-api.herokuapp.com/api/?`;
const GoogleTrends_URL = `http://localhost:3000/interestOverTime/`;
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

export const getGoogleTrendsData = (keyword) => {
  return fetch(
    `${GoogleTrends_URL}${keyword}`,
    {
      method: 'GET',
      headers,
    }
  )
  .then(res => console.log(res))
}

///////////////////////////// Communites APIs ///////////////////////
export async function loadDC() {
  const searchUrl = `http://gall.dcinside.com/mgallery/board/lists/?id=ecoin&page=1&exception_mode=recommend`;
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

export async function loadDCB() {
  const searchUrl = `http://gall.dcinside.com/board/lists/?id=bitcoins&page=1&exception_mode=recommend`;
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

export async function loadDCA() {
  const searchUrl = `http://gall.dcinside.com/mgallery/board/lists/?id=coin&page=1&exception_mode=recommend`;
  const response = await fetch(searchUrl);

  const htmlString = await response.text();
  const cheerio = require('cheerio-without-node-native');
  const $ = cheerio.load(htmlString);
  return $("div[data-rank]")
}

export async function loadDdengle() {
  const searchUrl = `https://www.ddengle.com/board_vote_all`;
  const response = await fetch(searchUrl);

  const htmlString = await response.text();
  const cheerio = require('cheerio-without-node-native');
  const $ = cheerio.load(htmlString);
  return $("tbody")[0]['children']
    .map((_, e) => {
    return console.log({
      title: $(".title a[class='hx bubble no_bubble']").text(),
      // timestamp: $(".time", e['children']),
      // likes: $("td:third-child", e).text(),
      // views: $("td:fourth-child", e).text(),
      // comments: $(".title a:second-child", e).text(),
      // data: $(".title a:first-chld", e).attr('href'),
    })
  }
  );
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
