import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

const app = express();

function renderHTML({ componentHTML, initialState, metaData, config }) {
  return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="shortcut icon" href="/static/favicon.ico"/>
          <title>Test</title>
      </head>
      <body>
      <div id="react-view">${componentHTML}</div>
      <script type="application/javascript">
        window.__CONFIG__ = ${JSON.stringify({ isJSON: true })};
      </script>
      </body>
      </html>
  `;
}

const Text = () => (
  <div>
    <p>Text</p>
  </div>
);

const componentHTML = ReactDOMServer.renderToString(
  <Text />
);

const html = renderHTML({
  componentHTML,
});

const PORT = process.env.PORT || 3001;

app.use('/', (req, res) => {
  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`); // eslint-disable-line no-console
});
