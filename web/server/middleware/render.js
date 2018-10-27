import React from 'react';
import path from 'path';
import { StaticRouter } from 'react-router';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
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

  const sheetsRegistry = new SheetsRegistry();
  const generateClassName = createGenerateClassName();
  const sheetsManager = new Map();

  const componentHTML = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
            <App />
          </MuiThemeProvider>
        </JssProvider>
      </StaticRouter>
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