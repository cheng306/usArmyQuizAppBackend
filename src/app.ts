import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import indexRouter from './server/routes/index';
import questionsRouter from './server/routes/questions';
import unitsRouter from './server/routes/units';

const app = express();

app.use(
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: false,
  }),
  cors({
    origin: [
      'https://4umt.netlify.app',
      'http://localhost:3000',
    ],
    optionsSuccessStatus: 200,
  }),
);

app.use(
  indexRouter,
  questionsRouter,
  unitsRouter,
);

export default app;
