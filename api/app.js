import express from 'express';
import path from 'path';
import cookie from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import { ApolloServer } from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

import passportInit from './lib/passport';
import session from './lib/session';

const app = express();

app.use(session);
app.use(cookie());
app.use(bodyParser.urlencoded({ extended: true }));

passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '/public')));

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(fileLoader(path.join(__dirname, './resolvers')));

const graphqlEndpoint = '/api/graphql';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
  context: ({ req }) => {
    const user = req.user || null;
    return { user, req };
  },
});

const origin = process.env.FRONTEND_PORT
  ? `http://localhost:${process.env.FRONTEND_PORT}`
  : 'http://localhost:3003';

server.applyMiddleware({
  app,
  path: graphqlEndpoint,
  cors: { credentials: true, origin },
});

const PORT = process.env.API_PORT || 3004;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`); // eslint-disable-line no-console
});
