import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/app';

import configureStore from './store';

const initialState = window.__INITIAL_STATE__ || {};
const store = configureStore(initialState);
const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate

renderMethod((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));
