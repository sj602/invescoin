import { combineReducers } from 'redux';
import {
  GET_MARKET_CAP,
  GET_BTC_PERCENTILE,
  GET_COIN_PRICE,
  GET_WON_BY_DOLLAR,
  INIT_COINS,
} from '../actions/types';

// function bubbleReducer(state = {}, action) {
//   switch (action.type) {
//   }
// }

function marketReducer(state = {}, action) {
  switch (action.type) {
    case GET_MARKET_CAP:
      return {
        ...state,
        marketCap: action.data
      }
    case GET_BTC_PERCENTILE:
      return {
        ...state,
        bitcoinPercentage: action.data
      }
    case INIT_COINS:
      return {
        ...state,
        coins: {
          ...(state.coins || {}),
          [action.coin.name]: {
            ...(( state.coins && state.coins[action.coin.name] ) || {}),
            img: action.img,
            symbolBig: action.symbolBig,
            symbolSmall: action.symbolSmall
          }
        }
      }
    case GET_COIN_PRICE:
      if(action.bithumbPrice) {
        return {
          ...state,
          coins: {
            ...(state.coins || {}),
            [action.coin.name]: {
              ...(( state.coins && state.coins[action.coin.name] ) || {}),
              bithumbPrice: action.bithumbPrice,
            }
          }
        }
      }
      else if(action.upbitPrice) {
        return {
          ...state,
          coins: {
            ...(state.coins || {}),
            [action.coin.name]: {
              ...(( state.coins && state.coins[action.coin.name] ) || {}),
              upbitPrice: action.upbitPrice,
            }
          }
        }
      }
      else if(action.bittrexPrice) {
        const coin = state.coins[action.coin.name];
        return {
          ...state,
          coins: {
            ...(state.coins || {}),
            [action.coin.name]: {
              ...(( state.coins && state.coins[action.coin.name] ) || {}),
              bittrexPrice: action.bittrexPrice,
              kimchiPremium: (coin.upbitPrice - Number(coin.bittrexPrice) * state.wonByDollarPrice)
            }
          }
        }
      }
      else {
        return {
          ...state
        }
      }
    case GET_WON_BY_DOLLAR:
      return {
        ...state,
        wonByDollarPrice: action.data
      }
    default:
      return state;
  }
}

// function tweetsReducer(state = {}, action) {
//   switch (action.type) {
//   }
// }
//
export const rootReducer = combineReducers({
  // bubbleReducer,
  market: marketReducer,
  // tweetsReducer,
});
