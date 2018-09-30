export function renderHTML({ componentHTML }) {
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
      <div id="root">${componentHTML}</div>
      <script type="application/javascript">
        window.__CONFIG__ = ${JSON.stringify({ isJSON: true })};
      </script>
      </body>
      </html>
  `;
}
