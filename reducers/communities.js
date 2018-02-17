import {
  GET_DCB_DATA,
  GET_COINPAN_DATA,
  GET_DDENGLE_DATA,
  GET_CLIEN_DATA,
  GET_REDDIT_DATA,
} from '../actions/types';

export default function communitiesReducer(state = {}, action) {
  switch (action.type) {
    case GET_DCB_DATA:
      return {
        ...state,
        dcb: action.data
      }
    case GET_DDENGLE_DATA:
      return {
        ...state,
        ddengle: action.data
      }
    case GET_CLIEN_DATA:
      return {
        ...state,
        clien: action.data
      }
    case GET_REDDIT_DATA:
      return {
        ...state,
        reddit: action.data
      }
    default:
      return state;
  }
}
