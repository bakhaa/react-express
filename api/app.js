import express from 'express';
import path from 'path';

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

const PORT = process.env.NODE_PORT || 3003;

app.get('*', (req, res, next) => {
  res.send('Hello, world from API!...');
});

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`); // eslint-disable-line no-console
});
