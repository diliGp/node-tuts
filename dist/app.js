import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import graphqlHTTP from 'express-graphql';
import router from './routes/index';
import schema from './Schema';
import cors from 'cors';
import { createClient } from "redis";
const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  // Enables UI for querying throught the graphql.
  graphiql: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', router);
module.exports = app;