import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../reducers';
import { API } from '../middleware';

export default function configureStore(initialState) {
  const middleware = applyMiddleware(thunk, logger, API);
  const store = compose(middleware)(createStore)(rootReducer, initialState);
  return store;
}
