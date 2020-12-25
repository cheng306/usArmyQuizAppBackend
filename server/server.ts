import express from 'express';
import { rootHandler } from "./handler";

const app = express();
const port = process.env.PORT || '8000';

app.get('/', rootHandler);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
  console.log(`URL: http://localhost:${port}`);
  return;
});
