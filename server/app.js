import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import graphqlHTTP from 'express-graphql';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import schema from './Schemas';


const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    // Enables UI for querying throught the graphql.
    graphiql: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
