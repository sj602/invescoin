import { combineReducers } from 'redux';
import bubbleReducer from './bubble';
import marketReducer from './market';

export const rootReducer = combineReducers({
  bubble: bubbleReducer,
  market: marketReducer,
  // tweetsReducer,
});
