import {
  GET_MARKET_CAP,
  GET_BTC_PERCENTILE,
  INIT_COINS,
  GET_COIN_PRICE,
  GET_WON_BY_DOLLAR,
  GET_KIMCHI_PREMIUM,
} from './types.js';
import * as api from '../utils/api';

export const getMarketCap = (coin) => dispatch => {
  return api.getMarketCap(coin)
    .then(data => {
      data = data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"); // add a comma every 3 letters
      return dispatch({type: GET_MARKET_CAP, data})
    })
}

export const getBTCPercentile = () => dispatch => {
  return api.getBTCPercentile()
    .then(data => dispatch({type: GET_BTC_PERCENTILE, data}))
}

export const initCoins = (coin) => dispatch => {
  return dispatch({
    type: INIT_COINS,
    symbolBig: coin.symbolBig,
    symbolSmall: coin.symbolSmall,
    img: coin.img,
    coin
  })
}

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

export const getKimchiPremium = (coin) => dispatch => {
  return dispatch({type: GET_KIMCHI_PREMIUM, coin})
}

export const getWonByDollar = () => dispatch => {
  return api.getWonByDollar()
    .then(data => dispatch({type: GET_WON_BY_DOLLAR, data}))
}
