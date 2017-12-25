import { combineReducers } from 'redux';

function bubbleReducer(state = {}, action) {
  switch (action.type) {
  }
}

function marketReducer(state = {}, action) {
  switch (action.type) {
  }
}

function tweetsReducer(state = {}, action) {
  switch (action.type) {
  }
}

export const rootReducer = combineReducers({
  bubbleReducer,
  marketReducer,
  tweetsReducer,
});
