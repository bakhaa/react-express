import express from 'express';

const app = express();

const PORT = process.env.PORT || 3001;

app.use('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`); // eslint-disable-line no-console
});
