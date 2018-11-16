import React from 'react';
import path from 'path';
import { StaticRouter } from 'react-router';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import fetch from 'node-fetch';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SheetsRegistry } from 'react-jss/lib/jss';
import JssProvider from 'react-jss/lib/JssProvider';
import { MuiThemeProvider, createGenerateClassName } from '@material-ui/core/styles';

// client
import App from '../../client/components/main';
import configureStore from '../../client/store';
import theme from '../../client/theme';

export default (req, res) => {
  const context = {};
  const store = configureStore();
  const initialState = store.getState();

  const uri = process.env.API_URI || 'http://localhost:3003/graphql';

  const client = new ApolloClient({
    link: createHttpLink({
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
      uri,
      fetch,
    }),
    ssrMode: true,
    cache: new InMemoryCache(),
  });

  const sheetsRegistry = new SheetsRegistry();
  const generateClassName = createGenerateClassName();
  const sheetsManager = new Map();

  const componentHTML = ReactDOMServer.renderToString(
    <Provider store={store}>
      <ApolloProvider client={client}>
        <StaticRouter location={req.url} context={context}>
          <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
            <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
              <App />
            </MuiThemeProvider>
          </JssProvider>
        </StaticRouter>
      </ApolloProvider>
    </Provider>,
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    const css = sheetsRegistry.toString();

    res.status(200).render(path.join(__dirname, '../views/index.ejs'), {
      html: componentHTML,
      __INITIAL_STATE__: JSON.stringify(initialState),
      css,
    });
  }
};
