import {
  GET_MARKET_CAP,
  GET_MARKET_CAP_SUCCESS,
  GET_MARKET_CAP_FAIL,
  GET_GLOBAL_INFO
} from './types.js';
import * as api from '../utils/api';

export const getMarketCap = (coin, currency) => dispatch => {
    return api.getMarketCap(coin, currency)
        .then(data => {
          dispatch({type: GET_MARKET_CAP_SUCCESS, data})
        })
        .catch(err => {
          dispatch({type: GET_MARKET_CAP_FAIL, err})
        })
}

export function getGlobalInfo() {
    return dispatch => {
      return api.getGlobalInfo().then(data => {
          dispatch({type: GET_GLOBAL_INFO, data})
        })
  }
}
