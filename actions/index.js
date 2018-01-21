import {
  GET_MARKET_CAP,
  GET_GLOBAL_INFO,
  GET_COIN_PRICE,
} from './types.js';
import * as api from '../utils/api';

export const getMarketCap = (coin) => dispatch => {
  return api.getMarketCap(coin)
    .then(data => dispatch({type: GET_MARKET_CAP, data}))
}

export const getGlobalInfo = () => dispatch => {
  return api.getGlobalInfo()
    .then(data => dispatch({type: GET_GLOBAL_INFO, data}))
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


}
