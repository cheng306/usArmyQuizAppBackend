import express from 'express';
import { rootHandler, questionsHandler } from './handler';

const app = express();
const port = process.env.PORT || '8000';

app.get('/', rootHandler);

app.get('/questions', questionsHandler);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
  console.log(`URL: http://localhost:${port}`);
});
