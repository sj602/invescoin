import {
  GET_GLOBAL_MARKET_CAP,
  GET_MARKET_CAP,
  GET_BTC_PERCENTILE,
  GET_COIN_PRICE,
  GET_WON_BY_DOLLAR,
  INIT_COINS,
} from '../actions/types';

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
              kimchiPremium: (action.upbitPrice - Number(coin.bittrexPrice || coin.bitfinexPrice) * state.wonByDollarPrice),
              kpPercent: coin.kpPercent ? coin.kpPercent : (Number(coin.kimchiPremium) / Number(((coin.bittrexPrice || coin.bitfinexPrice) || undefined)) * state.wonByDollarPrice) * 100,
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
              kimchiPremium: (coin.upbitPrice || coin.bithumbPrice - Number(action.bittrexPrice) * state.wonByDollarPrice),
              kpPercent: coin.kpPercent ? coin.kpPercent : (Number(coin.kimchiPremium) / (Number(action.bittrexPrice) * state.wonByDollarPrice) * 100),
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
              bitfinexPrice: action.bitfinexPrice,
              kimchiPremium: ((coin.upbitPrice || coin.bithumbPrice) - (Number(action.bitfinexPrice || coin.bittrexPrice) * state.wonByDollarPrice)),
              kpPercent: coin.kpPercent ? coin.kpPercent : (Number(coin.kimchiPremium) / (Number(action.bitfinexPrice) * state.wonByDollarPrice) * 100),
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
