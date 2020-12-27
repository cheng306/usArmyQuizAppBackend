import express from 'express';
import * as bodyParser from 'body-parser';
import indexRouter from './server/routes/index';
import questionsRouter from './server/routes/questions';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(indexRouter);
app.use(questionsRouter);

export default app;
