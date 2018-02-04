import {
  GET_MARKET_CAP,
  GET_BTC_PERCENTILE,
  INIT_COINS,
  GET_COIN_PRICE,
  GET_WON_BY_DOLLAR,
  GET_TRANSACTIONS,
  GET_INFLATION,
} from './types.js';
import * as api from '../utils/api';


// -------------------------- Market Actions --------------------------
export const getMarketCap = (coin) => dispatch => {
  return api.getMarketCap(coin)
    .then(data => dispatch({type: GET_MARKET_CAP, data}));
};

export const getBTCPercentile = () => dispatch => {
  return api.getBTCPercentile()
    .then(data => dispatch({type: GET_BTC_PERCENTILE, data}));
};

export const initCoins = (coin) => dispatch => {
  return dispatch({
    type: INIT_COINS,
    symbolBig: coin.symbolBig,
    symbolSmall: coin.symbolSmall,
    img: coin.img,
    coin
  });
};

export const getCoinPrice = (coin) => dispatch => {
  api.marketBithumb(coin.symbolBig)
  .then(data => dispatch({type: GET_COIN_PRICE, bithumbPrice: data, coin}))
    .then(() => {
      api.marketUpbit(coin.symbolBig)
      .then(data => dispatch({type: GET_COIN_PRICE, upbitPrice: data, coin}))
    })
    .then(() => {
      api.marketBittrex(coin.symbolSmall)
      .then(data => dispatch({type: GET_COIN_PRICE, bittrexPrice: data, coin}))
    })
    .then(() => {
      api.marketBitfinex(coin.symbolSmall)
      .then(data => dispatch({type: GET_COIN_PRICE, bitfinexPrice: data, coin}))
    })
}

export const getWonByDollar = () => dispatch => {
  return api.getWonByDollar()
    .then(data => dispatch({type: GET_WON_BY_DOLLAR, data}))
}


// -------------------- Bubble Actions -------------------------
export const getTransactions = () => dispatch => {
  return api.getTransactions()
    .then(data => dispatch({type: GET_TRANSACTIONS, data}))
}

export const getInflation = (value, year) => dispatch => {
  return api.getInflation(value, year)
    .then(data => dispatch({type: GET_INFLATION, data}))
}
