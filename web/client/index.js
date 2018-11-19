import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './App';

const uri = process.env.API_URI || 'http://localhost:3003/api/graphql';

const client = new ApolloClient({
  uri,
  credentials: 'include',
});

const renderMethod = !!module.hot ? ReactDOM.render : ReactDOM.hydrate;

// Allow the passed state to be garbage-collected
delete window.__INITIAL_STATE__;

const render = Component => {
  renderMethod(
    <AppContainer>
      <ApolloProvider client={client}>
        <Router>
          <Component />
        </Router>
      </ApolloProvider>
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
