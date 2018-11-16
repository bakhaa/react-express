import express from 'express';
import path from 'path';

// middlewares
import reactRender from './middleware/render';

const app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname, '../public')));

app.use(reactRender);

const PORT = process.env.FRONTEND_PORT || 3003;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`); // eslint-disable-line no-console
});
