import express from 'express';
import * as bodyParser from 'body-parser';
import indexRouter from './server/routes/index';
import questionsRouter from './server/routes/questions';
import unitsRouter from './server/routes/units';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use(
  indexRouter,
  questionsRouter,
  unitsRouter,
);

export default app;
