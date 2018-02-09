import { combineReducers } from 'redux';
import bubbleReducer from './bubble';
import marketReducer from './market';
import communitiesReducer from './communities';

export const rootReducer = combineReducers({
  bubble: bubbleReducer,
  market: marketReducer,
  communities: communitiesReducer,
  // tweetsReducer,
});
