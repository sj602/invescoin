import {
  GET_MARKET_CAP,
  GET_TRANSACTIONS,
  GET_INFLATION
} from '../actions/types';

const initialState = {
  priceRelation: {
    priceRelationUri: 'https://www.sifrdata.com/wp-content/uploads/CommunityGraph90.jpeg?t=1515421610',
  }
}

export default function bubbleReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MARKET_CAP:
      return {
        ...state,
        NVT_Ratio: Object.assign({}, state.NVT_Ratio, {marketCap: action.data})
      }
    case GET_TRANSACTIONS:
      return {
        ...state,
        NVT_Ratio: Object.assign({}, state.NVT_Ratio, {transactionsVolume: action.data})
      }
    case GET_INFLATION:
      return {
        ...state,
        historicBubble: Object.assign({}, state.historicBubble, {adjustedValue: action.data})
      }
    default:
      return state;
  }
}
