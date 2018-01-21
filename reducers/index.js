import { combineReducers } from 'redux';
import {
  GET_MARKET_CAP,
  GET_MARKET_CAP_SUCCESS,
  GET_MARKET_CAP_FAIL,
  GET_GLOBAL_INFO,
} from '../actions';

// function bubbleReducer(state = {}, action) {
//   switch (action.type) {
//   }
// }

const initialState = {
  isFetching: null,
  data: '',
  hasError: false,
  errorMessage: null,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_MARKET_CAP:
      console.log(2)
      return ;
    case GET_MARKET_CAP_SUCCESS:
      console.log('success')
    case GET_MARKET_CAP_FAIL:
      return {
        ...state,
        marketCap: action.err
      }
    case GET_GLOBAL_INFO:
      console.log('action')
      return {
        ...state,
        bitcoinPercentage: action.bitcoinPercentage
      }
    default:
      return state;
  }
}

// function tweetsReducer(state = {}, action) {
//   switch (action.type) {
//   }
// }

// export const rootReducer = combineReducers({
//   // bubbleReducer,
//   market: marketReducer,
//   // tweetsReducer,
// });
