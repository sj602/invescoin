import { combineReducers } from 'redux';
import {
  GET_MARKET_CAP,
  GET_GLOBAL_INFO,
  GET_COIN_PRICE,
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
    case GET_GLOBAL_INFO:
      return {
        ...state,
        bitcoinPercentage: action.data
      }
    case GET_COIN_PRICE:
      return {
        ...state,
        coins: {
          ...(state.coins || {}),
          [action.coin.name]: {
            ...((state.coins && state.coins[action.coin.name]) || {}),
            bithumbPrice: action.bithumbPrice,
            upbitPrice: action.upbitPrice,
            bittrexPrice: action.bittrexPrice 
          }
        },
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
