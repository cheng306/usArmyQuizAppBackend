import express from 'express';
import * as Path from 'path';
import indexRouter from './server/routes/index';
import questionsRouter from './server/routes/questions';

const app = express();

app.use(indexRouter);
app.use(questionsRouter);

export default app;
