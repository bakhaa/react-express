import express from 'express';
import path from 'path';
import React from 'react';
import { StaticRouter } from 'react-router';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';

// client
import App from '../client/App';
import configureStore from '../client/store';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));

app.use((req, res) => {
  const context = {};
  const store = configureStore();
  const initialState = store.getState();

  const componentHTML = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App />
      </StaticRouter>
    </Provider>
  );

  if (context.url) {
    res.writeHead(301, {
      Location: context.url,
    });
    res.end();
  } else {
    res.status(200).render(path.join(__dirname, './views/index.ejs'), {
      html: componentHTML,
      __INITIAL_STATE__: JSON.stringify(initialState),
    });
  }
});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`); // eslint-disable-line no-console
});
