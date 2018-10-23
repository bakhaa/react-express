import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

import configureStore from './store';

const initialState = window.__INITIAL_STATE__ || {};
const store = configureStore(initialState);
const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate;

// Allow the passed state to be garbage-collected
delete window.__INITIAL_STATE__;

const render = Component => {
  renderMethod(
    <AppContainer>
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    // eslint-disable-next-line
    const nextApp = require('./App').default;
    render(nextApp);
  });
}
