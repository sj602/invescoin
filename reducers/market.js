import {
  GET_GLOBAL_MARKET_CAP,
  GET_MARKET_CAP,
  GET_BTC_PERCENTILE,
  GET_COIN_PRICE,
  GET_WON_BY_DOLLAR,
  INIT_COINS,
} from '../actions/types';
import {
  minus100AndFixed,
  addComma3letters
} from '../utils/helpers';

export default function marketReducer(state = {}, action) {
  switch (action.type) {
    case GET_GLOBAL_MARKET_CAP:
      return {
        ...state,
        globalMarketCap: action.data
      }
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
            name: action.name,
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
        const coin = state.coins[action.coin.name];
        return {
          ...state,
          coins: {
            ...(state.coins || {}),
            [action.coin.name]: {
              ...(( state.coins && state.coins[action.coin.name] ) || {}),
              upbitPrice: action.upbitPrice,
              kimchiPremium: addComma3letters((action.upbitPrice - (Number(coin.bittrexPrice || coin.bitfinexPrice) * state.wonByDollarPrice)).toFixed(0)),
              kpPercent: coin.kpPercent
                         ?
                         coin.kpPercent
                         :
                         minus100AndFixed((Number(coin.kimchiPremium) / (Number(coin.bittrexPrice || coin.bitfinexPrice) * state.wonByDollarPrice)) * 100),
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
              kimchiPremium: addComma3letters((coin.upbitPrice || coin.bithumbPrice - Number(action.bittrexPrice) * state.wonByDollarPrice).toFixed(0)),
              kpPercent: coin.kpPercent
                         ?
                         coin.kpPercent
                         :
                         minus100AndFixed((Number(coin.kimchiPremium) / (Number(action.bittrexPrice) * state.wonByDollarPrice)) * 100),
            }
          }
        }
      }
      else if(action.bitfinexPrice) {
        const coin = state.coins[action.coin.name];
        return {
          ...state,
          coins: {
            ...(state.coins || {}),
            [action.coin.name]: {
              ...(( state.coins && state.coins[action.coin.name] ) || {}),
              bitfinexPrice:  action.bitfinexPrice,
              kimchiPremium: addComma3letters(((coin.upbitPrice || coin.bithumbPrice) - (Number(action.bitfinexPrice || coin.bittrexPrice) * state.wonByDollarPrice)).toFixed(0)),
              kpPercent: coin.kpPercent
                         ?
                         coin.kpPercent
                         :
                         minus100AndFixed((Number(coin.kimchiPremium) / (Number(action.bitfinexPrice) * state.wonByDollarPrice)) * 100),
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
