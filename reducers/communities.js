import {
  GET_REDDIT_DATA
} from '../actions/types';

export default function communitiesReducer(state = {}, action) {
  switch (action.type) {
    case GET_REDDIT_DATA:
      return {
        ...state,
        reddit: action.data
      }
    default:
      return state;
  }
}
